// ─── DANGER SIGNS (DOH 10 Danger Signs in Pregnancy) ────────────────────────

export const DANGER_SIGNS = [
  { id: "bleeding", label: "Vaginal bleeding", severity: "critical", action: "Refer immediately. Rule out placenta previa, abruption, ectopic." },
  { id: "headache", label: "Severe, persistent headache", severity: "critical", action: "Check BP. Evaluate for preeclampsia. Urine protein. Refer if BP ≥140/90." },
  { id: "blurred_vision", label: "Blurred vision or scotomata", severity: "critical", action: "Evaluate for severe preeclampsia/eclampsia. Urgent referral." },
  { id: "convulsions", label: "Convulsions / seizures", severity: "critical", action: "Eclampsia until proven otherwise. Stabilize (MgSO4), emergent referral." },
  { id: "edema", label: "Edema of face, hands, or generalized", severity: "warning", action: "Check BP, urinalysis for proteinuria. Evaluate for preeclampsia." },
  { id: "fever", label: "Fever (≥38°C)", severity: "warning", action: "Rule out UTI, URTI, malaria (endemic areas), chorioamnionitis. Treat cause." },
  { id: "abd_pain", label: "Severe abdominal pain", severity: "critical", action: "Rule out ectopic, abruption, preterm labor, appendicitis, HELLP." },
  { id: "dyspnea", label: "Difficulty of breathing", severity: "warning", action: "Assess for cardiac disease, severe anemia, PE. Check vitals, O2 sat." },
  { id: "fetal_movement", label: "Decreased or absent fetal movement", severity: "warning", action: "Non-stress test. Kick count monitoring. UTZ for biophysical profile." },
  { id: "watery_discharge", label: "Watery vaginal discharge (PROM)", severity: "critical", action: "Sterile speculum exam. Nitrazine/ferning test. Avoid digital exam. Manage per AOG." },
];

// ─── COMORBIDITIES ───────────────────────────────────────────────────────────

export const COMORBIDITIES = [
  { id: "cht", label: "Chronic Hypertension" },
  { id: "gdm", label: "Gestational Diabetes" },
  { id: "pdm", label: "Pre-gestational DM (Type 1/2)" },
  { id: "thyroid", label: "Thyroid disorder" },
  { id: "asthma", label: "Bronchial Asthma" },
  { id: "anemia", label: "Anemia" },
  { id: "uti_recurrent", label: "Recurrent UTI" },
  { id: "cardiac", label: "Cardiac disease" },
  { id: "epilepsy", label: "Epilepsy" },
  { id: "tb", label: "Pulmonary TB" },
  { id: "hiv", label: "HIV/AIDS" },
  { id: "hepatitis_b", label: "Hepatitis B" },
  { id: "sle", label: "SLE / Autoimmune" },
  { id: "obesity", label: "Obesity (BMI ≥30)" },
  { id: "prev_cs", label: "Previous Cesarean Section" },
  { id: "prev_preeclampsia", label: "Previous Preeclampsia" },
  { id: "prev_preterm", label: "Previous Preterm Delivery" },
  { id: "prev_stillbirth", label: "Previous Stillbirth/IUFD" },
  { id: "rh_neg", label: "Rh-negative" },
  { id: "multiple_gestation", label: "Multiple Gestation" },
];

// ─── HISTORY CHECKLISTS ──────────────────────────────────────────────────────

export const OB_HISTORY_CHECKLIST = [
  "Gravidity & Parity (G_P_ (T_P_A_L_))",
  "Details of each prior pregnancy (AOG at delivery, mode, weight, complications)",
  "History of miscarriage/abortion (spontaneous vs induced, AOG, D&C done?)",
  "History of ectopic pregnancy",
  "History of preterm labor/delivery",
  "Previous cesarean section (indication, type of uterine incision)",
  "History of preeclampsia/eclampsia",
  "History of gestational diabetes",
  "History of postpartum hemorrhage",
  "History of neonatal death or stillbirth",
  "Interpregnancy interval",
  "Contraceptive use prior to conception",
  "Date of last menstrual period (LMP) — sure vs unsure",
  "Menstrual history (regularity, cycle length, duration)",
  "Earliest ultrasound dating",
];

