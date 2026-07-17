# Design system

“Systems in Motion” uses a dark operational canvas, high-contrast near-white text, restrained violet/cyan accents, large editorial headings, monospace evidence labels, and project-specific signatures. The visual grammar is nodes, paths, state pulses, grids, and bounded glow—not a generic card dashboard.

Spacing and type are fluid with `clamp()`, layouts collapse at 900px and 640px, and controls keep a minimum practical touch target. Focus rings use a visible cyan outline. Motion is explanatory and short; it never gates text or navigation. Reduced-motion mode disables scroll transforms and substitutes a static system view. Print removes navigation and decorative layers and keeps recruiter evidence readable.

Project accent values live alongside project content, while global color, surface, type, spacing, radius, and easing tokens live at the top of `app/globals.css`.
