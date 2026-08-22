import { useState } from "react";
import { Layers, Eye, CheckCircle2, ChevronRight, Activity, Cpu, Sparkles } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface Hotspot {
  id: string;
  label: string;
  level: string;
  cpmCode: string;
  status: "verified" | "warning" | "on-schedule";
  confidence: number;
  top: string;
  left: string;
  details: {
    trade: string;
    subcontractor: string;
    evidence: string[];
    criticalFloat: string;
    varianceAction: string;
  };
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "pin-1",
    label: "Outrigger Level 68 — Steel Diagrid",
    level: "Level 68",
    cpmCode: "A1084",
    status: "verified",
    confidence: 98.7,
    top: "22%",
    left: "51%",
    details: {
      trade: "Structural Steel & Outriggers",
      subcontractor: "Apex Steel Erectors Ltd.",
      evidence: ["Mill Test Cert #ST-8841 (S460M)", "Weld Ultrasonic Testing Log #NDT-902", "Drone Orthophoto Scan"],
      criticalFloat: "+0.00 Days (Zero Slip)",
      varianceAction: "Staged for P6 Master Baseline Commit",
    },
  },
  {
    id: "pin-2",
    label: "Structural Core B — Outrigger L42",
    level: "Level 42",
    cpmCode: "A1042",
    status: "warning",
    confidence: 91.2,
    top: "44%",
    left: "49%",
    details: {
      trade: "Heavy Concrete Core Wall",
      subcontractor: "Emirates Coreform Engineering",
      evidence: ["Port Customs Release Notice", "Crane Wind Gust Log (38 kts)"],
      criticalFloat: "-4.50 Days (Float Consumed)",
      varianceAction: "Early Delay Notice Drafted (FIDIC Sub-Clause 8.4)",
    },
  },
  {
    id: "pin-3",
    label: "Podium & MEP Risers — Transit Hub",
    level: "Level 08",
    cpmCode: "A0915",
    status: "on-schedule",
    confidence: 96.4,
    top: "72%",
    left: "50%",
    details: {
      trade: "Mechanical & Electrical Risers",
      subcontractor: "Delta MEP Services",
      evidence: ["BIM 3D Clash Resolution Ticket #BIM-118", "Hydrostatic Pressure Test Sign-off #QC-402"],
      criticalFloat: "+2.00 Days Total Float",
      varianceAction: "Contemporaneous Record Cryptographically Sealed",
    },
  },
];

type ViewMode = "digital-twin" | "cpm-network" | "panoramic-overview";

