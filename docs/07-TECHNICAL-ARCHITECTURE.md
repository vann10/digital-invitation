# Technical Architecture — Rizal & Dewi Digital Invitation

## Implementation note — 2026-10-15

An opt-in implementation proposal now exists in `app/api/`, `lib/`, `app/operator/` and `supabase/migrations/001_proposed_rsvp.sql`. See [IMPLEMENTATION-DECISIONS.md](IMPLEMENTATION-DECISIONS.md) for explicit proposed schema/token/auth/export choices. These are **PENDING acceptance**, not additional LOCKED decisions. Local PostgreSQL finality/concurrency/permissions and anonymous local API denial were verified; hosted Supabase integration remains **BLOCKED**. See [QA-REPORT.md](QA-REPORT.md). The technical decision list below remains authoritative for approval boundaries.

**Status:** Product decisions locked; implementation details pending  
**Purpose:** Align technical planning with confirmed project decisions without implying the backend has been implemented.

## 1. Confirmed stack and product rules

| Area | Decision | Status |
|---|---|---|
| Frontend | Next.js + TypeScript | LOCKED |
| RSVP backend | Supabase | LOCKED |
| Invitation model | One individual per invitation link | LOCKED |
| RSVP revision | Final after first submission | LOCKED |
| Operator export access | Private login | LOCKED |
| Administration | Spreadsheet/export, not bespoke dashboard | LOCKED |

## 2. Functional boundaries

The guest-facing site presents the eight-section invitation and allows a guest to submit one of the two approved responses:
- `Attending`
- `Unable to Attend`

No guest count, dietary preferences, free-form message, or other RSVP fields are approved.

The invitation model is individual-level. Each personal invitation link should resolve to one invited individual. Do not implement a shared generic link for all guests unless the user explicitly changes the model.

After the first accepted RSVP submission, the response is final under the current policy. The guest-facing experience must not imply that the response can be edited if the backend policy does not permit it.

## 3. Access and export

- Operator access to RSVP data is private and requires authentication.
- Data administration is by spreadsheet/export; do not build a bespoke dashboard unless separately approved.
- Exported data must be handled as private guest information.
- Do not expose operator credentials or unrestricted RSVP data to the public client.

## 4. Technical decisions still required

The following implementation details are not yet established by the current decisions and must not be invented as if already approved:

- Supabase table/schema and field names.
- Invitation token generation, storage, expiry, and revocation policy.
- Whether links contain opaque tokens or another identifier.
- How token-to-guest association is validated.
- Database constraints for one response per invitee.
- Exact authentication method for the private operator.
- Export format, delivery method, and authorization checks.
- Error codes and guest-facing error copy.
- Privacy notice/retention policy.
- RSVP deadline, if any.
- Hosting/deployment target, environment configuration, backups, and monitoring.

These should be resolved during technical design before implementation. Any proposed defaults must be marked as proposals, not locked decisions.

## 5. Security baseline for design and implementation

- Validate invitation identity on the server; do not trust a client-supplied guest ID alone.
- Enforce one accepted RSVP per individual using server/database constraints.
- Keep service-role secrets server-side only.
- Use least-privilege access for operator/export workflows.
- Do not make the export endpoint publicly accessible.
- Validate input even though only two choices are permitted.
- Avoid exposing whether arbitrary invitation identifiers belong to a guest.
- Use environment variables for secrets and document required variables without storing real secrets in source control.
- Test unauthorized, malformed, duplicate, and already-submitted requests.

These are implementation requirements/recommendations, not evidence that the system currently satisfies them.

## 6. Suggested data concepts (not a locked schema)

A future schema will likely need to represent:
- invited individual identity,
- a securely verifiable invitation link/token,
- RSVP response (`attending` or `unable_to_attend`),
- submission timestamp,
- status needed to enforce final-after-first-submission behavior.

This is a conceptual list only. Table names, column names, constraints, and token strategy remain pending technical design.

## 7. Acceptance conditions

Before release, verify:
- a valid personal invitation link resolves correctly;
- invalid/unknown tokens do not expose guest data;
- one individual cannot submit multiple competing responses;
- a second submission follows the final-response policy;
- successful submission feedback appears only after backend confirmation;
- failed submission preserves the choice and provides a retry path where appropriate;
- private operator authentication is required;
- export access is restricted and tested;
- secrets are not included in client bundles;
- mobile, keyboard, and reduced-motion behavior remains correct.

**Status:** product-level technical decisions LOCKED; schema, implementation, deployment, and technical QA NOT TESTED / PENDING.

Catatan audit
Ada satu hal yang sangat penting untuk dipertahankan: RSVP tidak boleh dianggap aman hanya karena tautannya bersifat personal. Dokumen ini sudah benar karena mensyaratkan validasi identitas di server, pembatasan satu respons per individu, dan pengujian akses yang tidak sah.
Sebelum implementasi, ada tiga kelompok keputusan yang masih perlu diselesaikan:
1. Identitas undangan: bagaimana token dibuat, diverifikasi, dicabut, dan dihubungkan dengan individu yang diundang.
2. Pengelolaan data: bagaimana operator login, mengakses, dan mengekspor respons secara privat.
3. Aturan pengiriman: bagaimana sistem menangani pengiriman ganda, respons yang sudah final, dan kegagalan backend.


## 8. Opening revision impact

The Editorial Cover revision does not change the confirmed technical stack or RSVP architecture. Opening interaction may be implemented with CSS and JavaScript within the existing Next.js + TypeScript frontend. Use a semantic button for `BUKA UNDANGAN`, preserve keyboard/focus behavior, and respect `prefers-reduced-motion`. This note defines no new backend requirement and is not evidence of implementation or QA.
