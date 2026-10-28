/* =============================================================
   Vibefolio Route — page logic
   Reads the lists in content.js, builds the forms, saves answers
   in this browser, and fills the prompts from prompts.js.

   How it fits together:
   - `state` holds every answer. It is saved to localStorage.
   - Form fields carry data-bind="path.in.state". Typing in one
     updates state, saves, and refreshes the progress and prompts.
   - render…() functions write each step's form into its
     placeholder <div> in index.html.
   ============================================================= */


/* ---------- Small helpers ---------- */

const $ = selector => document.querySelector(selector);

// Make text safe to put inside HTML
function esc(text) {
  return String(text ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Trimmed text; lists become "a, b, c"
function clean(value) {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(", ");
  return String(value ?? "").trim();
}


/* ---------- Saved answers ---------- */

const STORAGE_KEY = "vibefolio-route-v4";

function emptyState() {
  return {
    agent: "",
    checks: {},
    style: {
      name: "", role: "", audience: [], audienceNote: "", love: "", feelings: [],
      customColors: false, steerOpen: false,
      bg: "#F7F4EE", fg: "#183153", accent: "#C46D43",
      font: "agent", layout: "agent", hero: "agent", theme: "agent", motion: "agent",
    },
    resume: { paste: "", extra: "" },
    work: { links: "", notes: "", permission: false },
    review: {},
    fixes: ["", "", ""],
    edits: {},      // prompts the student edited by hand, by prompt id
  };
}

// Copies saved values over the defaults, so new fields keep their defaults
function mergeInto(base, saved) {
  for (const key in saved) {
    const both = saved[key] && base[key] && typeof saved[key] === "object" && typeof base[key] === "object"
      && !Array.isArray(saved[key]) && !Array.isArray(base[key]);
    if (both) mergeInto(base[key], saved[key]);
    else base[key] = saved[key];
  }
  return base;
}

let state = emptyState();
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) state = mergeInto(emptyState(), JSON.parse(saved));
} catch (e) { /* storage blocked: the page still works, answers just aren't kept */ }

// Read / write a value by its path, e.g. "style.name" or "fixes.0"
function getAt(path) {
  return path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), state);
}
function setAt(path, value) {
  const keys = path.split(".");
  let obj = state;
  keys.slice(0, -1).forEach((key, i) => {
    if (obj[key] == null || typeof obj[key] !== "object") obj[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    obj = obj[key];
  });
  obj[keys[keys.length - 1]] = value;
}

let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $("#saveState").textContent = "Saved in this browser.";
    } catch (e) {
      $("#saveState").textContent = "This browser can’t save. Use “Back up my answers”.";
    }
  }, 300);
}


/* ---------- Building blocks for forms ---------- */

const fieldId = path => "f-" + path.replace(/\./g, "-");

function textInput(path, placeholder = "", type = "text") {
  return `<input id="${fieldId(path)}" type="${type}" data-bind="${path}" value="${esc(getAt(path))}" placeholder="${esc(placeholder)}">`;
}

function textArea(path, placeholder = "") {
  return `<textarea id="${fieldId(path)}" data-bind="${path}" placeholder="${esc(placeholder)}">${esc(getAt(path))}</textarea>`;
}

function checkbox(path, labelHtml) {
  return `<label class="check"><input type="checkbox" id="${fieldId(path)}" data-bind="${path}" ${getAt(path) ? "checked" : ""}><span>${labelHtml}</span></label>`;
}

// A done-box stored in state.checks under a simple key
const checkItem = (key, labelHtml) => checkbox("checks." + key, labelHtml);

// Cards with a small drawing; pick one
function pictureChoice(path, options, ariaLabel) {
  const current = getAt(path);
  const cards = options.map(([id, label, description]) => `
    <label class="opt">
      <input type="radio" name="${path}" value="${id}" data-bind="${path}" ${current === id ? "checked" : ""}>
      ${path === "style.font" && id !== "agent" ? fontPreview(id) : picture(id)}
      <span class="opt-t">${esc(label)}</span>
      ${description ? `<span class="opt-d">${esc(description)}</span>` : ""}
    </label>`).join("");
  return `<div class="opts" role="radiogroup" aria-label="${esc(ariaLabel)}">${cards}</div>`;
}

