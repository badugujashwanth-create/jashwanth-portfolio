# Test report

Local release verification on 18 July 2026, Windows, Node 22:

- ESLint: passed with zero warnings
- TypeScript `--noEmit`: passed
- Vitest: 4 files, 13 tests passed
- V8 unit/component coverage: 23.35% statements, 27.39% branches, 19.67% functions, 19.82% lines
- Next.js static build: passed, 18 generated routes/pages
- Playwright: 13 passed, 1 intentionally skipped desktop instance of a mobile-only test
- Browsers represented: desktop Chromium and Pixel 7 emulation
- Axe: no serious or critical findings on homepage and recruiter route
- Link checker: zero broken internal or critical evidence links in the verified build

Coverage percentage is not presented as broad application coverage: browser tests carry the route, fallback, keyboard, responsive, and content assertions. CI repeats lint, types, unit tests, build, links, and browser tests.
