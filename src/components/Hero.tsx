import { useState } from "react";
import { ArrowRight, ShieldCheck, Activity, ChevronRight, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface MilestoneData {
  week: number;
  phase: string;
  activityId: string;
  activityName: string;
  status: "ON_TRACK" | "WARNING" | "CRITICAL_SLIP" | "RECONCILED";
  plannedDuration: number;
  actualProgress: number;
  floatDelta: number;
  liquidatedDamageRisk: string;
  eventLog: string;
}

const MILESTONES: MilestoneData[] = [
  {
    week: 6,
    phase: "PACKAGE A-01 // SUBSTRUCTURE PILING",
    activityId: "#A1012",
    activityName: "Bored Cast-in-Place Piles — Grid A-F",
    status: "ON_TRACK",
    plannedDuration: 45,
    actualProgress: 100,
    floatDelta: 0,
    liquidatedDamageRisk: "$0",
    eventLog: "32/32 concrete cube test cylinders exceeded 45 MPa spec. Commits cryptographically sealed.",
  },
  {
    week: 16,
    phase: "PACKAGE A-02 // CORE JUMP-FORM LIFT",
    activityId: "#A1048",
    activityName: "Level 18 Hydraulic Slipform Core Pour",
    status: "ON_TRACK",
    plannedDuration: 30,
    actualProgress: 88,
    floatDelta: 0,
    liquidatedDamageRisk: "$0",
    eventLog: "Multi-source corroboration verified 4 batch delivery dockets against drone orthophoto.",
  },
  {
    week: 24,
    phase: "PACKAGE B-04 // STEEL DIAGRID ERECTION",
    activityId: "#A1084",
    activityName: "Diagrid Node N45 Heavy Lift & Outrigger",
    status: "WARNING",
    plannedDuration: 60,
    actualProgress: 42,
    floatDelta: -4.5,
    liquidatedDamageRisk: "$315,000",
    eventLog: "Extrusion delivery delayed at port. Float consumption triggered early FIDIC 8.4 notice draft.",
  },
  {
    week: 36,
    phase: "PACKAGE C-08 // MEP CENTRAL RISERS",
    activityId: "#A1142",
    activityName: "Level 14-22 Chilled Water Primary Riser",
    status: "CRITICAL_SLIP",
    plannedDuration: 40,
    actualProgress: 60,
    floatDelta: -8.0,
    liquidatedDamageRisk: "$560,000",
    eventLog: "Weld radiography inspection delay flagged. Live shadow schedule restaged mitigation sequence.",
  },
  {
    week: 48,
    phase: "PACKAGE D-12 // COMMISSIONING & HANDOVER",
    activityId: "#A1220",
    activityName: "Integrated Building Systems Handover",
    status: "RECONCILED",
    plannedDuration: 25,
    actualProgress: 98,
    floatDelta: 0,
    liquidatedDamageRisk: "$0 (Recovered)",
    eventLog: "Tamper-evident contemporaneous audit dossier sealed for final employer sign-off.",
  },
];

export function Hero() {
  const reveal = useReveal();
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(2); // Default to Week 24 (Warning phase)
  const current = MILESTONES[selectedMilestoneIdx];

  return (
    <header
      id="hero"
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "72px",
        paddingBottom: "48px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Background CAD Blueprint Ambient Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(217, 119, 87, 0.09) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="wrap-lg" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {/* Top Blueprint Coordinates Header */}
        <div className="row between mb-6 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
          <div className="row gap-3">
            <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
              [PROJECT: OBSIDIAN SPIRE // 1,280m MEGAPROJECT]
            </span>
            <span className="mono xs dim desktop-nav">COORDINATES: 25.2048° N, 55.2708° E</span>
          </div>
          <div className="row gap-2">
            <span className="sdot pulse" style={{ background: "var(--brand)" }} />
            <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
              CPM RECONCILIATION: ARMED
            </span>
          </div>
        </div>

        {/* Hero 2-Column Master Layout */}
        <div className="grid" style={{ gridTemplateColumns: "1.05fr 1.15fr", gap: "36px", alignItems: "center" }}>
          {/* Left Column: Bold Human Editorial Headline & Mission */}
          <div ref={reveal.ref} className={reveal.className}>
            <div
              className="mb-4 row gap-2"
              style={{
                border: "1px solid var(--line-strong)",
                padding: "4px 12px",
                background: "rgba(18, 20, 24, 0.85)",
                backdropFilter: "blur(12px)",
                width: "max-content",
                borderRadius: "var(--r-xs)",
              }}
            >
              <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
                FIDIC &amp; NEC4 CLAIMS SHIELD // DCMA-14 VERIFIED
              </span>
            </div>

            <h1
              className="display"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                lineHeight: 1.03,
                fontSize: "clamp(42px, 4.8vw, 70px)",
                color: "var(--text)",
              }}
            >
              The schedule never lies. <br />
              <span style={{ fontStyle: "italic", color: "var(--brass)", paddingLeft: "12px" }}>
                Neither do we.
              </span>
            </h1>

            <p
              className="lead mt-4 measure"
              style={{
                fontSize: "clamp(15.5px, 1.2vw, 18px)",
                color: "var(--text-2)",
                lineHeight: 1.6,
              }}
            >
              SyncPro is the AI Project Controls Engineer for capital megaprojects. It resolves unstructured site audio,
              batch dockets, and inspection logs into deterministic CPM activities — producing legally defensible contemporaneous
              evidence before delay claims materialize.
            </p>

            <div className="row gap-4 mt-7 wrapf">
              <a
                className="btn btn-primary btn-lg mono xs"
                href="#waitlist"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "14px 28px",
                }}
              >
                INITIALIZE_PILOT_SEQUENCE
                <ArrowRight className="ico" />
              </a>
              <a
                className="btn btn-outline btn-lg mono xs"
                href="#signal-deconstructor"
                style={{
                  letterSpacing: "0.06em",
                  padding: "14px 24px",
                  background: "rgba(18, 20, 24, 0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                VIEW_SIGNAL_DECONSTRUCTOR
                <ChevronRight className="ico" />
              </a>
            </div>

            <div className="row gap-4 mt-6 wrapf" style={{ alignItems: "center" }}>
              <div className="status" style={{ background: "rgba(18, 20, 24, 0.8)", padding: "4px 10px", borderRadius: 4 }}>
                <span className="sdot sdot-live pulse" style={{ background: "var(--brand)" }} /> Cohort 01 Onboarding Active
              </div>
              <div className="row gap-2 xs dim" style={{ borderLeft: "1px solid var(--line)", paddingLeft: 14 }}>
                <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
                <span>SOC 2 Type II · Zero Model Training on Client P6 Data</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Definition Megaproject CAD Asset & HUD */}
          <div
            className="card"
            style={{
              position: "relative",
              padding: 0,
              overflow: "hidden",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line-strong)",
              boxShadow: "var(--shadow-pop)",
              background: "var(--bg-sunken)",
            }}
          >
            {/* Asset Header Tag */}
            <div
              className="row between px-4 py-2"
              style={{
                background: "rgba(14, 15, 18, 0.95)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11,
              }}
            >
              <span className="mono xs" style={{ color: "var(--brass)" }}>
                [FIG.01-MEGAPROJECT_CAD] // OBSIDIAN_SPIRE_PACKAGE_A01
              </span>
              <span className="mono xs dim">FOV: 35mm · RESOLUTION: 8K · f/8</span>
            </div>

            {/* High-Definition Photorealistic Megaproject CAD Asset */}
            <div style={{ position: "relative", width: "100%", height: "360px", overflow: "hidden" }}>
              <img
                src="/obsidian-spire-cad.jpg"
                alt="Obsidian Spire Megaproject CAD Telemetry Render"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "contrast(1.06) brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(14,15,18,0.1) 0%, rgba(14,15,18,0.7) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Live Planned vs Actual Reconciled CPM Float Bar */}
            <div style={{ padding: "14px 20px", background: "rgba(18, 20, 24, 0.98)" }}>
              <div className="row between mb-2">
                <span className="mono xs" style={{ color: "var(--brass)" }}>
                  {current.activityId} — {current.activityName}
                </span>
                <span className="mono xs" style={{ color: current.floatDelta < 0 ? "var(--brand)" : "var(--brass)" }}>
                  FLOAT: {current.floatDelta > 0 ? `+${current.floatDelta}` : current.floatDelta} DAYS
                </span>
              </div>

              <div className="gantt">
                <div className="gantt-row">
                  <span className="lab" style={{ fontSize: 11 }}>P6 Baseline</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "4%", width: "45%" }} title="Planned P6 Baseline" />
                  </div>
                </div>
                <div className="gantt-row">
                  <span className="lab" style={{ fontSize: 11 }}>Field Progress</span>
                  <div className="gtrack">
                    <div
                      className={`gbar ${current.floatDelta < 0 ? "gbar-crit" : "gbar-field"}`}
                      style={{
                        left: "4%",
                        width: `${Math.min(100, current.actualProgress * 0.45)}%`,
                        background: current.floatDelta < 0 ? "var(--brand)" : "var(--brass)",
                      }}
                      title="Actual Corroborated Site Progress"
                    />
                    {current.floatDelta < 0 && (
                      <span className="gtick data" style={{ left: `${current.actualProgress * 0.45}%` }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Interactive Time-Machine CPM Scrubber */}
      <div className="wrap-lg mt-8" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.94)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--line-strong)",
            padding: "20px 24px",
            boxShadow: "var(--shadow-pop)",
            borderRadius: "var(--r-md)",
          }}
        >
          {/* Header Controls */}
          <div className="row between mb-3 wrapf">
            <div className="row gap-3">
              <span className="status xs" style={{ color: "var(--brand)" }}>
                <Activity className="ico pulse" style={{ width: 12, height: 12, color: "var(--brand)" }} />
                INTERACTIVE_TIME_MACHINE // CRITICAL_PATH_LIFECYCLE_SCRUBBER
              </span>
              <span className="mono xs dim desktop-nav">ORACLE PRIMAVERA P6 .XER SHADOW EMULATOR</span>
            </div>
            <div className="row gap-2">
              <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                <Clock className="ico" style={{ width: 11, height: 11, marginRight: 4 }} />
                PROJECT TIMELINE: WEEK {current.week} OF 52
              </span>
            </div>
          </div>

          {/* Interactive Timeline Scrubber Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "8px",
              marginBottom: "14px",
              padding: "6px",
              background: "rgba(10, 11, 14, 0.7)",
              borderRadius: "var(--r-xs)",
              border: "1px solid var(--line)",
            }}
          >
            {MILESTONES.map((m, idx) => {
              const active = idx === selectedMilestoneIdx;
              return (
                <button
                  key={m.week}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  style={{
                    padding: "8px 10px",
                    background: active ? "var(--bg-elevated)" : "transparent",
                    border: active ? "1px solid var(--brand)" : "1px solid transparent",
                    borderRadius: "var(--r-xs)",
                    color: active ? "var(--text)" : "var(--text-3)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div className="mono xs" style={{ color: active ? "var(--brand)" : "var(--text-4)", fontWeight: 600 }}>
                    WEEK {m.week.toString().padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {m.phase.split("//")[1] || m.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Event Docket & Liquidated Damages Exposure */}
          <div className="row between wrapf gap-3 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
            <div className="row gap-2" style={{ maxWidth: "720px" }}>
              {current.floatDelta < 0 ? (
                <AlertTriangle className="ico" style={{ width: 14, height: 14, color: "var(--brand)", flexShrink: 0 }} />
              ) : (
                <CheckCircle2 className="ico" style={{ width: 14, height: 14, color: "var(--brass)", flexShrink: 0 }} />
              )}
              <span className="xs dim" style={{ color: "var(--text-2)", lineHeight: 1.4 }}>
                <strong style={{ color: "var(--text)" }}>Contemporaneous Event Log:</strong> {current.eventLog}
              </span>
            </div>
            <div className="row gap-2">
              <span className="mono xs dim">LIQUIDATED DAMAGES RISK:</span>
              <span
                className="mono xs"
                style={{
                  fontWeight: 700,
                  color: current.liquidatedDamageRisk === "$0" || current.liquidatedDamageRisk.includes("Recovered") ? "var(--brass)" : "var(--brand)",
                }}
              >
                {current.liquidatedDamageRisk}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
