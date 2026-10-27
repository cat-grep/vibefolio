/* =============================================================
   Vibefolio Route — content you can edit
   Wording, option lists and checklists shown on the page.
   Step titles and intro stories live in index.html; step times are
   set below. The prompt text lives in js/prompts.js.

   Option lists use the shape:  [id, label, optional description]
   Keep the id unchanged if you only want to change what people see.
   ============================================================= */


/* ---------- Timeline ---------- */
// The one place to change timings: the route map, the side rail and each
// step's "Your turn" badge all read from here.
// Times are estimates to refine after a test run. Steps 2 and 3 depend on
// how much material a student already has.
// [section id in index.html, short name (matches each step's label), time]
const CHAPTERS = [
  ["ch0", "Setup", "10–30 min"],
  ["ch1", "Your style", "10–20 min"],
  ["ch2", "About you", "10+ min"],
  ["ch3", "Your projects", "10+ min"],
  ["ch4", "Review and publish", "30+ min"],
  ["ch5", "Keep it growing", "anytime"],
];


/* ---------- Step 0: AI agents ---------- */
// Examples students can pick from. The rest of the page and every prompt
// are agent-neutral, so adding or removing one here is all it takes.
const AGENTS = {
  claude: {
    name: "Claude Code",
    account: "Claude Pro/Max/Team/Enterprise/Console (The free plan doesn’t include it)",
    install: "Extensions → search “Claude Code”",
    url: "https://code.claude.com/docs/en/vs-code",
  },
  codex: {
    name: "Codex",
    account: "ChatGPT Free/Go/Plus/Pro/Business/Enterprise/Healthcare/Education",
    install: "Extensions → search “Codex”",
    url: "https://learn.chatgpt.com/docs/codex/ide",
  },
  copilot: {
    name: "GitHub Copilot Chat",
    account: "Uses your GitHub account (Copilot Free works).",
    install: "Extensions → search “GitHub Copilot”, then open the Chat view",
    url: "https://code.visualstudio.com/docs/copilot/setup",
  },
};


/* ---------- Step 1: style ---------- */

// Tags under "Who is your audience?"
const AUDIENCES = ["Recruiters", "Hiring managers", "Grad school committees", "Clients", "Collaborators", "Friends and family"];

// Tap-to-start ideas under "What do you love?"
const INSPIRATIONS = [
  "Alphonse Mucha",
  "Studio Ghibli",
  "Bauhaus posters",
  "Japanese woodblock prints",
  "A rainy night in Tokyo",
  "Botanical illustrations",
  "90s video games",
  "Mid-century travel posters",
  "Old field notebooks",
  "Scandinavian interiors",
];

const FEELINGS = ["Calm", "Warm", "Bold", "Playful", "Elegant", "Minimal", "Dreamy", "Technical", "Friendly", "Mysterious"];

// Optional "Steer the details" choices. The first option always lets the agent decide.
const AGENT_DECIDES = ["agent", "Let the agent decide"];

// [name, background, text, accent]
const PALETTES = [
  ["Clay",   "#F7F4EE", "#183153", "#C46D43"],
  ["Harbor", "#F4F7F8", "#102A43", "#0B7285"],
  ["Forest", "#F3F6F1", "#1F2D24", "#2F7D4F"],
  ["Ink",    "#FAFAFA", "#111418", "#3B5BDB"],
  ["Night",  "#12161C", "#E6E9EE", "#F2B43C"],
  ["Blush",  "#FFF7F5", "#3D1F2B", "#C2255C"],
];

const FONT_STYLES = [
  AGENT_DECIDES,
  ["sans", "Clean sans-serif"],
  ["serif", "Classic serif"],
  ["editorial", "Serif titles, sans text"],
  ["mono", "Technical monospace"],
  ["rounded", "Soft rounded"],
];

