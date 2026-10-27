# Vibefolio — 0. Setup, preview & publishing

**Goal:** Turn this same GitHub repository into your published personal portfolio. The starter contains **no website code**. You and your AI coding agent will create it together.

## Before the workshop (about 15–25 minutes)

1. Prepare a GitHub account: https://github.com/signup
2. Install **Visual Studio Code**: https://code.visualstudio.com/download
3. Install **GitHub Desktop**: https://desktop.github.com/ (no terminal required).
4. Set up **one** AI coding agent in VS Code (see *Choose your AI agent* below). Sign in and check your access/usage limits before class.
5. Have a CV/resume, 1–3 project descriptions and links/images ready. **Never put passwords, API keys, home addresses, or confidential client information in the repo or prompts.**

## Choose your AI agent

Any of these works with the guides. Pick the one you already have access to; you only need one.

| Agent | Install in VS Code | Account | Official instructions |
|---|---|---|---|
| **Claude Code** (Anthropic) | Extensions → search **Claude Code** → Install, then open it from the sidebar or the Claude icon | Claude Pro, Max, Team or Enterprise plan, or Anthropic Console account (the free Claude plan does not include Claude Code) | https://code.claude.com/docs/en/vs-code |
| **Codex** (OpenAI) | Extensions → search **Codex** → Install, then open the Codex sidebar | ChatGPT Plus or higher for Codex in VS Code | https://learn.chatgpt.com/docs/codex/ide |
| **GitHub Copilot Chat** (GitHub) | Extensions → search **GitHub Copilot** → Install, then open the Chat view (`Ctrl+Alt+I` / `Cmd+Ctrl+I`) and choose **Agent** mode | Your GitHub account (Copilot Free or a paid plan) | https://code.visualstudio.com/docs/copilot/setup |

Open **Extensions** with `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (macOS). Plans, limits and menu names change over time; follow the official page if the screen looks different.

**Requirements for whichever agent you choose:** it must be able to **read files in your open folder** and **create/edit files** in it. Chat-only tools that cannot see your repository are not enough.

## Start your own repository

1. On the instructor's Vibefolio GitHub repo, select **Use this template → Create a new repository**. Name it `portfolio`, `my-portfolio`, or `<your-username>.github.io`.
2. Choose **Public** if you want GitHub Pages publishing with the standard public repo workflow. You can defer making it public until your content is reviewed.
3. Open GitHub Desktop → **File → Clone repository**, select *your* new repository.
4. In GitHub Desktop choose **Repository → Open in Visual Studio Code**. Open the *folder*, not one isolated file.
5. Follow files `1` to `5` in order. Write answers **directly beneath each question**. You can skip optional questions or write `Ask me`.

## How to work with your AI agent

- Keep the relevant guide open; copy its **SEND TO YOUR AI AGENT** instruction into the agent's chat. The prompts name the files to read (for example: `Read "1 - design brief and first build.txt"`). If your agent supports attaching files, you can also attach them: `@file` in Claude Code and Codex, `#file` or drag-and-drop in Copilot Chat.
- **Plan first, then build.** Every guide asks the agent to write a plan before changing files. Read it, ask questions, and only reply `APPROVE PLAN` when you agree. If your agent has a read-only/plan mode (e.g. **Plan mode** in Claude Code, **Ask/Plan** in Copilot Chat, **Chat** mode in Codex), use it for the plan step and switch back to an editing mode for the build step.
- **Review every edit.** Agents may ask permission before editing files or running commands. Read what they want to do; decline anything that installs packages, deletes guide files, or pushes to GitHub.
- Start a **new chat** for each step if the conversation gets long. The guides and your written answers are the shared memory, so the agent can always re-read them.
- Use GitHub Desktop to **Commit** at milestones, then **Push origin**. Check your changes before pushing public content.
- The site is built into this exact repository. Do not create a new app in another folder or replace the guide files.

## Preview (no Node.js, no npm)

After step 1, open the newly generated `index.html` in your browser. The default approach uses local CSS/JS links so it works by double-clicking. Refresh after modifications. If you later add modules, fetch calls or remote data, browser `file://` restrictions may apply; then optionally install VS Code **Live Server** and select **Open with Live Server**. No npm commands are required.

## Publish the same repository on GitHub Pages

Do this after step 4 and a privacy check:

1. In GitHub Desktop **Commit** your changes and click **Push origin**.
2. On your repository's GitHub webpage: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose **Branch `main` → `/(root)` → Save**. If Pages is unavailable, check your repo visibility and account/org settings.
4. Wait for publication and open the URL shown in Pages settings. For a repo called `portfolio` the usual address is `https://YOUR-USERNAME.github.io/portfolio/`; for a repo named `YOUR-USERNAME.github.io`, it is `https://YOUR-USERNAME.github.io/`.
5. Test Home, Projects, About, every link and images on desktop and mobile. Future updates: Commit → Push; Pages updates the same site.

**If something fails:** Ask your AI agent: `Inspect the repository and explain why this static website fails to load or deploy on GitHub Pages. Fix only what is necessary. Do not add Node.js, npm, a build system, or a backend.`

**Checkpoint:** GitHub, VS Code, GitHub Desktop and your chosen AI agent (Claude Code, Codex or GitHub Copilot Chat) are ready; your copy of the repository is open in VS Code.
