/* =============================================================
   Vibefolio Route — the prompts students copy into their agent
   Each step's prompt = shared RULES + the student's answers
   + what to do in this step + the shared WORKFLOW.
   Edit the wording freely; keep the ${...} parts, which insert
   the student's answers.
   ============================================================= */


/* ---------- Shared pieces ---------- */

const RULES = `RULES FOR THIS PROJECT (always follow)
- Build ONE personal portfolio website in the folder I have open. Do not create a new folder or project elsewhere.
- Three sections: Home, Projects, About. Contact goes inside About. Use one page with anchor links unless you have a strong reason.
- Plain HTML + CSS + optional vanilla JavaScript only. No React, npm, build step, backend or package manager.
- It must work by double-clicking index.html (no local server) and on GitHub Pages. Use relative paths only.
- Mobile-first, keyboard accessible, visible focus, alt text on images, readable contrast, respect reduced motion.
- NEVER invent facts: no made-up jobs, degrees, dates, numbers, awards, quotes or links. If something is missing, ask me.
- No third-party libraries, trackers or downloaded fonts unless I approve them first.
- Do not commit, push or publish. I do that myself.
- I am a beginner: explain briefly in plain words, without jargon.`;

const WORKFLOW = `HOW WE WORK
1. First reply with a short PLAN only. Do not create or change any files yet.
2. End the plan with questions about anything missing or unclear.
3. Wait until I reply "APPROVE PLAN". Then do exactly the approved plan.
4. When you finish, list the files you changed and tell me what to check in the browser.`;

// Steps 2–4 start with this, so the agent picks up where Step 1 left off.
const CONTINUE = `Continue my portfolio in this folder. First read index.html, style.css and portfolio-notes.md so you know the current site and my brief.`;

// "- Label: answer", or a fallback when the answer is empty
function line(label, value, fallback = "not given — ask me") {
  return `- ${label}: ${clean(value) || fallback}`;
}

// The label of a chosen option, or "" when the student left it to the agent
function chosenLabel(options, id) {
  if (!id || id === "agent") return "";
  const option = options.find(o => o[0] === id);
  return option ? option[1] : "";
}


/* ---------- Step 1: style ---------- */

function styleDetails() {
  const s = state.style;
  const lines = [];
  if (clean(s.feelings)) lines.push(`- Feeling: ${clean(s.feelings)}`);
  if (s.customColors) {
    lines.push(`- Colors I chose: background ${s.bg.toUpperCase()}, text ${s.fg.toUpperCase()}, accent ${s.accent.toUpperCase()}`
      + ` (text contrast ${contrastRatio(s.fg, s.bg).toFixed(1)}:1; accent contrast ${contrastRatio(s.accent, s.bg).toFixed(1)}:1)`);
  }
  const picks = [
    ["Font style", FONT_STYLES, s.font],
    ["Layout", LAYOUTS, s.layout],
    ["Top of the page", HEROES, s.hero],
    ["Theme", THEMES, s.theme],
    ["Motion", MOTIONS, s.motion],
  ];
  for (const [label, options, id] of picks) {
    const chosen = chosenLabel(options, id);
    if (chosen) lines.push(`- ${label}: ${chosen}`);
  }
  return lines.length ? lines.join("\n") : "- Nothing. Decide everything from my inspiration.";
}