const LAYOUTS = [
  AGENT_DECIDES,
  ["cards", "Cards"],
  ["editorial", "Editorial", "One calm column"],
  ["split", "Split screen"],
  ["magazine", "Magazine"],
];

const HEROES = [
  AGENT_DECIDES,
  ["text", "Text only"],
  ["portrait", "Portrait"],
  ["abstract", "Abstract graphic"],
  ["image", "Project image"],
];

const THEMES = [
  AGENT_DECIDES,
  ["light", "Light"],
  ["dark", "Dark"],
  ["auto", "Automatic", "Follows the visitor’s device"],
];

const MOTIONS = [
  AGENT_DECIDES,
  ["none", "None", "Calm and still"],
  ["subtle", "Subtle", "Gentle hover and fade-in"],
  ["expressive", "Playful", "Noticeable motion"],
];


/* ---------- Step 2: resume ---------- */
// "Not sure what to include?" — grouped so industry, academic and student
// backgrounds all see themselves. [group title, list of ideas]
const RESUME_IDEAS = [
  ["Work and industry", [
    "Jobs, internships, part-time work and freelance projects",
    "Products, tools or reports you helped make",
    "Certifications and licenses",
    "Clients or partners (only with permission)",
  ]],
  ["Research and teaching", [
    "Research projects, labs and fieldwork",
    "Publications, preprints and posters",
    "Conference talks, invited lectures and seminars",
    "Teaching, TA work, guest lectures and mentoring",
    "Grants, fellowships and reviewing",
  ]],
  ["Students and early career", [
    "Degree, major, minor and expected graduation",
    "Courses you took that relate to the work you want",
    "Class, capstone or hackathon projects",
    "Volunteering, clubs and student organizations",
    "Workshops, bootcamps or online courses you finished",
  ]],
  ["Everyone", [
    "Skills and tools you can back up with an example",
    "Awards, scholarships and honors",
    "Leadership and community work",
    "Languages you speak",
    "Exhibitions, competitions, media or side projects",
    "Links: LinkedIn, GitHub, Google Scholar, ORCID, personal site",
  ]],
];


/* ---------- Step 4: guided review ---------- */

// Review stages, in order. No time limit: follow each stage at your own pace.
const REVIEW_PHASES = [
  ["First look", "Look at the page as a new visitor. Is your identity and purpose clear?"],
  ["Consistency", "Compare headings, cards, links and buttons across the page."],
  ["Words & links", "Read your content and open every link, image and download."],
  ["Phone & keyboard", "Narrow your browser window, then use Tab and Enter to test navigation."],
  ["Decide & re-test", "Choose your top fixes below. Send the prompt to your agent, approve its plan, then test the changes in your browser."],
];

// [id, question, which phase it belongs to (0–4)]
const REVIEW_QUESTIONS = [
  ["first", "Can someone tell who you are and what you do in five seconds?", 0],
  ["style", "Does it feel like the style you chose?", 0],
  ["same",  "Do fonts, colors, spacing and buttons look consistent?", 1],
  ["words", "Any typos, wrong facts, missing credits or private details?", 2],
  ["links", "Do all links, images, the email and the resume download work?", 2],
  ["phone", "On a narrow phone screen: anything cut off, overlapping or too small?", 3],
  ["keys",  "Can you move through the page with Tab and see where you are?", 3],
];


/* ---------- Step 5: keep growing (optional, inspiration only) ---------- */

// "Go deeper on your projects": what's worth adding to each project. [title, description]
const PROJECT_DEPTH = [
  ["The story", "Why you started, what was hard, what surprised you."],
  ["Your role", "What you did yourself, and what you led or coordinated."],
  ["Tools and skills", "The software, methods and languages you used, and what you learned along the way."],
  ["Working with people", "Who you worked with, how you split the work and kept it moving. Credit them by name."],
  ["Working with AI", "Where an AI agent helped, and where your own judgment made the difference."],
  ["Behind the scenes", "Sketches, drafts, rejected ideas, field photos, before-and-after."],
  ["The result", "What changed, who used it, what you’d do next. Real facts only."],
];

