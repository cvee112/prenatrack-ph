/**
 * Clinical decision logic for prenatal screenings, supplements, and risk
 * stratification. Based on:
 *   - DOH Administrative Orders (Prenatal Care Package)
 *   - POGS Clinical Practice Guidelines
 *   - WHO Recommendations on Antenatal Care (2016)
 *   - ACOG / FIGO where Philippine-specific guidance is absent
 */

import { COMORBIDITIES } from "../data/clinicalData.js";

// ─── SCREENINGS & LABS ───────────────────────────────────────────────────────

export function getScreenings(aogWeeks, comorbidities, age, gravidity) {
  const s = [];
  const como = new Set(comorbidities);

  // First visit (any AOG)
  s.push({
    category: "First Visit Labs",
    timing: "First prenatal visit",
    tests: [
      "Complete Blood Count (CBC)",
      "Blood typing (ABO + Rh)",
      "Urinalysis with microscopy + urine culture (screen for asymptomatic bacteriuria per POGS/WHO)",
      "Hepatitis B surface antigen (HBsAg)",
      "Syphilis screening (RPR/VDRL)",
      "HIV screening (with consent per RA 11166)",
      "Fasting blood sugar or random blood sugar",
      "Blood smear for malaria (endemic areas — ARMM, Palawan, etc.)",
      "Stool exam (if indicated)",
    ],
    always: true,
  });

  // First trimester
  if (aogWeeks <= 13) {
    s.push({
      category: "First Trimester Screening",
      timing: "11–14 weeks",
      tests: [
        "Nuchal translucency (NT) ultrasound",
        "First trimester combined screening (NT + PAPP-A + free β-hCG) if available",
        "Dating ultrasound (crown-rump length)",
        ...(age >= 35 ? ["Offer chorionic villus sampling (CVS) if indicated"] : []),
        ...(como.has("thyroid")
          ? ["TSH, FT4"]
          : ["TSH (universal screening recommended per POGS)"]),
      ],
    });
  }

  // Second trimester
  if (aogWeeks >= 14 && aogWeeks <= 27) {
    const tests = [
      "Congenital anomaly scan / morphology UTZ (18–22 weeks)",
      "Cervical length assessment (18–24 weeks, esp. if history of preterm birth)",
    ];
    if (aogWeeks >= 15 && aogWeeks <= 20 && age >= 35) {
      tests.push("Offer quadruple screen / maternal serum screening");
      tests.push("Offer amniocentesis for karyotyping if indicated");
    }
    s.push({ category: "Second Trimester Screening", timing: "14–27 weeks", tests });
  }

  // 24–28 week screening (straddles 2nd/3rd trimester boundary)
  if (aogWeeks >= 24 && aogWeeks <= 28) {
    const tests = [
      "75g OGTT for GDM screening — universal per POGS/IADPSG (diagnostic cutoffs: fasting ≥92, 1hr ≥180, 2hr ≥153 mg/dL)",
      "Repeat CBC (assess for anemia)",
      "Repeat urinalysis",
    ];
    if (como.has("rh_neg")) tests.push("Indirect Coombs test / antibody screen");
    s.push({ category: "24–28 Week Screening", timing: "24–28 weeks", tests });
  }

  // Early GDM screening for high-risk
  if (
    aogWeeks < 24 &&
    (como.has("pdm") || como.has("gdm") || como.has("obesity") || age >= 35)
  ) {
    s.push({
      category: "Early GDM Screening",
      timing: "First visit if high-risk",
      tests: [
        "FBS or 75g OGTT at first visit (if not yet done)",
        "Repeat 75g OGTT at 24–28 weeks if initial screen is normal",
        "HbA1c (if pre-gestational DM suspected)",
      ],
    });
  }

  // Third trimester
  if (aogWeeks >= 28) {
    const tests = [
      "Repeat CBC",
      "Repeat urinalysis",
      "Growth ultrasound (28–32 weeks)",
      "Non-stress test (NST) — weekly from 32–34 weeks if high-risk",
      "Biophysical profile (BPP) if indicated",
    ];
    if (aogWeeks >= 35 && aogWeeks <= 37) {
      tests.push("Group B Streptococcus (GBS) recto-vaginal culture (35–37 weeks)");
    }
    if (aogWeeks >= 36) {
      tests.push("Repeat HBsAg (if high-risk or status unknown)");
      tests.push("Repeat RPR/VDRL");
      tests.push("Repeat HIV screening");
      tests.push(
        "Presentation assessment (Leopold's maneuvers + confirmatory UTZ if breech)"
      );
    }
    if (como.has("rh_neg"))
      tests.push("Administer anti-D immunoglobulin at 28 weeks if unsensitized");
    if (como.has("prev_cs")) tests.push("Assess suitability for TOLAC vs repeat CS");
    s.push({ category: "Third Trimester", timing: "28+ weeks", tests });
  }

  // Comorbidity-specific panels
  if (como.has("cht") || como.has("prev_preeclampsia")) {
    s.push({
      category: "Hypertensive Monitoring",
      timing: "Throughout pregnancy",
      tests: [
        "BP monitoring every visit (target <140/90)",
        "24-hour urine protein or spot protein:creatinine ratio (baseline & if BP rises)",
        "Serum creatinine, uric acid, LDH, AST/ALT",
        "Platelet count",
        "Low-dose aspirin 81–150 mg/day starting 12–16 weeks (per POGS/ACOG)",
        "Calcium supplementation 1.5–2g/day (WHO recommendation for low-intake populations)",
        "Uterine artery Doppler (if available, 20–24 weeks)",
      ],
    });
  }

  if (como.has("gdm") || como.has("pdm")) {
    s.push({
      category: "Diabetes Monitoring",
      timing: "Throughout pregnancy",
      tests: [
        "Self-monitoring of blood glucose (fasting + 1-2hr postprandial)",
        "HbA1c every trimester",
        "Fundoscopy (if pre-gestational DM)",
        "Renal function tests (if pre-gestational DM)",
        "Growth ultrasound every 4 weeks from 28 weeks",
        "Fetal surveillance (NST/BPP) from 32–34 weeks",
        "Timing of delivery: 39 weeks (diet-controlled GDM), 37–39 weeks (insulin-requiring)",
      ],
    });
  }

  if (como.has("thyroid")) {
    s.push({
      category: "Thyroid Monitoring",
      timing: "Throughout pregnancy",
      tests: [
        "TSH every 4–6 weeks during 1st half, then at least once per trimester",
        "FT4 if TSH abnormal",
        "Adjust levothyroxine dose (increase 25–30% upon confirmed pregnancy per ATA)",
        "Target TSH: trimester-specific reference ranges or <2.5 mIU/L if unavailable",
      ],
    });
  }

  if (como.has("hiv")) {
    s.push({
      category: "HIV Monitoring",
      timing: "Throughout pregnancy",
      tests: [
        "CD4 count and viral load at baseline, then per PMTCT protocol",
        "Initiate/continue ART per DOH PMTCT guidelines",
        "Resistance testing if not on ART",
        "Screen for co-infections (TB, hepatitis, STIs)",
        "Plan delivery mode based on viral load",
      ],
    });
  }

  if (como.has("multiple_gestation")) {
    s.push({
      category: "Multiple Gestation Monitoring",
      timing: "Throughout pregnancy",
      tests: [
        "Determine chorionicity/amnionicity on first trimester UTZ",
        "Cervical length assessment starting 16 weeks",
        "Growth UTZ every 2–3 weeks (MCDA) or every 4 weeks (DCDA)",
        "MCDA: screen for TTTS from 16 weeks",
        "Earlier GDM screening",
        "Fetal surveillance from 28–32 weeks",
        "Delivery timing: 36–37 weeks (DCDA), 34–36 weeks (MCDA), 32–34 weeks (MCMA)",
      ],
    });
  }

  return s;
}