function promptStep1() {
  const s = state.style;
  return `You are my portfolio designer and front-end developer.

${RULES}

ABOUT ME (for now)
${line("Name shown on the site", s.name)}
${line("What I do", s.role, "not given — use a neutral placeholder and ask me")}
${line("My audience", [...s.audience, s.audienceNote], "not given — ask me who will visit")}

WHAT I LOVE (my style inspiration)
${clean(s.love) || "Not given — ask me what I love before you design anything."}

DETAILS I CHOSE (everything else is up to you)
${styleDetails()}

THIS STEP: create an original style from what I love, and build the first version of my site.
- Put me, the person, at the center of the design. Make my name the primary heading and my role clearly visible near it, so visitors immediately understand whose portfolio this is and what I do. Use the name and role I provided; if either is missing, ask me rather than inventing an identity or biography.
- Build the opening section around my identity and a clear path to my work and About section. Do not make a slogan, inspirational quote, abstract statement or oversized decorative text the main heading or visual focus. A tagline is optional, secondary to my name and role, and must use wording I provide or explicitly approve.
- Treat my style inspiration as a guide for the visual design, not as the subject of the portfolio. Keep the visual hierarchy focused on me and my work; decoration and theme references should support that focus.
- Turn my inspiration into a visual language: color palette (with HEX), typography, shapes or ornament, layout rhythm and motion. In the plan, say which part of the inspiration each choice comes from.
- Make it original and respectful: evoke the feeling, but do not copy artworks, logos or copyrighted images. Draw any decoration with CSS or inline SVG.
- Readability comes first: body text contrast at least 4.5:1, a plain readable font for body text, and decoration never covers content.
- Prioritize comfortable reading sizes from the first version. Use at least 1rem for body text and project descriptions. Keep navigation, buttons, labels and supporting text comfortably readable; do not make important information tiny to create visual hierarchy.
- Give my name and hero heading enough horizontal room. Avoid arbitrary narrow max-width values or forced line breaks that split the heading awkwardly. Allow natural wrapping on smaller screens without clipping, overflow or shrinking the text excessively.
- Set widths according to the content: headings may use the full available container width, paragraphs should keep a comfortable reading line length, and decorative notes may be narrower. Do not apply the same width restriction to every element.
- Keep the hero compact and proportional to its content. Avoid a full-screen minimum height or excessive vertical padding unless I explicitly request it. On a typical laptop, aim to make the beginning of the next section visible without sacrificing readability.
- If the design includes a sticky note or similar decorative text block, keep it compact and roughly square when the content allows. Let it grow naturally for longer text and on smaller screens; never force a fixed height that clips content.
- If a web font really matters for the style, you may suggest up to two (for example from Google Fonts) with a system-font fallback. Ask me in the plan; don't add them until I approve.
- Create index.html, style.css, script.js (only if needed), an assets/ folder, and portfolio-notes.md describing the style and my inspiration so it stays consistent later.
- Keep the files separated by purpose: semantic HTML content and structure in index.html, all styles in style.css, and any vanilla JavaScript behavior in script.js. Link the CSS and load JavaScript with defer using relative paths; do not put CSS, JavaScript, or inline event handlers in the HTML. Inline SVG is fine for decoration.
- Make the code human-readable and easy for a beginner to maintain: use consistent indentation, descriptive class and function names, short focused functions, and clearly organized sections. Do not minify or compress the code. Add brief comments where a decision or behavior needs explanation, without commenting every obvious line.
- Keep the implementation simple: reuse CSS classes, put shared colors, fonts and spacing in clearly named CSS custom properties, and avoid duplicate rules or unnecessary abstractions. In portfolio-notes.md, explain the file structure and where I can edit text, colors, images and interactions.
- Put clear placeholders "About coming in Step 2" and "Projects coming in Step 3". No fake content.
- The plan should show: the style idea in 3–5 sentences, the palette, the fonts, the sections, the exact opening text and how my name and role take priority, how it looks on phone and laptop, and the list of files.

${WORKFLOW}`;
}


/* ---------- Step 2: resume ---------- */

function promptStep2() {
  const r = state.resume;
  const extra = clean(r.extra) ? `\nMORE FROM ME\n${clean(r.extra)}\n` : "";
  return `${CONTINUE}

${RULES}

MY RESUME / CV (pasted as-is)
"""
${clean(r.paste) || "(not pasted yet — ask me to paste it)"}
"""
${extra}
THIS STEP: turn my resume into the Home and About sections, keeping the current design.
- Preserve the wording and details of my resume / CV. Do not rewrite, paraphrase, oversimplify, shorten, merge entries, or replace detailed descriptions with generic summaries. Keep all substantive entries and details, including titles, organizations, dates, responsibilities, achievements, methods, skills, courses, publication citations, talks and teaching when present, except for the private information excluded below.
- Organize the existing content into clear headings and readable lists that fit my path. You may adjust layout, spacing and heading levels, but preserve the text, terminology, qualifications and relationships between entries. Do not silently correct or reinterpret anything; ask me about unclear wording or possible errors.
- Use Home to introduce me using existing wording from my resume, and keep the full substantive resume / CV content accessible in About. If a shorter introduction, an omission, or any wording change would help, show the exact proposed change in the plan and ask for my explicit approval before applying it. Do not invent an introduction if suitable wording is missing.
- Use only facts from my resume. Never add numbers, dates, titles or claims, or reframe descriptions into achievement statements that change the original wording or meaning.
- Privacy by default: do NOT publish phone numbers, home address, birth date, ID numbers, or references' contact details. Contact goes inside About.
- In the plan, show the actual text you will put on Home and About, explain how every resume / CV section maps to the site, and list exactly which contact details you intend to show. Clearly flag any proposed wording changes or omissions for my explicit approval; otherwise preserve the original content.
- Add the public facts to portfolio-notes.md.

${WORKFLOW}`;
}


