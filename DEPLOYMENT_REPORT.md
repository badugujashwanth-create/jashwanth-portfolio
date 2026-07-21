# Deployment report

Verified: 21 July 2026 (Asia/Calcutta)

Production URL: `https://jashwanth-portfolio-ten.vercel.app`.

Vercel built all 18 static routes/pages from merged `main` without secrets. Portfolio reconciliation PR #11 merged as `46f5f93`; its Vercel deployment completed and promoted the new ParkAlert and ShadowOps candidate evidence. Playback-verifier PR #12 merged as `6c22c1d` after all CI, dependency, secret-scan, and Vercel preview checks passed.

Post-deploy verification covered all 75 canonical image/video/caption assets: every request returned HTTP 200, the native expected MIME type, and a non-zero body while logged out. Chrome desktop, Edge desktop with WebGL disabled, and throttled Pixel 7 emulation each loaded, sought, played, captioned, and contained all 11 case-study players. The forced dual-source failure retained the visible recovery path and four direct links.

The production ParkAlert MP4 is 4,017,449 bytes (`video/mp4`) and the ShadowOps MP4 is 6,091,283 bytes (`video/mp4`), confirming that the prior 55-second edge-cached files were replaced. Both remain portfolio-hosted candidate evidence; neither source repository is deployed or released.

GitHub remains connected to the Vercel project for branch-aware builds. The deployed responses retain the configured Content Security Policy and `X-Frame-Options: DENY`.
