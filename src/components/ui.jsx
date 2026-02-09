import { colors, fonts } from "../theme.js";

// ─── Card ────────────────────────────────────────────────────────────────────

export function Card({ title, icon, subtitle, children }) {
  return (
    <div
      className="card"
      style={{
        background: colors.card,
        borderRadius: 14,
        padding: "20px 22px",
        boxShadow: "0 2px 12px rgba(43,103,119,0.07)",
        border: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: fonts.heading,
              color: colors.primaryDark,
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <div
              style={{
                fontSize: 12,
                color: colors.textLight,
                fontFamily: fonts.body,
                marginTop: 1,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── FormRow ─────────────────────────────────────────────────────────────────

export function FormRow({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "block",
          fontSize: 12.5,
          fontWeight: 600,
          marginBottom: 5,
          fontFamily: fonts.body,
          color: "#4a5568",
          textTransform: "uppercase",
          letterSpacing: 0.3,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── CheckItem ───────────────────────────────────────────────────────────────

export function CheckItem({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "7px 0",
        cursor: "pointer",
        fontSize: 14,
        lineHeight: 1.5,
        color: colors.text,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          marginTop: 3,
          accentColor: colors.primary,
          width: 17,
          height: 17,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.55 : 1,
          transition: "all 0.2s",
        }}
      >
        {label}
      </span>
    </label>
  );
}

// ─── SummaryRow ──────────────────────────────────────────────────────────────

export function SummaryRow({ label, value, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: highlight ? "9px 12px" : "9px 0",
        borderBottom: `1px solid ${colors.border}`,
        fontFamily: fonts.body,
        fontSize: 14,
        background: highlight ? colors.accentLight : "transparent",
        borderRadius: highlight ? 8 : 0,
        marginBottom: highlight ? 4 : 0,
      }}
    >
      <span style={{ color: colors.textLight, fontWeight: 500 }}>{label}</span>
      <span
        style={{
          fontWeight: highlight ? 700 : 500,
          color: highlight ? colors.primaryDark : colors.text,
          textAlign: "right",
          maxWidth: "60%",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function inputStyle() {
  return {
    padding: "8px 12px",
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    fontFamily: fonts.body,
    fontSize: 14,
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
    color: colors.text,
    background: "#fafcfb",
  };
}

export function badgeStyle(color) {
  return {
    display: "inline-block",
    marginTop: 6,
    padding: "3px 10px",
    borderRadius: 20,
    background: color,
    color: "white",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: fonts.body,
  };
}
