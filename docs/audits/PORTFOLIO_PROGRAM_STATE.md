# Portfolio program state

Verified on 2026-07-21. This is the final state ledger for the 15-repository program. “Complete” means the repository evidence, tests, documentation, release status, portfolio claim, and media agree; it does not imply production use. `SETU` remains excluded because no repository exists.

## Repository scorecard

| Repository | Program outcome | Release / public state | Verification evidence | Walkthrough |
| --- | --- | --- | --- | --- |
| [WorkHub OS](https://github.com/badugujashwanth-create/workhub-os) | Complete; secondary prototype | [v1.1.0](https://github.com/badugujashwanth-create/workhub-os/releases/tag/v1.1.0) | 5 CORS tests, 2 authenticated MongoDB workflows, frontend lint, 37-route build | [5:42 narrated](https://jashwanth-portfolio-ten.vercel.app/media/workhub/demo.mp4) |
| [Social Media Control Center](https://github.com/badugujashwanth-create/social-media-control-center) | Complete; simulated-provider boundary | [v1.0.0](https://github.com/badugujashwanth-create/social-media-control-center/releases/tag/v1.0.0) | 19 API tests, lint, production export | [4:05 narrated](https://jashwanth-portfolio-ten.vercel.app/media/social-media-control-center/demo.mp4) |
| [Heart Analysis](https://github.com/badugujashwanth-create/heart-analysis) | Complete; educational, non-diagnostic | [v1.0.0](https://github.com/badugujashwanth-create/heart-analysis/releases/tag/v1.0.0) | 19 backend, 2 widget, 2 browser workflows, release build | [4:17 narrated](https://jashwanth-portfolio-ten.vercel.app/media/heart-analysis/demo.mp4) |
| [Cricket Intelligence API](https://github.com/badugujashwanth-create/cricket-chatbot-api) | Complete; grounded API with honest degraded mode | [v1.0.3](https://github.com/badugujashwanth-create/cricket-chatbot-api/releases/tag/v1.0.3) | 19 routing cases and 5 HTTP integration tests | [4:20 narrated API walkthrough](https://jashwanth-portfolio-ten.vercel.app/media/cricket-api/demo.mp4) |
| [Cricket Chatbot Web](https://github.com/badugujashwanth-create/cricket-chatbot-web) | Complete; paired with current API evidence | [v1.0.0](https://github.com/badugujashwanth-create/cricket-chatbot-web/releases/tag/v1.0.0) | 3 Playwright workflows, build, dependency audit | Uses current API walkthrough; stale web recording is not promoted |
| [Neutro](https://github.com/badugujashwanth-create/Neutro) | Complete; local-first accessibility prototype | [v0.6.0](https://github.com/badugujashwanth-create/Neutro/releases/tag/v0.6.0) | 6 unit cases, desktop/mobile browser checks, CI, clean audit | [3:15 narrated](https://jashwanth-portfolio-ten.vercel.app/media/neutro/demo.mp4) |
| [HYD VNTG Storefront](https://github.com/badugujashwanth-create/hyd-vntg-storefront) | Complete; bounded synthetic storefront | [v1.0.0](https://github.com/badugujashwanth-create/hyd-vntg-storefront/releases/tag/v1.0.0) | 9 unit tests, 3 browser workflows, build, clean audit | [3:03 narrated](https://jashwanth-portfolio-ten.vercel.app/media/hyd-vntg/demo.mp4) |
| [ParkAlert](https://github.com/badugujashwanth-create/parkalert-india) | Repository-complete candidate; external security hold | [PR #3](https://github.com/badugujashwanth-create/parkalert-india/pull/3) green, deliberately unmerged; no release | Analyze, 5 tests, web build, secret scan | [3:08 narrated candidate](https://jashwanth-portfolio-ten.vercel.app/media/parkalert/demo.mp4) |
| [ShadowOps](https://github.com/badugujashwanth-create/shadowops-hackathon) | Repository-complete collaborative candidate; ownership/model hold | [PR #2](https://github.com/badugujashwanth-create/shadowops-hackathon/pull/2) green, deliberately unmerged; no release | 40 backend tests, frontend lint/build, clean audit, CI | [3:20 narrated candidate](https://jashwanth-portfolio-ten.vercel.app/media/shadowops/demo.mp4) |
| [NIRA](https://github.com/badugujashwanth-create/NIRA) | Complete; local-first permissioned assistant | [v0.5.0](https://github.com/badugujashwanth-create/NIRA/releases/tag/v0.5.0) | 51 tests, build/package checks, audit and secret scan | [5:40 narrated](https://jashwanth-portfolio-ten.vercel.app/media/nira/demo.mp4) |
| [NiyamGuard](https://github.com/badugujashwanth-create/NiyamGuard) | Complete; synthetic public-service sandbox | [v1.1.0](https://github.com/badugujashwanth-create/NiyamGuard/releases/tag/v1.1.0) | 243 backend and 60 frontend tests, build, secret scan | [5:37 narrated](https://jashwanth-portfolio-ten.vercel.app/media/niyamguard/demo.mp4) |
| [Zettalogix Migration Suite](https://github.com/badugujashwanth-create/zettalogix-migration-suite) | Complete; synthetic frontend with external backend boundary | [v0.3.0](https://github.com/badugujashwanth-create/zettalogix-migration-suite/releases/tag/v0.3.0); [live frontend](https://sharepoint-one.vercel.app/login?demo=1) | 7 web and 2 desktop tests, web/desktop builds, clean audits | [5:40 narrated](https://jashwanth-portfolio-ten.vercel.app/media/zettalogix/demo.mp4) |
| Private Thrifty duplicate | Disposition documented; preserved privately | No publication, release, or duplicate demo | Compared with canonical HYD VNTG repository | Intentionally none |
| [GitHub profile](https://github.com/badugujashwanth-create) | Recruiter routing synchronized | Public profile README; no software release | Claims and links match verified repositories | Shares portfolio/project walkthroughs |
| [Portfolio](https://github.com/badugujashwanth-create/jashwanth-portfolio) | Final synchronization in this change | [Production](https://jashwanth-portfolio-ten.vercel.app) | lint, typecheck, unit/media tests, static build, link and browser checks | Same-origin portfolio and project inventory |

## Deployment status

- The portfolio is the canonical inline media host and production recruiter surface. Public verification must be rerun after this synchronization reaches production.
- Zettalogix has a verified public synthetic frontend. Other project entries make no unsupported external deployment claim.
- GitHub release attachments remain download evidence because GitHub serves them as generic attachments; inline playback uses same-origin portfolio assets with native MIME types.
- ParkAlert and ShadowOps candidate code is not deployed, merged, tagged, or released. Their portfolio walkthroughs are labeled candidate evidence.

## Human checkpoints

The authoritative list is [MANUAL_ACTIONS.md](../../MANUAL_ACTIONS.md). The release-blocking items are Firebase ownership/security verification for ParkAlert; contributor, ownership, licensing, upstream, and model/CUDA evidence for ShadowOps; WorkHub credential rotation; owner-approved resume publication; manual assistive-technology/device review; and custom-domain/analytics decisions. The intended six-repository GitHub pin set was verified on 22 July 2026 and is no longer outstanding.

## Post-release drift audit

On 22 July 2026, production homepage, recruiter, ParkAlert MP4, and ShadowOps MP4 requests remained HTTP 200 with their expected MIME types and current byte sizes. Portfolio/profile default branches and both held candidate branches were clean and matched their upstream tracking refs. The superseded conflicting ParkAlert PR #1 was closed in favor of held PR #3. Private duplicate PR #1 was closed without merging or deleting its audit branch, preserving the documented private disposition. Only ParkAlert PR #3 and ShadowOps PR #2 remain open, mergeable, green, and intentionally held.

## Media inventory

Every runnable public product has a real workflow walkthrough or, for the paired Cricket Web repository, the current API walkthrough plus an explicit stale-web-video boundary. ParkAlert and ShadowOps now exceed three minutes with narration and seven caption cues. The private duplicate receives disposition documentation instead of fake media. See [PUBLIC_MEDIA_INVENTORY.md](PUBLIC_MEDIA_INVENTORY.md) and [FINAL_MEDIA_VERIFICATION.md](FINAL_MEDIA_VERIFICATION.md) for delivery evidence and checksums.