// Tags; pick any number. The value is a list.
function tagChoice(path, options, ariaLabel) {
  const current = getAt(path) || [];
  const tags = options.map(option =>
    `<button type="button" class="chip" data-chip="${path}" data-value="${esc(option)}" aria-pressed="${current.includes(option)}">${esc(option)}</button>`).join("");
  return `<div class="chips" role="group" aria-label="${esc(ariaLabel)}">${tags}</div>`;
}

// Tags; pick one
function tagRadio(path, options, ariaLabel) {
  const current = getAt(path);
  const tags = options.map(([id, label]) =>
    `<label class="chip"><input class="sr" type="radio" name="${path}" value="${id}" data-bind="${path}" ${current === id ? "checked" : ""}>${esc(label)}</label>`).join("");
  return `<div class="chips" role="radiogroup" aria-label="${esc(ariaLabel)}">${tags}</div>`;
}

// One question block: title, optional hint, then its input(s).
// When the block is a single text box, the title becomes its <label>,
// so screen readers announce the question when the box gets focus.
function question(title, body, hint = "", needed = false) {
  const forId = body.match(/^<(?:input|textarea) id="([^"]+)"/)?.[1];
  const tag = forId ? `label for="${forId}"` : "p";
  return `<div class="q">
    <${tag} class="q-l">${esc(title)}${needed ? '<span class="req">needed</span>' : ""}</${tag.split(" ")[0]}>
    ${hint ? `<p class="hint">${hint}</p>` : ""}
    ${body}
  </div>`;
}

// A small label above an input
const labelled = (label, inputHtml) => `<label class="field"><span>${esc(label)}</span>${inputHtml}</label>`;

const link = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;


/* ---------- Step 0: setup ---------- */

const SETUP_CHECKS = ["setup-github", "setup-vscode", "setup-desktop", "setup-agent", "setup-new", "setup-publish", "setup-open"];

function renderStep0() {
  const agent = AGENTS[state.agent];
  const agentOptions = Object.entries(AGENTS).map(([id, a]) => [id, a.name, a.account]);
  const agentHelp = agent
    ? `<div class="tip"><span>In VS Code: ${esc(agent.install)}. Install it and sign in. ${link(agent.url, "Official setup guide")}</span></div>
       ${checkItem("setup-agent", "My AI agent is installed and I’m signed in")}`
    : "";

  $("#s0").innerHTML =
    question("1. Install the tools",
      checkItem("setup-github", `Create a free GitHub account at ${link("https://github.com/signup", "github.com/signup")}`) +
      checkItem("setup-vscode", `Install ${link("https://code.visualstudio.com/download", "Visual Studio Code")}`) +
      checkItem("setup-desktop", `Install ${link("https://desktop.github.com/", "GitHub Desktop")} and sign in with your GitHub account`)) +

    question("2. Choose one AI agent",
      pictureChoice("agent", agentOptions, "AI agent") + agentHelp,
      "Any of these works, and so does another coding agent that can read and create files in your folder. Everything on this page works the same way with all of them.") +

    question("3. Create your portfolio folder",
      checkItem("setup-new", `In GitHub Desktop: <strong>File → New repository</strong>. Name it <span class="mono">portfolio</span>, then <strong>Create repository</strong>`) +
      checkItem("setup-publish", `Click <strong>Publish repository</strong>. Untick “Keep this code private” when you’re ready to go public`) +
      checkItem("setup-open", `Click <strong>Repository → Open in Visual Studio Code</strong>`)) +

    `<p class="hint">Never paste passwords, API keys, your home address or private client information into your agent or your site.</p>`;
}


/* ---------- Step 1: style ---------- */

