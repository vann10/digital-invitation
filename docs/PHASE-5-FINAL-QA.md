# Phase 5 — Final integration and QA

Date: 18 October 2026. **Release BLOCKED; not production-ready.**

Environment: Windows, installed Google Chrome driven by Playwright, Next.js 15.5.27 production builds `.next-editorial-phase5-build` and final typography revision `.next-editorial-phase5-final`, local port 3004. Synthetic invitation tokens only; no real guest records, deployment or production database mutations. Video remains deferred by the user. Existing illustrated assets were reused; no new artwork was generated.

## Defects and fixes

1. **High — fixed:** changing the invitation fragment retained the previous guest's final RSVP state. An in-flight response could also finalize the newly selected invitation. Both failures were reproduced in `qa/phase5/identity-before/browser-results.json`. `components/rsvp.tsx` now resets state on identity change, cancels the old request and rejects stale responses using a request version and current URL identity. The database finality rule is unchanged; cancelling a browser request does not undo a server-accepted response.
2. **Medium — fixed:** the countdown branch's transformed bounds overlapped its label at mobile and desktop widths. `components/section-editorial.css` reduces/repositions the branch; the existing strict clearance assertion now passes.
3. **Medium — fixed:** RSVP choice labels inherited the display serif. They now use DM Sans, matching the functional typography rule; native radio semantics and row dimensions are preserved.
4. **Test maintenance:** older tests expected all cover motion to finish at 2.5 seconds and Hero motion on individual name spans. The current finite branch breath ends at 4.3 seconds and Hero animates its composition. Tests now check the actual objects and completion time. Direct-anchor checks account for the existing 24px scroll margin. A new test's image type narrowing was corrected after standalone TypeScript checking caught it.

## Release requirements, ordered by priority

| Priority | Requirement | Status / reason |
|---|---|---|
| Critical | Actual date, time, venue, address and map URL | PENDING; countdown and location link cannot operate with real data yet. |
| Critical | Approved photographs, order, story, closing and RSVP copy; final monogram acceptance | PENDING. Gallery contains an honest empty state; real photo composition/crops cannot be accepted. |
| Critical | Verify actual venue artwork | PENDING. Gandrung artwork is labelled as a reference, not confirmed as the real venue. |
| Critical | Accept backend proposals and configure Supabase | PENDING. Schema, token lifecycle, operator authentication/export policy and environment remain proposals; no live credentials available. |
| Critical | Live end-to-end RSVP, Auth, RLS and private export tests | NOT TESTED. Local SQL and mocked UI evidence cannot replace Supabase testing. |
| High | Deployment, HTTPS cookies, production secrets, access controls, rate limits, retention/backups/monitoring | NOT TESTED / decisions pending. No real secrets were available to test deployment leakage. |
| High | Real-device Safari/iOS, Android, screen-reader review and throttled network performance | NOT TESTED; desktop Chrome viewport simulation is the current evidence. |
| Polish | Rebalance final text/photo density after approved content arrives | PENDING. Placeholder lengths and empty gallery limit final editorial judgment. |

## Evidence and limitations

- Baseline: `qa/phase5/baseline/browser-results.json`: 13 passed, 8 failed. Six composition failures exposed countdown clearance; two motion assertions referred to the previous choreography.
- Reproduction: `qa/phase5/identity-before/browser-results.json`: both new RSVP identity tests failed before the fix.
- Database: `qa/database-results.json`: isolated PostgreSQL 17 PASS. Four concurrent submissions produce exactly one acceptance; duplicates retain the authoritative answer. Expired/revoked/unknown tokens and invalid choices rejected. Public roles denied table/RPC access; mutation trigger and uniqueness reject revisions. **Live Supabase NOT TESTED.**
- `npm run lint`: PASS. `npm test`: 5/5 PASS. Existing Node module-type warning remains non-fatal.
- `NEXT_BUILD_DIR=.next-editorial-phase5-build npm run build`: PASS, including production compilation and build type validation; home first-load JS 117kB. No animation library added.
- `npm audit --omit=dev --json`: PASS, zero reported vulnerabilities at execution time; not a security certification.
- Source assets include large master WebPs (bouquet 1.43MB, ornament 1.40MB, monogram 1.20MB); responsive Next Image delivery reduces browser payloads. Audio sample is 2.68MB. Delivery measurements are local lab evidence, not production Core Web Vitals.

## Requested acceptance matrix

PASS is scoped to the tested preview and configurations, not a release sign-off.