// ─── SUPPLEMENTS ─────────────────────────────────────────────────────────────

export function getSupplements(aogWeeks, comorbidities) {
  const como = new Set(comorbidities);
  const supps = [
    {
      name: "Ferrous Sulfate + Folic Acid",
      dose: "60 mg elemental iron + 400 mcg folic acid daily (DOH standard)",
      timing:
        "Start at first prenatal visit, continue throughout pregnancy and 3 months postpartum",
      notes:
        "Take on empty stomach with vitamin C for better absorption. Avoid with tea/coffee/milk. If Hgb <11 g/dL, give therapeutic dose: 120 mg elemental iron daily.",
    },
    {
      name: "Calcium Carbonate",
      dose: "500 mg elemental calcium BID (total 1g/day; up to 1.5-2g/day per WHO for low-intake populations)",
      timing: "Start at 20 weeks, continue until delivery",
      notes:
        "Take separately from iron (at least 2 hours apart). Reduces risk of preeclampsia per WHO. Especially important in Philippine setting (low dietary calcium intake).",
    },
    {
      name: "Iodine",
      dose: "250 mcg daily (WHO recommendation for pregnant women)",
      timing: "Throughout pregnancy and lactation",
      notes:
        "May be included in prenatal vitamins. Important for fetal neurodevelopment. Iodized salt alone may be insufficient.",
    },
  ];

  if (aogWeeks > 13) {
    supps.push({
      name: "Albendazole (Deworming)",
      dose: "400 mg single oral dose",
      timing: "Once after the 1st trimester (DOH Prenatal Care Package)",
      notes:
        "DOH-mandated for all pregnant women. Reduces risk of iron-deficiency anemia from soil-transmitted helminthiasis. Single dose only — do not repeat during pregnancy.",
    });
  }

  if (
    como.has("prev_preeclampsia") ||
    como.has("cht") ||
    como.has("pdm") ||
    como.has("obesity") ||
    como.has("multiple_gestation") ||
    como.has("sle")
  ) {
    supps.push({
      name: "Low-dose Aspirin",
      dose: "81–150 mg daily at bedtime",
      timing: "Start at 12–16 weeks, continue until 36 weeks",
      notes:
        "For preeclampsia prophylaxis in high-risk patients. Take at bedtime for optimal effect (per POGS/ACOG).",
    });
  }

  if (como.has("anemia")) {
    supps.push({
      name: "Therapeutic Iron",
      dose: "120 mg elemental iron daily (or parenteral iron if intolerant/severe)",
      timing: "Until Hgb normalizes, then continue prophylactic dose",
      notes:
        "Recheck CBC after 4 weeks. Consider IV iron (ferric carboxymaltose) if Hgb <8 or non-response to oral.",
    });
  }

  if (como.has("rh_neg")) {
    supps.push({
      name: "Anti-D Immunoglobulin (RhoGAM)",
      dose: "300 mcg IM",
      timing:
        "At 28 weeks AOG, and within 72 hours after delivery (if baby is Rh-positive)",
      notes:
        "Also give after any sensitizing event (bleeding, amniocentesis, version, miscarriage). Check indirect Coombs first.",
    });
  }

  supps.push({
    name: "Vitamin D",
    dose: "600–1000 IU daily (higher if deficient)",
    timing: "Throughout pregnancy",
    notes:
      "Consider screening 25-OH vitamin D in high-risk patients. Important for calcium metabolism and fetal bone development.",
  });

  return supps;
}

