# StepCode: Python, from noob to master

One course. Lesson page = article (left) + IDE and terminal (right), both splits draggable.
IDE languages: Python and Java only. Interactive (Brilliant-style) mode is announced as "coming soon" and lives under the Python course.

## Stack
React 19 + Vite 6 + React Router 7, CodeMirror 6, react-split. Plain JS/JSX and plain CSS (`src/index.css`). No TypeScript, no Tailwind.
Python runs in the browser: Pyodide 0.26.4 in a Web Worker (`public/py-worker.js`, wrapper `src/utils/pyRunner.js`; streamed output, Stop/timeout restarts the worker, falls back to the server). Java still uses the Express runner in `server/index.js` (`POST /api/run`, local `java File.java`; sandbox before deploying).

## Routes
`/` landing, `/python` course (modules are dropdowns), `/lesson/:moduleId/:index`, `/quiz/:moduleId`, `/project/:moduleId`.

## Content
- `src/data/curriculum.js`: course outline (4 tracks, 22 modules, 115 lesson titles). Titles only.
- `src/content/lessons/<module>/`: one `.md` per lesson (+ `project.md`) and an `index.js` with starters, `quiz`, `project` (starter + Python `checks`).
- `src/content/lessons/index.js` registers modules. Lessons without content show "Coming soon".
- Markdown subset: see `src/components/Markdown.jsx` (callouts `> **Tip:**`, folded `+++ Title ... +++`, ```python error, ```text output).
- Project checks run through `src/utils/checkHarness.js` (helpers: `ns`, `out`, `check`, `close`, `run_with_inputs`).
- `node tools/check-lessons.mjs` runs every snippet and compares it with the output shown in the lesson, and runs project solutions against their checks. Run it after editing lessons.

## Design
Clean modern system (Bricolage Grotesque display, Inter, JetBrains Mono; violet `--brand`, amber only for XP/rewards; thin 1.5px translucent `--edge` borders). Pixel art is gone (sprite files deleted); photo banners stay. Bit is a vector mascot (`art/Bit.jsx`, moods idle/happy/wink/think/read/cheer/sad) and the only guide (`Companion.jsx`, draggable, position saved in localStorage, double-click resets). Brilliant-style rewards: `LevelRing.jsx`, `Reward.jsx` (modal on first lesson/quiz/project completion), streak in `utils/activity.js`. The modern CSS block is at the end of `src/index.css` and overrides older rules.

## Deploy (see DEPLOY.md)
Website on Vercel (`vercel.json`), Java runner on Render (`render.yaml`, `server/Dockerfile`). Python runs in the browser, so only Java needs the runner. `VITE_API_URL` points the site at the runner; the runner limits origins with `ALLOWED_ORIGINS`. Phones (width <= 820px) get lesson tabs Read / Code / Terminal (`IdePanel` `view` prop); Run jumps to Terminal. PWA manifest and icons live in `public/`.

## Commands
`npm run dev` (Vite :3000, runner :3001), `npm run build`.

## Status
Written: Track 1 (modules 1.1-1.6, final project) and Track 2 complete (modules 2.1-2.6, quizzes, projects, final project "Atlas"). Next: Track 3 (module 3.1).

## UI notes
- Layout follows Codédex: hero, "Become a ..." typer, tabs, course grid; course page = chapter timeline (double white/grey `.cx-panel`) + sticky progress sidebar; lesson shell = top bar (XP progress), article | IDE, bottom bar with Back/Next.
- XP drives all progress bars (`src/data/xp.js`): lesson 10, quiz 25, project 50.
- Lessons are paged at `##` headings (`src/utils/pages.js`). Hooks and quick checks are injected from `src/content/lessons/engage.js`.
- Photo art lives in `public/images/` (`home-hero.png`, `python-hero.png`, `python-card.png`, `java-card.png`, optional `web-card.png`). They were downscaled and quantized with PIL, then drawn with `image-rendering: pixelated`.
- Settings gear (`src/components/Settings.jsx`): theme (dark default, cream light) and font size slider (`--fs`, applied with `zoom` to reading panes). Add new settings as rows in `SettingsButton`. `?theme=light` in the URL previews a theme.
- Each track ends with a final project (`/final/track-N`, 100 XP, `src/content/lessons/final-N/`, outlines in `FINALS` in `curriculum.js`). Track 1: The Lost Terminal. Track 2: Atlas (maps engine, `final-2`).
- Banner motion: `src/components/art/Ambient.jsx` layers stepped particles (binary digits, fireflies, waterfall, steam, campfire glow) over the three photos; photos also pan slowly (`kenburns`). Respects `prefers-reduced-motion`.
- Project checks for speed use `timed(name, *args, limit=2.5)` (perf_counter; Pyodide has no SIGALRM) inside the check script; see `m2-1/index.js`.
- Home hero is the editorial one (`HeroArt` floating cards, no pixel scene). Photos (`python-hero.webp`, `java-card.webp`) are full resolution and never pixelated.
