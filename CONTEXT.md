# Pinnacle Construction Website

Marketing and lead-generation site for a construction company: a project catalog, company info, and a site-visit booking flow. Project content, testimonials, team profiles, and contact details are maintained by the client through a hosted CMS. Brand copy (stats, services, mission, vision, story) stays in code.

## Language

**Project**:
A single real estate development marketed on the site (e.g. "Dravin Enclave"). Has one type and one status, and holds zero or more Configurations. RERA number, brochure, renders, and video belong to the Project itself, not to any individual Configuration.
_Avoid_: Property, Listing, Development (as a record name)

**Configuration**:
A unit-type variant within a residential Project (e.g. "2BHK", "3BHK"), each with its own carpet area and floor plan image. Not used for commercial or redevelopment Projects.
_Avoid_: Unit type, Flat type, Variant

**Type**:
The category of a Project: residential, commercial, or redevelopment. Determines whether Configurations apply.
_Avoid_: Category, Kind

**Status**:
The single build stage of a Project: upcoming, ongoing, or completed. A development with genuinely different stages per phase is modeled as separate Projects, one per phase, rather than one Project with mixed status.
_Avoid_: Stage, Phase (as a status value)

**Featured**:
Whether a Project appears in the Home page selection. Chosen deliberately by the client, never derived from Status or from when the Project was added.
_Avoid_: Highlighted, Promoted, Pinned

**Badge**:
An optional marketing label the client attaches to a Project, chosen from a fixed set ("Newly Launched", "Booking Open"). Independent of Status and of Featured: a Project can be featured without a badge, or badged without being featured. Never derived from a date, because a Project added to the catalog years after completion is not newly launched.
_Avoid_: Tag, Label, New

**Render**:
A marketing visualization image of a Project. For a completed Project, the render is the original pre-construction visualization, reused as-is; it is never a photo of the finished building.
_Avoid_: Photo, Image (generically), Rendering

**Floor Plan**:
A diagram image of one Configuration's layout, sourced from the Project's brochure. Only exists for ongoing and upcoming Projects, since completed Projects have no brochure to source it from.
_Avoid_: Layout, Plan

**Brochure**:
The marketing PDF for a Project. Only exists for ongoing and upcoming Projects.
_Avoid_: PDF, Document

**Video Reel**:
A short (around 1.5 minutes) promotional video for a Project, hosted as an unlisted YouTube upload and embedded on the Project's detail page. Only exists for ongoing and upcoming Projects.
_Avoid_: Video, Clip, Reel (alone)

**Landmark Distance**:
The distance from a Project to one nearby place, entered manually as a place name and a figure in kilometres. Four kinds are offered on every Project and each may be left out when it doesn't apply: school, hospital, metro/station, airport. Beyond those, the client may add further entries choosing from a fixed vocabulary of kinds (supermarket, petrol pump, temple, park, college, IT park, bus stand). The kind is always chosen from a list, never typed freely, so every entry has an icon and a label. Figures are the client's own, entered per Project.
_Avoid_: Nearby places, POI, Amenity

**RERA Number**:
A Project's regulatory registration number. Shown as "Coming soon" when the Project isn't yet registered.
_Avoid_: Registration number, License number

**Site Visit Request**:
A submission of the booking form, optionally naming the Project the visitor is interested in. Sent directly to a business email inbox; never stored.
_Avoid_: Booking, Inquiry, Lead

**Team Member**:
A staff profile shown on the About page: name, role, and short bio. Displayed with an initials avatar since no photos exist.
_Avoid_: Employee, Staff

**Testimonial**:
A client quote shown on the Home page: author name and quote text, no photo.
_Avoid_: Review, Client feedback
