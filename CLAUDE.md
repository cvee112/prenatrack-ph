# CLAUDE.md — PrenaTrack PH

## Project Overview

PrenaTrack PH is a **client-side prenatal clinical decision support tool** for Philippine healthcare practice. It provides AOG-appropriate screening recommendations, supplement guidance, risk stratification, and clinical checklists based on DOH (Department of Health) and POGS (Philippine Obstetrical and Gynecological Society) guidelines.

This is a **static single-page application** — no backend, no database, no API calls. All clinical logic runs in the browser.

## Tech Stack

- **React 18** (JSX, hooks-only — no class components)
- **Vite 6** (build tool and dev server)
- **Vanilla CSS** + inline styles (no Tailwind, no CSS modules, no UI library)
- **ES Modules** (`"type": "module"` in package.json)
- **No TypeScript** — all source files are `.jsx` / `.js` (TypeScript types are dev dependencies for editor support only)
- **No testing framework** configured
- **No linter/formatter** configured

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:3000 (auto-opens browser)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

## Repository Structure

```
prenatrack-ph/
├── index.html                  # SPA entry point (loads Google Fonts, mounts React)
├── package.json
├── vite.config.js              # Vite config (port 3000, sourcemaps enabled)
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React DOM root — renders <App />
    ├── App.jsx                 # Main application component (all tabs, state, UI)
    ├── index.css               # Global CSS reset, scrollbar, print styles
    ├── theme.js                # Design tokens (colors, fonts)
    ├── components/
    │   └── ui.jsx              # Shared UI primitives (Card, FormRow, CheckItem, etc.)
    ├── data/
    │   └── clinicalData.js     # Clinical constants (danger signs, comorbidities, checklists, vaccines)
    └── utils/
        ├── obstetricCalc.js    # Date/AOG math (LMP, UTZ dating, ACOG reconciliation)
        └── clinicalLogic.js    # Decision engine (screenings, supplements, risk factors)
```

## Architecture

### State Management
All state lives in `App.jsx` via `useState` hooks (~70 state variables). Derived/computed values use `useMemo`. There is no external state library (no Redux, Zustand, etc.).

### Styling Approach
- **Global styles**: `src/index.css` (CSS reset, focus rings, print media query)
- **Design tokens**: `src/theme.js` exports a `theme` object with `colors` and `fonts`
- **Component styles**: Inline style objects throughout JSX. Helper functions like `inputStyle()` and `badgeStyle()` in `ui.jsx` generate style objects.
- **Color palette**: Teal/mint medical theme — primary `#2b6777`, accent `#52ab98`, bg `#f0f5f3`
- **Fonts**: Lora (serif headings) + Source Sans 3 (sans-serif body), loaded via Google Fonts in `index.html`

### Tab Structure
The app has 8 tabs defined in `clinicalData.js` (`TABS` array):

| Tab | Purpose |
|-----|---------|
| Input | Patient demographics, dating (LMP/UTZ), GTPAL, comorbidities |
| Summary | Pregnancy overview, AOG reconciliation, risk stratification |
| Screening | AOG-appropriate labs/tests with clinical rationale |
| Supplements | Medication and supplement recommendations |
| History | Interactive history-taking checklists (OB, medical, social, family, symptoms) |
| PE | Physical examination checklist by system |
| Danger | 10 DOH danger signs assessment with severity and actions |
| Vaccines | Immunization schedule per DOH/POGS guidelines |

### Clinical Logic (`src/utils/clinicalLogic.js`)
This is the core decision engine. Key functions:

- **`getScreenings(aogWeeks, comorbidities, age, gravidity)`** — Returns AOG-appropriate labs/tests. Handles comorbidity-specific panels (hypertensive, diabetic, thyroid, HIV, multiple gestation).
- **`getSupplements(aogWeeks, comorbidities)`** — Returns recommended medications with dosing. Includes iron/folate, calcium, aspirin prophylaxis, anti-D, vitamin D.
- **`getRiskFactors(age, gravidity, parity, comorbidities)`** — Returns risk factors with severity levels (high/moderate/low).

### Obstetric Calculations (`src/utils/obstetricCalc.js`)
- **AOG from LMP**: Weeks + days from last menstrual period to today
- **EDC (Naegele's rule)**: LMP + 280 days
- **UTZ dating**: AOG and EDC from ultrasound measurements
- **AOG reconciliation**: Implements ACOG/POGS discrepancy thresholds to choose between LMP and UTZ dating (thresholds vary by gestational age)

### Clinical Data (`src/data/clinicalData.js`)
Static arrays/objects of clinical content:
- `DANGER_SIGNS` — 10 items with `severity` and `action` fields
- `COMORBIDITIES` — 20 maternal conditions
- Various history checklists (OB, medical, social, family, symptoms)
- `PE_CHECKLIST` — 8 body systems with examination items
- `VACCINES` — 5 vaccine types with indication and timing
- `VISIT_SCHEDULE` — DOH minimum prenatal visits
- `LEOPOLDS` — 4 Leopold's maneuvers

## Key Conventions

### Code Style
- **Functional components only** — no class components
- **Hooks**: `useState` for state, `useMemo` for computed values, `useCallback` for event handlers
- **Inline styles** via JS objects — not className-based styling
- **Named exports** from utility/data modules; default export for `App`
- **Arrow functions** for components and handlers
- **No prop-types or TypeScript interfaces** — props are untyped

### File Organization
- All UI primitives go in `src/components/ui.jsx`
- Clinical content/constants go in `src/data/clinicalData.js`
- Pure calculation functions go in `src/utils/obstetricCalc.js`
- Decision logic (screening/supplement/risk rules) go in `src/utils/clinicalLogic.js`
- `App.jsx` orchestrates everything — it's the only "page"

### Clinical Content Guidelines
When modifying clinical logic or data:
- Reference the specific guideline (DOH AO, POGS CPG, WHO, ACOG, IADPSG, RA 11166)
- Screening recommendations must be AOG-appropriate (gestational-age-gated)
- Risk levels must use the three-tier system: `high`, `moderate`, `low`
- Danger signs use severity: `severe` or `moderate`
- Drug dosages must include unit, frequency, and indication

## Environment

- **No environment variables** are required — the app is fully self-contained
- **No backend/API** — all data stays in the browser
- **No database** — patient data is ephemeral (in React state, not persisted)

## Build & Deployment

- **Build output**: `dist/` directory (static files)
- **Source maps**: Enabled in production builds
- **Deployment targets**: Vercel (auto-detects Vite), Netlify (`npm run build` → `dist/`), GitHub Pages (needs `base` path in vite.config.js)

## Common Tasks

### Adding a new comorbidity
1. Add entry to `COMORBIDITIES` array in `src/data/clinicalData.js`
2. Add screening rules in `getScreenings()` in `src/utils/clinicalLogic.js`
3. Add supplement rules in `getSupplements()` if needed
4. Add risk factor mapping in `getRiskFactors()` if needed

### Adding a new screening test
1. Add to the appropriate AOG bracket in `getScreenings()` in `src/utils/clinicalLogic.js`
2. Include `name`, `when` (timing), and `rationale` fields

### Adding a new UI component
1. Add to `src/components/ui.jsx` as a named export
2. Use `theme` import for colors/fonts
3. Use inline style objects, consistent with existing components

### Adding a new tab
1. Add tab definition to `TABS` in `src/data/clinicalData.js`
2. Add corresponding state and rendering logic in `App.jsx`
