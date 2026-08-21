import { useState } from "react";
import { CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface DCMAItem {
  id: number;
  metric: string;
  threshold: string;
  measured: string;
  status: "PASSED" | "FLAGGED";
  remediation: string;
}

const DCMA_METRICS: DCMAItem[] = [
  {
    id: 1,
    metric: "Logic Open Ends (Missing Predecessor / Successor)",
    threshold: "< 5.0% of total activities",
    measured: "0.2% (2 of 940 activities)",
    status: "PASSED",
    remediation: "Deterministic Neo4j topological sort mapped unlinked slab activities to downstream MEP riser rough-in.",
  },
  {
    id: 2,
    metric: "Leads (Negative Lags on Relationships)",
    threshold: "0.0% (Strict prohibition)",
    measured: "0.0% (Zero leads found)",
    status: "PASSED",
    remediation: "Subcontractor negative leads automatically converted to legitimate start-to-start (SS) with positive lag.",
  },
  {
    id: 3,
    metric: "Excessive Positive Lags (> 5 Days)",
    threshold: "< 5.0% of total relationships",
    measured: "1.4% (13 relationships)",
    status: "PASSED",
    remediation: "Concrete cure lags verified against ASTM C39 strength development curves.",
  },
  {
    id: 4,
    metric: "Relationship Types (Finish-to-Start Dominance)",
    threshold: "> 90.0% Finish-to-Start (FS)",
    measured: "94.2% FS relationships",
    status: "PASSED",
    remediation: "Complex start-to-finish (SF) anomalies refactored into clean finish-to-start dependency chains.",
  },
  {
    id: 5,
    metric: "Hard Constraints (Mandatory Start / Finish)",
    threshold: "< 5.0% of uncompleted activities",
    measured: "0.6% (Contractual milestones only)",
    status: "PASSED",
    remediation: "Artificial scheduling hard locks removed in favor of free forward/backward CPM float passes.",
  },
  {
    id: 6,
    metric: "High Float Traps (Total Float > 44 Working Days)",
    threshold: "< 5.0% of total activities",
    measured: "2.1% (20 activities)",
    status: "PASSED",
    remediation: "Orphaned activities tied into master substation energization milestone.",
  },
  {
    id: 7,
    metric: "Critical Path Length Index (CPLI Integrity)",
    threshold: "CPLI >= 1.00",
    measured: "1.04 (Target on schedule)",
    status: "PASSED",
    remediation: "Float consumption monitored in real time across primary, secondary, and tertiary critical paths.",
  },
  {
    id: 8,
    metric: "Baseline Execution Index (BEI Progress)",
    threshold: "BEI >= 0.95",
    measured: "0.98 (On-track execution)",
    status: "PASSED",
    remediation: "128 tasks finished on or ahead of baseline target dates.",
  },
];

export function DCMA14Matrix() {
  const reveal = useReveal();
  const [activeItem, setActiveItem] = useState<DCMAItem>(DCMA_METRICS[0]);

  return (
    <section
      id="dcma-scanner"
      className="wrap-lg py-16"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
        <div className="row gap-2 mb-3">
          <span className="sdot" style={{ background: "var(--brass)" }} />
          <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
            ENGINEERING INSTRUMENT 02 // DCMA-14 FORENSIC SCHEDULE DIAGNOSTICS
          </span>
        </div>
        <h2
          className="display"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 3.8vw, 52px)",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "840px",
          }}
        >
          Automated defense-grade <br />
          <span style={{ fontStyle: "italic", color: "var(--brand)" }}>schedule health verification.</span>
        </h2>
        <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "16.5px" }}>
          Before any update touches your baseline, SyncPro runs all 14 Defense Contract Management Agency (DCMA) integrity
          checks across your Oracle Primavera P6 (.xer) and Asta Powerproject (.pp) schedules.
        </p>
      </div>

      <div className="grid-2 gap-6">
        {/* Left Column: Interactive 14-Point Diagnostic List */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.9)",
            border: "1px solid var(--line)",
            padding: "20px",
            borderRadius: "var(--r-md)",
            maxHeight: "480px",
            overflowY: "auto",
          }}
        >
          <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
            <span className="mono xs" style={{ color: "var(--brass)" }}>
              DCMA-14 CRITERIA AUDIT (14 OF 14 VERIFIED)
            </span>
            <span className="mono xs dim">STANDARD: DoD 5000.2</span>
          </div>

          <div className="col gap-2">
            {DCMA_METRICS.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  style={{
                    padding: "12px 14px",
                    background: isSelected ? "var(--bg-elevated)" : "rgba(10, 11, 14, 0.6)",
                    border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line-soft)",
                    borderRadius: "var(--r-xs)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div className="row between mb-1">
                    <span className="mono xs" style={{ color: isSelected ? "var(--brand)" : "var(--text-3)" }}>
                      CHECK #{item.id.toString().padStart(2, "0")}
                    </span>
                    <span className="row gap-1 xs" style={{ color: "var(--brass)" }}>
                      <CheckCircle2 className="ico" style={{ width: 12, height: 12 }} />
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{item.metric}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Check Inspection & Automated Logic Repair */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.95)",
            border: "1px solid var(--line-strong)",
            padding: "28px",
            borderRadius: "var(--r-md)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="row between mb-4 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                INSPECTION DETAIL // CHECK #{activeItem.id.toString().padStart(2, "0")}
              </span>
              <span className="status xs" style={{ color: "var(--brass)" }}>
                <ShieldCheck className="ico" style={{ width: 12, height: 12, color: "var(--brass)" }} />
                COMPLIANT
              </span>
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "16px" }}>
              {activeItem.metric}
            </h3>

            <div className="grid-2 gap-4 mb-6">
              <div className="p-3" style={{ background: "rgba(10, 11, 14, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                <div className="mono xs dim mb-1">ALLOWED THRESHOLD:</div>
                <div className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                  {activeItem.threshold}
                </div>
              </div>
              <div className="p-3" style={{ background: "rgba(10, 11, 14, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                <div className="mono xs dim mb-1">ACTUAL MEASURED:</div>
                <div className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  {activeItem.measured}
                </div>
              </div>
            </div>

            <div className="p-4" style={{ background: "rgba(10, 11, 14, 0.9)", borderLeft: "3px solid var(--brass)", borderRadius: "var(--r-xs)" }}>
              <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                <RefreshCw className="ico" style={{ width: 13, height: 13, color: "var(--brass)" }} />
                <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                  AUTOMATED GRAPH LOGIC REMEDIATION:
                </span>
              </div>
              <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: 1.5, margin: 0 }}>
                {activeItem.remediation}
              </p>
            </div>
          </div>

          <div className="row between mt-6 pt-3" style={{ borderTop: "1px solid var(--line-soft)" }}>
            <span className="mono xs dim">AUDIT ENGINE: NEO4J SCHEDULE KNOWLEDGE GRAPH</span>
            <span className="mono xs" style={{ color: "var(--text-3)" }}>
              AUTOMATED CORRECTION TIME: &lt; 40ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
