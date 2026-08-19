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
    label: "Core Shear Wall — L18",
    level: "Level 18",
    cpmCode: "A1084",
    status: "verified",
    confidence: 96,
    top: "28%",
    left: "52%",
    details: {
      trade: "Structural Concrete & Rebar",
      subcontractor: "Apex Formwork Ltd.",
      evidence: ["Ready-mix Batch Docket #8841 (C50/60)", "QA Pour Inspection Sign-off #QC-902", "Site Supervisor Audio Note"],
      criticalFloat: "+0.00 Days (Zero Slip)",
      varianceAction: "Staged for P6 Master Baseline Commit",
    },
  },
  {
    id: "pin-2",
    label: "Unitized Curtain Wall — L12",
    level: "Level 12",
    cpmCode: "A1042",
    status: "warning",
    confidence: 91,
    top: "46%",
    left: "38%",
    details: {
      trade: "Glazing & Facade Systems",
      subcontractor: "EuroGlass Engineering",
      evidence: ["Port Customs Release Notice", "Crane Rigging Schedule #CR-04"],
      criticalFloat: "-4.00 Days (Float Consumed)",
      varianceAction: "Early Delay Notice Drafted (FIDIC Sub-Clause 8.4)",
    },
  },
  {
    id: "pin-3",
    label: "MEP Riser Penetrations — L06",
    level: "Level 06",
    cpmCode: "A0915",
    status: "on-schedule",
    confidence: 94,
    top: "68%",
    left: "58%",
    details: {
      trade: "Mechanical & Electrical",
      subcontractor: "Delta MEP Services",
      evidence: ["BIM 3D Clash Resolution Ticket #BIM-118", "Daily Progress Log #DPR-402"],
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
    <section id="digital-twin-studio" className="wrap-lg section" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        {/* Section Header */}
        <div className="row between mb-8 wrapf" style={{ alignItems: "flex-end" }}>
          <div>
            <div className="eyebrow mb-2" style={{ color: "var(--brass)" }}>
              INTERACTIVE 3D BIM &amp; CPM STUDIO
            </div>
            <h2 className="h1">
              Inspect the living spatial twin of your project controls.
            </h2>
            <p className="body mt-2 measure" style={{ color: "var(--text-3)" }}>
              Click interactive telemetry pins to inspect real-time multi-source corroboration,
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
              3D_DIGITAL_TWIN
            </button>
            <button
              type="button"
              className={`btn btn-sm mono xs ${activeMode === "cpm-network" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveMode("cpm-network")}
            >
              <Cpu className="ico" style={{ width: 13, height: 13 }} />
              CPM_COMMAND_CENTER
            </button>
            <button
              type="button"
              className={`btn btn-sm mono xs ${activeMode === "panoramic-overview" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveMode("panoramic-overview")}
            >
              <Eye className="ico" style={{ width: 13, height: 13 }} />
              SITE_PANORAMA
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
          {/* Left: Interactive 3D Digital Twin Viewport */}
          <div
            className="card"
            style={{
              position: "relative",
              padding: 0,
              overflow: "hidden",
              minHeight: 480,
              background: "var(--bg-sunken)",
              border: "1px solid var(--line-strong)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            {/* Viewport Header Bar */}
            <div
              className="row between px-4 py-3"
              style={{
                background: "rgba(10, 11, 14, 0.95)",
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
                <span>MEGAPROJECT_NODE_TOWER_01 // 3D_CAD_LIVE</span>
              </div>
              <span className="mono xs dim">INTERPOLATION: 60 FPS · LATENCY: 0.04ms</span>
            </div>

            {/* Background High-Definition AI Asset */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 480 }}>
              <img
                src={
                  activeMode === "digital-twin"
                    ? "/digital-twin.jpg"
                    : activeMode === "cpm-network"
                    ? "/cpm-command-center.jpg"
                    : "/panoramic-command.jpg"
                }
                alt="3D Digital Twin BIM Model"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.92) contrast(1.08)",
                  transition: "all 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, transparent 30%, rgba(10,11,14,0.6) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Interactive Telemetry Hotspot Pins (Rendered on Digital Twin Mode) */}
              {activeMode === "digital-twin" &&
                HOTSPOTS.map((pin) => {
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
                          background: pin.status === "warning" ? "rgba(255, 69, 0, 0.4)" : "rgba(212, 155, 75, 0.4)",
                          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        }}
                      />
                      {/* Pin Center */}
                      <div
                        style={{
                          width: 22,
                          height: 22,
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
                          background: "rgba(10, 11, 14, 0.92)",
                          border: `1px solid ${isSelected ? "var(--brand)" : "var(--line)"}`,
                          padding: "2px 8px",
                          borderRadius: 3,
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                        }}
                      >
                        <span className="mono xs" style={{ fontSize: 10, color: isSelected ? "#FFFFFF" : "var(--brass)" }}>
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
                background: "rgba(10, 11, 14, 0.92)",
                borderTop: "1px solid var(--line)",
                zIndex: 20,
              }}
            >
              <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles className="ico" style={{ width: 13, height: 13, color: "var(--brass)" }} />
                Click pins to inspect live schedule corroboration
              </span>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                ACTIVE PIN: {selectedPin.cpmCode} ({selectedPin.level})
              </span>
            </div>
          </div>

          {/* Right: Telemetry Inspection Console */}
          <div
            className="card stack"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--line)",
              padding: 24,
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Header */}
              <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
                <div>
                  <span className="mono xs dim">INSPECTION TARGET</span>
                  <h3 className="h3 mt-1" style={{ color: "var(--text)" }}>
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
                        padding: "6px 10px",
                        background: "var(--bg-sunken)",
                        borderRadius: 4,
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
                  padding: 12,
                  background: selectedPin.status === "warning" ? "rgba(255, 69, 0, 0.08)" : "rgba(212, 155, 75, 0.08)",
                  border: `1px solid ${selectedPin.status === "warning" ? "var(--brand-line)" : "var(--brass-line)"}`,
                  borderRadius: 6,
                }}
              >
                <span className="mono xs dim block" style={{ color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)" }}>
                  RECOMMENDED ACTION:
                </span>
                <p className="xs mt-1" style={{ color: "var(--text)", fontWeight: 600 }}>
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
