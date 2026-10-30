# Polly Gon Portfolio Notes

## Style direction

The site uses an original “field guide from a lost game cartridge” visual language. The playful, mysterious feeling now comes from combining a warm botanical-paper background with ink-blue text, soft cream panels, antique gold, fern green, and berry accents. 90s video games inspired the compact status labels, panel borders, pixel-adjacent corner details, scanline texture, navigation language, and restrained floating motion. Botanical illustrations inspired the leaf shapes, contour-line map drawing, compass, and natural color palette.

## Readability rules

- Body text uses an installed system sans-serif stack so the site works offline and on GitHub Pages.
- Ink-blue text on the light paper background and navy text on parchment were selected for strong contrast.
- Focus states use arcade gold and are visible for keyboard users.
- Motion is disabled when the visitor prefers reduced motion.
- Inline SVG is used for the decorative map so no third-party or copyrighted artwork is needed.

## Layout rhythm

The home section introduces Polly and the resume first. Projects and About follow as clearly separated field-guide entries. On phones the layout is one column with large tap targets; on wider screens the hero becomes a two-column composition and the About content becomes a note-plus-contact layout.

## Content boundaries

The current page only uses the provided information:

- Name: Polly Gon
- Madison, WI
- University of Wisconsin–Madison B.S. Geography, Cartography & GIS emphasis
- Expected May 2028; Junior; GPA 3.67/4.00
- Dean’s List: Fall 2025, Spring 2026
- GIS & Grounds Planning Intern at the Campus Parks & Planning Office, May 2026–Present
- Server & Closing Shift Lead at The Wandering Fork Café, Aug 2024–Present
- Geography Club Events & Map Night Coordinator
- Volunteer Mapper at an OpenStreetMap Mapathon
- Public email: polly.gon@wisc.edu
- Public GitHub: https://github.com/polly-gon
- Audience: recruiters, hiring managers, and graduate school committees

The phone number is intentionally not published.

## Resume details represented on the site

The Projects section includes all three selected projects from the resume:

- Where Should I Cry During Finals? / Campus Comfort Atlas — Spring 2026
- The Great Madison Cheese-Curd Accessibility Study — Fall 2025
- Campus Tree Canopy & Heat Exposure Map — Spring 2025

The About section preserves the resume's experience bullets, complete relevant coursework list, Geography Club and OpenStreetMap involvement, technical skills, and stated interests. Resume humor is retained where it appears in the supplied text.

The phone number remains private. Contact shows only Madison, WI, the public email address, and the confirmed public GitHub URL.

## Project assets

The `assets/` folder contains three approved PNG images, and the Projects section uses each one with a relative path and lazy loading:

- `assets/campus_comfort_atlas.png` shows the Campus Comfort Atlas, including comfort scores, highlighted campus locations, and supporting photographs. It is labeled Spring 2026.
- `assets/cheese_curd_accessibility.png` shows walking access to cheese-curd restaurants, 10- and 20-minute catchments, and late-night food deserts. It is labeled Fall 2025.
- `assets/tree_canopy_heat_exposure.png` shows tree canopy coverage and land-surface temperature across campus-adjacent neighborhoods. It is labeled Spring 2025.

The project layout uses one featured project and two supporting cards. The Campus Comfort Atlas is featured because its image includes the clearest combination of map, place labels, and supporting visuals. Each project is a compact clickable card. Clicking or pressing Enter/Space opens an accessible modal with the full image and project details; clicking the close button, the backdrop, or pressing Escape closes it and returns focus to the card.

The PNG files were not renamed, moved, deleted, edited, or optimized.
