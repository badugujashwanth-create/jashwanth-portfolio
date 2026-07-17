# Security review

Scope: this portfolio repository and its static deployment boundary.

Controls reviewed:

- no authentication, form submission, analytics, cookies, database, or server API
- no runtime secrets required
- production dependency audit reports zero vulnerabilities
- secret scan included in CI; local staged scan required before release
- CSP restricts default, media, image, connection, frame, base, and form sources
- `X-Content-Type-Options`, strict referrer policy, denied camera/microphone/geolocation, frame denial
- external links opening new tabs use `noreferrer`
- project claims disclose simulation, health, provider, and production limitations
- dependency audit, secret scan, and pull-request dependency review workflows

Residual risks: external GitHub raw-media availability, third-party dependency compromise, deployment-account configuration, and the limited protection offered by headers if the deployment platform does not apply `vercel.json`. The CSP currently permits inline scripts/styles required by the statically exported Next.js runtime; a nonce/hash policy would be stronger but needs platform-specific integration.
