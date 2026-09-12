# Project instructions

These instructions apply throughout this repository.

## Project and source map

This is Zhao-Guo Wang's personal physics website: a static React + TypeScript application built with Vite and published to GitHub Pages. It uses React Router's `HashRouter` and the HTML5 UP "Read Only" template as its styling foundation.

- `package.json`: available commands; `package-lock.json`: resolved dependency versions. Use npm and keep the lockfile consistent when changing dependencies.
- `src/main.tsx`: React entry point and `HashRouter`.
- `src/App.tsx`: home page, shared layout, and routes for `/about`, `/notes`, `/notes/:slug`, `/resources`, and `/tutor`.
- `src/components/`: page content and shared navigation, theme, and footer components. The external resource directory is maintained inside `Resources.tsx`.
- `scripts/NotesBase.mjs`: editable source of note titles, slugs, summaries, tags, and document links.
- `scripts/generateNotes.mjs`: generates `src/data/Notes.ts`, including its TypeScript types and detected dates. Change the generator if the generated schema must change.
- `src/components/NoteList.tsx` and `NoteDetail.tsx`: note listing, date display, and detail pages.
- `src/styles.css`: custom styling, responsive layouts, and light/dark theme variables.
- `index.html`: document metadata, base template stylesheet, and initial theme application before React loads.
- `public/document/` and `public/images/`: downloadable documents and images. `public/assets/` contains the original template CSS, Sass, fonts, and legacy scripts.
- `vite.config.ts`: development base `/` and production base `/website/`.

Read `README.md` for general workflow, but verify against the current source and package scripts. Some README paths are outdated: the actual names are `scripts/generateNotes.mjs`, `src/data/Notes.ts`, `src/components/NoteList.tsx`, and `src/components/Notes.tsx`. Preserve exact filename and import casing.

## Commands

Run commands from the repository root. In Windows PowerShell, use `npm.cmd`; on other platforms use `npm`.

| Purpose | Command | Behavior |
| --- | --- | --- |
| Install locked dependencies | `npm.cmd ci` | Use when dependencies need installing. |
| Regenerate notes | `npm.cmd run generate-notes` | Rewrites `src/data/Notes.ts`. |
| Local development | `npm.cmd run dev` | Regenerates notes, then starts Vite; use the address it prints. |
| Production build | `npm.cmd run build` | Regenerates notes, runs `tsc -b`, then builds into `dist/`. |
| Preview production output | `npm.cmd run preview` | Serves an existing build; check it under `/website/`. |
| Publish | `npm.cmd run deploy` | Builds, then publishes `dist/` through `gh-pages`. |

Deployment is a publishing action. Run it when the user has requested or already authorized publishing; a local edit or verification task does not by itself call for deployment. Keep source commits and pushes within the user's requested scope.

## Notes and document updates

- Edit `scripts/NotesBase.mjs`, then regenerate. Do not hand-edit `src/data/Notes.ts`.
- Keep slugs unique and stable: they form the public `/notes/:slug` routes. Retain existing URLs unless a change is intentional.
- Put local files in `public/document/` and use hrefs such as `document/Fluid_Mechanics.pdf`. Preserve spaces, Unicode, and case in filenames and links.
- For notes with releases, the highest numeric major/minor version supplies the note's date and primary PDF link. A null latest-release date produces an empty note date; never substitute another release's date or a PDF modification time. For notes without releases, dates come from local filesystem modification times, using `dateSourceHref`, otherwise `href`, otherwise the first link. Missing or external files use `fallbackDate`, or an empty date if none is supplied.
- The generator stores dates as `YYYY/MM/DD`. The UI formats them for readers, sorts notes newest first, and displays an empty date as "In progress".
- Both development and build commands regenerate dates. Inspect resulting changes: file copies or a fresh checkout can change modification times without a content revision. Do not invent dates or silently change the date policy to hide this effect.

## Implementation conventions

- Keep changes focused and preserve unrelated work. Check `git status --short` before editing and review the final diff.
- Follow the existing functional TSX components, strict TypeScript configuration, double quotes, semicolons, and surrounding formatting. Avoid dependency upgrades or broad refactors incidental to a small task.
- Use React Router links for internal navigation and anchors for documents and external destinations. Preserve hash routing and ensure assets work under both `/` in development and `/website/` in production. Avoid origin-root document/image hrefs such as `/document/file.pdf`; use the existing relative convention or Vite's base URL where appropriate.
- Prefer `src/styles.css` for site-specific styles and reuse `--site-*` variables. Preserve responsive behavior, keyboard focus visibility, semantic controls, and both themes.
- Keep `index.html` and `ThemeToggle.tsx` consistent about `data-theme` and the `website-theme` storage key. Preserve the initial theme application and the return/scroll behavior coordinated by `BackHomeButton.tsx`, `RouteScrollManager.tsx`, and `App.tsx`.
- Components named `(unused)` and legacy jQuery scripts are not part of the active React interface. Do not reactivate them incidentally. The current npm build does not compile the template Sass.
- Preserve the author's factual biography, research descriptions, and existing English/Traditional Chinese content unless the requested edit concerns them. Retain template attribution and license files.
- `dist/` and `tsconfig.tsbuildinfo` are currently tracked generated outputs. Do not hand-edit them or change their tracking policy as incidental cleanup. Review build changes separately from source edits and do not blindly stage every changed file.

## Verification

- For application, styling, configuration, note-data, or document changes, run `npm.cmd run build` and inspect any generator warnings and generated-file changes. There are currently no npm test or lint scripts; do not claim those checks ran.
- For visual or interactive changes, inspect the affected pages in a browser at desktop and mobile widths and in both themes. Exercise relevant navigation, back/scroll behavior, note details, resource category filters, and changed download links. Check browser errors. Report any checks that could not be performed.
- For route or asset changes, also preview the production build under `/website/` and verify direct hash URLs and local PDFs/images there.
- For documentation-only edits, verify referenced paths and commands; a site build is unnecessary unless the documentation depends on changed application behavior.
- Run `git diff --check` and review `git status --short` before finishing. Summarize what changed, what was verified, and any remaining issue.
