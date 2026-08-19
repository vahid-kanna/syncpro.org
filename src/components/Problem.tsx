import { AlertTriangle, TrendingDown, FileWarning, Scale } from "lucide-react";
import { useReveal } from "../lib/useReveal";

const METRICS = [
  {
    icon: <TrendingDown className="ico" style={{ color: "var(--danger)" }} />,
    value: "$1.85T",
    label: "Lost annually to bad data & rework",
    source: "FMI / Autodesk",
  },
  {
    icon: <AlertTriangle className="ico" style={{ color: "var(--warning)" }} />,
    value: "98%",
    label: "Of capital megaprojects overrun budget/time",
    source: "McKinsey Global Institute",
  },
  {
    icon: <FileWarning className="ico" style={{ color: "var(--brand-400)" }} />,
    value: "12%",
    label: "Of project baselines pass DCMA-14 health",
    source: "SmartPM / DoD Benchmark",
  },
  {
    icon: <Scale className="ico" style={{ color: "var(--steel)" }} />,
    value: "$60M",
    label: "Average global construction dispute value",
    source: "Arcadis Global Disputes",
  },
];

export function Problem() {
  const reveal = useReveal();

  return (
    <section id="problem" className="wrap-lg section-sm">
      <div ref={reveal.ref} className={reveal.className}>
        <div className="inset" style={{ padding: "36px 32px" }}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1.15fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div className="eyebrow mb-2">THE STRUCTURAL GAP</div>
              <h2 className="h1">
                The plan-to-reality loop is where schedules break — and where software hasn't gone.
              </h2>
              <p className="body mt-4 measure">
                The schedule reflects contractual intent in Primavera P6 or MS Project. Field teams know
                what actually occurred on site today.
              </p>
              <p className="body mt-3 measure" style={{ color: "var(--text-3)" }}>
                Between them lies a manual, subjective game of telephone: WhatsApp voice notes, disjointed
                daily logs, and spreadsheet reconciliations. When updates finally hit the baseline 3 weeks
                late, the delay has already metastasized into a claim.
              </p>
            </div>

            <div className="grid-2 gap-4">
              {METRICS.map((m) => (
                <div key={m.value} className="kpi" style={{ background: "var(--bg-surface)" }}>
                  <div className="row between mb-2">
                    <span className="iconbox-sm">{m.icon}</span>
                    <span className="xs faint">{m.source}</span>
                  </div>
                  <div className="figure" style={{ color: "var(--text)" }}>
                    {m.value}
                  </div>
                  <div className="xs dim mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
