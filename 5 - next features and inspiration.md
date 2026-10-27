# Vibefolio — 5. What's next?

Your first portfolio is live. You do **not** need to add every feature. Pick **one idea that better tells your story**, then improve it in a small, reviewable change.

## Real portfolio inspiration

- [Brittany Chiang](https://brittanychiang.com/) — developer portfolio with scannable work, concise experience, and selective highlights. **Borrow the clarity**, not the exact layout.
- [Bruno Simon](https://bruno-simon.com/) — an immersive interactive 3D portfolio that *demonstrates* creative coding skill. This is **advanced**, not a four-hour requirement.
- [Josh W. Comeau](https://www.joshwcomeau.com/) — writing and interactive explanations can be the portfolio, not just an extra page.
- [Lynn Fisher](https://lynnandtonic.com/) — playful personal experiments and a site that evolves over time.
- [Figma portfolio inspiration](https://www.figma.com/resource-library/portfolio-website-examples/) — examples of project storytelling, case studies and strong visual hierarchy.

Links are external examples; layouts and media remain their creators' intellectual property. Explore and identify *patterns* you like, rather than copying source code or artwork.

## Feature menu — pick one

| Idea | Example outcome | Effort | Guideline |
|---|---|---|---|
| Easter egg | Typing a secret word reveals a tiny message | Small | Keep it optional; never obscure navigation |
| Timeline | An interactive career journey inside About | Small–medium | Always leave text accessible without JavaScript |
| Motion | Gentle entry or hover transitions | Small | Respect `prefers-reduced-motion` |
| Image gallery | Click an image to see details/captions | Medium | Keyboard support, Escape to close |
| Project case study | Explain problem, constraints, your decisions, outcome | Medium | Stronger than collecting more thumbnails |
| Behind the scenes | Sketches, rejected approaches, iterations, lessons | Medium | Credit teammates and preserve confidentiality |
| Photo journal / album | Share fieldwork, design process or events | Medium | Compress images; get consent |
| Writing / personal posts | Notes on learning, tools, research, reflections | Medium | Start with static posts, no CMS required |
| Blog archive | Topics, timestamps, article pages | Medium | Static HTML is enough for a handful of posts |
| Mini game | A small on-page playable experiment | Advanced | No dependency or accessibility regressions |
| Interactive map | Explore project locations or geo-data | Advanced | Consider privacy, external tile/map services and licensing |
| Theme switcher | Light/dark design | Medium | Maintain contrast and preference behavior |

## How to tell a better project story

Use a small **case study** framework instead of only “I built X.”

**Situation:** Who had a problem? What was the context?

**Challenge:** What was hard or constrained?

**My contribution:** What did *you* actually do? Credit collaborators.

**Decision & tradeoff:** Why did you choose one approach over another?

**Result:** What changed? Link evidence; do not invent numbers.

**Reflection:** What would you improve next time?

### Short example

> A city team needed to understand where street-tree maintenance was overdue. I cleaned location data and built a searchable map; teammates led field collection. We prioritized readable symbols over a complex animation because staff needed to find assets quickly. The tool made the inventory easier to explore; I have no verified time-saving figure to report. Next, I'd test the interface with field crews.

## Reusable AI prompts (adapt and run one at a time)

### 1. Add a thoughtful Easter egg

> Read my current HTML/CSS/JS and style document. Propose a subtle, optional Easter egg that fits my professional identity. First explain the trigger, accessibility, how to disable it, and the exact files you will change. Wait for my approval before coding. Keep navigation and mobile performance intact. No npm.

### 2. Make an About timeline

> Using only my verified dates and positions from Step 2, propose an accessible timeline within About. Never invent events. Give me the layout and mobile fallback before you implement. Do not add a new navigation tab.

### 3. Tell the story behind one project

> Read my Step 3 project notes. Draft a case study using Situation → Challenge → My Contribution → Decisions → Result → Reflection. Clearly mark missing facts as questions. Do not publish the draft or claim measurements I did not provide. Once approved, add it to the existing Projects section.

### 4. Create a photo journal

> From the images I provide and have rights to publish, propose a lightweight gallery with captions, dates (if known) and descriptive alt text. Compress or resize only if tools are available; otherwise explain what I should prepare. Show a draft and wait for approval.

### 5. Add writing or a blog

> Propose a simple static writing section linked from About or Projects without adding a top-level nav item by default. Start with 1–2 sample article outlines based only on my supplied topics. Avoid a CMS, backend, or build step. Show the information architecture and publishing workflow first.

### 6. Add animation or a mini game

> Propose one optional interaction that supports my personal story. Analyze mobile performance, keyboard access, reduced motion, load time, and maintenance cost. Offer a CSS/vanilla-JS option first. Wait for approval before implementation.

## Keep your site alive

- After a new project: update Step 3 → ask your AI agent to revise Projects → review → commit → push.
- After a career change: update Step 2 → refresh Home and About → verify dates and links.
- Every few months: check broken links, mobile layout, permissions, accessibility, and missing image alt text.
- Keep your `.txt` guides as editable source material; never assume AI-written website content is automatically correct.

**Course motto:** The first release is the beginning, not the final version.