/* ---------- Step 3: projects ---------- */

function promptStep3() {
  const w = state.work;
  const permission = w.permission
    ? "I confirm everything in assets/ is mine or I have permission to show it."
    : "NOT confirmed — ask me before showing anything.";
  return `${CONTINUE}

${RULES}

MY WORK
- I put my files in the assets/ folder (including any sub-folders).
${line("Links to my work", w.links, "none")}
${line("Notes from me", w.notes, "none")}
- Permission: ${permission}

THIS STEP: organize my work into the Projects section.
- Look at every file in assets/. For each one, say what it seems to show. If you can't open a file type, say so and ask me about it.
- Group the files and links into projects. For each project, draft a title, a one-sentence summary, my role, and which image to show. Mark anything you guessed with "(guess)" so I can fix it.
- Credit collaborators only as I named them. Never invent results, numbers, dates or links.
- Keep the Projects section organized and compact. Choose a layout that fits my site's style (cards, a list, or one featured project), with consistent thumbnail sizes, clear titles and concise previews. Group related material under the same project and avoid oversized cards, excessive empty space, or displaying every image and document in full on the main page. Preserve the supplied details in each project's full view rather than discarding them to save space.
- Create project thumbnails when useful, using the supplied images or a representative page from a supplied PDF. Save any generated previews as separate files in assets/ with descriptive names; preserve the originals. Use consistent aspect ratios and crop carefully so important content stays visible. If you cannot extract a preview, say so and use a simple text-based thumbnail or styled text card. Never invent a project image or fake screenshot.
- If I provide abundant content, detailed PDFs or multiple images, consider a popup (an accessible modal dialog) for each project's full details or gallery. Keep a concise preview on the main page and provide a clearly labeled button to open the details. Preserve supplied descriptions, captions and document links inside the full view; do not silently shorten or omit substantive content.
- For popups, support keyboard navigation, move focus into the dialog when it opens, keep focus inside while open, support Escape and a visible close button, and return focus to the opening button when closed. Make the content scroll within the available screen space on phones and laptops. Provide direct links to open or download original PDFs and images, including a fallback when an embedded PDF cannot be displayed. Keep project content and document links accessible if JavaScript is unavailable.
- Don't rename, move, delete or edit my files without asking. If images are very large, tell me how to make them smaller.
- Use lazy loading for project images and descriptive alt text. Load large images and embedded documents only when needed so previews stay lightweight.
- In the plan, list the projects with your draft preview text, proposed thumbnails and their source files, and where the full details will appear (on the page, in a popup, or through a document link), so I can correct it before you build.
- Add the projects to portfolio-notes.md.

${WORKFLOW}`;
}


/* ---------- Step 4: review fixes ---------- */

function promptStep4() {
  const answers = state.review;
  const problems = REVIEW_QUESTIONS
    .filter(([id]) => answers[id] === "fix")
    .map(([id, question]) => `- ${question} → ${clean(answers[id + "Note"]) || "needs a fix"}`)
    .join("\n");
  const fixes = state.fixes
    .map(clean)
    .filter(Boolean)
    .map((fix, i) => `${i + 1}. ${fix}`)
    .join("\n");

  return `${CONTINUE}

${RULES}

I REVIEWED MY SITE. HERE IS WHAT I FOUND
${problems || "- No specific problems marked."}

MY TOP FIXES, MOST IMPORTANT FIRST
${fixes || "(none listed — check the problems above)"}

DO NOT CHANGE
${clean(answers.keep) || "Anything I didn’t mention."}

THIS STEP: fix what I found with as little change as possible.
- In the plan, list the problems by importance and how you’ll fix each.
- Put correctness, privacy, mobile layout, readability, accessibility and broken links before decoration.
- After changing font sizes, widths or spacing, re-check the surrounding layout on phone and laptop: heading wrapping, paragraph line length, hero height, note proportions and horizontal overflow. If browser testing is unavailable, state that clearly.
- Check that paths work on GitHub Pages (a sub-folder address). If you can’t test in a real browser, say so.
- End with a short checklist I can use to re-test.

${WORKFLOW}`;
}


/* ---------- Registry: prompt id → builder and download file name ---------- */

const PROMPTS = {
  step1: { build: promptStep1, file: "vibefolio-step-1-prompt.txt" },
  step2: { build: promptStep2, file: "vibefolio-step-2-prompt.txt" },
  step3: { build: promptStep3, file: "vibefolio-step-3-prompt.txt" },
  step4: { build: promptStep4, file: "vibefolio-step-4-prompt.txt" },
};
