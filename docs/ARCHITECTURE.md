# Architecture

## Runtime shape

The portfolio is a Next.js static export. Build time generates the homepage, recruiter page, privacy and system routes, and eleven case-study routes. The deployed site needs no Node server, database, authentication, or private environment variables.

The homepage is progressive enhancement in three layers:

1. Semantic HTML contains the complete identity, project journey, capabilities, process, project index, and contact path.
2. CSS supplies the static system diagram, responsive layout, project signatures, focus treatment, print layout, and reduced-motion behavior.
3. A dynamically imported React Three Fiber scene starts only after capability checks and explicit visitor intent. GSAP adds bounded translate-only ScrollTrigger reveals.

`lib/projects.ts` is the typed content source. Zod validates its runtime shape, and static parameters create each `/work/[slug]` page. `lib/capability.ts` chooses high, medium, low, or static presentation based on WebGL support, motion preference, data-saving preference, device memory, logical processors, and viewport width.

## Routes

- `/` — visual narrative and all-project index
- `/recruiter/` — fast, printable six-project scan with no canvas
- `/work/[slug]/` — evidence-led project case study
- `/privacy/` — explicit data-handling statement
- generated `robots.txt`, `sitemap.xml`, and static 404

## Deployment boundary

`next.config.ts` uses `output: "export"`; `vercel.json` applies security and browser-policy headers. External project videos are referenced from verified public repository media. If those repositories move or raw-media policy changes, the video links may need migration to same-origin assets.
