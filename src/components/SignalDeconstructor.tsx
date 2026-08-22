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
  imageAsset: string;
}

const SCENARIOS: SignalScenario[] = [
  {
    id: "SIG-01",
    sourceType: "WHATSAPP AUDIO NOTE // SUPERINTENDENT",
    sourceTimestamp: "19:40 UTC · LEVEL 47 CORE WALL",
    rawAudioTranscript:
      "“Poured Level 47 Core Wall Section W47-3B today. Putzmeister hydraulic boom pump operational. Ready-mix trucks 14 through 19 delivered 80 MPa mix. Waiting on 7-day cube break tests.”",
    extractedEntity: "Level 47 Core Wall // Pour 03B",
    cpmNode: "#A1084",
    activityName: "Core Wall High-Strength Concrete Placement",
    corroboratingEvidence: [
      { type: "Supplier Batch Docket", docNumber: "#CEMEX-88412", status: "VERIFIED (140m³ C80/95)" },
      { type: "Digital Rebar Scan Ticket", docNumber: "#QC-SCAN-47B", status: "PASSED (Zero Clash)" },
      { type: "Gate Telemetry OCR Log", docNumber: "#GATE-IN-4921", status: "TIMESTAMPTED (19:38 UTC)" },
    ],
    trustScore: 98.4,
    cryptographicHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    imageAsset: "/concrete-pour-corroboration.jpg",
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
    imageAsset: "/concrete-pour-corroboration.jpg",
  },
];

export function SignalDeconstructor() {
  const reveal = useReveal();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSignal = SCENARIOS[selectedIdx];

  return (
    <section
      id="signal-deconstructor"
      style={{
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "rgba(14, 15, 18, 0.6)",
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
              MODULE 01 // UNSTRUCTURED SIGNAL RESOLUTION
            </span>
            <span className="mono xs dim desktop-nav">NEO4J ENTITY EXTRACTION PIPELINE</span>
          </div>
          <h2
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
              maxWidth: "800px",
              marginTop: "8px",
            }}
          >
            Earn the right to update <br />
            <span style={{ fontStyle: "italic", color: "var(--brass)" }}>the critical path.</span>
          </h2>
          <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}>
            Construction teams communicate in messy voice notes, delivery receipts, and inspection tickets.
            SyncPro maps unstructured site signals to exact Primavera CPM activity nodes, requiring deterministic multi-source corroboration before committing updates.
          </p>
        </div>

        {/* Interactive Scenario Selector Tabs */}
        <div className="row gap-3 mb-8 wrapf">
          {SCENARIOS.map((s, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  padding: "10px 18px",
                  background: isSelected ? "var(--bg-elevated)" : "rgba(18, 20, 24, 0.7)",
                  border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line)",
                  borderRadius: "var(--r-xs)",
                  color: isSelected ? "var(--text)" : "var(--text-3)",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ color: isSelected ? "var(--brand)" : "var(--text-4)", fontWeight: 700 }}>[{s.id}]</span>
                <span>{s.sourceType.split("//")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 4-Stage Deconstruction Pipeline Console */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.96)",
            border: "1px solid var(--line-strong)",
            padding: "32px",
            borderRadius: "var(--r-md)",
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <div className="grid" style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Left Column: Field Corroboration Asset + Audio Stream */}
            <div>
              <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  STAGE 01 // CONTEMPORANEOUS FIELD SIGNAL
                </span>
                <span className="mono xs dim">{activeSignal.sourceTimestamp}</span>
              </div>

              {/* Field Image Asset Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "270px",
                  borderRadius: "var(--r-xs)",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                  marginBottom: "18px",
                }}
              >
                <img
                  src={activeSignal.imageAsset}
                  alt="High-Rise Concrete Pour with Rebar Scanning"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "contrast(1.05) brightness(0.95)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(14,15,18,0.1) 0%, rgba(14,15,18,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 14,
                    right: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontFamily: "var(--mono)",
                    color: "#FFFFFF",
                  }}
                >
                  <span>[SECTOR: CORE_WALL_W47-3B]</span>
                  <span style={{ color: "var(--brass)" }}>POUR: 03B // 80 MPa // 19:40 UTC</span>
                </div>
              </div>

              {/* Audio Waveform & Transcript */}
              <div
                style={{
                  padding: "16px 18px",
                  background: "rgba(10, 11, 14, 0.85)",
                  borderRadius: "var(--r-xs)",
                  border: "1px solid var(--line)",
                }}
              >
                <div className="row gap-3 mb-3" style={{ alignItems: "center" }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "var(--brand-bg)",
                      border: "1px solid var(--brand-line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mic className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
                  </div>
                  <div>
                    <div className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
                      {activeSignal.sourceType}
                    </div>
                    <div className="mono xs dim">AAC AUDIO STREAM // 44.1 kHz</div>
                  </div>
                </div>

                {/* Waveform Visualization Bars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    height: "30px",
                    padding: "2px 0",
                    marginBottom: "10px",
                  }}
                >
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        flex: 1,
                        height: `${Math.sin(i * 0.4) * 45 + 55}%`,
                        background: i % 2 === 0 ? "var(--brand)" : "var(--brass)",
                        borderRadius: "1px",
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>

                <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "var(--text)", lineHeight: 1.5, margin: 0 }}>
                  {activeSignal.rawAudioTranscript}
                </p>
              </div>
            </div>

            {/* Right Column: Multi-Source Corroboration & Cryptographic Commit */}
            <div>
              <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                  STAGE 02 // MULTI-SOURCE EVIDENCE CORROBORATION
                </span>
                <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                  <CheckCircle2 className="ico" style={{ width: 11, height: 11, marginRight: 4 }} />
                  {activeSignal.trustScore}% CONFIDENCE
                </span>
              </div>

              {/* Deterministic Entity Mapping */}
              <div
                className="p-3 mb-3"
                style={{
                  background: "rgba(10, 11, 14, 0.85)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-xs)",
                }}
              >
                <div className="row between mb-1">
                  <span className="mono xs dim">EXTRACTED ENTITY:</span>
                  <span className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
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

              {/* Corroborating Evidence List */}
              <div className="col gap-2 mb-3">
                {activeSignal.corroboratingEvidence.map((ev, i) => (
                  <div
                    key={i}
                    className="row between p-3"
                    style={{
                      background: "rgba(10, 11, 14, 0.85)",
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
                    <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cryptographic As-Built Commit */}
              <div
                style={{
                  padding: "16px",
                  background: "rgba(10, 11, 14, 0.95)",
                  border: "1px solid var(--brand-line)",
                  borderRadius: "var(--r-xs)",
                }}
              >
                <div className="row between mb-1">
                  <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 600 }}>
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
                    fontSize: "11px",
                  }}
                >
                  {activeSignal.cryptographicHash}
                </div>
                <div className="row between mt-2 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
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
      </div>
    </section>
  );
}
