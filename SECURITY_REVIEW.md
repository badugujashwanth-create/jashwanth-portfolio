# Security review

The static site needs no secrets, server API, authentication, database, analytics, cookies, or form processing. Production dependency audit is clean; security CI covers production audit, secret scanning, and dependency review. Vercel configuration supplies CSP and defensive browser headers. See `docs/SECURITY_REVIEW.md` for residual risks and policy detail.