export function DigitalTwinStudio() {
  const reveal = useReveal();
  const [activeMode, setActiveMode] = useState<ViewMode>("digital-twin");
  const [selectedPin, setSelectedPin] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <section id="digital-twin-studio" className="wrap-lg py-16" style={{ borderBottom: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        {/* Section Header */}
        <div className="row between mb-8 wrapf" style={{ alignItems: "flex-end" }}>
          <div>
            <div className="row gap-2 mb-3">
              <span className="sdot" style={{ background: "var(--brand)" }} />
              <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
                INTERACTIVE 3D BIM &amp; CPM STUDIO // APEX-80 DIGITAL TWIN
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
              Living spatial twin of your <br />
              <span style={{ fontStyle: "italic", color: "var(--brass)" }}>project controls.</span>
            </h2>
            <p className="lead mt-3 measure" style={{ color: "var(--text-2)", fontSize: "16.5px" }}>
              Click interactive floor pins to inspect real-time multi-source corroboration,
              critical path float variances, and automated contract notice drafts.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="row gap-2 mt-4">
            <button
              type="button"
              className={`btn btn-sm mono xs ${activeMode === "digital-twin" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveMode("digital-twin")}
            >
              <Layers className="ico" style={{ width: 13, height: 13 }} />
              3D_HOLOGRAPHIC_TWIN
            </button>
            <button
              type="button"
              className={`btn btn-sm mono xs ${activeMode === "cpm-network" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveMode("cpm-network")}
            >
              <Cpu className="ico" style={{ width: 13, height: 13 }} />
              CPM_NETWORK
            </button>
            <button
              type="button"
              className={`btn btn-sm mono xs ${activeMode === "panoramic-overview" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveMode("panoramic-overview")}
            >
              <Eye className="ico" style={{ width: 13, height: 13 }} />
              SITE_TELEMETRY
            </button>
          </div>
        </div>

        {/* Studio Canvas & Inspection Console Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.35fr 0.85fr",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* Left: Interactive Holographic BIM Viewport */}
          <div
            className="card"
            style={{
              position: "relative",
              padding: 0,
              overflow: "hidden",
              minHeight: 520,
              background: "rgba(10, 11, 14, 0.95)",
              border: "1px solid var(--line-strong)",
              boxShadow: "var(--shadow-pop)",
              borderRadius: "var(--r-md)",
            }}
          >
            {/* Viewport Header Bar */}
            <div
              className="row between px-4 py-3"
              style={{
                background: "rgba(18, 20, 24, 0.95)",
                borderBottom: "1px solid var(--line)",
                fontSize: 12,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 20,
              }}
            >
              <div className="row gap-2 mono xs" style={{ color: "var(--brass)" }}>
                <Activity className="ico pulse" style={{ width: 13, height: 13, color: "var(--brand)" }} />
                <span>PROJECT: APEX-80 // 3D_HOLOGRAPHIC_DIGITAL_TWIN</span>
              </div>
              <span className="mono xs dim">ACCURACY: ±2.3mm · SCAN: 2.48B PTS</span>
            </div>

            {/* High-Definition Holographic BIM Asset */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 520 }}>
              <img
                src="/apex-holographic-bim.png"
                alt="Apex-80 3D Holographic BIM Digital Twin"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 35%",
                  filter: "contrast(1.08) brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, transparent 40%, rgba(10,11,14,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Interactive Telemetry Hotspot Pins */}
              {HOTSPOTS.map((pin) => {
                const isSelected = selectedPin.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setSelectedPin(pin)}
                    style={{
                      position: "absolute",
                      top: pin.top,
                      left: pin.left,
                      transform: "translate(-50%, -50%)",
                      zIndex: 30,
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    {/* Pulse Ring */}
                    <span
                      style={{
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        background: pin.status === "warning" ? "rgba(217, 119, 87, 0.45)" : "rgba(212, 155, 75, 0.45)",
                        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      }}
                    />
                    {/* Pin Center */}
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: isSelected ? "#FFFFFF" : pin.status === "warning" ? "var(--brand)" : "var(--brass)",
                        color: "#08090C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 800,
                        boxShadow: "0 0 16px rgba(0,0,0,0.8)",
                        border: "2px solid #FFFFFF",
                        transition: "all 0.2s ease",
                        transform: isSelected ? "scale(1.25)" : "scale(1)",
                      }}
                    >
                      {pin.level.replace("Level ", "L")}
                    </div>
                    {/* Pin Label Tag */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 28,
                        transform: "translateX(-50%)",
                        background: "rgba(10, 11, 14, 0.95)",
                        border: `1px solid ${isSelected ? "var(--brand)" : "var(--line)"}`,
                        padding: "3px 8px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      <span className="mono xs" style={{ fontSize: 10.5, color: isSelected ? "#FFFFFF" : "var(--brass)" }}>
                        {pin.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Overlay */}
            <div
              className="row between px-4 py-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(18, 20, 24, 0.95)",
                borderTop: "1px solid var(--line)",
                zIndex: 20,
              }}
            >
              <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles className="ico" style={{ width: 13, height: 13, color: "var(--brass)" }} />
                Click pins to inspect live schedule corroboration
              </span>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                ACTIVE PIN: #{selectedPin.cpmCode} ({selectedPin.level})
              </span>
            </div>
          </div>

          {/* Right: Telemetry Inspection Console */}
          <div
            className="card stack"
            style={{
              background: "rgba(18, 20, 24, 0.95)",
              border: "1px solid var(--line)",
              padding: 24,
              justifyContent: "space-between",
              borderRadius: "var(--r-md)",
            }}
          >
            <div>
              {/* Header */}
              <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
                <div>
                  <span className="mono xs dim">INSPECTION TARGET</span>
                  <h3 className="h3 mt-1" style={{ color: "var(--text)", fontSize: "18px" }}>
                    {selectedPin.label}
                  </h3>
                </div>
                <span
                  className="tag"
                  style={{
                    background: selectedPin.status === "warning" ? "var(--brand-bg)" : "var(--brass-bg)",
                    color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)",
                    borderColor: selectedPin.status === "warning" ? "var(--brand-line)" : "var(--brass-line)",
                  }}
                >
                  {selectedPin.confidence}% Corroborated
                </span>
              </div>

              {/* Data Properties */}
              <div className="props mb-4" style={{ fontSize: 12.5 }}>
                <dt>CPM Node ID</dt>
                <dd className="mono" style={{ color: "var(--brass)", fontWeight: 700 }}>
                  #{selectedPin.cpmCode}
                </dd>

                <dt>Trade / Discipline</dt>
                <dd>{selectedPin.details.trade}</dd>

                <dt>Subcontractor</dt>
                <dd>{selectedPin.details.subcontractor}</dd>

                <dt>Critical Float</dt>
                <dd
                  style={{
                    color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)",
                    fontWeight: 700,
                  }}
                >
                  {selectedPin.details.criticalFloat}
                </dd>
              </div>

              {/* Corroborated Evidence Stack */}
              <div className="mb-4">
                <span className="mono xs dim mb-2 block">CORROBORATING EVIDENCE ARTIFACTS:</span>
                <div className="stack gap-2">
                  {selectedPin.details.evidence.map((ev, idx) => (
                    <div
                      key={idx}
                      className="row gap-2 xs"
                      style={{
                        padding: "8px 12px",
                        background: "rgba(10, 11, 14, 0.8)",
                        borderRadius: "var(--r-xs)",
                        border: "1px solid var(--line-soft)",
                      }}
                    >
                      <CheckCircle2 className="ico" style={{ width: 13, height: 13, color: "var(--brass)" }} />
                      <span style={{ color: "var(--text)" }}>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staged Action */}
              <div
                style={{
                  padding: 14,
                  background: selectedPin.status === "warning" ? "rgba(217, 119, 87, 0.08)" : "rgba(212, 155, 75, 0.08)",
                  border: `1px solid ${selectedPin.status === "warning" ? "var(--brand-line)" : "var(--brass-line)"}`,
                  borderRadius: "var(--r-xs)",
                }}
              >
                <span className="mono xs dim block" style={{ color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)" }}>
                  RECOMMENDED ACTION:
                </span>
                <p className="xs mt-1" style={{ color: "var(--text)", fontWeight: 600, margin: 0 }}>
                  {selectedPin.details.varianceAction}
                </p>
              </div>
            </div>

            {/* Bottom Action CTA */}
            <a className="btn btn-primary btn-block mt-6 mono xs" href="#waitlist" style={{ fontWeight: 700, justifyContent: "center" }}>
              INITIALIZE_DESIGN_PARTNER_PILOT
              <ChevronRight className="ico" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
