# August North portfolio

## Direction: Seaside Morning

The design takes its cue from the quiet landscapes, soft skies, and everyday warmth August enjoys in Studio Ghibli. The illustration is an original SVG landscape, with no borrowed characters, logos, or artwork. An arched sky, layered hills, a winding path, and botanical details support August's identity without replacing it as the focus. The airy layout and serif headings evoke an illustrated field journal.

## Palette and type

- Paper background: `#F5F9FA`
- Main text: `#263E4A`
- Teal links and buttons: `#386779`
- Mist blue: `#D4E6ED`
- Sea glass: `#DCEBE4`

Dark ink and teal are used for readable text; pale colors are used as backgrounds and decoration. Main text on the paper background exceeds 4.5:1 contrast, as do teal links and white text on teal buttons. Georgia is the heading font. Segoe UI or Arial is the body font. All fonts come from the visitor's device; there are no external downloads.

## Files and editing

- `index.html`: all text, section structure, links, and the decorative inline SVG. Edit the name, role, and placeholder paragraphs here. Keep the single main heading and section IDs so navigation keeps working.
- `style.css`: all styles. Shared colors, fonts, and spacing live in the `:root` block at the top. Responsive layout rules are near the bottom.
- `assets/august_north_gis_resume.docx`: a copy of the supplied résumé, linked from Home. Replace this file with an updated résumé of the same name, or edit the download link if the filename changes.
- `portfolio-notes.md`: this guide.

Navigation uses ordinary anchor links. `script.js`, loaded with defer, enhances the native expandable project details into modal dialogs; without JavaScript the same details and original-image links remain available. Smooth scrolling is turned off when a visitor requests reduced motion. There are no dependencies, analytics, downloaded fonts, or build tools.

## Content boundaries

The role wording and résumé download were approved. About now contains the complete substantive résumé under Education, Experience, Selected Projects, Leadership & Activities, and Technical & Creative Skills. Entries, dates, descriptions, courses, and skills retain their source wording. Punctuation is displayed normally, as approved. Projects displays the three approved project cards. The project résumé entries also remain accessible in About. Original project images remain untouched; separate JPEG previews are used on the cards.

Contact displays Madison, WI and “Contact details coming soon.” The supplied example email and website are not published as contact links. Phone numbers are excluded from the page. The phone number has also been removed from the downloadable résumé. No other résumé content was changed. The downloaded document retains the supplied example email and website.

## Browser checks

Open `index.html` directly in a browser. Check the Home, Projects, About, and Back to top links; download and open the résumé. Resize to phone and laptop widths and check that text wraps naturally without sideways scrolling. Press Tab to follow the visible focus outlines, including the Skip to content link. The artwork is decorative and hidden from screen readers. The site can also be uploaded as these same files to GitHub Pages; all paths are relative. Nothing has been committed, pushed, or published.


## Approved public résumé text

Education

University of Wisconsin–Madison | B.S. in Cartography & GIS

May 2028

Junior | GPA: 3.74 / 4.00 | Certificate in Digital Studies | Dean’s List (2025)

Relevant Coursework: Introduction to Cartography; GIS & Spatial Analysis; Geovisualization; Urban Geography; Human Geography; Remote Sensing; Graphic Design for Maps; Web Mapping

Experience

Student Mapping Assistant | UW–Madison Campus Planning & Landscape Architecture

Sep 2025–Present

Updated campus paths, public art, benches, and 350+ tree records in ArcGIS Pro; reconciled field notes with existing geodatabases.

Designed a muted-color campus walking map for new students; tested legibility in print and on mobile screens.

Turned scattered facilities spreadsheets into a searchable map, reducing time spent locating assets for campus staff.

Barista & Closing Shift Lead | Paper Lantern Coffee, Madison, WI

Jun 2024–Present

Served 100+ guests on busy shifts, trained four teammates, and kept service steady when the espresso machine had other plans.

Hand-lettered seasonal menus and created a neighborhood coffee crawl map that became a customer favorite.

Volunteer Mapmaker | Neighborhood Arts Collective

Jan–Aug 2025

Mapped 18 small galleries, bookstores, and community murals for a free weekend arts-walk zine.

