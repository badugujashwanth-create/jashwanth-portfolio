# Performance report

Lighthouse was run against a local production static export on 18 July 2026 using headless Chromium.

| Route | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage, initial implementation | 60 | 96 | 96 | 100 | 1.0 s | 3.6 s | 2,460 ms |
| Homepage, intent-loaded 3D | 96 | 100 | 100 | 100 | 1.0 s | 2.8 s | 30 ms |
| Recruiter | 98 | 100 | 100 | 100 | 0.8 s | 2.2 s | 100 ms |

The main improvement was deferring the Three.js client bundle and canvas until explicit visitor intent. Disabling route prefetch for the static export removed a local-server request error and brought the final best-practices audits to 100. Raw JSON is retained in `docs/assets`.

These are lab results, not field Core Web Vitals. Final CDN behavior and real-device data can differ.
