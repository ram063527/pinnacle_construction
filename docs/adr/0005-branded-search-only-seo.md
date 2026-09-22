# SEO scope is branded search, not ranking

The client asked for "SEO", which usually means ranking for terms like "3 BHK flats in Manish Nagar". On questioning, what he actually wants is for the site to appear when someone searches "pinnacle construction nagpur". That is branded search, and it is a far smaller problem.

Ranking for non-branded local terms is a marketing retainer: Google Business Profile, local citations on JustDial and 99acres, locality landing pages, backlinks, and months of waiting. We are not doing that work and it is not in scope. We considered building locality landing pages and a blog to support it, and dropped both once the goal narrowed.

What we build instead: `app/sitemap.js` generated from the CMS project list, `app/robots.js`, `metadataBase` and Open Graph tags so WhatsApp link previews render (most of this client's leads arrive that way), Organization and LocalBusiness JSON-LD carrying the Nagpur address and phone, and per-project meta title and description as CMS fields defaulting to the project name and description.

The new site launches on the existing domain, thepinnacleconstruction.in, rather than a new one. The old site already ranks for the branded query; a new domain would start from zero and compete with the old site until it was taken down. Any old URLs that change get 301 redirects.

Google Business Profile is the highest-impact item for this goal and is not code. We are telling the client to set it up under his own Google account and are not owning it. Verification is a postcard to the Nagpur office and takes one to two weeks, so it needs to start well before launch.

Consequence: if the client later expects to rank for non-branded terms, that is a new engagement, priced monthly. This ADR exists so that conversation starts from a written scope rather than an assumption.
