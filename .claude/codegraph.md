# Code Graph
> Commit: eba08b2 | Date: 2026-10-11 | Files: 16 | Lang: js/ts

## Architecture Overview
This is a Next.js App Router landing site for Amor Glamour. The root route and landing route render the shared client-side landing composition, while the root layout loads local fonts and global styles. Landing sections are split into focused components for the hero, image content, salon experience, glow call-to-action, and footer. Theme state and the intro sequence are coordinated by the landing composition.

## Module Index

### src/app/

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Root route entry that renders the shared landing page. |
| `src/app/layout.tsx` | Root document, local font setup, and global stylesheet entry. |
| `src/app/globals.css` | Tailwind import, global defaults, and shared animation styles. |
| `src/app/landing/page.tsx` | Landing route metadata and page entry. |
| `src/app/landing/Landing.tsx` | Client-side landing composition, theme state, and intro lifecycle. |

### src/components/

| File | Purpose |
|---|---|
| `src/components/Footer.tsx` | Contact details, copyright, and oversized Amor Glamour wordmark. |
| `src/components/icons.tsx` | Shared icon components used by the page. |
| `src/components/landing/Content.tsx` | Image-led service/category content and its selection interaction. |
| `src/components/landing/Experience.tsx` | Salon experience and brand introduction section. |
| `src/components/landing/Glow.tsx` | Appointment call-to-action and supporting gallery. |
| `src/components/landing/Hero.tsx` | Landing hero content and theme controls. |
| `src/components/landing/IntroLoader.tsx` | Full-screen branded intro animation and image sequence. |
| `src/components/landing/MoreInfo.tsx` | Service details overlay shown from the content gallery. |

### Configuration

| File | Purpose |
|---|---|
| `package.json` | Project scripts and JavaScript dependencies. |
| `next.config.ts` | Next.js runtime and build configuration. |
| `postcss.config.mjs` | CSS processing configuration. |
| `tsconfig.json` | TypeScript compiler options and path aliases. |

---
_Regenerate: `node <skill-dir>/scripts/scan.js > .claude/codegraph.draft.md`_
