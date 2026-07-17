# Deployment report

Production URL: `https://jashwanth-portfolio-ten.vercel.app`.

Vercel built all 18 static routes/pages from merged `main` without secrets. Post-deploy checks returned HTTP 200 for the homepage, recruiter route, NiyamGuard case study, sitemap, and robots file. The verified responses include the configured Content Security Policy and `X-Frame-Options: DENY`. GitHub is connected to the Vercel project for subsequent branch-aware builds.
