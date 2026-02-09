import { useState, useMemo, useCallback } from "react";

// Data
import {
  DANGER_SIGNS,
  COMORBIDITIES,
  OB_HISTORY_CHECKLIST,
  MEDICAL_HISTORY_CHECKLIST,
  SOCIAL_HISTORY_CHECKLIST,
  FAMILY_HISTORY_CHECKLIST,
  CURRENT_PREGNANCY_SYMPTOMS,
  PE_CHECKLIST,
  VACCINES,
  VISIT_SCHEDULE,
  LEOPOLDS,
  TABS,
} from "./data/clinicalData.js";

// Utilities
import {
  calcAOGfromLMP,
  calcEDCfromLMP,
  calcEDCfromUTZ,
  calcAOGfromUTZ,
  getRecommendedAOG,
  getTrimester,
  calcAge,
  formatDate,
} from "./utils/obstetricCalc.js";

import {
  getScreenings,
  getSupplements,
  getRiskFactors,
} from "./utils/clinicalLogic.js";

// Components
import {
  Card,
  FormRow,
  CheckItem,
  SummaryRow,
  inputStyle,
  badgeStyle,
} from "./components/ui.jsx";

// Theme
import { colors, fonts } from "./theme.js";

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  // ─── State ───────────────────────────────────────────────────────────
  const [tab, setTab] = useState("input");
  const [birthday, setBirthday] = useState("");
  const [lmp, setLmp] = useState("");
  const [utzDate, setUtzDate] = useState("");
  const [utzWeeks, setUtzWeeks] = useState("");
  const [utzDays, setUtzDays] = useState("0");
  const [gravidity, setGravidity] = useState("");
  const [parity, setParity] = useState("");
  const [term, setTerm] = useState("");
  const [preterm, setPreterm] = useState("");
  const [abortion, setAbortion] = useState("");
  const [living, setLiving] = useState("");
  const [selectedComo, setSelectedComo] = useState([]);
  const [dangerChecked, setDangerChecked] = useState({});
  const [historyChecked, setHistoryChecked] = useState({});
  const [peChecked, setPeChecked] = useState({});

  // ─── Derived values ──────────────────────────────────────────────────
  const age = useMemo(() => calcAge(birthday), [birthday]);
  const lmpAOG = useMemo(() => calcAOGfromLMP(lmp), [lmp]);
  const utzAOG = useMemo(() => calcAOGfromUTZ(utzDate, utzWeeks, utzDays), [utzDate, utzWeeks, utzDays]);
  const edcLMP = useMemo(() => calcEDCfromLMP(lmp), [lmp]);
  const edcUTZ = useMemo(() => calcEDCfromUTZ(utzDate, utzWeeks, utzDays), [utzDate, utzWeeks, utzDays]);
  const bestAOG = useMemo(() => getRecommendedAOG(lmpAOG, utzAOG, utzWeeks), [lmpAOG, utzAOG, utzWeeks]);
  const trimester = bestAOG ? getTrimester(bestAOG.weeks) : null;
  const risks = useMemo(() => getRiskFactors(age, gravidity, parity, selectedComo), [age, gravidity, parity, selectedComo]);
  const screenings = useMemo(() => bestAOG ? getScreenings(bestAOG.weeks, selectedComo, age, gravidity) : [], [bestAOG, selectedComo, age, gravidity]);
  const supplements = useMemo(() => bestAOG ? getSupplements(bestAOG.weeks, selectedComo) : [], [bestAOG, selectedComo]);

  // ─── Callbacks ───────────────────────────────────────────────────────
  const toggleComo = useCallback((id) => {
    setSelectedComo((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const toggleDanger = useCallback((id) => {
    setDangerChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const activeDangers = DANGER_SIGNS.filter((d) => dangerChecked[d.id]);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.bg} 0%, #e2ece8 50%, #d5e5de 100%)`,
        fontFamily: fonts.heading,
        color: colors.text,
      }}
    >
      <link href={fonts.googleUrl} rel="stylesheet" />

      {/* ── Header ──────────────────────────────────────────── */}
      <header
        style={{
          background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.accent} 100%)`,
          color: "white",
          padding: "20px 28px",
          boxShadow: "0 4px 20px rgba(43,103,119,0.25)",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              PrenaTrack{" "}
              <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.8 }}>PH</span>
            </h1>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 13,
                margin: "3px 0 0",
                opacity: 0.85,
                fontWeight: 300,
              }}
            >
              Prenatal Clinical Decision Support · Philippine Guidelines (DOH · POGS)
            </p>
          </div>
          {bestAOG && (
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "10px 20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontFamily: fonts.body,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>
                Current AOG
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: fonts.heading }}>
                {bestAOG.weeks}
                <span style={{ fontSize: 13, fontWeight: 400 }}>w</span> {bestAOG.days}
                <span style={{ fontSize: 13, fontWeight: 400 }}>d</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>
                {trimester} Trimester · {bestAOG.source}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Tab bar ─────────────────────────────────────────── */}
      <nav
        style={{
          background: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", gap: 0 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "13px 18px",
                border: "none",
                background: tab === t.id ? colors.primaryLight : "transparent",
                color: tab === t.id ? colors.primaryDark : colors.textLight,
                fontFamily: fonts.body,
                fontSize: 13.5,
                fontWeight: tab === t.id ? 600 : 400,
                cursor: "pointer",
                borderBottom: tab === t.id ? `3px solid ${colors.primary}` : "3px solid transparent",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main content ───────────────────────────────────── */}
      <main style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 20px 60px", overflowX: "hidden" }}>
        {/* INPUT TAB */}
        {tab === "input" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            <Card title="Patient Demographics" icon="👤">
              <FormRow label="Date of Birth">
                <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} style={inputStyle()} />
                {age !== null && <span style={badgeStyle(colors.primary)}>Age: {age} years</span>}
              </FormRow>
            </Card>

            <Card title="Obstetric Dating" icon="📅">
              <FormRow label="Last Menstrual Period (LMP)">
                <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} style={inputStyle()} />
              </FormRow>
              <FormRow label="Early Ultrasound Date">
                <input type="date" value={utzDate} onChange={(e) => setUtzDate(e.target.value)} style={inputStyle()} />
              </FormRow>
              <FormRow label="AOG at UTZ">
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <input type="number" min="0" max="42" value={utzWeeks} onChange={(e) => setUtzWeeks(e.target.value)} placeholder="Wks" style={{ ...inputStyle(), width: 70, minWidth: 60 }} />
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textLight }}>weeks</span>
                  <input type="number" min="0" max="6" value={utzDays} onChange={(e) => setUtzDays(e.target.value)} placeholder="Days" style={{ ...inputStyle(), width: 70, minWidth: 60 }} />
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.textLight }}>days</span>
                </div>
              </FormRow>
              <div style={{ marginTop: 14, padding: "12px 14px", background: colors.accentLight, borderRadius: 8, fontFamily: fonts.body, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>AOG by LMP:</span>
                  <strong>{lmpAOG ? `${lmpAOG.weeks}w ${lmpAOG.days}d` : "—"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>AOG by UTZ:</span>
                  <strong>{utzAOG ? `${utzAOG.weeks}w ${utzAOG.days}d` : "—"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>EDC by LMP:</span>
                  <strong>{formatDate(edcLMP)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>EDC by UTZ:</span>
                  <strong>{formatDate(edcUTZ)}</strong>
                </div>
                {bestAOG && (
                  <>
                    <div style={{ borderTop: `1px solid ${colors.accent}`, marginTop: 8, paddingTop: 8, fontWeight: 600, color: colors.primaryDark }}>
                      ★ Best estimate: {bestAOG.weeks}w {bestAOG.days}d — {bestAOG.source}
                    </div>
                    <div style={{ fontSize: 12, color: colors.textLight, marginTop: 2 }}>
                      {trimester} Trimester · EDC: {formatDate(bestAOG.source.includes("UTZ") ? edcUTZ : edcLMP)}
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card title="Obstetric Score (GTPAL)" icon="🤰">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Gravidity (G)", gravidity, setGravidity],
                  ["Parity (P)", parity, setParity],
                  ["Term (T)", term, setTerm],
                  ["Preterm (P)", preterm, setPreterm],
                  ["Abortion (A)", abortion, setAbortion],
                  ["Living (L)", living, setLiving],
                ].map(([label, val, setter]) => (
                  <FormRow key={label} label={label}>
                    <input type="number" min="0" value={val} onChange={(e) => setter(e.target.value)} style={{ ...inputStyle(), width: "100%" }} />
                  </FormRow>
                ))}
              </div>
              {gravidity && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: colors.primaryLight, borderRadius: 8, fontFamily: fonts.body, fontSize: 15, fontWeight: 600, color: colors.primaryDark, textAlign: "center", letterSpacing: 1 }}>
                  G{gravidity}P{parity || 0} ({term || 0}-{preterm || 0}-{abortion || 0}-{living || 0})
                </div>
              )}
            </Card>

            <Card title="Comorbidities & Risk Factors" icon="⚕️">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 0 }}>
                {COMORBIDITIES.map((c) => (
                  <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 13.5, cursor: "pointer", fontFamily: fonts.body }}>
                    <input type="checkbox" checked={selectedComo.includes(c.id)} onChange={() => toggleComo(c.id)} style={{ accentColor: colors.primary }} />
                    {c.label}
                  </label>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* SUMMARY TAB */}
        {tab === "summary" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            <Card title="Pregnancy Summary" icon="📊">
              <SummaryRow label="Age" value={age !== null ? `${age} years` : "—"} />
              <SummaryRow label="OB Score" value={gravidity ? `G${gravidity}P${parity || 0} (${term || 0}-${preterm || 0}-${abortion || 0}-${living || 0})` : "—"} />
              <SummaryRow label="LMP" value={lmp ? formatDate(new Date(lmp)) : "—"} />
              <SummaryRow label="AOG by LMP" value={lmpAOG ? `${lmpAOG.weeks}w ${lmpAOG.days}d` : "—"} />
              <SummaryRow label="AOG by UTZ" value={utzAOG ? `${utzAOG.weeks}w ${utzAOG.days}d` : "—"} />
              <SummaryRow label="Best AOG" value={bestAOG ? `${bestAOG.weeks}w ${bestAOG.days}d (${bestAOG.source})` : "—"} highlight />
              <SummaryRow label="Trimester" value={trimester || "—"} />
              <SummaryRow label="EDC (LMP)" value={formatDate(edcLMP)} />
              <SummaryRow label="EDC (UTZ)" value={formatDate(edcUTZ)} />
              <SummaryRow label="Comorbidities" value={selectedComo.length > 0 ? COMORBIDITIES.filter((c) => selectedComo.includes(c.id)).map((c) => c.label).join(", ") : "None reported"} />
            </Card>

            <Card title="Risk Stratification" icon="⚡">
              {risks.length === 0 ? (
                <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textLight, fontStyle: "italic" }}>
                  Enter patient data to generate risk assessment.
                </p>
              ) : (
                risks.map((r, i) => (
                  <div key={i} style={{ padding: "10px 14px", marginBottom: 8, borderRadius: 8, background: r.level === "high" ? colors.dangerBg : r.level === "moderate" ? colors.warningBg : colors.accentLight, borderLeft: `4px solid ${colors[r.level]}`, fontFamily: fonts.body, fontSize: 13.5 }}>
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: colors[r.level], marginBottom: 2, letterSpacing: 0.5 }}>
                      {r.level} risk
                    </span>
                    <div>{r.factor}</div>
                  </div>
                ))
              )}
            </Card>

            <Card title="Prenatal Visit Schedule (DOH Minimum)" icon="🗓️">
              <div style={{ fontFamily: fonts.body, fontSize: 13.5 }}>
                {VISIT_SCHEDULE.map((v, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? `1px solid ${colors.border}` : "none" }}>
                    <div style={{ fontWeight: 600, color: colors.primary }}>{v.visit} — {v.timing}</div>
                    <div style={{ color: colors.textLight, marginTop: 2 }}>{v.focus}</div>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: "10px 14px", background: colors.warningBg, borderRadius: 8, fontSize: 12.5, color: colors.text }}>
                  <strong>Note:</strong> DOH mandates minimum 4 prenatal visits. POGS recommends monthly until 28 weeks, biweekly until 36 weeks, then weekly until delivery. High-risk pregnancies may require more frequent visits.
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* SCREENING TAB */}
        {tab === "screening" && (
          <div>
            {!bestAOG ? (
              <Card title="Screenings & Indicated Tests" icon="🔬">
                <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textLight, fontStyle: "italic" }}>
                  Please enter LMP or UTZ data in the Patient Data tab to generate AOG-appropriate screening recommendations.
                </p>
              </Card>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: 20 }}>
                {screenings.map((s, i) => (
                  <Card key={i} title={s.category} icon="🔬" subtitle={s.timing}>
                    {s.tests.map((t, j) => (
                      <div key={j} style={{ padding: "7px 0", borderBottom: j < s.tests.length - 1 ? `1px dotted ${colors.border}` : "none", fontFamily: fonts.body, fontSize: 13.5, display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: colors.accent, flexShrink: 0, marginTop: 1 }}>•</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUPPLEMENTS TAB */}
        {tab === "supplements" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: 20 }}>
            {supplements.length === 0 ? (
              <Card title="Prenatal Supplements" icon="💊">
                <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textLight, fontStyle: "italic" }}>
                  Enter patient data to generate supplement recommendations.
                </p>
              </Card>
            ) : (
              supplements.map((s, i) => (
                <Card key={i} title={s.name} icon="💊">
                  <div style={{ fontFamily: fonts.body, fontSize: 13.5 }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, color: colors.primary }}>Dose: </span>{s.dose}
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, color: colors.primary }}>Timing: </span>{s.timing}
                    </div>
                    <div style={{ padding: "10px 14px", background: colors.primaryLight, borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, color: colors.primaryDark }}>
                      💡 {s.notes}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* HISTORY GUIDE TAB */}
        {tab === "history" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            {[
              { title: "Obstetric History", items: OB_HISTORY_CHECKLIST, prefix: "ob" },
              { title: "Medical / Surgical History", items: MEDICAL_HISTORY_CHECKLIST, prefix: "med" },
              { title: "Social History & Psychosocial Screen", items: SOCIAL_HISTORY_CHECKLIST, prefix: "soc" },
              { title: "Family History", items: FAMILY_HISTORY_CHECKLIST, prefix: "fam" },
            ].map((section) => (
              <Card key={section.prefix} title={section.title} icon="📝" subtitle={`${section.items.filter((_, i) => historyChecked[`${section.prefix}_${i}`]).length}/${section.items.length} reviewed`}>
                {section.items.map((item, i) => (
                  <CheckItem key={i} label={item} checked={!!historyChecked[`${section.prefix}_${i}`]} onChange={() => setHistoryChecked((prev) => ({ ...prev, [`${section.prefix}_${i}`]: !prev[`${section.prefix}_${i}`] }))} />
                ))}
              </Card>
            ))}

            <Card title="Review of Symptoms — Current Pregnancy" icon="🤰" subtitle="Ask about each">
              {CURRENT_PREGNANCY_SYMPTOMS.map((item, i) => (
                <CheckItem key={i} label={item} checked={!!historyChecked[`ros_${i}`]} onChange={() => setHistoryChecked((prev) => ({ ...prev, [`ros_${i}`]: !prev[`ros_${i}`] }))} />
              ))}
            </Card>
          </div>
        )}

        {/* PE CHECKLIST TAB */}
        {tab === "pe" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            {PE_CHECKLIST.map((section, si) => (
              <Card key={si} title={section.category} icon="🩺" subtitle={`${section.items.filter((_, i) => peChecked[`pe_${si}_${i}`]).length}/${section.items.length} done`}>
                {section.items.map((item, i) => (
                  <CheckItem key={i} label={item} checked={!!peChecked[`pe_${si}_${i}`]} onChange={() => setPeChecked((prev) => ({ ...prev, [`pe_${si}_${i}`]: !prev[`pe_${si}_${i}`] }))} />
                ))}
              </Card>
            ))}

            {bestAOG && bestAOG.weeks >= 20 && (
              <Card title="Fundal Height Reference (McDonald's Rule)" icon="📏">
                <div style={{ fontFamily: fonts.body, fontSize: 13.5 }}>
                  <p style={{ marginBottom: 10, color: colors.textLight }}>
                    Symphysis-fundal height in cm should approximate AOG in weeks (±2 cm) from 20–36 weeks.
                  </p>
                  <div style={{ padding: "12px 14px", background: colors.primaryLight, borderRadius: 8, marginBottom: 10 }}>
                    <div style={{ fontWeight: 600, color: colors.primaryDark }}>
                      Expected SFH for {bestAOG.weeks}w: {Math.max(bestAOG.weeks - 2, 18)}–{bestAOG.weeks + 2} cm
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: colors.textLight }}>
                    <strong>SFH &gt; expected:</strong> Consider LGA, multiple gestation, polyhydramnios, wrong dates.<br />
                    <strong>SFH &lt; expected:</strong> Consider IUGR, oligohydramnios, wrong dates, transverse lie.
                  </div>
                </div>
              </Card>
            )}

            {bestAOG && bestAOG.weeks >= 28 && (
              <Card title="Leopold's Maneuvers Guide" icon="🤲">
                <div style={{ fontFamily: fonts.body, fontSize: 13.5 }}>
                  {LEOPOLDS.map((m, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? `1px dotted ${colors.border}` : "none" }}>
                      <div style={{ fontWeight: 600, color: colors.primary }}>{m.maneuver}</div>
                      <div style={{ marginTop: 3 }}><em>Technique:</em> {m.technique}</div>
                      <div style={{ marginTop: 2, color: colors.textLight }}><em>Determines:</em> {m.determines}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* DANGER SIGNS TAB */}
        {tab === "danger" && (
          <div>
            <Card title="10 Danger Signs in Pregnancy (DOH)" icon="⚠️" subtitle="Check all that apply — positive findings generate actions below">
              <div style={{ marginBottom: 16 }}>
                {activeDangers.length > 0 && (
                  <div style={{ padding: "12px 16px", background: colors.dangerBg, borderRadius: 10, border: `2px solid ${colors.danger}`, marginBottom: 16, fontFamily: fonts.body }}>
                    <div style={{ fontWeight: 700, color: colors.danger, fontSize: 14, marginBottom: 8 }}>
                      🚨 {activeDangers.length} DANGER SIGN{activeDangers.length > 1 ? "S" : ""} POSITIVE
                    </div>
                    {activeDangers.map((d) => (
                      <div key={d.id} style={{ padding: "8px 0", borderBottom: `1px solid #fee`, fontSize: 13.5 }}>
                        <div style={{ fontWeight: 600 }}>{d.label}</div>
                        <div style={{ color: colors.danger, marginTop: 3 }}>→ {d.action}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {DANGER_SIGNS.map((d) => (
                <div key={d.id} style={{ padding: "12px 14px", marginBottom: 8, borderRadius: 10, background: dangerChecked[d.id] ? (d.severity === "critical" ? colors.dangerBg : colors.warningBg) : "#fafcfb", border: `1px solid ${dangerChecked[d.id] ? (d.severity === "critical" ? colors.danger : colors.warning) : colors.border}`, transition: "all 0.2s" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <input type="checkbox" checked={!!dangerChecked[d.id]} onChange={() => toggleDanger(d.id)} style={{ marginTop: 3, accentColor: d.severity === "critical" ? colors.danger : colors.warning, width: 18, height: 18 }} />
                    <div style={{ fontFamily: fonts.body }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        {d.label}
                        <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: d.severity === "critical" ? colors.danger : colors.warning, background: d.severity === "critical" ? "#fee" : "#fff8e6", padding: "2px 6px", borderRadius: 4 }}>
                          {d.severity}
                        </span>
                      </div>
                      {dangerChecked[d.id] && (
                        <div style={{ marginTop: 6, fontSize: 13, color: d.severity === "critical" ? colors.danger : "#92600a", lineHeight: 1.5 }}>
                          <strong>Action:</strong> {d.action}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* VACCINES TAB */}
        {tab === "vaccines" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: 20 }}>
            {VACCINES.map((v, i) => {
              const relevant = !bestAOG
                ? true
                : v.trimester === "any"
                ? true
                : v.trimester === "first" && bestAOG.weeks < 14
                ? true
                : v.trimester === "second" && bestAOG.weeks >= 14 && bestAOG.weeks < 28
                ? true
                : v.trimester === "third" && bestAOG.weeks >= 28
                ? true
                : false;
              return (
                <Card key={i} title={v.name} icon="💉" subtitle={relevant && bestAOG ? "✓ Applicable this trimester" : ""}>
                  <div style={{ fontFamily: fonts.body, fontSize: 13.5 }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, color: colors.primary }}>Schedule: </span>
                      {v.schedule}
                    </div>
                    <div style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, background: relevant ? colors.accentLight : "#f7f7f7", color: relevant ? colors.primaryDark : colors.textLight }}>
                      {relevant ? "✓ Applicable for current AOG / trimester" : "Scheduled for a different trimester"}
                    </div>
                  </div>
                </Card>
              );
            })}

            <Card title="Immunization Notes (Philippine Context)" icon="📋">
              <div style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.7, color: colors.text }}>
                <p>
                  <strong>Td per DOH EPI:</strong> The Philippine EPI schedule uses Td (not Tdap) as the standard. Td doses are given based on previous immunization status. For women with unknown or incomplete immunization: Td1 at first visit, Td2 at least 4 weeks later, Td3 at least 6 months after Td2.
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>Tdap (Pertussis):</strong> POGS recommends Tdap at 27–36 weeks each pregnancy for passive pertussis immunity transfer to newborn. This may not be universally available in government facilities.
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>Contraindicated in pregnancy:</strong> Live vaccines — MMR, Varicella, BCG, OPV, Yellow Fever. If needed, defer to postpartum.
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        style={{
          background: colors.primaryDark,
          color: "rgba(255,255,255,0.7)",
          padding: "16px 28px",
          fontFamily: fonts.body,
          fontSize: 12,
          textAlign: "center",
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: "rgba(255,255,255,0.9)" }}>PrenaTrack PH</strong> — Clinical decision support tool. Not a substitute for clinical judgment.
        <br />
        Based on DOH Administrative Orders, POGS Clinical Practice Guidelines, WHO Recommendations on Antenatal Care, ACOG/FIGO Guidelines.
        <br />
        Always verify with the latest published guidelines. For emergencies, refer immediately.
      </footer>
    </div>
  );
}
