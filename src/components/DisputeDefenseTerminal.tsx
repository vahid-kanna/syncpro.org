import { useState } from "react";
import { FileText, CheckCircle2, Download, Scale, Calendar, AlertCircle } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function DisputeDefenseTerminal() {
  const reveal = useReveal();
  const [activeTab, setActiveTab] = useState<"NOTICE" | "EVIDENCE" | "IMPACT_GRAPH">("NOTICE");

  return (
    <section
      id="claims-shield"
      className="wrap-lg py-16"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
        <div className="row gap-2 mb-3">
          <span className="sdot" style={{ background: "var(--brand)" }} />
          <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
            ENGINEERING INSTRUMENT 03 // CONTEMPORANEOUS DISPUTE DEFENSE
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
          Dispute immunity <br />
          <span style={{ fontStyle: "italic", color: "var(--brass)" }}>sealed in real time.</span>
        </h2>
        <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "16.5px" }}>
          The average megaproject dispute costs $60M and takes 16 months to resolve. SyncPro continuously assembles
          legally binding contemporaneous evidence dossiers, generating 1-click contractual notices before time-bar clauses expire.
        </p>
      </div>

      {/* Interactive Dossier Terminal Console */}
      <div
        className="card"
        style={{
          background: "rgba(18, 20, 24, 0.95)",
          border: "1px solid var(--line-strong)",
          padding: "24px",
          borderRadius: "var(--r-md)",
          boxShadow: "var(--shadow-pop)",
        }}
      >
        {/* Terminal Header */}
        <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line-soft)" }}>
          <div className="row gap-3">
            <span className="status xs" style={{ color: "var(--brand)" }}>
              <Scale className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
              DOD_FIDIC_SHIELD // AUTOMATED CLAIMS DOSSIER
            </span>
            <span className="mono xs dim desktop-nav">CONTRACT: FIDIC 2017 RED BOOK // SUB-CLAUSE 8.4 &amp; 20.1</span>
          </div>

          <div className="row gap-2">
            <button
              onClick={() => setActiveTab("NOTICE")}
              style={{
                padding: "6px 12px",
                background: activeTab === "NOTICE" ? "var(--bg-elevated)" : "transparent",
                border: activeTab === "NOTICE" ? "1px solid var(--brand)" : "1px solid transparent",
                borderRadius: "var(--r-xs)",
                color: activeTab === "NOTICE" ? "var(--text)" : "var(--text-3)",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              FORMAL_NOTICE
            </button>
            <button
              onClick={() => setActiveTab("EVIDENCE")}
              style={{
                padding: "6px 12px",
                background: activeTab === "EVIDENCE" ? "var(--bg-elevated)" : "transparent",
                border: activeTab === "EVIDENCE" ? "1px solid var(--brand)" : "1px solid transparent",
                borderRadius: "var(--r-xs)",
                color: activeTab === "EVIDENCE" ? "var(--text)" : "var(--text-3)",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              EVIDENCE_DOCKETS
            </button>
            <button
              onClick={() => setActiveTab("IMPACT_GRAPH")}
              style={{
                padding: "6px 12px",
                background: activeTab === "IMPACT_GRAPH" ? "var(--bg-elevated)" : "transparent",
                border: activeTab === "IMPACT_GRAPH" ? "1px solid var(--brand)" : "1px solid transparent",
                borderRadius: "var(--r-xs)",
                color: activeTab === "IMPACT_GRAPH" ? "var(--text)" : "var(--text-3)",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              SCHEDULE_IMPACT
            </button>
          </div>
        </div>

        {/* Tab 1: Formal Legal Notice Content */}
        {activeTab === "NOTICE" && (
          <div
            style={{
              padding: "20px",
              background: "rgba(10, 11, 14, 0.9)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-xs)",
              fontFamily: "var(--mono)",
              fontSize: "12.5px",
              lineHeight: 1.6,
            }}
          >
            <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span style={{ color: "var(--brand)", fontWeight: 700 }}>
                NOTICE OF DELAY &amp; EXTENSION OF TIME (EOT) CLAIM
              </span>
              <span className="mono xs dim">DOCKET REF: SP-EOT-2026-042</span>
            </div>

            <p style={{ color: "var(--text-2)", marginBottom: "14px" }}>
              <strong style={{ color: "var(--text)" }}>TO:</strong> The Engineer / Employer Representative <br />
              <strong style={{ color: "var(--text)" }}>RE:</strong> Notice under FIDIC Conditions of Contract (Red Book), Sub-Clause 20.1 (Contractor's Claims) and Sub-Clause 8.4 (Extension of Time for Completion).
            </p>

            <div className="p-3 mb-3" style={{ background: "rgba(18, 20, 24, 0.8)", borderLeft: "3px solid var(--brand)" }}>
              <p style={{ margin: 0, color: "var(--text)" }}>
                "In accordance with Sub-Clause 20.1, this notice is formally issued within 28 days of the event. Unforeseeable adverse site climatic conditions (sustained gale-force winds &gt; 38 knots exceeding BS EN 1991-1-4) halted tower crane #02 operations between 08:00 and 17:00 on June 14, directly impacting Critical Path Activity #A1102 (Façade Unitized Curtain Wall Erection)."
              </p>
            </div>

            <div className="row between pt-2">
              <span className="xs" style={{ color: "var(--brass)" }}>
                ✓ 3 Contemporaneous Corroborating Dockets Appended &amp; Timestamped
              </span>
              <span className="mono xs" style={{ color: "var(--text-3)" }}>
                CLAIMED CRITICAL PATH EOT: +4.5 WORKING DAYS
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Evidence Dockets */}
        {activeTab === "EVIDENCE" && (
          <div className="col gap-3">
            <div className="row between p-3" style={{ background: "rgba(10, 11, 14, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <FileText className="ico" style={{ width: 15, height: 15, color: "var(--brass)" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>Calibrated Anemometer Telemetry Log</div>
                  <div className="mono xs dim">DOC_ID: #CRANE-02-WIND-884 · 38.4 KNOTS RECORDED</div>
                </div>
              </div>
              <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                VERIFIED SOURCE
              </span>
            </div>

            <div className="row between p-3" style={{ background: "rgba(10, 11, 14, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <Calendar className="ico" style={{ width: 15, height: 15, color: "var(--brand)" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>Superintendent Shift Voice Note Transcript</div>
                  <div className="mono xs dim">AUDIO_ID: #VN-2026-06-14-1422 · TIMESTAMPTED</div>
                </div>
              </div>
              <span className="tag" style={{ background: "var(--brand-bg)", color: "var(--brand)", borderColor: "var(--brand-line)" }}>
                CORROBORATED
              </span>
            </div>

            <div className="row between p-3" style={{ background: "rgba(10, 11, 14, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
              <div className="row gap-2" style={{ alignItems: "center" }}>
                <AlertCircle className="ico" style={{ width: 15, height: 15, color: "var(--brass)" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>Subcontractor Delay Register Entry</div>
                  <div className="mono xs dim">DOC_ID: #SUB-FAÇADE-NOT-012 · SIGNED BY QA LEAD</div>
                </div>
              </div>
              <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                SEALED
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Schedule Impact Graph */}
        {activeTab === "IMPACT_GRAPH" && (
          <div
            style={{
              padding: "20px",
              background: "rgba(10, 11, 14, 0.9)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-xs)",
            }}
          >
            <div className="row between mb-3">
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                TIME IMPACT ANALYSIS (TIA) // ORACLE P6 FRAGNET
              </span>
              <span className="mono xs dim">METHODOLOGY: SCL DELAY PROTOCOL 2ND ED.</span>
            </div>

            <div className="gantt mb-3">
              <div className="gantt-row">
                <span className="lab" style={{ fontSize: 11 }}>Pre-Delay Baseline</span>
                <div className="gtrack">
                  <div className="gbar gbar-plan" style={{ left: "10%", width: "40%" }} />
                </div>
              </div>
              <div className="gantt-row">
                <span className="lab" style={{ fontSize: 11 }}>Fragnet Delay Impact</span>
                <div className="gtrack">
                  <div className="gbar gbar-crit" style={{ left: "10%", width: "48%", background: "var(--brand)" }} />
                  <span className="gtick data" style={{ left: "58%" }} />
                </div>
              </div>
            </div>

            <div className="row between pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
              <span className="mono xs dim">MEASURED CRITICAL FLOAT LOSS: -4.5 WORKING DAYS</span>
              <span className="status xs" style={{ color: "var(--brass)" }}>
                <CheckCircle2 className="ico" style={{ width: 11, height: 11, color: "var(--brass)" }} />
                PRIMA FACIE ENTITLEMENT ESTABLISHED
              </span>
            </div>
          </div>
        )}

        {/* Terminal Footer with Action Download */}
        <div className="row between mt-4 pt-3 wrapf gap-3" style={{ borderTop: "1px solid var(--line-soft)" }}>
          <span className="mono xs dim">
            AUDIT DOSSIER READY FOR SCL / FIDIC DISPUTE ADJUDICATION BOARD (DAB)
          </span>
          <button
            className="btn btn-outline mono xs"
            onClick={() => alert("SyncPro Dispute Dossier (PDF/XER Fragnet) exported successfully.")}
            style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Download className="ico" style={{ width: 13, height: 13 }} />
            DOWNLOAD_CONTEMPORANEOUS_DOSSIER.PDF
          </button>
        </div>
      </div>
    </section>
  );
}
