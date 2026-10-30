# Portfolio notes — Rowan Vale

## Who the site is for
Hiring managers, recruiters and clients. The most important action is **Download Resume**.

## Style idea
Inspired by Alphonse Mucha's Art Nouveau posters, without copying any artwork.
Mucha places one person at the center inside a round halo and a decorative arch frame.
Here, Rowan's name takes that central place. The halo is drawn from **map contour lines**,
so the ornament also says "geography". Projects sit in **arch-topped windows**, like tall panels
in a Mucha series. Ornament stays thin and in the margins; text always sits on calm, plain backgrounds.

## Palette (edit in `style.css`, section 1)
| Name | HEX | Use | From Mucha |
|---|---|---|---|
| Parchment | `#F6EEDC` | page background | aged poster paper |
| Parchment deep | `#EDE1C6` | footer, image frames | paper shadow tones |
| Ink brown | `#2E2A24` | body text | dark outline lines |
| Deep olive | `#3F4A2F` | headings, nav, focus ring | foliage borders |
| Terracotta plum | `#7A3B2E` | main button, links | deep robe reds |
| Muted brown | `#5A5246` | dates, small details | — |
| Antique gold | `#B8893A` | ornament lines only | gilded halos |
| Dusty rose | `#C98E7E` | ornament only | flowers, skin tones |
| Sage | `#9BAE8A` | ornament only | leaves |

All text colors were checked: the lowest contrast is about 5.9:1 (the minimum is 4.5:1).
Gold, rose and sage are **never** used for text.

## Fonts
- Headings: **Marcellus** (Google Fonts, approved), falling back to Palatino / Book Antiqua / Georgia.
- Body: the computer's built-in system font (plain and readable), at least 1rem.

## Layout
- **Opening:** name and role on the left, decorative contour halo on the right. On phones the halo shrinks to a small crest above the name.
- **Projects:** one wide row per project, alternating left/right on laptop; image above text on phones. Newest first.
- **About:** intro paragraphs on the left, experience and skills on the right (stacked on phones).
- **Footer:** Contact details and a second resume link.
- Header stays at the top while scrolling (`position: sticky`).

## File structure — where to edit what
| File | What's in it |
|---|---|
| `index.html` | All text and images. Sections are marked with `========== Name ==========` comments. |
| `style.css` | All styling. **Colors, fonts and spacing are at the top (section 1)**, so change them there. |
| `assets/` | Images and the resume file. |
| `portfolio-notes.md` | This file. |

- **Change text:** edit `index.html`.
- **Change colors or fonts:** edit the variables in `style.css` section 1.
- **Add a project:** copy one `<article class="project">…</article>` block in `index.html`, then change the image path, `width`/`height`, alt text, title, date line and description. Rows alternate sides automatically.
- **Swap the resume:** put the new file in `assets/` and update both links in `index.html` (hero button and footer). If you add a PDF later, also change "(.docx)" in the button text.
- **Interactions:** there is no JavaScript. Smooth scrolling comes from CSS and turns off when the visitor has "reduce motion" enabled.

## Decisions and facts to remember
- All facts come from `assets/rowan_vale_human_geography_resume.docx`.
- GPA and Dean's List are intentionally **not** shown (owner's request).
- Benches project date: **Spring 2026** (from the resume). Note: the poster image itself says "Spring 2025".
- Contact details are demo placeholders (example.com, 555 number); owner approved showing them for this demo.
- Resume is shared publicly as .docx (owner approved).

## Pending / ideas for later
- Replace the demo contact details with real ones before going live.
- Consider a PDF version of the resume for easier opening.
- Optional: a portrait, if one becomes available and fits the style. Don't add a made-up one.
