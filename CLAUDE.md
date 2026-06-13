# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (localhost only)
npm.cmd run dev

# Dev server exposed to local network (for mobile testing)
npm.cmd run dev -- --host

# Production build
npm.cmd run build

# Preview production build
npm.cmd run preview
```

> On Windows, use `npm.cmd` instead of `npm` if PowerShell execution policy blocks `.ps1` scripts.

## Architecture

Single-page portfolio built with React 19 + Vite. No routing library — navigation is pure anchor `#id` scroll. No state management library — only React's built-in `useState`.

**Data lives directly in the component files, not in separate data files or a CMS:**
- Skills and proficiency levels → `src/components/Skills.jsx` (`categories` array)
- Project cards → `src/components/Projects.jsx` (`projects` array)
- Stats (years experience, etc.) → `src/components/About.jsx` (`stats` array)
- Contact email → `src/components/Contact.jsx`

To update content, edit the data arrays at the top of each component file.

## Styling

All design tokens (colors, fonts) are CSS custom properties defined in `src/index.css`. The brown/cream palette uses these variables:

- `--brown-dark / --brown-mid / --brown-accent` — primary brand browns
- `--cream-light / --cream-mid / --cream-white` — background creams
- `--text-dark / --text-mid / --text-light` — text hierarchy

Each component has a co-located `.css` file. Global shared utility classes (`.section-title`, `.section-divider`, `.btn-primary`, `.btn-secondary`, `.section`) are defined in `index.css` and `App.css` — do not redefine them in component CSS files.

## Profile Photo

The profile photo is imported in `About.jsx` from `src/assets/profile.jpg`. To swap it, replace that file and keep the same filename, or update the import path.
