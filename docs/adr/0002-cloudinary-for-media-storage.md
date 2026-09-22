# Cloudinary for media storage

Each Project carries several renders, a brochure PDF, floor plan images, and sometimes a video reel link. We considered Amazon S3 but chose Cloudinary instead, and ruled out committing files to the Next.js `/public` folder. Cloudinary gives automatic image optimization and resizing at no cost at this scale, and keeps the git repo free of large binaries without needing a separate CDN/optimization pipeline the way raw S3 would. Media URLs are Cloudinary URLs baked into the project data files, so switching hosts later means updating every reference.

---

**Superseded by [ADR 0004](./0004-sanity-headless-cms.md).** This decision was never carried out: every media reference in `data/projects.js` points at a local path under `public/`, not a Cloudinary URL. Media now lives in Sanity, which handles optimization and transforms itself.