export const MEDICAL_HISTORY_CHECKLIST = [
  "Hypertension / Cardiovascular disease",
  "Diabetes mellitus (Type 1 or 2)",
  "Thyroid disorders",
  "Bronchial asthma / Respiratory disease",
  "Epilepsy / Neurological disorders",
  "Renal disease",
  "Hepatic disease / Hepatitis B or C",
  "HIV / STIs",
  "Autoimmune conditions (SLE, APS, RA)",
  "Psychiatric conditions (depression, anxiety, psychosis)",
  "Anemia / Hematologic disorders (thalassemia, sickle cell)",
  "Malignancy",
  "Previous surgeries (esp. uterine, abdominal)",
  "Drug allergies",
  "Current medications",
  "Herbal / traditional medicine use",
  "Blood transfusion history",
];

export const SOCIAL_HISTORY_CHECKLIST = [
  "Smoking (pack-years, current status)",
  "Alcohol use (amount, frequency)",
  "Illicit drug use",
  "Domestic violence / intimate partner violence screening",
  "Occupation & workplace hazards",
  "Living conditions & household composition",
  "Support system",
  "Psychosocial stressors",
  "Nutritional status & dietary practices",
  "PhilHealth / insurance status",
  "Distance to nearest health facility",
  "Birth plan & preferred facility",
];

export const FAMILY_HISTORY_CHECKLIST = [
  "Hypertension",
  "Diabetes mellitus",
  "Congenital anomalies / genetic disorders",
  "Multiple gestations (twins/triplets)",
  "Preeclampsia / eclampsia",
  "Thromboembolism",
  "Cancer (breast, ovarian, colorectal)",
  "Psychiatric disorders",
  "Consanguinity",
];

export const CURRENT_PREGNANCY_SYMPTOMS = [
  "Nausea / vomiting (frequency, severity, hyperemesis?)",
  "Vaginal bleeding or spotting",
  "Vaginal discharge (color, odor, consistency)",
  "Dysuria / urinary frequency (beyond physiologic)",
  "Contractions or uterine cramping",
  "Fetal movement pattern (quickening, kick counts)",
  "Headache / visual disturbances",
  "Epigastric pain / RUQ pain",
  "Edema — facial, pedal, generalized",
  "Pruritus (intrahepatic cholestasis of pregnancy?)",
  "Mood changes / anxiety / depression (Edinburgh Postnatal Depression Scale)",
  "Sleep quality",
  "Appetite & dietary intake",
  "Bowel habits (constipation is common)",
  "Breast changes or complaints",
  "Leg cramps / back pain",
];

// ─── PHYSICAL EXAM CHECKLIST ─────────────────────────────────────────────────

export const PE_CHECKLIST = [
  { category: "Vitals", items: ["Blood pressure (both arms on first visit)", "Heart rate", "Respiratory rate", "Temperature", "Weight", "Height (first visit)", "BMI calculation"] },
  { category: "General Survey", items: ["Level of consciousness", "Pallor (conjunctival, palmar)", "Jaundice", "Thyroid enlargement", "Edema (facial, pedal, pretibial, sacral)", "Varicosities", "Dentition / oral health"] },
  { category: "Cardiovascular", items: ["Heart sounds, murmurs", "Peripheral pulses", "Capillary refill"] },
  { category: "Respiratory", items: ["Breath sounds", "Signs of respiratory distress"] },
  { category: "Breast", items: ["Masses / lumps", "Nipple abnormalities (flat, inverted)", "Signs of infection"] },
  { category: "Abdominal / Obstetric", items: ["Fundal height (McDonald's rule: cm ≈ AOG in weeks ± 2)", "Fetal heart tones (FHT) — rate, rhythm", "Leopold's maneuvers (after 28 weeks)", "Uterine tenderness / contractions", "Abdominal scars (previous CS)"] },
  { category: "Extremities", items: ["Edema grading (+1 to +4)", "Deep tendon reflexes (DTR) — patellar", "Clonus (if preeclampsia suspected)"] },
  { category: "Pelvic (if indicated)", items: ["External genitalia inspection", "Speculum exam (cervical lesions, discharge, bleeding)", "Internal exam (cervical dilation, effacement — when indicated)", "Clinical pelvimetry (if planning vaginal delivery)"] },
];

