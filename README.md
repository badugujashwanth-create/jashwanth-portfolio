# Jashwanth Badugu — Systems in Motion

An evidence-based software and AI engineering portfolio. The experience maps real project ideas—policy rules, local intelligence, workflow queues, migration state, and grounded data—onto one visual system without making WebGL a requirement.

- Cinematic, progressively enhanced homepage
- Fast, printable `/recruiter` route with six evidence-led projects
- Eleven project case studies with architecture, workflow, testing, security notes, limitations, and video evidence where verified
- Static export, responsive design, reduced-motion support, WebGL fallback, SEO metadata, social cards, and security headers
- Recorded walkthrough with captions, poster, script, and storyboard in `docs/demo`

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

For the production-static path:

```bash
npm run build
npm run start
```

## Verify

```bash
npm run verify
npx playwright install chromium
npm run test:e2e
```

`npm run verify` runs lint, TypeScript, unit/component tests, the static production build, and internal/critical evidence link checks. The browser suite covers desktop and mobile routes, keyboard flow, reduced motion, forced WebGL failure, core project content, and serious/critical axe findings.

## Architecture

Next.js statically generates every route. React Three Fiber is dynamically loaded only after capability checks and explicit visitor intent; the same system and all project evidence exist as semantic HTML and CSS before that enhancement. See [Architecture](docs/ARCHITECTURE.md), [Performance](docs/PERFORMANCE.md), [Accessibility](docs/ACCESSIBILITY.md), and [Content model](docs/CONTENT_MODEL.md).

## Evidence and release records

- [Content audit](portfolio-content-audit.md)
- [Test report](docs/TEST_REPORT.md)
- [Performance report](docs/PERFORMANCE_REPORT.md)
- [Accessibility report](docs/ACCESSIBILITY_REPORT.md)
- [Security review](docs/SECURITY_REVIEW.md)
- [Portfolio walkthrough (WebM)](docs/demo/portfolio-demo.webm) · [Captions](docs/demo/portfolio-demo-captions.vtt) · [Script](docs/demo/DEMO_SCRIPT.md) · [Storyboard](docs/demo/STORYBOARD.md)

## Claims and contact

Project claims are constrained to repository evidence available during the portfolio audit. No resume, employment history, education history, location, private contact address, or production-user claim is invented. The verified public contact path is the linked GitHub profile.

## License status

Copyright is retained; no open-source license has been granted. See [LICENSE_DECISION.md](LICENSE_DECISION.md).
