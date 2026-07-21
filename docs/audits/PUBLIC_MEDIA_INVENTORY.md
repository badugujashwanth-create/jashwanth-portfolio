# Public Media Inventory

Verified: 21 July 2026 (Asia/Calcutta)

Canonical site: <https://jashwanth-portfolio-ten.vercel.app>

Portfolio source: `jashwanth-portfolio` at `097f859`

## Scope and result

This inventory covers the active portfolio images, case-study screenshots, social cards, video posters, MP4/WebM files, captions, README thumbnails, GitHub release media, and tracked documentation images across the 14 public repositories. Private duplicate media and application icons that are not public documentation or portfolio surfaces are excluded.

| Surface                              |    Count | Logged-out result                                                         | Delivery status                                             |
| ------------------------------------ | -------: | ------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Portfolio static images/icons        |       26 | HTTP 200; exact image MIME; non-zero                                      | Working                                                     |
| Portfolio video packages and posters | 49 files | HTTP 200; `video/mp4`, `video/webm`, `text/vtt`, or `image/png`; non-zero | Working                                                     |
| GitHub README thumbnails             |       13 | HTTP 200; `image/png`; non-zero; case-study target works                  | Working                                                     |
| Tracked `docs/` images               |      187 | HTTP 200; correct image MIME; non-zero                                    | Working source evidence                                     |
| GitHub release media                 |       50 | HTTP 200; non-zero; API MIME is correct                                   | Download-only; GitHub CDN forces `application/octet-stream` |

Active playback no longer uses GitHub `/blob/` pages, GitHub raw media, Windows paths, localhost, private repositories, or release-attachment URLs. All inline video/image/caption delivery is same-origin under `/media/` or `/assets/`.

## Video and poster packages

Every package below uses the exact four deployed paths `demo.mp4`, `demo.webm`, `demo-captions.vtt`, and `poster.png` below its public directory. Posters are 1280×720 PNG. MP4 files are fast-start H.264; narrated sources retain AAC. WebM files are the unchanged original recordings.

| Surface                     | Original local source                                   | Public directory                      | Duration | Original WebM | MP4 fallback    | Bytes: MP4 / WebM / VTT / poster          | Logged-out desktop/mobile | Final action                                         |
| --------------------------- | ------------------------------------------------------- | ------------------------------------- | -------: | ------------- | --------------- | ----------------------------------------- | ------------------------- | ---------------------------------------------------- |
| Portfolio                   | `jashwanth-portfolio/docs/demo/portfolio-demo.*`        | `/media/portfolio/`                   | 1:44.600 | VP8, no audio | H.264, no audio | 3,752,223 / 8,701,999 / 1,287 / 339,992   | Pass                      | Reused; transcoded only                              |
| NiyamGuard                  | `NiyamGuard/docs/demo/demo.*`                           | `/media/niyamguard/`                  | 5:37.408 | VP9/Opus      | H.264/AAC       | 15,976,330 / 13,708,739 / 2,088 / 438,070 | Pass                      | Reused; transcoded only                              |
| NIRA                        | `NIRA/docs/demo/demo.*`                                 | `/media/nira/`                        | 5:40.008 | VP9/Opus      | H.264/AAC       | 6,433,854 / 5,634,722 / 2,700 / 206,620   | Pass                      | Reused; transcoded only                              |
| Social Media Control Center | `Social-Media-management-/docs/demo/demo.*`             | `/media/social-media-control-center/` | 4:05.368 | VP9/Opus      | H.264/AAC       | 8,560,523 / 7,073,828 / 1,310 / 383,621   | Pass                      | Reused; transcoded only                              |
| Cricket Intelligence API    | `Cricket_chatbot_Backend/docs/demo/demo.*`              | `/media/cricket-api/`                 | 4:20.742 | VP9/Opus      | H.264/AAC       | 4,487,408 / 5,677,538 / 1,203 / 213,334   | Pass                      | Current API walkthrough replaced stale web reference |
| Heart Analysis              | `Heart-Stock-Analysis/docs/demo/demo.*`                 | `/media/heart-analysis/`              | 4:17.488 | VP9/Opus      | H.264/AAC       | 7,140,140 / 6,773,742 / 1,698 / 187,260   | Pass                      | Reused; transcoded only                              |
| Zettalogix                  | `zettalogix-migration-suite/docs/demo/demo.*`           | `/media/zettalogix/`                  | 5:40.008 | VP9/Opus      | H.264/AAC       | 5,063,735 / 8,043,809 / 1,763 / 279,776   | Pass                      | Reused; transcoded only                              |
| WorkHub OS                  | `Work_OS/docs/demo/demo.*`                              | `/media/workhub/`                     | 5:42.728 | VP9/Opus      | H.264/AAC       | 13,451,842 / 10,648,238 / 1,491 / 375,245 | Pass                      | Reused; transcoded only                              |
| Neutro                      | `Neutro/docs/demo/demo.*`                               | `/media/neutro/`                      | 3:15.920 | VP8/Opus      | H.264/AAC       | 4,999,311 / 13,897,506 / 1,760 / 72,853   | Pass                      | Phase 3 narrated release walkthrough                 |
| ShadowOps                   | `shadowops-hackathon/docs/demo/demo.*`                  | `/media/shadowops/`                   | 3:20.970 | VP8/Opus      | H.264/AAC       | 6,091,283 / 13,304,118 / 1,011 / 51,828  | Pass                      | Narrated held-candidate workflow replacement         |
| HYD VNTG                    | `thrifty_vintagegarage/docs/demo/demo.*`                | `/media/hyd-vntg/`                    | 3:03.120 | VP8/Opus      | H.264/AAC       | 4,962,016 / 11,684,036 / 1,294 / 428,569 | Pass                      | Phase 3 narrated v1.0.0 workflow replacement         |
| ParkAlert                   | `Parking-Alert-/docs/demo/demo.*`                       | `/media/parkalert/`                   | 3:08.615 | VP8/Opus      | H.264/AAC       | 4,017,449 / 8,952,214 / 925 / 62,128      | Pass                      | Narrated held-candidate workflow replacement         |
| Cricket Web poster          | `Cricket_chatbot_frontend/docs/demo/demo-thumbnail.png` | `/media/cricket-web/poster.png`       |      n/a | n/a           | n/a             | 154,863                                   | Pass                      | Poster retained; outdated web recording not promoted |

