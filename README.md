# PrenaTrack PH

**Prenatal Clinical Decision Support Tool for Philippine Practice**

A web-based clinical decision support application for prenatal checkups, based on Philippine DOH Administrative Orders, POGS Clinical Practice Guidelines, WHO Recommendations on Antenatal Care, and ACOG/FIGO guidelines.

> ⚠️ **Disclaimer:** This tool is for clinical decision *support* only. It is not a substitute for clinical judgment, institutional protocols, or direct patient assessment. Always verify recommendations against the latest published guidelines.

---

## Features

### 📋 Patient Data Input
- Maternal demographics (birthday → auto-computed age)
- Obstetric dating: LMP and early ultrasound with **automatic AOG reconciliation** using ACOG/POGS discrepancy thresholds (5-day to 21-day windows by gestational age at UTZ)
- GTPAL obstetric scoring
- 20 common comorbidities and risk factors

### 📊 Clinical Summary
- Consolidated pregnancy overview with best AOG estimate
- **Risk stratification** (high / moderate / low) based on age, parity, and comorbidities
- DOH minimum prenatal visit schedule with POGS-recommended frequency

### 🔬 AOG-Appropriate Screenings & Labs
- First visit panel (CBC, blood typing, HBsAg, RPR, HIV per RA 11166, FBS, malaria smear)
- First trimester screening (NT, combined screen, TSH)
- 75g OGTT universal GDM screening at 24–28 weeks (POGS/IADPSG)
- Third trimester repeats, GBS culture at 35–37 weeks
- **Comorbidity-specific panels:** hypertensive monitoring, diabetes management, thyroid surveillance, HIV PMTCT, multiple gestation protocols

### 💊 Supplements & Prescriptions
- DOH standard: ferrous sulfate + folic acid (prophylactic & therapeutic dosing)
- Calcium carbonate (WHO recommendation for low-intake populations)
- Iodine, Vitamin D
- **Conditional:** low-dose aspirin for preeclampsia prophylaxis, anti-D immunoglobulin for Rh-negative, therapeutic iron

### 📝 History-Taking Guide
Interactive checklists with completion tracking:
- Obstetric history (15 items)
- Medical/surgical history (17 items)
- Social history & psychosocial screening (12 items, including IPV, PhilHealth status)
- Family history (9 items)
- Review of systems — current pregnancy (16 items, including Edinburgh depression screen prompt)

### 🩺 Physical Examination Checklist
- 8 systems with progress tracking (vitals, general survey, CV, respiratory, breast, obstetric, extremities, pelvic)
- **Dynamic content:** fundal height reference (McDonald's rule with expected range for current AOG), Leopold's maneuvers guide (appears at ≥28 weeks)

### ⚠️ 10 Danger Signs (DOH)
- Each sign with severity grading (critical vs warning)
- Checking a sign reveals specific **clinical actions and differentials**
- Alert banner aggregates all positive findings

### 💉 Immunizations
- Td per DOH EPI schedule
- Tdap per POGS (27–36 weeks)
- Influenza, COVID-19, Hepatitis B
- Trimester-appropriate applicability flags
- Contraindication notes (live vaccines)

---

## Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool & dev server
- **Zero dependencies** beyond React — no UI library, no state management library

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/your-username/prenatrack-ph.git
cd prenatrack-ph
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

Output goes to `dist/`. Preview with:

```bash
npm run preview
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Vite** (auto-detected)
4. Deploy

Or via CLI:

```bash
npm i -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

Add to `vite.config.js`:

```js
export default defineConfig({
  base: '/prenatrack-ph/',  // your repo name
  // ...
});
```

Then use the [GitHub Actions workflow for Vite](https://vitejs.dev/guide/static-deploy#github-pages) or push `dist/` to `gh-pages` branch.

---

## Project Structure

```
prenatrack-ph/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ui.jsx            # Shared UI components (Card, FormRow, CheckItem, etc.)
│   ├── data/
│   │   └── clinicalData.js   # Clinical constants (danger signs, checklists, vaccines, etc.)
│   ├── utils/
│   │   ├── obstetricCalc.js   # AOG/EDC calculations, date utilities
│   │   └── clinicalLogic.js   # Screening, supplement, and risk logic
│   ├── theme.js               # Design tokens (colors, fonts)
│   ├── index.css              # Global styles & reset
│   ├── main.jsx               # React entry point
│   └── App.jsx                # Main application component
├── index.html
├── vite.config.js
├── package.json
├── LICENSE
└── README.md
```

---

## Clinical References

- DOH Administrative Order on Maternal, Newborn, Child Health and Nutrition (MNCHN) Strategy
- DOH Expanded Program on Immunization (EPI) schedule
- Philippine Obstetrical and Gynecological Society (POGS) Clinical Practice Guidelines
- WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience (2016)
- ACOG Committee Opinion No. 700: Methods for Estimating the Due Date
- IADPSG Consensus Panel: International Association of Diabetes and Pregnancy Study Groups
- Republic Act 11166 (Philippine HIV/AIDS Policy Act)

---

## Contributing

Contributions are welcome. If you'd like to add features or update clinical guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-partograph`)
3. Commit changes (`git commit -m 'Add partograph module'`)
4. Push to branch (`git push origin feature/add-partograph`)
5. Open a Pull Request

Please ensure any clinical content is referenced to published guidelines.

---

## License

[MIT](LICENSE)
