# No CMS: project and site content live in static data files

Pinnacle Construction won't edit content themselves; they contact the developer for any changes. With ~50 projects and no self-service editing requirement, content lives as JavaScript/JSON data files in the repo instead of a headless CMS or database. This avoids backend/hosting cost and complexity that would otherwise buy nothing. If self-service editing becomes a requirement later, migrating ~50 projects' worth of structured content and media references into a CMS is a real migration, not a toggle.

---

**Superseded by [ADR 0004](./0004-sanity-headless-cms.md).** The client asked for self-service editing, which is the trigger this ADR anticipated.
