# Final Media Verification

Verified: 21 July 2026 (Asia/Calcutta)

Canonical production: <https://jashwanth-portfolio-ten.vercel.app>

Detailed inventory: [PUBLIC_MEDIA_INVENTORY.md](PUBLIC_MEDIA_INVENTORY.md)

## Outcome

Phase 2 media visibility and delivery repair is complete. No new product features, Product Design exploration, screenshots, or recordings were created.

The later authorized serial project program replaced Neutro and HYD VNTG media only after their qualified workflows made the Phase 2 captures outdated. Both released replacements are publicly verified. It subsequently replaced ShadowOps and ParkAlert media after their verified candidate workflows made the 55-second silent captures outdated. Those two packages are portfolio evidence only: their source PRs remain deliberately unmerged and unreleased behind ownership/security gates.

- All 75 canonical portfolio image/video/caption assets return HTTP 200, non-zero bytes, and their exact expected MIME type while logged out.
- All 11 case-study players work in logged-out Chrome desktop, Edge desktop with WebGL disabled, and a throttled Chrome mobile context.
- All players expose native controls, `playsInline`, MP4 then WebM fallback, captions, poster, direct open/download/caption/repository links, loading state, and a visible error fallback.
- Playback, seeking, caption cues, native fullscreen entry/exit, viewport containment, homepage/project image decoding, and fallback recovery were exercised.
- All 13 README thumbnails return HTTP 200 with `image/png` and open the verified case-study or portfolio media target.
- All 187 tracked documentation images return HTTP 200 with the correct image MIME.
- All 50 release-media downloads return HTTP 200 and non-zero bytes. Their GitHub API MIME is correct; GitHub's download CDN forces generic attachment MIME, so none is used inline.
- No active media link uses GitHub `/blob/`, raw GitHub playback, localhost, a Windows path, a private repository, or a stale Cricket Web recording.

## Repairs delivered

1. Moved the existing accepted recordings, posters, and captions into stable same-origin `/public/media/<project>/` packages.
2. During Phase 2, transcoded those same recordings to fast-start H.264 MP4 without re-recording content.
3. Preserved the original WebM files and added MP4-first/WebM-second sources.
4. Replaced raw GitHub video/caption URLs and narrowed CSP `media-src` to `'self'`.
5. Added responsive 16:9 media containment, mobile-safe rendering, `playsInline`, captions, loading/error status, and direct recovery links.
6. Promoted the current 4:20 Cricket API recording instead of the older Cricket Web capture.
7. Replaced the extreme 1280×6541 HYD VNTG active card image with its existing 1280×720 demo poster.
8. Added MP4 assets to NiyamGuard v1.1.0, NIRA v0.5.0, Social Media Control Center v1.0.0, Heart Analysis v1.0.0, Zettalogix v0.3.0, and WorkHub OS v1.1.0.
9. Added the complete current MP4/WebM/VTT/poster package to Cricket API v1.0.3.
10. Repaired public profile and project READMEs with clickable thumbnails plus direct same-origin MP4, WebM, and captions.
11. Added repeatable local-integrity, production HTTP/MIME, GitHub media, and logged-out browser checks.
12. Replaced the superseded 55-second ParkAlert and ShadowOps captures with reviewed 3:08 and 3:20 narrated candidate walkthroughs after their workflows changed.
13. Reconciled the playback verifier with the new durations and made lazy project-image decode checks deterministic.

## Verification matrix

| Check                          | Scope                                                                                                                                           | Result                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `npm run check:media`          | Exact casing, non-zero/LFS checks, MP4 fast-start/H.264/AAC, duration, WebM signature, captions, 1280×720 posters, project/social aspect ratios | 6/6 tests passed                 |
| `npm test`                     | Portfolio unit/component suite including media integrity                                                                                        | 19/19 tests passed               |
| `npm run lint`                 | Application and verification scripts                                                                                                            | Passed                           |
| `npm run typecheck`            | Portfolio TypeScript                                                                                                                            | Passed                           |
| `npm run build`                | Static production generation, all 11 case studies                                                                                               | Passed, 18 routes generated      |
| `npm run check:links`          | Built internal links and critical public evidence URLs                                                                                          | 0 broken                         |
| `npm run check:media:public`   | All 75 deployed assets                                                                                                                          | HTTP 200, correct MIME, non-zero |
| `npm run check:media:github`   | 50 release assets, 13 README thumbnails, 187 documentation images                                                                               | Passed                           |
| `npm run check:media:browsers` | 11 players × Chrome desktop, Edge desktop/WebGL disabled, Chrome mobile/throttled; forced failure fallback                                      | Passed                           |

