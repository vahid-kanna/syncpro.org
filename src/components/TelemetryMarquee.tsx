
const TELEMETRY_ITEMS = [
  "LATENCY: 0.04ms",
  "P6 .XER PARSER ENGINE: SYNCHRONIZED",
  "DCMA-14 HEALTH AUDIT: 14/14 CHECKS PASSED",
  "FIDIC SUB-CLAUSE 8.4 CLAIMS DEFENSE: ARMED",
  "NEO4J DETERMINISTIC GRAPH: 18,400 NODES MAPPED",
  "MULTI-SOURCE CORROBORATION: 94.8% TRUST SCORE",
  "TAMPER-EVIDENT AS-BUILT LOG: CRYPTOGRAPHICALLY SEALED",
  "ZERO MODEL TRAINING ON CLIENT DATA: STRICT AIR-GAP",
];

export function TelemetryMarquee() {
  return (
    <div
      className="telemetry-marquee"
      style={{
        width: "100%",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-sunken)",
        overflow: "hidden",
        display: "flex",
        padding: "10px 0",
      }}
    >
      <div className="marquee-track" style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {/* Render twice for seamless loop */}
        {[...TELEMETRY_ITEMS, ...TELEMETRY_ITEMS].map((item, idx) => (
          <div key={idx} className="row gap-2 mono xs" style={{ whiteSpace: "nowrap", letterSpacing: "0.08em" }}>
            <span className="structural-dot" style={{ width: 5, height: 5, background: "var(--brand)", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ color: idx % 2 === 0 ? "var(--text)" : "var(--text-3)" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
