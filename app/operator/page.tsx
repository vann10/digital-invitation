"use client";
import { useState } from "react";
export default function Operator() {
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("loading");
    try {
      const response = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      if (!response.ok) throw new Error();
      setState("ready");
      form.reset();
      setMessage("Login berhasil. Unduh ekspor privat di bawah.");
    } catch {
      setState("idle");
      setMessage("Login tidak tersedia atau kredensial tidak dapat digunakan.");
    }
  }
  async function logout() {
    const response = await fetch("/api/operator/logout", { method: "POST" });
    if (response.ok) {
      setState("idle");
      setMessage("Anda telah keluar.");
    }
  }
  return (
    <main className="operator">
      <h1>Ekspor RSVP</h1>
      <p className="supporting">Akses khusus operator.</p>
      {state !== "ready" ? (
        <form onSubmit={login}>
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Kata sandi
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="text-action" disabled={state === "loading"}>
            {state === "loading" ? "MASUK…" : "MASUK"}
          </button>
        </form>
      ) : (
        <>
          <p>
            <a className="text-action" href="/api/operator/export">
              UNDUH CSV
            </a>
          </p>
          <button className="text-action" onClick={logout}>
            KELUAR
          </button>
        </>
      )}
      <p role="status">{message}</p>
    </main>
  );
}