// ─── VACCINES ────────────────────────────────────────────────────────────────

export const VACCINES = [
  { name: "Tetanus-Diphtheria (Td)", schedule: "Per DOH EPI: Td1 on 1st visit, Td2 at least 4 weeks after Td1, Td3 at least 6 months after Td2 (if not previously immunized). If previously immunized with 3+ doses, give booster if >1 year since last dose.", trimester: "any" },
  { name: "Influenza (Inactivated)", schedule: "Any trimester. Recommended during flu season.", trimester: "any" },
  { name: "COVID-19 Vaccine", schedule: "Any trimester. mRNA vaccines preferred per POGS/DOH.", trimester: "any" },
  { name: "Hepatitis B Vaccine", schedule: "If non-immune and at risk. 3-dose series (0, 1, 6 months).", trimester: "any" },
  { name: "Tdap", schedule: "27–36 weeks AOG each pregnancy (for pertussis passive immunity to newborn). Per POGS recommendation.", trimester: "third" },
];

// ─── PRENATAL VISIT SCHEDULE ─────────────────────────────────────────────────

export const VISIT_SCHEDULE = [
  { visit: "1st Visit", timing: "As early as possible (ideally 1st trimester)", focus: "Complete history, baseline labs, dating, risk assessment" },
  { visit: "2nd Visit", timing: "24–28 weeks (early 3rd trimester)", focus: "GDM screening, growth assessment, danger sign review" },
  { visit: "3rd Visit", timing: "32 weeks", focus: "Growth, fetal well-being, birth plan, preterm labor signs" },
  { visit: "4th Visit", timing: "36–38 weeks", focus: "Presentation, GBS screen, delivery plan, repeat labs" },
];

// ─── LEOPOLD'S MANEUVERS ─────────────────────────────────────────────────────

export const LEOPOLDS = [
  { maneuver: "1st Maneuver (Fundal Grip)", technique: "Face patient's head. Palpate fundus with both hands.", determines: "What occupies the fundus (head = hard, round, ballotable; breech = soft, irregular)" },
  { maneuver: "2nd Maneuver (Umbilical Grip)", technique: "Hands on either side of abdomen at umbilical level.", determines: "Fetal back (smooth, resistant) vs limbs (irregular, small parts)" },
  { maneuver: "3rd Maneuver (Pawlik's Grip)", technique: "Single hand grasps presenting part above symphysis.", determines: "Presenting part (cephalic vs breech) and engagement" },
  { maneuver: "4th Maneuver (Pelvic Grip)", technique: "Face patient's feet. Both hands press toward pelvic inlet.", determines: "Degree of engagement (if hands converge = not engaged; diverge = engaged)" },
];

// ─── NAVIGATION TABS ─────────────────────────────────────────────────────────

export const TABS = [
  { id: "input", label: "Patient Data", icon: "📋" },
  { id: "summary", label: "Clinical Summary", icon: "📊" },
  { id: "screening", label: "Screenings & Labs", icon: "🔬" },
  { id: "supplements", label: "Supplements & Rx", icon: "💊" },
  { id: "history", label: "History Guide", icon: "📝" },
  { id: "pe", label: "PE Checklist", icon: "🩺" },
  { id: "danger", label: "Danger Signs", icon: "⚠️" },
  { id: "vaccines", label: "Immunizations", icon: "💉" },
];
