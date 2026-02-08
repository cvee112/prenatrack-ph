/**
 * Obstetric calculation utilities.
 *
 * AOG reconciliation follows ACOG Committee Opinion No. 700 /
 * POGS recommendations for redating based on LMP-UTZ discrepancy
 * thresholds by gestational age at the time of ultrasound.
 */

/** Calculate AOG (weeks + days) from LMP date to today. */
export function calcAOGfromLMP(lmpDate) {
  if (!lmpDate) return null;
  const lmp = new Date(lmpDate);
  const today = new Date();
  const diffDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return null;
  return { weeks: Math.floor(diffDays / 7), days: diffDays % 7, totalDays: diffDays };
}

/** Calculate EDC from LMP using Naegele's rule (LMP + 280 days). */
export function calcEDCfromLMP(lmpDate) {
  if (!lmpDate) return null;
  const edc = new Date(lmpDate);
  edc.setDate(edc.getDate() + 280);
  return edc;
}

/** Calculate EDC from early ultrasound date and AOG at that time. */
export function calcEDCfromUTZ(utzDate, utzWeeks, utzDays) {
  if (!utzDate || utzWeeks === "" || utzWeeks === null) return null;
  const utz = new Date(utzDate);
  const totalDaysAtUTZ = parseInt(utzWeeks) * 7 + (parseInt(utzDays) || 0);
  const remainingDays = 280 - totalDaysAtUTZ;
  const edc = new Date(utz);
  edc.setDate(edc.getDate() + remainingDays);
  return edc;
}

/** Calculate current AOG from ultrasound dating. */
export function calcAOGfromUTZ(utzDate, utzWeeks, utzDays) {
  if (!utzDate || utzWeeks === "" || utzWeeks === null) return null;
  const utz = new Date(utzDate);
  const today = new Date();
  const daysSinceUTZ = Math.floor((today - utz) / (1000 * 60 * 60 * 24));
  const totalDaysAtUTZ = parseInt(utzWeeks) * 7 + (parseInt(utzDays) || 0);
  const totalDays = totalDaysAtUTZ + daysSinceUTZ;
  if (totalDays < 0) return null;
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7, totalDays };
}

/**
 * Select the best AOG estimate based on ACOG/POGS discrepancy thresholds.
 *
 * Thresholds (UTZ AOG at time of scan):
 *   ≤13 6/7 weeks  → >5 days discrepancy → use UTZ
 *   14–15 6/7       → >7 days
 *   16–21 6/7       → >10 days
 *   22–27 6/7       → >14 days
 *   ≥28             → >21 days
 */
export function getRecommendedAOG(lmpAOG, utzAOG, utzWeeks) {
  if (!lmpAOG && !utzAOG) return null;
  if (!utzAOG) return { ...lmpAOG, source: "LMP" };
  if (!lmpAOG) return { ...utzAOG, source: "UTZ" };

  const diff = Math.abs(lmpAOG.totalDays - utzAOG.totalDays);
  const utzW = parseInt(utzWeeks) || 0;
  let threshold;
  if (utzW <= 13) threshold = 5;
  else if (utzW <= 15) threshold = 7;
  else if (utzW <= 21) threshold = 10;
  else if (utzW <= 27) threshold = 14;
  else threshold = 21;

  if (diff > threshold) return { ...utzAOG, source: `UTZ (discrepancy >${threshold}d)` };
  return { ...lmpAOG, source: "LMP (concordant with UTZ)" };
}

/** Determine trimester from weeks AOG. */
export function getTrimester(weeks) {
  if (weeks < 0) return "N/A";
  if (weeks < 14) return "First";
  if (weeks < 28) return "Second";
  return "Third";
}

/** Calculate age in years from birthday. */
export function calcAge(birthday) {
  if (!birthday) return null;
  const bd = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - bd.getFullYear();
  const m = today.getMonth() - bd.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
  return age;
}

/** Format a Date as a readable Philippine-locale string. */
export function formatDate(d) {
  if (!d) return "—";
  return d.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
}
