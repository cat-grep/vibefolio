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
- Turn my inspiration into a visual language: color palette (with HEX), typography, shapes or ornament, layout rhythm and motion. In the plan, say which part of the inspiration each choice comes from.
- Make it original and respectful: evoke the feeling, but do not copy artworks, logos or copyrighted images. Draw any decoration with CSS or inline SVG.
- Readability comes first: body text contrast at least 4.5:1, a plain readable font for body text, and decoration never covers content.
- If a web font really matters for the style, you may suggest up to two (for example from Google Fonts) with a system-font fallback. Ask me in the plan; don't add them until I approve.
- Create index.html, style.css, script.js (only if needed), an assets/ folder, and portfolio-notes.md describing the style and my inspiration so it stays consistent later.
- Put clear placeholders "About coming in Step 2" and "Projects coming in Step 3". No fake content.
- The plan should show: the style idea in 3–5 sentences, the palette, the fonts, the sections, how it looks on phone and laptop, and the list of files.

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
- Choose what is worth showing on a portfolio and group it clearly. Do not dump everything onto one long page.
- Fit the sections to my path: for industry, lead with experience and results; for academia, include research, publications, talks and teaching; if I'm a student with little work experience, show relevant courses, class projects and volunteering so the page doesn't feel empty.
- Use only facts from my resume. Where it supports it, write lines as "did X, measured by Y, by doing Z". Never add numbers, dates or titles that aren't there.
- Privacy by default: do NOT publish phone numbers, home address, birth date, ID numbers, or references' contact details. Contact goes inside About.
- In the plan, show the actual text you will put on Home and About, and list exactly which contact details you intend to show, so I can correct it before you build.
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
- Pick a project layout that fits my site's style (cards, a list, or one featured project) and say why.
- Don't rename, move, delete or edit my files without asking. If images are very large, tell me how to make them smaller.
- Use lazy loading and descriptive alt text. If a project has no good image, use a styled text card, never a fake screenshot.
- In the plan, list the projects with your draft text so I can correct it before you build.
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
