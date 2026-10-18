// Isolated, disposable local PostgreSQL only. Never connects to an existing DB.
import { execFileSync, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const exec = promisify(execFile);
const bin = process.env.POSTGRES_BIN || "C:/Program Files/PostgreSQL/17/bin";
const testRoot = path.resolve(".qa-postgres");
mkdirSync(testRoot, { recursive: true });
const directory = mkdtempSync(path.join(testRoot, "run-"));
const command = (name) =>
  path.join(bin, process.platform === "win32" ? name + ".exe" : name);
const run = (name, args) =>
  execFileSync(command(name), args, {
    encoding: "utf8",
    windowsHide: true,
    ...(name === "pg_ctl" ? { stdio: "ignore" } : {}),
  });
const connection = [
  "-h",
  "127.0.0.1",
  "-p",
  "55432",
  "-U",
  "qa_admin",
  "-d",
  "postgres",
  "-v",
  "ON_ERROR_STOP=1",
  "-At",
];
const sql = (text) => run("psql", [...connection, "-c", text]).trim();
run("initdb", [
  "-D",
  directory,
  "-A",
  "trust",
  "-U",
  "qa_admin",
  "--no-locale",
  "-E",
  "UTF8",
]);
let started = false;
try {
  run("pg_ctl", [
    "-D",
    directory,
    "-l",
    path.join(directory, "server.log"),
    "-o",
    "-h 127.0.0.1 -p 55432",
    "-w",
    "start",
  ]);
  started = true;
  sql(
    "create role anon; create role authenticated; create role service_role bypassrls;",
  );
  run("psql", [
    ...connection,
    "-f",
    "supabase/migrations/001_proposed_rsvp.sql",
  ]);
  sql(
    "insert into public.invitees(display_name,token_hash,expires_at) values ('DUMMY QA',repeat('a',64),now()+interval '1 day'),('DUMMY EXPIRED',repeat('b',64),now()-interval '1 day'),('DUMMY REVOKED',repeat('c',64),now()+interval '1 day'); update public.invitees set revoked_at=now() where token_hash=repeat('c',64);",
  );
  const concurrent = await Promise.all(
    ["attending", "unable_to_attend", "attending", "unable_to_attend"].map(
      (response) =>
        exec(
          command("psql"),
          [
            ...connection,
            "-c",
            `set role service_role; select public.submit_invitation_response(repeat('a',64),'${response}');`,
          ],
          { encoding: "utf8", windowsHide: true },
        ),
    ),
  );
  const answers = concurrent.map((r) =>
    JSON.parse(r.stdout.trim().split("\n").at(-1)),
  );
  assert.equal(answers.filter((a) => a.status === "accepted").length, 1);
  assert.equal(
    answers.filter((a) => a.status === "already_submitted").length,
    3,
  );
  assert.equal(new Set(answers.map((a) => a.response)).size, 1);
  assert.equal(sql("select count(*) from public.responses;"), "1");
  for (const hash of ["b", "c", "d"])
    assert.equal(
      JSON.parse(
        sql(
          `select public.submit_invitation_response(repeat('${hash}',64),'attending');`,
        ),
      ).status,
      "invalid_invitation",
    );
  assert.equal(
    JSON.parse(
      sql("select public.submit_invitation_response(repeat('a',64),'maybe');"),
    ).status,
    "invalid_invitation",
  );
  for (const statement of [
    "set role anon; select * from public.invitees;",
    "set role authenticated; select * from public.responses;",
    "set role anon; select public.submit_invitation_response(repeat('a',64),'attending');",
    "update public.responses set response='unable_to_attend';",
    "delete from public.responses;",
    "insert into public.responses select invitee_id,response,submitted_at from public.responses;",
  ]) {
    let rejected = false;
    try {
      sql(statement);
    } catch {
      rejected = true;
    }
    assert.equal(rejected, true, statement);
  }
  const report = {
    date: new Date().toISOString(),
    engine: "isolated PostgreSQL 17",
    result: "PASS",
    checks: [
      "migration applied",
      "4 concurrent submissions: exactly one accepted",
      "authoritative response retained on duplicates",
      "expired/revoked/unknown tokens rejected",
      "invalid option rejected",
      "anon/authenticated tables denied",
      "anon RPC denied",
      "update/delete trigger denied even as owner",
      "duplicate primary key denied",
    ],
    limitation:
      "Local PostgreSQL only; live Supabase Auth/PostgREST/RLS environment NOT TESTED",
  };
  mkdirSync("docs/qa", { recursive: true });
  writeFileSync(
    "docs/qa/database-results.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  if (started) run("pg_ctl", ["-D", directory, "-m", "fast", "-w", "stop"]);
}
