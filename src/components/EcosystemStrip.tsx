import { Database, CalendarRange, SquareKanban, FileCode2, Layers, Cpu } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function EcosystemStrip() {
  const reveal = useReveal();

  return (
    <div className="wrap-lg" style={{ paddingBottom: 48 }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="rule mb-4">
          <span className="eyebrow" style={{ whiteSpace: "nowrap" }}>
            READS &amp; WRITES YOUR EXISTING STACK · ZERO LOCK-IN
          </span>
        </div>
        <div className="logos">
          <span className="logo-chip">
            <Database className="ico" style={{ width: 14, height: 14, color: "var(--text-4)" }} />
            Oracle Primavera P6 <span className="mono">.xer</span>
          </span>
          <span className="logo-chip">
            <CalendarRange className="ico" style={{ width: 14, height: 14, color: "var(--text-4)" }} />
            Asta Powerproject <span className="mono">.pp</span>
          </span>
          <span className="logo-chip">
            <SquareKanban className="ico" style={{ width: 14, height: 14, color: "var(--text-4)" }} />
            Microsoft Project <span className="mono">.mpp</span>
          </span>
          <span className="logo-chip">
            <FileCode2 className="ico" style={{ width: 14, height: 14, color: "var(--text-4)" }} />
            Primavera XML / MSPDI
          </span>
          <span className="logo-chip">
            <Layers className="ico" style={{ width: 14, height: 14, color: "var(--text-4)" }} />
            Procore &amp; Autodesk ACC
          </span>
          <span className="dim small" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <Cpu className="ico" style={{ width: 13, height: 13, color: "var(--brand-400)" }} />
            High-fidelity parsing via native engine — no re-keying required.
          </span>
        </div>
      </div>
    </div>
  );
}
