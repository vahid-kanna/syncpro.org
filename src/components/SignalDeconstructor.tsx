import { useState } from "react";
import { Mic, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface SignalScenario {
  id: string;
  sourceType: string;
  sourceTimestamp: string;
  rawAudioTranscript: string;
  extractedEntity: string;
  cpmNode: string;
  activityName: string;
  corroboratingEvidence: {
    type: string;
    docNumber: string;
    status: string;
  }[];
  trustScore: number;
  cryptographicHash: string;
}

const SCENARIOS: SignalScenario[] = [
  {
    id: "SIG-01",
    sourceType: "WHATSAPP AUDIO NOTE // SUPERINTENDENT",
    sourceTimestamp: "14:22 UTC · SECTOR 04",
    rawAudioTranscript:
      "“Poured the remaining 140 cubic meters for Level 18 Core Shear Wall today. Ready-mix trucks 12 through 18 arrived with 45 MPa mix. Waiting on cube break lab tests.”",
    extractedEntity: "Level 18 Core Shear Wall // Pour 03",
    cpmNode: "#A1084",
    activityName: "Core Wall Vertical Element Concrete Placement",
    corroboratingEvidence: [
      { type: "Supplier Batch Docket", docNumber: "#CEMEX-88412", status: "VERIFIED (140m³ C45)" },
      { type: "QA Slump Test Certificate", docNumber: "#QA-SLUMP-109", status: "PASSED (160mm Slump)" },
      { type: "Site Gate OCR Log", docNumber: "#GATE-IN-4921", status: "TIMESTAMPTED (13:58 UTC)" },
    ],
    trustScore: 96.4,
    cryptographicHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "SIG-02",
    sourceType: "SITE AGENT LOG // DAILY SUPERVISOR REPORT",
    sourceTimestamp: "08:45 UTC · NORTH ELEVATION",
    rawAudioTranscript:
      "“Glazing crew could not install panels on grid lines 4-8 due to high tower crane wind gusts (38 knots). Unitized panels staged on Level 12 deck.”",
    extractedEntity: "North Elevation Curtain Wall // Grids 4-8",
    cpmNode: "#A1102",
    activityName: "Façade Unitized Curtain Wall Erection",
    corroboratingEvidence: [
      { type: "Anemometer Wind Telemetry", docNumber: "#CRANE-WIND-02", status: "EXCEEDED SAFETY (38 kts)" },
      { type: "Subcontractor Delay Log", docNumber: "#SUB-NOT-881", status: "REGISTERED" },
      { type: "Early FIDIC 8.4 Notice", docNumber: "#CLM-FIDIC-084", status: "AUTO-DRAFTED" },
    ],
    trustScore: 98.1,
    cryptographicHash: "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
  },
];

export function SignalDeconstructor() {
  const reveal = useReveal();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSignal = SCENARIOS[selectedIdx];

  return (
    <section
      id="signal-deconstructor"
      className="wrap-lg py-16"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Section Header */}
      <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
        <div className="row gap-2 mb-3">
          <span className="sdot" style={{ background: "var(--brand)" }} />
          <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
            ENGINEERING INSTRUMENT 01 // UNSTRUCTURED SIGNAL DECONSTRUCTION
          </span>
        </div>
        <h2
          className="display"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 3.8vw, 52px)",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "780px",
          }}
        >
          Earn the right to update <br />
          <span style={{ fontStyle: "italic", color: "var(--brass)" }}>the critical path.</span>
        </h2>
        <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "16.5px" }}>
          Construction teams don’t speak in Primavera activity IDs. SyncPro resolves messy field reality (voice notes,
          batch dockets, inspection slips) to exact CPM logic with deterministic multi-source corroboration.
        </p>
      </div>

      {/* Interactive Scenario Selector */}
      <div className="row gap-3 mb-6 wrapf">
        {SCENARIOS.map((s, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(idx)}
              style={{
                padding: "8px 16px",
                background: isSelected ? "var(--bg-elevated)" : "var(--bg-surface)",
                border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line)",
                borderRadius: "var(--r-xs)",
                color: isSelected ? "var(--text)" : "var(--text-3)",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: isSelected ? "var(--brand)" : "var(--text-4)" }}>[{s.id}]</span>
              <span>{s.sourceType.split("//")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* 4-Stage Deconstruction Pipeline Console */}
      <div
        className="card"
        style={{
          background: "rgba(18, 20, 24, 0.95)",
          border: "1px solid var(--line-strong)",
          padding: "28px",
          borderRadius: "var(--r-md)",
          boxShadow: "var(--shadow-pop)",
        }}
      >
        <div className="grid-2 gap-6">
          {/* Left Column: Raw Input Signal & Waveform */}
          <div>
            <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                STAGE 01 // RAW FIELD SIGNAL
              </span>
              <span className="mono xs dim">{activeSignal.sourceTimestamp}</span>
            </div>

            {/* Simulated Audio Waveform Bar */}
            <div
              style={{
                padding: "16px",
                background: "rgba(10, 11, 14, 0.8)",
                borderRadius: "var(--r-xs)",
                border: "1px solid var(--line)",
                marginBottom: "16px",
              }}
            >
              <div className="row gap-3 mb-3" style={{ alignItems: "center" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--brand-bg)",
                    border: "1px solid var(--brand-line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mic className="ico" style={{ width: 15, height: 15, color: "var(--brand)" }} />
                </div>
                <div>
                  <div className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
                    {activeSignal.sourceType}
                  </div>
                  <div className="mono xs dim">SAMPLE RATE: 44.1 kHz // AAC VOICE NOTE</div>
                </div>
              </div>

              {/* Waveform Visualization Bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  height: "36px",
                  padding: "4px 0",
                  marginBottom: "12px",
                }}
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      height: `${Math.sin(i * 0.5) * 45 + 50}%`,
                      background: i % 2 === 0 ? "var(--brand)" : "var(--brass)",
                      borderRadius: "1px",
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>

              <div className="p-3" style={{ background: "rgba(18, 20, 24, 0.9)", borderLeft: "2px solid var(--brand)" }}>
                <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "var(--text)", lineHeight: 1.5, margin: 0 }}>
                  {activeSignal.rawAudioTranscript}
                </p>
              </div>
            </div>

            {/* Stage 02: Deterministic Entity Graph Match */}
            <div
              style={{
                padding: "16px",
                background: "rgba(10, 11, 14, 0.8)",
                borderRadius: "var(--r-xs)",
                border: "1px solid var(--line)",
              }}
            >
              <div className="mono xs mb-2" style={{ color: "var(--brass)" }}>
                STAGE 02 // DETERMINISTIC ENTITY EXTRACTION
              </div>
              <div className="row between mb-2">
                <span className="mono xs dim">EXTRACTED ENTITY:</span>
                <span className="mono xs" style={{ color: "var(--text)" }}>
                  {activeSignal.extractedEntity}
                </span>
              </div>
              <div className="row between">
                <span className="mono xs dim">MAPPED CPM NODE:</span>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  {activeSignal.cpmNode} ({activeSignal.activityName})
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Source Corroboration & Cryptographic Seal */}
          <div>
            <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brass)" }}>
                STAGE 03 // EVIDENCE CORROBORATION
              </span>
              <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                <CheckCircle2 className="ico" style={{ width: 11, height: 11, marginRight: 4 }} />
                {activeSignal.trustScore}% CONFIDENCE
              </span>
            </div>

            {/* Corroborating Evidence List */}
            <div className="col gap-3 mb-4">
              {activeSignal.corroboratingEvidence.map((ev, i) => (
                <div
                  key={i}
                  className="row between p-3"
                  style={{
                    background: "rgba(10, 11, 14, 0.8)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-xs)",
                  }}
                >
                  <div className="row gap-2" style={{ alignItems: "center" }}>
                    <FileText className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
                    <div>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text)" }}>{ev.type}</div>
                      <div className="mono xs dim">{ev.docNumber}</div>
                    </div>
                  </div>
                  <span className="mono xs" style={{ color: "var(--brass)" }}>
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Stage 04: Cryptographic As-Built Commit */}
            <div
              style={{
                padding: "16px",
                background: "rgba(10, 11, 14, 0.9)",
                border: "1px solid var(--brand-line)",
                borderRadius: "var(--r-xs)",
              }}
            >
              <div className="row between mb-2">
                <span className="mono xs" style={{ color: "var(--brand)" }}>
                  STAGE 04 // CRYPTOGRAPHIC CONTEMPORANEOUS COMMIT
                </span>
                <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
              </div>
              <div className="mono xs dim mb-1">SHA-256 PROOF OF AS-BUILT LOG:</div>
              <div
                className="mono xs p-2"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid var(--line-soft)",
                  borderRadius: "2px",
                  color: "var(--text-3)",
                  wordBreak: "break-all",
                }}
              >
                {activeSignal.cryptographicHash}
              </div>
              <div className="row between mt-3 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
                <span className="mono xs dim">DESTINATION: ORACLE P6 ENTERPRISE</span>
                <span className="status xs" style={{ color: "var(--brass)" }}>
                  <CheckCircle2 className="ico" style={{ width: 11, height: 11, color: "var(--brass)" }} />
                  CONFIDENCE GATE PASSED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