Selected Projects

The Geography of Almost-First Dates | StoryMap + Field Notes

Spring 2026

Built a narrative map of 24 quiet Madison meeting spots using walkability, sound observations, lighting, and public seating.

Combined original photographs, hand-drawn annotations, and GIS analysis; mapped where romance meets bus schedules.

A Field Guide to Places That No Longer Exist | Web Map + Archive

Fall 2025

Digitized historic Sanborn maps and georeferenced former bookstores, diners, and music venues; designed an interactive before/after map.

One Hundred Ways to Get Lost (Responsibly) | Illustrated Map Zine

Spring 2025

Designed a 16-page risograph-inspired city walking atlas with custom symbols, route sketches, and tiny cartographic footnotes.

Leadership & Activities

Geography Club — Creative Mapping Chair (2025–Present): Hosts monthly map-and-zine nights and a “Maps That Feel Like Poetry” exhibition.

OpenStreetMap / Missing Maps — Volunteer: Contributes building footprints and path edits during student mapathons.

Campus Literary Magazine — Photo & Layout Contributor: Pairs short essays with analogue photos and location sketches.

Technical & Creative Skills

GIS & Data: ArcGIS Pro, QGIS, ArcGIS Online, Mapbox Studio, OpenStreetMap, basic Python, georeferencing, spatial joins

Design & Storytelling: Adobe Illustrator, InDesign, Figma, photography, editorial layout, map typography, field interviewing

Contact

Madison, WI

Contact details coming soon.

## Projects: approved display and structure

August approved displaying all three posters, separate preview images, original-image download links, and the role labels below. No collaborators were named, so none are credited. No live work links were supplied. The map comparison pictured in the archive poster is a static image, not an implemented interactive map.

### The Geography of Almost-First Dates

- Format and date: StoryMap + Field Notes | Spring 2026
- Role: Mapping and visual storytelling
- Preview: Built a narrative map of 24 quiet Madison meeting spots using walkability, sound observations, lighting, and public seating.
- Additional full-view description: Combined original photographs, hand-drawn annotations, and GIS analysis; mapped where romance meets bus schedules.
- Original: `assets/almost_first_dates.png`
- Preview: `assets/almost-first-dates-thumbnail.jpg`

### A Field Guide to Places That No Longer Exist

- Format and date: Web Map + Archive | Fall 2025
- Role: Archival research and web mapping
- Preview and full description: Digitized historic Sanborn maps and georeferenced former bookstores, diners, and music venues; designed an interactive before/after map.
- Original: `assets/places_no_longer_exist.png`
- Preview: `assets/places-no-longer-exist-thumbnail.jpg`

### One Hundred Ways to Get Lost (Responsibly)

- Format and date: Illustrated Map Zine | Spring 2025
- Role: Map and zine design
- Preview and full description: Designed a 16-page risograph-inspired city walking atlas with custom symbols, route sketches, and tiny cartographic footnotes.
- Original: `assets/ways_to_get_lost.png`
- Preview: `assets/ways-to-get-lost-thumbnail.jpg`

### Editing and behavior

Each project is an `article` inside `.project-grid` in `index.html`. Edit its title, preview, role, and full-view content there. All supplied résumé descriptions are preserved in each full view; full original posters preserve their visual annotations and captions. Images are shown without cropping. Thumbnail files are 360 pixels wide, reduced from the supplied PNGs without changing the originals.

`style.css` controls the three-column laptop layout, single-column phone layout, matching thumbnail frames, and scrollable dialogs. `script.js` moves a project's existing detail content into the native dialog and restores it after closing. Close and Escape return focus to the opener; Tab wraps within the dialog, and the background is inert while it is open. Full images are in templates and inserted only when requested. With JavaScript disabled, expandable details include lazy-loaded full images through `noscript`, alongside ordinary open/download links. Unsupported dialog browsers retain expandable details.

Check each View project details control, Tab and Shift+Tab, Escape, Close, focus return, scrolling at phone widths, and original-image open/download links. Disable JavaScript and verify expandable details still reveal the full descriptions and posters. Original source files were not edited, renamed, or moved in this step.