## Browser evidence

| Mode                                                 | Authentication state        | Image rendering              | Metadata/play/seek | Captions | Fullscreen | Direct links | Failure fallback |
| ---------------------------------------------------- | --------------------------- | ---------------------------- | ------------------ | -------- | ---------- | ------------ | ---------------- |
| Chrome desktop                                       | Fresh context; zero cookies | Pass                         | 11/11              | 11/11    | Pass       | 11/11        | Pass             |
| Edge desktop, WebGL disabled                         | Fresh context; zero cookies | Pass                         | 11/11              | 11/11    | Pass       | 11/11        | Pass             |
| Chrome Pixel 7 emulation; first media load throttled | Fresh context; zero cookies | Pass; no horizontal overflow | 11/11              | 11/11    | Pass       | 11/11        | Pass             |

The failure test blocked both NiyamGuard video formats. The player displayed the recovery message and retained all four direct links instead of leaving a blank or zero-height frame.

## Public delivery assertions

| Asset class                  | Expected/actual delivery                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Same-origin MP4              | `video/mp4`                                                                                           |
| Same-origin WebM             | `video/webm`                                                                                          |
| Same-origin captions         | `text/vtt`                                                                                            |
| Same-origin PNG              | `image/png`                                                                                           |
| Same-origin SVG              | `image/svg+xml`                                                                                       |
| README/raw documentation PNG | `image/png`                                                                                           |
| GitHub release attachment    | API metadata retains media MIME; download CDN response is `application/octet-stream` by GitHub design |

GitHub release attachments are therefore download artifacts, not browser media sources. The portfolio and README playback path has no dependency on their CDN MIME behavior.

## Public changes

Portfolio media commits:

- `cb7ae2d` — same-origin media packages and resilient player
- `21e7deb` — production, GitHub, and browser delivery checks
- `c93b04e` — HYD VNTG poster aspect-ratio repair
- `9179a53` — image rendering and fullscreen browser coverage
- `b14dce6` — tracked documentation-image verification
- `097f859` — HYD VNTG v1.0.0 media, case-study, and production-delivery synchronization
- `46f5f93` — ParkAlert/ShadowOps candidate media and 15-repository program reconciliation
- `6c22c1d` — current-duration and deterministic image-decode playback verification

README media-link commits:

| Repository                  | Public commit |
| --------------------------- | ------------- |
| Profile                     | `6f61f08`     |
| NiyamGuard                  | `7b53786`     |
| NIRA                        | `a67abe8`     |
| Social Media Control Center | `5b46405`     |
| Cricket API                 | `273cd68`     |
| Cricket Web                 | `c2158b1`     |
| Heart Analysis              | `a21cb96`     |
| Zettalogix                  | `03ae9e3`     |
| WorkHub OS                  | `7a05270`     |
| Neutro                      | `54463e9`     |
| ShadowOps                   | candidate `03a7389` in PR #2 |
| HYD VNTG                    | `769a1e2`     |
| ParkAlert                   | candidate `c063268` in PR #3 |

## Honest limitations and deferred recording work

- At Phase 2 close, the portfolio, Neutro, ShadowOps, HYD VNTG, and ParkAlert sources had no audio stream and were labeled without narration claims. The later authorized serial project program replaced Neutro, HYD VNTG, ShadowOps, and ParkAlert with reviewed narrated walkthroughs after their qualified workflows changed. The portfolio walkthrough remains silent and captioned.
- ParkAlert candidate PR #3 is held for Firebase ownership/security verification. ShadowOps candidate PR #2 is held for contributor, ownership, licensing, and model-evidence verification. Neither portfolio video implies a merge or release.
- The older Cricket Web recording remains historical repository evidence but is not an active public playback source because it is out of date.
- GitHub release download responses cannot be made inline-media MIME from repository code. Correct inline delivery is provided by the canonical same-origin site instead.
- No private duplicate media was published.

These are content/host boundaries, not broken active delivery paths. Phase 2 is closed; no other project work was resumed before these two reports were completed.
