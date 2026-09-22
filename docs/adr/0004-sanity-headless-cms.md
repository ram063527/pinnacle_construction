# Sanity as headless CMS, frontend unchanged

Supersedes ADR 0001 and ADR 0002.

The client asked to add and edit projects himself, which is the exact trigger ADR 0001 named as the thing that would overturn it.

WordPress was the client's own suggestion and we rejected it. Moving to WordPress means discarding this codebase: the GSAP animation work, the Lenis scroll, the page transitions, and the design recorded in DESIGN.md would be rebuilt in PHP templates or abandoned to a theme, and we would take on hosting, security patching, and plugin maintenance. WordPress earns its keep when a client needs to edit page layouts. This client needs to add a record with about a dozen fields.

We also considered a git-backed CMS (Decap, Tina), which would have kept content in version control at zero recurring cost. Rejected because it requires a non-technical client to hold and use a GitHub account, and a publish becomes a commit, which is a support burden that outlives the build.

Sanity keeps the entire Next.js frontend intact. Its free plan covers this comfortably: 100GB assets against roughly 250MB of real usage, 100GB monthly bandwidth, 10,000 documents, 20 seats. It also handles image uploads and transforms, which is what makes client-uploaded media possible at all.

Consequences we accepted:

The Sanity organisation is owned by the client's email with the developer invited as administrator, matching the Vercel project and domain. This costs us convenience and gains the client ownership of their own content.

Publishing reaches the live site through a Sanity webhook hitting an on-demand revalidation route. We rejected time-based revalidation because a client who publishes and sees no change assumes the CMS is broken, and rejected full rebuilds on publish because they burn build minutes on every typo.

The static data files (`data/projects.js`, `data/contact.js`, and the testimonial and team sections of `data/siteContent.js`) are deleted after the migration is verified in production rather than kept as a fallback. Two sources of truth for the same content is how someone eventually edits the wrong one.

Migrating away from Sanity later means re-exporting content and re-uploading every asset. That is a real migration, not a toggle.
