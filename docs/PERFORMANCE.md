# Performance strategy

- Static generation for all routes and no runtime data fetch for core content
- Recruiter route contains no canvas and minimal client behavior
- Three.js scene is dynamically imported only after explicit visitor intent
- Quality tiers bound device pixel ratio, particle count, and scene complexity
- Scene animation pauses when the document is hidden
- Responsive image sizing and generated project posters
- Reduced-motion and failed-WebGL paths avoid the 3D bundle at interaction time
- GSAP reveal changes translation only, preserving text contrast throughout animation

Measured local Lighthouse conditions and raw results are recorded in `docs/PERFORMANCE_REPORT.md`. Local static-server cache headers are intentionally weak; production edge caching should improve repeat navigation.