At Phase 2 close, the portfolio, Neutro, ShadowOps, HYD VNTG, and ParkAlert recordings were silent source captures with caption files; Phase 2 did not invent narration or create replacement recordings. The later authorized serial project program replaced Neutro and HYD VNTG after their released workflows changed, then replaced ShadowOps and ParkAlert after their held candidate workflows materially changed. The portfolio source remains honestly labeled as silent. Candidate media is public evidence, not a release claim.

## Portfolio image and social-card manifest

All paths below are served from the canonical site. Actual MIME equals expected MIME and every result is HTTP 200 in a fresh logged-out request.

| Public path                                        |   Bytes | Dimensions | MIME            | Purpose/status                                |
| -------------------------------------------------- | ------: | ---------- | --------------- | --------------------------------------------- |
| `/assets/icons/app-icon.svg`                       |   1,193 | vector     | `image/svg+xml` | App icon / Working                            |
| `/assets/icons/favicon.svg`                        |     594 | vector     | `image/svg+xml` | Favicon / Working                             |
| `/assets/projects/cricket-intelligence.png`        | 157,019 | 1280×739   | `image/png`     | Project image / Working                       |
| `/assets/projects/heart-analysis.png`              |  38,389 | 1280×720   | `image/png`     | Project image / Working                       |
| `/assets/projects/hyd-vntg-storefront.png`         | 428,569 | 1280×720   | `image/png`     | Project image / Current v1.0.0 poster         |
| `/assets/projects/neutro.png`                      |  72,853 | 1280×720   | `image/png`     | Project image / Current v0.6.0 poster         |
| `/assets/projects/nira.png`                        | 221,185 | 1280×640   | `image/png`     | Project image / Working                       |
| `/assets/projects/niyamguard.png`                  | 243,767 | 1280×640   | `image/png`     | Project image / Working                       |
| `/assets/projects/parking-alert.png`               |  62,128 | 1280×720   | `image/png`     | Project image / Current held-candidate poster |
| `/assets/projects/shadowops.png`                   |  51,828 | 1280×720   | `image/png`     | Project image / Current held-candidate poster |
| `/assets/projects/social-media-control-center.png` | 231,642 | 1280×640   | `image/png`     | Project image / Working                       |
| `/assets/projects/workhub-os.png`                  | 445,445 | 1280×720   | `image/png`     | Project image / Working                       |
| `/assets/projects/zettalogix-migration-suite.png`  | 125,847 | 1280×720   | `image/png`     | Project image / Working                       |
| `/assets/social/cricket-intelligence.png`          | 342,472 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/heart-analysis.png`                | 332,390 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/home.png`                          | 355,384 | 1200×630   | `image/png`     | Homepage social card / Working                |
| `/assets/social/hyd-vntg-storefront.png`           | 341,306 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/neutro.png`                        | 330,931 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/nira.png`                          | 309,328 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/niyamguard.png`                    | 330,461 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/parking-alert.png`                 | 333,407 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/recruiter.png`                     | 334,986 | 1200×630   | `image/png`     | Recruiter social card / Working               |
| `/assets/social/shadowops.png`                     | 339,726 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/social-media-control-center.png`   | 340,628 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/workhub-os.png`                    | 333,662 | 1200×630   | `image/png`     | Case social card / Working                    |
| `/assets/social/zettalogix-migration-suite.png`    | 341,494 | 1200×630   | `image/png`     | Case social card / Working                    |

The HYD VNTG card previously used a 1280×6541 full-page image inside a fixed frame. Phase 2 replaced it with the then-existing 1280×720 poster without recording or generating a screenshot. The later authorized v1.0.0 workflow replacement supplied the current inspected 1280×720 poster.

## GitHub README thumbnails and playback targets

| Public repository             | Thumbnail source                          | Click target                         | Direct media links         | Status                                          |
| ----------------------------- | ----------------------------------------- | ------------------------------------ | -------------------------- | ----------------------------------------------- |
| `jashwanth-portfolio`         | `docs/demo/demo-thumbnail.png`            | Portfolio MP4                        | MP4, WebM, VTT             | Working                                         |
| `NiyamGuard`                  | `docs/demo/demo-thumbnail.png`            | `/work/niyamguard/`                  | MP4, WebM, VTT             | Working                                         |
| `NIRA`                        | `docs/demo/demo-thumbnail.png`            | `/work/nira/`                        | MP4, WebM, VTT             | Working                                         |
| `social-media-control-center` | `docs/demo/demo-thumbnail.png`            | `/work/social-media-control-center/` | MP4, WebM, VTT             | Working                                         |
| `cricket-chatbot-api`         | `docs/demo/demo-thumbnail.png`            | `/work/cricket-intelligence/`        | MP4, WebM, VTT             | Working                                         |
| `cricket-chatbot-web`         | `docs/demo/demo-thumbnail.png`            | `/work/cricket-intelligence/`        | Current API MP4, WebM, VTT | Working; stale web video disclosed              |
| `heart-analysis`              | `docs/demo/demo-thumbnail.png`            | `/work/heart-analysis/`              | MP4, WebM, VTT             | Working                                         |
| `zettalogix-migration-suite`  | `docs/demo/demo-thumbnail.png`            | `/work/zettalogix-migration-suite/`  | MP4, WebM, VTT             | Working                                         |
| `workhub-os`                  | `docs/demo/demo-thumbnail.png`            | `/work/workhub-os/`                  | MP4, WebM, VTT             | Working                                         |
| `Neutro`                      | `docs/demo/demo-thumbnail.png`            | `/work/neutro/`                      | MP4, WebM, VTT             | Working                                         |
| `shadowops-hackathon`         | Candidate `docs/demo/demo-thumbnail.png`  | `/work/shadowops/`                   | MP4, WebM, VTT             | Working; candidate PR #2 remains unmerged        |
| `hyd-vntg-storefront`         | `docs/demo/demo-thumbnail.png`            | Repository MP4                       | MP4, WebM, VTT, case study | Working                                         |
| `parkalert-india`             | Candidate `docs/demo/demo-thumbnail.png`  | `/work/parking-alert/`               | MP4, WebM, VTT             | Working; candidate PR #3 remains unmerged        |

The profile README uses case-study playback plus direct same-origin MP4/WebM/VTT links for highlighted and verification-held systems. No README or profile video link uses `/blob/`, raw GitHub media, localhost, a Windows path, or a private repository.

### Held-candidate checksums

| Project | Asset | SHA-256 |
| --- | --- | --- |
| ParkAlert | MP4 | `f21ec16fa77844cc1574e16e2a5ef0d1a1469f10b05c3e757302d4ee86b06fa3` |
| ParkAlert | WebM | `f1867c757369fa419c35b8e4967cc2a68c368b6a6d2d9497f6e94b6c29005bfb` |
| ParkAlert | captions | `781e3386fda39ea0bf87e3c7b5cdf5ec29d1414967a32ad595897ecb8bba2eba` |
| ParkAlert | poster | `4b72a9e9c9525deeacf1034fadc50d20cf7357dc45a5cb48f6a1e52956c06dbe` |
| ShadowOps | MP4 | `981802c890571f6775056723c7aa9380d17f503b9f61560513e4778fe3c15caa` |
| ShadowOps | WebM | `8ce0d43ff32496da1f41094e3717c25abac306059cea47f50e90ec49cbc11998` |
| ShadowOps | captions | `b20be52b6dcd61651e3eb1b836307c02680085232404fa4210b327e9c49544ed` |
| ShadowOps | poster | `d2c2b468ee0ecd63ec3d6bf0a94257923577334e95a452ff413a2a0e05b43fb1` |

## GitHub release media

| Repository / release               | Media asset count | Current MP4 | GitHub API MIME | Logged-out download response                | Use                      |
| ---------------------------------- | ----------------: | ----------- | --------------- | ------------------------------------------- | ------------------------ |
| NiyamGuard v1.1.0                  |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| NiyamGuard v1.0.2                  |                 3 | No          | Correct         | HTTP 200, forced `application/octet-stream` | Historical download      |
| NiyamGuard v1.0.1                  |                 3 | No          | Correct         | HTTP 200, forced `application/octet-stream` | Historical download      |
| NIRA v0.5.0                        |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| NIRA v0.4.0                        |                 2 | No          | Correct         | HTTP 200, forced `application/octet-stream` | Historical download      |
| Social Media Control Center v1.0.0 |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| Cricket API v1.0.3                 |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Current download package |
| Cricket API v1.0.1                 |                 3 | No          | Correct         | HTTP 200, forced `application/octet-stream` | Historical download      |
| Cricket API v1.0.0                 |                 3 | No          | Correct         | HTTP 200, forced `application/octet-stream` | Historical download      |
| Heart Analysis v1.0.0              |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| Zettalogix v0.3.0                  |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| WorkHub OS v1.1.0                  |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| Neutro v0.6.0                      |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |
| HYD VNTG v1.0.0                    |                 4 | Yes         | Correct         | HTTP 200, forced `application/octet-stream` | Download only            |

GitHub release assets retain correct API metadata (`video/mp4`, `video/webm`, `text/vtt`, `image/png`) but GitHub's logged-out release CDN deliberately serves attachments as `application/octet-stream`. They are retained as downloadable release evidence and are not used for inline playback, captions, posters, or README thumbnails.

## Tracked documentation screenshots

These remain source evidence rather than active portfolio media. Each raw image below was checked logged out for HTTP 200, correct image MIME, and non-zero bytes.

| Repository                  | Tracked `docs/` images | Disposition                                                                         |
| --------------------------- | ---------------------: | ----------------------------------------------------------------------------------- |
| cricket-chatbot-api         |                     13 | Terminal/demo verification evidence retained                                        |
| cricket-chatbot-web         |                      2 | Overview and historical demo poster retained                                        |
| heart-analysis              |                     16 | Overview, audit, and demo frames retained                                           |
| jashwanth-portfolio         |                     13 | Existing desktop/mobile/case-study evidence retained; no new capture                |
| Neutro                      |                      2 | Overview and demo poster retained                                                   |
| NIRA                        |                     27 | Overview, social, design, and demo evidence retained                                |
| NiyamGuard                  |                     19 | Overview, social, recording, and demo evidence retained                             |
| parkalert-india             |                      0 | Default branch has no tracked documentation images; portfolio delivery is canonical |
| shadowops-hackathon         |                      2 | Overview and demo poster retained                                                   |
| social-media-control-center |                     38 | Overview, workflow, audit, social, and demo evidence retained                       |
| hyd-vntg-storefront         |                      2 | Overview and demo poster retained                                                   |
| workhub-os                  |                     33 | Overview, workflow, audit, and demo evidence retained                               |
| zettalogix-migration-suite  |                     20 | Overview, design, and demo evidence retained                                        |

## Removed or demoted delivery paths

| Previous state                       | Finding                                   | Final action                                                   |
| ------------------------------------ | ----------------------------------------- | -------------------------------------------------------------- |
| Portfolio raw GitHub WebM            | HTTP 200 but `application/octet-stream`   | Replaced with same-origin MP4/WebM sources                     |
| Portfolio raw GitHub VTT             | HTTP 200 but `text/plain`                 | Replaced with same-origin `text/vtt`                           |
| Profile `/blob/` demo links          | GitHub HTML wrapper, not direct media     | Replaced with case-study and direct same-origin links          |
| Repository thumbnail → relative WebM | GitHub-rendered/download behavior varies  | Thumbnail now opens verified case study; direct formats listed |
| Cricket Web recording                | Older than current API/web release state  | Removed from active playback; current API walkthrough used     |
| HYD VNTG 1280×6541 card image        | Severe crop in fixed desktop/mobile frame | Existing 1280×720 poster reused                                |
| Release assets as inline source      | CDN forces generic attachment MIME        | Retained for download only; never used inline                  |
