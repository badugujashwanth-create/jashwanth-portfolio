# Content model

Each project record is validated by Zod and contains:

- identity: slug, display name, order, status, categories, technology, theme
- framing: short description, problem, target user, solution, contribution
- engineering evidence: architecture, workflow, decisions, challenge, tests, security notes
- honesty boundaries: limitations and roadmap
- evidence links: primary/secondary repositories, verified live demo and video where available, poster
- navigation: featured flag and related-project slugs

The site intentionally has one content source rather than separate homepage, recruiter, and case-study copy. Tests validate unique slugs, exactly six featured projects, valid relationships, safe URLs, and schema completeness. Claims must remain supported by public repository artifacts; absent resume and personal information remain absent.
