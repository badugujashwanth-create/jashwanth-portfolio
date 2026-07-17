# Accessibility report

Verified on 18 July 2026:

- Lighthouse accessibility: 100 on the optimized homepage and recruiter route after the accessible-name fix
- Axe Playwright scan: no serious or critical findings on homepage and recruiter route
- Keyboard: first-tab skip link and primary CTA focus verified
- Reduced motion: static visual and all featured content verified
- Forced WebGL failure: static system and project content verified
- Responsive: desktop and Pixel 7 route/navigation coverage
- Recruiter page: no canvas, printable layout
- Video: controls, poster, and English captions included

The animation originally reduced parent opacity enough to lower effective button contrast; the reveal now changes translation only. The visible `JB/SYS` monogram is now included in its accessible name. Manual assistive-technology and zoom checks remain before claiming full conformance.
