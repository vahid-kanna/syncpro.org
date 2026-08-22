import { useState } from "react";
import { FileText, CheckCircle2, Download, Scale, Calendar, AlertCircle } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function DisputeDefenseTerminal() {
  const reveal = useReveal();
  const [activeTab, setActiveTab] = useState<"NOTICE" | "EVIDENCE" | "IMPACT_GRAPH">("NOTICE");

  return (
    <section
      id="claims-shield"
      style={{
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "rgba(10, 11, 14, 0.4)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap-lg">
        {/* Section Header */}
        <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
          <div className="row gap-2 mb-3" style={{ alignItems: "center" }}>
            <span
              className="mono xs"
              style={{
                color: "var(--brand)",
                background: "var(--brand-bg)",
                border: "1px solid var(--brand-line)",
                padding: "3px 10px",
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              MODULE 04 // CONTEMPORANEOUS DISPUTE DEFENSE
            </span>
            <span className="mono xs dim desktop-nav">FIDIC 8.4 / 20.1 &amp; NEC4 CLAUSE 60.1</span>
          </div>
          <h2
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
              maxWidth: "840px",
              marginTop: "8px",
            }}
          >
            Dispute immunity <br />
            <span style={{ fontStyle: "italic", color: "var(--brass)" }}>sealed in real time.</span>
          </h2>
          <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}>
            The average megaproject dispute costs $60M and takes 16 months to resolve. SyncPro continuously assembles
            legally binding contemporaneous evidence dossiers, generating 1-click contractual notices before time-bar clauses expire.
          </p>
        </div>

        {/* Interactive Dossier Terminal Console */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.96)",
            border: "1px solid var(--line-strong)",
            padding: "30px",
            borderRadius: "var(--r-md)",
            boxShadow: "var(--shadow-pop)",
          }}
        >
          {/* Terminal Header */}
          <div className="row between mb-5 pb-3 wrapf" style={{ borderBottom: "1px solid var(--line-soft)" }}>
            <div className="row gap-3" style={{ alignItems: "center" }}>
              <span className="status xs" style={{ color: "var(--brand)" }}>
                <Scale className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
                AUTOMATED CLAIMS DOSSIER // CASE #FIDIC-2026-084
              </span>
              <span className="mono xs dim desktop-nav">TIME-BAR DEADLINE: 18 DAYS REMAINING</span>
            </div>

            {/* Terminal Tab Switchers */}
            <div className="row gap-2">
              <button
                type="button"
                className={`btn btn-sm mono xs ${activeTab === "NOTICE" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("NOTICE")}
                style={{ padding: "7px 14px" }}
              >
                <FileText className="ico" style={{ width: 13, height: 13 }} />
                FORMAL_NOTICE_DRAFT
              </button>
              <button
                type="button"
                className={`btn btn-sm mono xs ${activeTab === "EVIDENCE" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("EVIDENCE")}
                style={{ padding: "7px 14px" }}
              >
                <CheckCircle2 className="ico" style={{ width: 13, height: 13 }} />
                EVIDENCE_PACKET (5)
              </button>
              <button
                type="button"
                className={`btn btn-sm mono xs ${activeTab === "IMPACT_GRAPH" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveTab("IMPACT_GRAPH")}
                style={{ padding: "7px 14px" }}
              >
                <Calendar className="ico" style={{ width: 13, height: 13 }} />
                TIME_IMPACT_ANALYSIS
              </button>
            </div>
          </div>

          {/* Tab 01: Notice Draft */}
          {activeTab === "NOTICE" && (
            <div
              style={{
                background: "rgba(10, 11, 14, 0.9)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xs)",
                padding: "24px",
              }}
            >
              <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                <div className="mono xs" style={{ color: "var(--brass)" }}>
                  TO: THE ENGINEER // EMPLOYER REPRESENTATIVE
                </div>
                <div className="mono xs dim">DATE: 24 MAY 2026 · NOTICE REF: #EOT-084-REV0</div>
              </div>

              <h4 style={{ fontSize: "16px", color: "var(--text)", marginBottom: "12px" }}>
                NOTICE OF INTENTION TO CLAIM EXTENSION OF TIME (EOT) UNDER FIDIC SUB-CLAUSE 8.4 [EXTENSION OF TIME FOR COMPLETION]
              </h4>

              <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "14px" }}>
                Dear Sir/Madam, <br />
                Pursuant to Sub-Clause 8.4 and Sub-Clause 20.1 of the Conditions of Contract, the Contractor hereby gives formal notice
                of a delay event affecting <strong style={{ color: "var(--text)" }}>Activity #A1084 (North Elevation Unitized Glazing)</strong>, which forms part of the Critical Path of the Approved Baseline Schedule (Revision 04).
              </p>

              <div
                className="p-3 mb-4"
                style={{
                  background: "rgba(217, 119, 87, 0.08)",
                  border: "1px solid var(--brand-line)",
                  borderRadius: "var(--r-xs)",
                }}
              >
                <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                  <AlertCircle className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
                  <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                    DELAY SUMMARY &amp; ENTITLEMENT QUANTIFICATION:
                  </span>
                </div>
                <ul className="xs" style={{ color: "var(--text-2)", paddingLeft: "20px", margin: 0, lineHeight: 1.6 }}>
                  <li>Delay Cause: Port customs clearance hold of structural extrusion profiles (Employer Nominated Supplier).</li>
                  <li>Critical Path Impact: 4.5 working days total float consumed; secondary path driven critical.</li>
                  <li>Liquidated Damages Shield: $315,000 preliminary exposure averted.</li>
                </ul>
              </div>

              <div className="row between pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
                <span className="mono xs dim">CRYPTOGRAPHIC SEAL: SHA-256 VALIDATED · 5 OF 5 ARTIFACTS ATTACHED</span>
                <button type="button" className="btn btn-outline btn-sm mono xs" style={{ color: "var(--brass)" }}>
                  <Download className="ico" style={{ width: 12, height: 12 }} />
                  EXPORT_LEGAL_PDF_BUNDLE
                </button>
              </div>
            </div>
          )}

          {/* Tab 02: Evidence Packet */}
          {activeTab === "EVIDENCE" && (
            <div className="grid-2 gap-4">
              {[
                { title: "Supplier Batch Release Slip", doc: "#CEMEX-88412", date: "18 May 2026", type: "Material Verification" },
                { title: "Tower Crane Telemetry Log", doc: "#CR-04-WIND", date: "19 May 2026", type: "Force Majeure Weather" },
                { title: "Site Agent Voice Note Audio", doc: "#AUD-20260519", date: "19 May 2026", type: "Contemporaneous Record" },
                { title: "Port Customs Clearance Hold", doc: "#CUST-9921", date: "20 May 2026", type: "Third-Party Delay" },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="p-3"
                  style={{
                    background: "rgba(10, 11, 14, 0.8)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-xs)",
                  }}
                >
                  <div className="row between mb-1">
                    <span className="mono xs" style={{ color: "var(--brass)" }}>{ev.doc}</span>
                    <span className="mono xs dim">{ev.date}</span>
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text)" }}>{ev.title}</div>
                  <div className="xs dim mt-1">{ev.type}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 03: Time Impact Analysis */}
          {activeTab === "IMPACT_GRAPH" && (
            <div
              style={{
                background: "rgba(10, 11, 14, 0.9)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-xs)",
                padding: "20px",
              }}
            >
              <div className="row between mb-3">
                <span className="mono xs" style={{ color: "var(--brand)" }}>
                  TIA FRAGNET SIMULATION // WINDOW 04
                </span>
                <span className="mono xs dim">METHOD: SCL PROTOCOL 2ND ED.</span>
              </div>
              <p className="xs dim mb-4">
                Fragnet inserted into un-impacted Baseline Schedule to simulate discrete delay propagation across downstream commissioning tasks.
              </p>
              <div className="p-3" style={{ background: "rgba(0,0,0,0.6)", borderRadius: "var(--r-xs)" }}>
                <div className="row between mono xs mb-1">
                  <span style={{ color: "var(--text)" }}>Unimpacted Substantial Completion:</span>
                  <span>14 NOV 2026</span>
                </div>
                <div className="row between mono xs" style={{ color: "var(--brand)" }}>
                  <span>Impacted Forecast Completion:</span>
                  <span>19 NOV 2026 (+4.5 Working Days)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