// A short before/after to show what "going deeper" looks like. Fictional example.
const DEPTH_EXAMPLE = {
  before: "Flood Risk Map — a web map of flood zones.",
  after: "Flood Risk Map — I turned twenty years of county flood records into a map planners can search by street. I cleaned the data in Python, built the map in JavaScript, and met two city planners every week to test it with them. Priya designed the legend; I used an AI agent to draft the first layout, then rebuilt the search after the planners found it confusing.",
};

// "Make it more fun": ideas, not instructions. [title, description]
const FUN_IDEAS = [
  ["Timeline", "Your path so far, as a journey inside About"],
  ["Light/dark switch", "Let visitors pick a mood"],
  ["Gentle motion", "Soft entrances and hovers that feel alive"],
  ["Image gallery", "Click a picture to see it big, with captions"],
  ["Writing", "A few short posts, notes or reflections"],
  ["Easter egg", "A tiny hidden surprise for curious visitors"],
  ["Mini game", "A small playable experiment about your work"],
  ["Interactive map", "Where your projects or fieldwork happened"],
];

// "Get inspired": real portfolios, for patterns rather than code.
// image: a screenshot saved in images/examples/ (about 1440×900, under 300 KB).
// Without the file, the card shows the name instead.
const PORTFOLIO_EXAMPLES = [
  { name: "Eugenie Huang", url: "https://cat-grep.com/", image: "images/examples/cat-grep.png",
    tag: "Portfolio with Easter eggs", why: "Explore my portfolio and find ideas for telling your story." },
  { name: "Brittany Chiang", url: "https://brittanychiang.com/", image: "images/examples/brittany-chiang.png",
    tag: "Clear and focused", why: "Experience and projects you can take in at a glance." },
  { name: "Josh W. Comeau", url: "https://www.joshwcomeau.com/", image: "images/examples/josh-comeau.png",
    tag: "Writing as a portfolio", why: "Playful, interactive explanations show how he thinks." },
  { name: "Lynn Fisher", url: "https://lynnandtonic.com/", image: "images/examples/lynn-fisher.png",
    tag: "Keeps evolving", why: "She redesigns her site regularly, so it grows with her." },
  { name: "Robby Leonardi", url: "http://www.rleonardi.com/interactive-resume/", image: "images/examples/robby-leonardi.png",
    tag: "Resume as a game", why: "A side-scrolling game tells his career story." },
  { name: "Bruno Simon", url: "https://bruno-simon.com/", image: "images/examples/bruno-simon.png",
    tag: "Fully immersive", why: "Drive a little car through a 3D world to find his work. Advanced, but fun to see what’s possible." },
];

// "Keep it growing": the update routine
const GROW_STEPS = [
  "Put new files in assets/, or write a few lines about what’s new",
  "Tell your AI agent what’s new, and to follow portfolio-notes.md",
  "Read its plan, say APPROVE PLAN, check the result",
  "Commit and Push origin. Your live site updates in a few minutes",
];


/* ---------- "Check the result" boxes in each send panel ---------- */
const CHECKS = {
  1: [
    "The plan made sense, and I said APPROVE PLAN",
    "index.html opens in my browser (double-click it)",
    "I see Home, Projects and About with placeholders",
    "Saved a version: GitHub Desktop → Commit to main",
  ],
  2: [
    "I corrected the plan’s text before approving, and the result has no invented facts",
    "No phone number, home address or birth date on the site",
    "Saved a version: Commit to main",
  ],
  3: [
    "Each project’s title, role and text are right (no “(guess)” left)",
    "Every link and image works, and collaborators are credited",
    "Saved a version: Commit to main",
  ],
  4: [
    "My top fixes are done",
    "I re-tested each fix in the browser",
    "Saved a version: Commit to main",
  ],
};