| # | Check | Result | Evidence / limits |
|---|---|---|---|
| 1 | Eight sections in order | PASS | Browser composition tests assert Opening, Hero, Our Story, The Wedding, Venue, Gallery, RSVP, Closing. |
| 2 | Illustration, palette, typography, density | PASS for preview | Actual mobile/desktop screenshots reviewed; branch/sprig/peony connect compositions. Ivory dominant with approved emerald Hero/Wedding amendment. Functional RSVP font corrected. Gallery density cannot be approved without photos. |
| 3 | Distinct composition and contextual motion | PASS for available content | Letter/envelope, layered stationery/date, masked venue illustration, restrained RSVP and monogram/rule closing. Gallery photo motion NOT TESTED without approved photographs. |
| 4 | Slow, fast, reverse scroll; direct navigation | PASS | Finite animation test passes and content remains visible after reversal. Direct navigation respects the defined scroll margin. No cross-boundary travelling-object animation exists to validate. |
| 5 | Opening to separate Hero, normal scrolling | PASS | Six viewport timings 1412–1433ms; Hero focus, no extra scroll needed. Pointer, touch, Enter, Space, duplicate/early activation, cancelled animation and no-JS fallback tested. |
| 6 | Deliberate responsive layouts | PASS for preview | Six Chrome viewports: 320×568, 390×844, 667×375, 768×1024, 1024×768, 1440×900. Desktop Story, Wedding, Venue and RSVP recompose into spreads. |
| 7 | Media loading and fallback | PASS for available images/audio | All current images decoded at six sizes; forced image failure retains text/controls and monogram fallback. Audio download failure/retry, blocked playback and keyboard stop/restart pass. Video fallback NOT TESTED: video intentionally omitted. Real gallery photos NOT TESTED. |
| 8 | Overflow, clipping, layout shifts | PASS within measured scope | Six viewport overflow/CTA checks, countdown clearance, section captures and Opening CLS <0.1 assertion. No clipped essential text observed in reviewed captures. Not a guarantee for future content or all devices. |
| 9 | Keyboard, focus, semantics, reduced motion | PASS for automated scope | Native radios and keyboard Opening/audio; visible focus; reduced motion cancels reveals and preserves content. Axe cover/opened/selected states have zero violations. Manual screen-reader testing NOT TESTED. |
| 10 | Approved real photographs and venue | FAIL release gate | No approved real photographs; displayed venue is explicitly a reference awaiting confirmation. No generated substitute for the couple or actual wedding venue. |
| 11 | Two RSVP choices and first-response finality | PASS locally; live NOT TESTED | UI mock tests, identity regressions, real API rejection checks and isolated SQL concurrency/finality. No claim of live Supabase success. |
| 12 | Supabase, link identity, private operator/export | NOT TESTED live | Local SQL permissions/concurrency PASS; forged/anonymous export denied, foreign mutations denied and private no-store headers tested. Positive operator authentication, pagination/export and live RLS require configured Supabase. |
| 13 | Optimized assets and dependencies | PASS implementation; field performance NOT TESTED | Responsive Next Image, lazy lower images, dimensioned assets, no animation dependency, 117kB first-load JS. Large masters/audio listed above; no production or throttled-device benchmark. |

## Visual assessment

The Opening cover remains the densest botanical composition. Hero uses a separate illustrated bird plate; Story is a letter spread; Wedding has a card and secondary countdown; Venue gives the architectural reference primary scale; RSVP prioritizes readable choices; Closing resolves with the original monogram and repeated motifs. The Gallery is visibly incomplete because its real imagery is missing. The same family reads consistently at both widths, but the final balance of Story/Gallery/Closing must be revisited with approved copy and photography.

Screenshots are in `qa/phase5/final/`: cover images at all six widths, individual sections at 390 and 1440, full-page images, motion samples and axe output. These are actual production-browser captures. No screenshot is presented as approval of pending real-world content.

## Final verification details

- Complete browser run (`qa/phase5/final/browser-results.json`): **26 PASS, 1 FAIL**. The one failure was a test assumption: direct navigation reached 23.96875px below the viewport top, consistent with the CSS 24px scroll margin; the assertion incorrectly required less than 20px. The corrected test compares the actual CSS margin.
- Final build `.next-editorial-phase5-final`: PASS, unchanged rounded 117kB home first-load JS. It includes the RSVP DM Sans correction. Targeted retest covers all six new QA scenarios plus mobile/desktop composition, accessibility and RSVP failure/finality behavior. The earlier full-run evidence remains retained rather than overwritten.
- Direct navigation and full-page axe on the final build: PASS, zero axe violations; `qa/phase5/targeted/full-axe.json`.
- Local resource sample (`qa/phase5/targeted/resources.json`): direct `?open=1#rsvp`, reduced motion, 390×844, after scrolling all sections: **CLS 0**, local LCP **488ms**, 26 subresources with **906,031 bytes transferred**. This excludes the navigation document and audio playback; resource initiators include preloaded images. This is one unthrottled localhost sample, not a field performance score or network-load guarantee.
- Latest 390/1440 screenshots, including corrected RSVP labels, are in `qa/phase5/targeted/` and supersede the corresponding `final/` captures. Both widths were visually inspected after the typography change.
- **Targeted final result: 11/11 PASS**, zero failed, skipped or flaky tests (`qa/phase5/targeted/browser-results.json`). This is a scoped rerun after the final font change, not a claim that an additional full 27-test run occurred.
- Final `npm run lint` and standalone `npm run typecheck`: **PASS**, exit code 0. Next-generated configuration changes from isolated build directories were removed; no architectural configuration change is part of this QA patch.

## Next release steps

Supply and approve the real event details, venue reference, photographs and copy; integrate them centrally and repeat visual/gallery/countdown/map checks. Accept the proposed backend design, configure a non-production Supabase project, and run the positive/negative authenticated RSVP and export flows there. Resolve deployment/privacy policy and test the deployed staging build on real mobile browsers and constrained networks before any guest release.

## Files affected by Phase 5

`components/rsvp.tsx`, `components/section-editorial.css`, `tests/browser/invitation.spec.ts`, new `tests/browser/final-qa.spec.ts`, this report and evidence under `docs/qa/phase5/`. Existing broader uncommitted project changes are outside this QA patch.

Canonical documents remain the baseline with documented user amendments. `10-Memory-Prompt.txt` is absent from the repository; it was not invented. Earlier QA reports remain historical evidence, not proof of current production readiness.