function renderStep1() {
  const s = state.style;

  const ideaTags = INSPIRATIONS.map(idea =>
    `<button type="button" class="chip" data-inspiration="${esc(idea)}">${esc(idea)}</button>`).join("");

  const colorTools = !s.customColors ? "" : `
    <div class="swatches">
      ${PALETTES.map(([name, bg, fg, accent]) => `
        <button type="button" class="sw" data-palette="${name}" aria-pressed="${s.bg === bg && s.fg === fg && s.accent === accent}">
          <i><b style="background:${bg}"></b><b style="background:${fg}"></b><b style="background:${accent}"></b></i>${name}
        </button>`).join("")}
    </div>
    <div class="pickers">
      ${[["bg", "Background"], ["fg", "Text"], ["accent", "Accent"]].map(([key, label]) => `
        <label class="picker">
          <input type="color" id="color-${key}" data-bind="style.${key}" value="${esc(s[key])}">
          <div><b>${label}</b><code id="hex-${key}">${esc(s[key].toUpperCase())}</code></div>
        </label>`).join("")}
    </div>
    <div class="contrast" id="contrast" aria-live="polite"></div>`;

  $("#s1").innerHTML =
    question("Your name, as it should appear", textInput("style.name", "Alex Chen"), "", true) +

    question("What do you do, in a few words?", textInput("style.role", "Geography student who makes maps"),
      "Your field, your role, or the work you want to be known for.") +

    question("Who is your audience?",
      tagChoice("style.audience", AUDIENCES, "Audience") +
      labelled("Anything to add?", textInput("style.audienceNote", "e.g. they should be able to download my CV easily")),
      "Who will visit your site, and what should they do there? Pick any.") +

    question("What do you love?",
      textArea("style.love", "I love Alphonse Mucha: flowing lines, flowers framing a figure, soft gold and sage green.") +
      `<p class="hint">Need a spark? Tap one to start, then say what you love about it.</p>
       <div class="chips" role="group" aria-label="Ideas">${ideaTags}</div>`,
      "An artist, a film, a place, a season, a hobby, an era. Your agent turns it into a style that is yours: colors, fonts, shapes and layout.",
      true) +

    question("How should it feel? (optional)", tagChoice("style.feelings", FEELINGS, "Feeling"), "Pick up to three.") +

    `<details class="more" id="steer" ${s.steerOpen ? "open" : ""}>
      <summary>Steer the details yourself (optional)</summary>
      <p class="hint" style="margin-block:8px">Skip this and your agent decides everything from what you love.</p>
      ${question("Colors", checkbox("style.customColors", "Use my own colors") + colorTools)}
      ${question("Font style", pictureChoice("style.font", FONT_STYLES, "Font style"))}
      ${question("Layout", pictureChoice("style.layout", LAYOUTS, "Layout"))}
      ${question("Top of the page", pictureChoice("style.hero", HEROES, "Top of the page"))}
      ${question("Light or dark", pictureChoice("style.theme", THEMES, "Theme"))}
      ${question("Motion", pictureChoice("style.motion", MOTIONS, "Motion"))}
    </details>`;

  updateContrast();
}