// ─── RISK STRATIFICATION ─────────────────────────────────────────────────────

export function getRiskFactors(age, gravidity, parity, comorbidities) {
  const risks = [];
  if (age < 18) risks.push({ factor: "Adolescent pregnancy (<18 years)", level: "high" });
  if (age >= 35)
    risks.push({ factor: "Advanced maternal age (≥35 years)", level: "moderate" });
  if (age >= 40)
    risks.push({ factor: "Very advanced maternal age (≥40 years)", level: "high" });
  if (parseInt(gravidity) >= 5)
    risks.push({ factor: "Grand multigravida (G≥5)", level: "moderate" });
  if (parseInt(parity) === 0 && parseInt(gravidity) === 1)
    risks.push({ factor: "Primigravida", level: "low" });

  const como = new Set(comorbidities);
  const comoRisks = [
    ["prev_cs", "Previous cesarean section — assess for VBAC candidacy", "moderate"],
    [
      "prev_preeclampsia",
      "Previous preeclampsia — start aspirin prophylaxis at 12–16 weeks",
      "high",
    ],
    [
      "prev_preterm",
      "Previous preterm delivery — consider cervical length surveillance, progesterone",
      "high",
    ],
    ["prev_stillbirth", "Previous stillbirth — enhanced fetal surveillance", "high"],
    [
      "multiple_gestation",
      "Multiple gestation — high-risk pregnancy management",
      "high",
    ],
    ["cht", "Chronic hypertension — superimposed preeclampsia risk", "high"],
    [
      "pdm",
      "Pre-gestational diabetes — congenital anomaly risk, macrosomia",
      "high",
    ],
    ["hiv", "HIV — PMTCT protocol required", "high"],
    ["cardiac", "Cardiac disease — multidisciplinary management", "high"],
  ];

  for (const [id, factor, level] of comoRisks) {
    if (como.has(id)) risks.push({ factor, level });
  }

  return risks;
}
