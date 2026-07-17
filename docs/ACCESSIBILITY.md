# Accessibility design

The complete portfolio is readable and navigable without WebGL or JavaScript animation. It uses landmarks, a first-tab skip link, hierarchical headings, visible labels, native links and buttons, captions on the portfolio walkthrough, descriptive project imagery, keyboard-operable navigation, and visible focus styling.

The capability layer respects `prefers-reduced-motion` and data-saving preferences. A “Skip experience” control immediately locks the homepage to its static state. The recruiter route is canvas-free and print-friendly. Decorative signatures and scene content are hidden from the accessibility tree because their meaning is duplicated in text.

Automated checks combine Lighthouse, axe through Playwright, and keyboard/browser assertions. Automated tools cannot prove usability; manual screen-reader, zoom/reflow, and real-device checks remain listed in `MANUAL_ACTIONS.md`.