// WCAG contrast ratio between two hex colors (1 to 21)
function contrastRatio(hexA, hexB) {
  const luminance = hex => {
    let h = (hex || "#000").replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const n = parseInt(h, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(channel => {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [light, dark] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

function updateContrast() {
  const box = $("#contrast");
  if (!box) return;
  const s = state.style;
  const text = contrastRatio(s.fg, s.bg);
  const accent = contrastRatio(s.accent, s.bg);
  // Words and symbols carry the meaning, not just the pill's color
  const textPill = text >= 4.5 ? ["ok", "✓ Easy to read"] : ["bad", "✕ Hard to read"];
  const accentPill = accent >= 4.5 ? ["ok", "✓ Fine for any text"] : accent >= 3 ? ["warn", "! Buttons and big text only"] : ["bad", "✕ Decoration only"];
  box.innerHTML = `
    <p><span class="pill ${textPill[0]}">${textPill[1]} · ${text.toFixed(1)}:1</span>Text on background</p>
    <p><span class="pill ${accentPill[0]}">${accentPill[1]} · ${accent.toFixed(1)}:1</span>Accent on background</p>`;
  for (const key of ["bg", "fg", "accent"]) {
    const hex = $("#hex-" + key);
    if (hex) hex.textContent = s[key].toUpperCase();
  }
}


/* ---------- Step 2: resume ---------- */

function renderStep2() {
  $("#s2").innerHTML =
    question("Paste your whole resume or CV",
      textArea("resume.paste", "Paste everything here. Formatting doesn’t matter."),
      "Open your resume (Word, PDF, Google Docs or LinkedIn), select all, copy, and paste it here.", true) +

    `<div class="tip">
      <span><strong>Not sure what to include?</strong> Anything you’d be happy for a stranger to read. Take what fits you; nobody has all of these.</span>
      <div class="idea-groups">
        ${RESUME_IDEAS.map(([title, ideas]) => `
          <div>
            <b>${esc(title)}</b>
            <ul>${ideas.map(idea => `<li>${esc(idea)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
    </div>` +

    question("Anything to add? (optional)",
      textArea("resume.extra", "What you’re looking for next. Links you want shown. Anything to leave out.")) +

    `<p class="hint">Your agent leaves out phone numbers, home address and birth date by default, and asks before showing contact details. You’ll check every word before it goes live.</p>`;
}


/* ---------- Step 3: projects ---------- */

function renderStep3() {
  $("#s3").innerHTML =
    question("1. Put your work in the assets folder",
      checkItem("assets-find", `In VS Code, right-click the <span class="mono">assets</span> folder and choose <strong>Reveal in File Explorer</strong> (Windows) or <strong>Reveal in Finder</strong> (Mac). No assets folder? Create one inside your portfolio folder.`) +
      checkItem("assets-drop", "Drag in anything that shows your work: screenshots, photos, posters, PDFs, slides"),
      "Messy file names are fine. A sub-folder per project helps but isn’t needed. For videos, add a link below instead.") +

    question("2. Links to your work (optional)",
      textArea("work.links", "https://github.com/alexchen/tree-map\nhttps://youtu.be/…"),
      "One per line: live sites, code, videos, papers.") +

    question("3. Anything your agent should know? (optional)",
      textArea("work.notes", "The tree map was a group project with Jamie and Priya. The flood poster is my favorite. Leave out the class assignment."),
      "Who you worked with, what you’re proudest of, what to leave out.") +

    question("4. Permission",
      checkbox("work.permission", "Everything I put in assets is my own work, or I have permission to show it publicly"), "", true);
}


/* ---------- Step 4: guided review and publishing ---------- */

const PUBLISH_CHECKS = ["publish-commit", "publish-public", "publish-pages", "publish-live"];

function renderStep4() {
  const reviewGroups = REVIEW_PHASES.slice(0, 4).map(([name, hint], phase) => {
    const questions = REVIEW_QUESTIONS.filter(([, , group]) => group === phase).map(([id, text]) => {
      const needsFix = state.review[id] === "fix";
      return `<div class="q">
        <p class="q-l">${esc(text)}</p>
        ${tagRadio("review." + id, [["good", "Looks good"], ["fix", "Needs a fix"]], text)}
        ${needsFix ? labelled("What’s wrong?", textInput("review." + id + "Note")) : ""}
      </div>`;
    }).join("");
    return `<fieldset class="review-stage"><legend>${phase + 1} · ${esc(name)}</legend><p class="hint">${esc(hint)}</p>${questions}</fieldset>`;
  }).join("");
  const fixInputs = [0, 1, 2].map(i =>
    labelled(`Fix ${i + 1}`, textInput("fixes." + i, i === 0 ? "e.g. Headline is too small on phones" : ""))).join("");
  const [lastName, lastHint] = REVIEW_PHASES[4];
  $("#s4").innerHTML = reviewGroups +
    `<fieldset class="review-stage"><legend>5 · ${esc(lastName)}</legend><p class="hint">${esc(lastHint)}</p>` +
    question("Your three most important fixes", `<div style="display:grid;gap:8px">${fixInputs}</div>`, "Most important first.") +
    question("What should NOT change?", textInput("review.keep", "The colors and the project cards")) +
    `</fieldset>`;
}

function renderPublish() {
  $("#pub").innerHTML = `
    <div class="send" style="--c:var(--c4)">
      <p class="eyebrow">Go live</p>
      <h3>Publish on GitHub Pages</h3>
      <ol class="do">
        <li><div><b>Save a version</b>
          ${checkItem("publish-commit", "In GitHub Desktop, write a short summary like “First version”, click <strong>Commit to main</strong>, then <strong>Push origin</strong>")}</div></li>
        <li><div><b>Make it public</b>
          ${checkItem("publish-public", "On github.com open your repository → <strong>Settings</strong>. If it says Private, scroll to the bottom and change visibility to Public")}</div></li>
        <li><div><b>Turn on Pages</b>
          ${checkItem("publish-pages", "Settings → <strong>Pages</strong> → Source: <strong>Deploy from a branch</strong> → Branch: <strong>main</strong>, folder <strong>/(root)</strong> → <strong>Save</strong>")}</div></li>
        <li><div><b>Open your site</b>
          <p class="hint">Wait two or three minutes. Your address appears at the top of the Pages screen. It usually looks like this:</p>
          <p class="url">https://your-username.github.io/portfolio/</p>
          ${checkItem("publish-live", "My site opens, and I tested it on my phone too")}</div></li>
      </ol>
      <details class="more">
        <summary>Something didn’t work? Let’s figure it out.</summary>
        <div class="tip" style="margin-top:8px">
          <p>Getting stuck is a normal part of building—and a good opportunity to practice working with your AI agent. You don’t need to know the technical terms. Start by describing what happened:</p>
          <ul>
            <li>What did you expect to see?</li>
            <li>What do you see instead—a blank page, a 404, or missing images?</li>
            <li>What is your site’s address? Did GitHub show an error message?</li>
          </ul>
          <p>Ask your agent to explain the possible cause in plain words and suggest a plan before making changes. Try the fix, then check the result together.</p>
          <p><strong>You don’t have to solve it alone.</strong> If you’re unsure what to try next, ask in the <a href="https://github.com/cat-grep/vibefolio/discussions" target="_blank" rel="noopener noreferrer">Vibefolio Community ↗</a>. Share what you tried and what happened—your question may help someone else learn, too.</p>
        </div>
      </details>
    </div>`;
}


/* ---------- Step 5: keep growing (optional, inspiration only) ---------- */

const ideaCards = items => `<div class="ideas">${items.map(([title, text]) =>
  `<div class="idea"><b>${esc(title)}</b><p>${esc(text)}</p></div>`).join("")}</div>`;

function renderStep5() {
  const examples = PORTFOLIO_EXAMPLES.map(ex => `
    <a class="example" href="${ex.url}" target="_blank" rel="noopener">
      <span class="shot${ex.image ? "" : " no-image"}">
        ${ex.image ? `<img src="${ex.image}" alt="Screenshot of ${esc(ex.name)}’s portfolio" loading="lazy">` : ""}
        <span class="shot-name" aria-hidden="true">${esc(ex.name)}</span>
      </span>
      <span class="example-tag">${esc(ex.tag)}</span>
      <b>${esc(ex.name)}</b>
      <span class="hint">${esc(ex.why)}</span>
    </a>`).join("");

  $("#s5").innerHTML = `
    <div class="block">
      <h3>Go deeper on your projects</h3>
      <p class="story">Today you showed <em>what</em> you made. The most convincing portfolios also show <em>how</em>: the tools and skills behind each project, who you worked with, and how you kept it all moving. That’s what people remember.</p>
      ${ideaCards(PROJECT_DEPTH)}
      <div class="before-after">
        <div><span class="example-tag">Before</span><p>${esc(DEPTH_EXAMPLE.before)}</p></div>
        <div><span class="example-tag">After</span><p>${esc(DEPTH_EXAMPLE.after)}</p></div>
      </div>
    </div>

    <div class="block">
      <h3>Make it more fun</h3>
      <p class="story">A portfolio can have a personality. Pick one small thing that feels like you.</p>
      ${ideaCards(FUN_IDEAS)}
    </div>

    <div class="block">
      <h3>Get inspired</h3>
      <p class="story">Look for patterns you like, not code to copy. Each site belongs to its creator.</p>
      <div class="examples">${examples}</div>
    </div>

    <div class="block">
      <h3>Keep it growing</h3>
      <p class="story">This is the most enjoyable part. Updating is quick: bring the new content, and let your agent put it together.</p>
      <ol class="grow">${GROW_STEPS.map(step => `<li>${esc(step)}</li>`).join("")}</ol>
    </div>`;
}

// Shows the site name instead of a broken image when a screenshot is missing
document.addEventListener("error", event => {
  if (event.target.matches?.(".shot img")) event.target.closest(".shot").classList.add("no-image");
}, true);


/* ---------- Timings from content.js ---------- */

// Puts each step's time on its "Your turn" badge
function renderTimes() {
  for (const [id, , time] of CHAPTERS) {
    const badge = document.querySelector(`#${id} .turn b`);
    if (badge) badge.textContent = time;
  }
}


/* ---------- "Send to your agent" panels (Steps 1–4) ---------- */

const SEND_STEPS = [1, 2, 3, 4];

// The prompt text: the student's own edit if they made one, otherwise freshly built
function promptText(id) {
  return state.edits[id] != null ? state.edits[id] : PROMPTS[id].build();
}

// What's still empty for a step. Students can send anyway; the agent will ask.
function missingFor(step) {
  const missing = [];
  if (step === 1) {
    if (!clean(state.style.name)) missing.push("your name");
    if (!clean(state.style.love)) missing.push("what you love");
  }
  if (step === 2 && !clean(state.resume.paste)) missing.push("your resume");
  if (step === 3 && !state.work.permission) missing.push("the permission tick");
  if (step === 4 && !state.fixes.some(clean) && !REVIEW_QUESTIONS.some(([id]) => state.review[id])) missing.push("your review answers");
  return missing;
}

const missingHtml = list => `<b>Still missing:</b> ${esc(list.join(", "))}. You can send it anyway; your agent will ask.`;

function sendPanel(step) {
  const id = "step" + step;
  const missing = missingFor(step);
  const edited = state.edits[id] != null;

  return `<div class="send">
    <p class="eyebrow">Send to your agent</p>
    <h3>Now it’s the agent’s turn</h3>
    ${missing.length ? `<p class="missing">${missingHtml(missing)}</p>` : ""}
    <ol class="do">
      <li><div>
        <b>Copy your prompt</b>
        <p class="hint">It already contains everything you chose above.</p>
        <div class="acts">
          <button class="btn big prompt-action" type="button" data-copy="${id}">Copy Step ${step} prompt</button>
          <button class="btn ghost prompt-action" type="button" data-download="${id}">Download as text</button>
        </div>
    <details class="more edit">
      <summary>See or edit the prompt</summary>
      <p class="hint">${edited ? "You edited this prompt, so changes above won’t update it." : "It updates as you change your answers."}</p>
      <textarea id="edit-${id}" data-edit="${id}" spellcheck="false" aria-label="Step ${step} prompt">${esc(promptText(id))}</textarea>
      ${edited ? `<div class="acts"><button class="btn ghost small" type="button" data-action="undo-edit" data-prompt="${id}">Undo my edits</button></div>` : ""}
    </details>
      </div></li>
      <li><div>
        <b>Paste it into your AI agent</b>
        <p class="hint">Open the agent’s chat in VS Code and paste. If it has a plan or ask mode, use that for the plan, then switch to its agent or edit mode so it can build.</p>
      </div></li>
      <li><div>
        <b>Read the plan, then approve</b>
        <p class="hint">Ask for changes in your own words. When it looks right, send exactly this:</p>
        <div class="acts"><button class="btn prompt-action" type="button" data-copy-text="APPROVE PLAN">Copy “APPROVE PLAN”</button></div>
      </div></li>
      <li><div>
        <b>Check the result</b>
        ${CHECKS[step].map((text, i) => checkItem(`${id}-${i}`, esc(text))).join("")}
      </div></li>
    </ol>

  </div>`;
}

function renderSendPanels() {
  for (const step of SEND_STEPS) {
    const box = $("#send" + step);
    const wasOpen = box.querySelector("details.edit")?.open;
    box.innerHTML = sendPanel(step);
    if (wasOpen) box.querySelector("details.edit").open = true;
  }
}

// Lighter update while typing: refresh prompt text and "Still missing" without rebuilding the panels
function refreshSendPanels() {
  for (const step of SEND_STEPS) {
    const box = $("#send" + step);
    const editor = box.querySelector("textarea[data-edit]");
    if (editor && document.activeElement !== editor) editor.value = promptText("step" + step);

    const missing = missingFor(step);
    let note = box.querySelector(".missing");
    if (missing.length && !note) {
      box.querySelector("h3").insertAdjacentHTML("afterend", `<p class="missing"></p>`);
      note = box.querySelector(".missing");
    }
    if (note) {
      if (missing.length) note.innerHTML = missingHtml(missing);
      else note.remove();
    }
  }
}


/* ---------- Route map, side rail and progress ---------- */

// [done, total] for one step, or null for the optional Step 5
function progress(step) {
  const done = keys => keys.filter(key => state.checks[key]).length;
  const stepChecks = n => CHECKS[n].map((_, i) => `step${n}-${i}`);

  if (step === 5) return null;
  if (step === 0) return [done(SETUP_CHECKS), SETUP_CHECKS.length];
  if (step === 4) {
    const keys = [...PUBLISH_CHECKS, ...stepChecks(4)];
    return [done(keys), keys.length];
  }
  // Steps 1–3: the result checks, plus one point when nothing needed is missing
  return [done(stepChecks(step)) + (missingFor(step).length ? 0 : 1), CHECKS[step].length + 1];
}

function renderMap() {
  const stops = [
    ...CHAPTERS.map(([id, name, time], i) => ({ id, number: String(i), name, time, color: `--c${i}` })),
  ];
  // Leave room for the first and last labels inside the SVG viewport.
  const x = i => 80 + i * 840 / (stops.length - 1);

  const lines = stops.slice(0, -1).map((stop, i) =>
    `<line x1="${x(i)}" y1="44" x2="${x(i + 1)}" y2="44" stroke="var(${stop.color})" stroke-width="10" stroke-linecap="round"/>`).join("");

  const circles = stops.map((stop, i) => `
    <a href="#${stop.id}" aria-label="Step ${stop.number}: ${esc(stop.name)}, ${esc(stop.time)}">
      <circle cx="${x(i)}" cy="44" r="20" fill="var(--surface)" stroke="var(${stop.color})" stroke-width="7"/>
      <text x="${x(i)}" y="51" text-anchor="middle" style="font-weight:900;font-size:20px">${stop.number}</text>
      <text x="${x(i)}" y="90" text-anchor="middle" style="font-weight:800;font-size:15px">${esc(stop.name)}</text>
      <text class="sub" x="${x(i)}" y="110" text-anchor="middle" style="font-size:12px">${esc(stop.time)}</text>
    </a>`).join("");

  $("#map").innerHTML = `<svg viewBox="0 0 1000 120" aria-label="Route map">${lines}${circles}</svg>`;
}

let currentStep = 0;

function renderRail() {
  $("#rail").innerHTML = CHAPTERS.map(([id, name, time], i) => {
    const counts = progress(i);
    const finished = counts && counts[0] >= counts[1];
    const status = !counts ? time : finished ? `done · ${time}` : `${counts[0]}/${counts[1]} · ${time}`;
    const classes = [finished ? "done" : "", currentStep === i ? "here" : ""].join(" ");
    return `<li class="${classes}" style="--lc:var(--c${i})">
      <span class="dot"></span>
      <a href="#${id}"${currentStep === i ? ' aria-current="step"' : ""}><b>${i} · ${name}</b><small>${status}</small></a>
    </li>`;
  }).join("");

  // Phone progress bar: the optional Step 5 is left out
  $("#topbar").innerHTML = CHAPTERS.map(([id], i) => {
    const counts = progress(i);
    if (!counts) return "";
    return `<a href="#${id}" style="--lc:var(--c${i})" tabindex="-1"><span style="width:${Math.round(counts[0] / counts[1] * 100)}%"></span></a>`;
  }).join("");
}

// Highlights the step currently in the middle of the screen
function watchScrolling() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const i = CHAPTERS.findIndex(([id]) => id === entry.target.id);
      if (i > -1 && i !== currentStep) {
        currentStep = i;
        renderRail();
      }
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  CHAPTERS.forEach(([id]) => observer.observe(document.getElementById(id)));
}


/* ---------- Copy, download and messages ---------- */

function toast(message) {
  const box = $("#toast");
  box.textContent = message;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { box.textContent = ""; }, 3400);
}

// Copies text; if the browser blocks it, selects the text so the student can press Ctrl+C
async function copyText(text, successMessage, fallbackTextarea) {
  try {
    await navigator.clipboard.writeText(text);
    toast(successMessage);
  } catch (e) {
    if (fallbackTextarea) {
      fallbackTextarea.closest("details").open = true;
      fallbackTextarea.focus();
      fallbackTextarea.select();
      toast("Copy was blocked. The text is selected: press Ctrl+C (or ⌘C).");
    } else {
      toast("Copy was blocked. Type it instead.");
    }
  }
}

function downloadText(filename, text) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast(`Downloaded “${filename}”.`);
}


/* ---------- Reacting to changes ---------- */

// Called after any answer changes
function onChange(path) {
  save();

  if (["style.bg", "style.fg", "style.accent"].includes(path)) {
    updateContrast();
    const s = state.style;
    document.querySelectorAll("[data-palette]").forEach(button => {
      const [, bg, fg, accent] = PALETTES.find(p => p[0] === button.dataset.palette);
      button.setAttribute("aria-pressed", s.bg === bg && s.fg === fg && s.accent === accent);
    });
  }
  if (path === "style.customColors") {
    renderStep1();
    $("#f-style-customColors")?.focus();
  }
  if (path === "agent") {
    renderStep0();
    renderSendPanels();
    renderPublish();
    document.querySelector('input[name="agent"]:checked')?.focus();
  }
  if (REVIEW_QUESTIONS.some(([id]) => path === "review." + id)) {
    renderStep4();   // shows or hides the "What’s wrong?" box
    document.querySelector(`input[name="${path}"]:checked`)?.focus();
  }
  renderRail();
  refreshSendPanels();
}

// Typing, ticking and choosing
document.addEventListener("input", event => {
  const editor = event.target.closest("[data-edit]");
  if (editor) {
    const id = editor.dataset.edit;
    state.edits[id] = editor.value;
    save();
    const details = editor.closest("details");
    details.querySelector(".hint").textContent = "You edited this prompt, so changes above won’t update it.";
    if (!details.querySelector('[data-action="undo-edit"]')) {
      editor.insertAdjacentHTML("afterend",
        `<div class="acts"><button class="btn ghost small" type="button" data-action="undo-edit" data-prompt="${id}">Undo my edits</button></div>`);
    }
    return;
  }

  const field = event.target.closest("[data-bind]");
  if (!field) return;
  if (field.type === "radio" && !field.checked) return;
  setAt(field.dataset.bind, field.type === "checkbox" ? field.checked : field.value);
  onChange(field.dataset.bind);
});

// Buttons
document.addEventListener("click", event => {
  const target = event.target;

  const tag = target.closest("[data-chip]");
  if (tag) {
    const path = tag.dataset.chip;
    const list = (getAt(path) || []).slice();
    const index = list.indexOf(tag.dataset.value);
    if (index > -1) list.splice(index, 1);
    else list.push(tag.dataset.value);
    setAt(path, list);
    tag.setAttribute("aria-pressed", index === -1);
    onChange(path);
    return;
  }

  const idea = target.closest("[data-inspiration]");
  if (idea) {
    const box = $("#f-style-love");
    const name = idea.dataset.inspiration;
    const current = clean(state.style.love);
    if (!current.includes(name)) {
      state.style.love = (current ? current + "\n" : "") + `I love ${name}: `;
      box.value = state.style.love;
      onChange("style.love");
    }
    box.focus();
    box.setSelectionRange(box.value.length, box.value.length);
    return;
  }

  const palette = target.closest("[data-palette]");
  if (palette) {
    const [, bg, fg, accent] = PALETTES.find(p => p[0] === palette.dataset.palette);
    Object.assign(state.style, { bg, fg, accent });
    for (const key of ["bg", "fg", "accent"]) {
      const picker = $("#color-" + key);
      if (picker) picker.value = state.style[key];
    }
    onChange("style.bg");
    return;
  }

  const copyButton = target.closest("[data-copy]");
  if (copyButton) {
    const id = copyButton.dataset.copy;
    copyText(promptText(id), "Copied. Paste it into your AI agent.", document.getElementById("edit-" + id));
    return;
  }

  const copyLiteral = target.closest("[data-copy-text]");
  if (copyLiteral) {
    copyText(copyLiteral.dataset.copyText, "Copied “APPROVE PLAN”. Paste it after you’ve read the plan.");
    return;
  }

  const downloadButton = target.closest("[data-download]");
  if (downloadButton) {
    const id = downloadButton.dataset.download;
    downloadText(PROMPTS[id].file, promptText(id));
    return;
  }

  const actionButton = target.closest("[data-action]");
  if (!actionButton) return;
  switch (actionButton.dataset.action) {
    case "undo-edit":
      delete state.edits[actionButton.dataset.prompt];
      save();
      renderSendPanels();
      break;
    case "backup":
      downloadText("vibefolio-answers.json", JSON.stringify(state, null, 2));
      break;
  }
});

// Remember whether "Steer the details yourself" is open
document.addEventListener("toggle", event => {
  if (event.target.id === "steer") {
    state.style.steerOpen = event.target.open;
    save();
  }
}, true);

// "Restore answers" from a backup file
$("#restore").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = mergeInto(emptyState(), JSON.parse(reader.result));
      renderAll();
      save();
      toast("Answers restored.");
    } catch (e) {
      toast("That file isn’t a Vibefolio backup.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
});


/* ---------- Start ---------- */

function renderAll() {
  renderMap();
  renderStep0();
  renderStep1();
  renderStep2();
  renderStep3();
  renderStep4();
  renderPublish();
  renderStep5();
  renderTimes();
  renderSendPanels();
  renderRail();
}

renderAll();
watchScrolling();
