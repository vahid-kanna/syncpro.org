import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity, ChevronRight, AlertTriangle, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

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
    phase: "SUBSTRUCTURE // PILING & RAFT",
    activityId: "#A1012",
    activityName: "Bored Piles & Foundation Raft",
    status: "ON_TRACK",
    plannedDuration: 45,
    actualProgress: 100,
    floatDelta: 0,
    liquidatedDamageRisk: "$0",
    eventLog: "32/32 concrete cube tests verified. Field commits sealed.",
  },
  {
    week: 16,
    phase: "SUPERSTRUCTURE // CORE SHEAR WALL",
    activityId: "#A1048",
    activityName: "Level 18 Slipform Core Pour",
    status: "ON_TRACK",
    plannedDuration: 30,
    actualProgress: 88,
    floatDelta: 0,
    liquidatedDamageRisk: "$0",
    eventLog: "Corroborated 4 batch delivery dockets against drone orthophoto.",
  },
  {
    week: 24,
    phase: "STEEL DIAGRID // OUTRIGGER LIFT",
    activityId: "#A1084",
    activityName: "Diagrid Node N45 Outrigger",
    status: "WARNING",
    plannedDuration: 60,
    actualProgress: 42,
    floatDelta: -4.5,
    liquidatedDamageRisk: "$315,000",
    eventLog: "Material delay at port. Float consumption flagged 3 weeks early.",
  },
  {
    week: 36,
    phase: "MEP & FIT-OUT // CENTRAL RISERS",
    activityId: "#A1142",
    activityName: "Level 14-22 Chilled Water Riser",
    status: "CRITICAL_SLIP",
    plannedDuration: 40,
    actualProgress: 60,
    floatDelta: -8.0,
    liquidatedDamageRisk: "$560,000",
    eventLog: "Weld inspection delay flagged. Live shadow schedule restaged.",
  },
  {
    week: 48,
    phase: "COMMISSIONING & HANDOVER",
    activityId: "#A1220",
    activityName: "Integrated Building Handover",
    status: "RECONCILED",
    plannedDuration: 25,
    actualProgress: 98,
    floatDelta: 0,
    liquidatedDamageRisk: "$0 (Recovered)",
    eventLog: "Tamper-evident contemporaneous audit dossier sealed for sign-off.",
  },
];

export function Hero() {
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(2); // Default to Week 24 (Warning phase)
  const current = MILESTONES[selectedMilestoneIdx];

  return (
    <header
      id="hero"
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "64px",
        paddingBottom: "48px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Background CAD Ambient Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(217, 119, 87, 0.12) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="wrap-lg" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {/* Top Status Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="row between mb-6 pb-2"
          style={{ borderBottom: "1px solid var(--line-soft)" }}
        >
          <div className="row gap-3">
            <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.08em" }}>
              [PROJECT: OBSIDIAN SPIRE // 1,280m MEGAPROJECT]
            </span>
            <span className="mono xs dim desktop-nav">COORDINATES: 25.2048° N, 55.2708° E</span>
          </div>
          <div className="row gap-2">
            <span className="sdot pulse" style={{ background: "var(--brand)" }} />
            <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
              AUTONOMOUS SCHEDULE RECONCILIATION: ACTIVE
            </span>
          </div>
        </motion.div>

        {/* Hero 2-Column Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid"
          style={{ gridTemplateColumns: "1.1fr 1.1fr", gap: "36px", alignItems: "center" }}
        >
          {/* Left Column: Kinetic Editorial Headline & Mission */}
          <div>
            <motion.div
              variants={fadeUpVariants}
              className="mb-4 row gap-2"
              style={{
                border: "1px solid var(--line-strong)",
                padding: "5px 12px",
                background: "rgba(18, 20, 24, 0.85)",
                backdropFilter: "blur(12px)",
                width: "max-content",
                borderRadius: "var(--r-xs)",
              }}
            >
              <Sparkles className="ico" style={{ width: 13, height: 13, color: "var(--brand)" }} />
              <span className="mono xs" style={{ color: "var(--brand)", letterSpacing: "0.06em", fontWeight: 600 }}>
                AUTONOMOUS PROJECT CONTROLS FOR MEGAPROJECTS
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="display"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                lineHeight: 1.04,
                fontSize: "clamp(40px, 4.6vw, 68px)",
                color: "var(--text)",
              }}
            >
              The schedule never lies. <br />
              <span style={{ fontStyle: "italic", color: "var(--brass)", paddingLeft: "8px" }}>
                Neither do we.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="lead mt-4 measure"
              style={{
                fontSize: "clamp(16px, 1.2vw, 18px)",
                color: "var(--text-2)",
                lineHeight: 1.6,
              }}
            >
              SyncPro eliminates delay surprises on capital megaprojects. It reconciles messy site audio,
              drone scans, and delivery dockets into live CPM activity nodes — catching critical path slips 3 weeks before contractors report them.
            </motion.p>

            {/* CTAs with Spring Physics */}
            <motion.div variants={fadeUpVariants} className="row gap-4 mt-7 wrapf">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-lg mono xs"
                href="#waitlist"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "14px 28px",
                  boxShadow: "0 0 24px rgba(217, 119, 87, 0.35)",
                }}
              >
                INITIALIZE_PILOT_SEQUENCE
                <ArrowRight className="ico" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline btn-lg mono xs"
                href="#how-it-works"
                style={{
                  letterSpacing: "0.06em",
                  padding: "14px 24px",
                  background: "rgba(18, 20, 24, 0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                HOW_IT_WORKS
                <ChevronRight className="ico" />
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUpVariants} className="row gap-4 mt-6 wrapf" style={{ alignItems: "center" }}>
              <div className="status" style={{ background: "rgba(18, 20, 24, 0.8)", padding: "4px 10px", borderRadius: 4 }}>
                <span className="sdot sdot-live pulse" style={{ background: "var(--brand)" }} /> Cohort 01 Onboarding Live
              </div>
              <div className="row gap-2 xs dim" style={{ borderLeft: "1px solid var(--line)", paddingLeft: 14 }}>
                <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
                <span>SOC 2 Type II · Zero Model Training on Client P6 Data</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Frame with Floating Jitter Badges */}
          <motion.div
            variants={fadeUpVariants}
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
            {/* Header */}
            <div
              className="row between px-4 py-2"
              style={{
                background: "rgba(14, 15, 18, 0.95)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11,
              }}
            >
              <span className="mono xs" style={{ color: "var(--brass)" }}>
                [FIG.01-MEGAPROJECT_CAD] // OBSIDIAN_SPIRE
              </span>
              <span className="mono xs dim">PRIMAVERA P6 SHADOW ENGINE</span>
            </div>

            {/* Visual Image Asset Frame */}
            <div style={{ position: "relative", width: "100%", height: "350px", overflow: "hidden" }}>
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
                  background: "linear-gradient(180deg, rgba(14,15,18,0.1) 0%, rgba(14,15,18,0.75) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Floating Jitter-Style Badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  background: "rgba(14, 15, 18, 0.9)",
                  border: "1px solid var(--brand)",
                  padding: "6px 12px",
                  borderRadius: "var(--r-xs)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  98.7% EVIDENCE CONFIDENCE
                </div>
                <div className="xs dim" style={{ fontSize: 10 }}>Multi-Source Verified</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 30,
                  right: 20,
                  background: "rgba(14, 15, 18, 0.9)",
                  border: "1px solid var(--brass)",
                  padding: "6px 12px",
                  borderRadius: "var(--r-xs)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="mono xs" style={{ color: "var(--brass)", fontWeight: 700 }}>
                  0 UNNOTIFIED DELAYS
                </div>
                <div className="xs dim" style={{ fontSize: 10 }}>FIDIC 8.4 Shield Armed</div>
              </motion.div>
            </div>

            {/* Reconciled Float Bar */}
            <div style={{ padding: "14px 20px", background: "rgba(18, 20, 24, 0.98)" }}>
              <div className="row between mb-2">
                <span className="mono xs" style={{ color: "var(--brass)" }}>
                  {current.activityId} — {current.activityName}
                </span>
                <span className="mono xs" style={{ color: current.floatDelta < 0 ? "var(--brand)" : "var(--brass)" }}>
                  FLOAT DELTA: {current.floatDelta > 0 ? `+${current.floatDelta}` : current.floatDelta} DAYS
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
                  <span className="lab" style={{ fontSize: 11 }}>Field Reality</span>
                  <div className="gtrack">
                    <div
                      className={`gbar ${current.floatDelta < 0 ? "gbar-crit" : "gbar-field"}`}
                      style={{
                        left: "4%",
                        width: `${Math.min(100, current.actualProgress * 0.45)}%`,
                        background: current.floatDelta < 0 ? "var(--brand)" : "var(--brass)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Time-Machine Scrubber */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="wrap-lg mt-8"
        style={{ position: "relative", zIndex: 10, width: "100%" }}
      >
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
                INTERACTIVE TIME-MACHINE // SCHEDULE LIFECYCLE
              </span>
              <span className="mono xs dim desktop-nav">SCRUB TO SIMULATE FLOAT SHIFTS</span>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "8px",
              marginBottom: "14px",
              padding: "6px",
              background: "rgba(10, 11, 14, 0.7)",
              borderRadius: "var(--r-xs)",
              border: "1px solid var(--line)",
              overflowX: "auto",
            }}
          >
            {MILESTONES.map((m, idx) => {
              const active = idx === selectedMilestoneIdx;
              return (
                <motion.button
                  key={m.week}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  style={{
                    padding: "10px 12px",
                    background: active ? "var(--bg-elevated)" : "transparent",
                    border: active ? "1px solid var(--brand)" : "1px solid transparent",
                    borderRadius: "var(--r-xs)",
                    color: active ? "var(--text)" : "var(--text-3)",
                    cursor: "pointer",
                    textAlign: "left",
                    minWidth: "140px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div className="mono xs" style={{ color: active ? "var(--brand)" : "var(--text-4)", fontWeight: 600 }}>
                    WEEK {m.week.toString().padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {m.phase.split("//")[0]}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Event Log & Risk Meter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.week}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="row between wrapf gap-3 pt-2"
              style={{ borderTop: "1px solid var(--line-soft)" }}
            >
              <div className="row gap-2" style={{ maxWidth: "720px" }}>
                {current.floatDelta < 0 ? (
                  <AlertTriangle className="ico" style={{ width: 14, height: 14, color: "var(--brand)", flexShrink: 0 }} />
                ) : (
                  <CheckCircle2 className="ico" style={{ width: 14, height: 14, color: "var(--brass)", flexShrink: 0 }} />
                )}
                <span className="xs dim" style={{ color: "var(--text-2)", lineHeight: 1.4 }}>
                  <strong style={{ color: "var(--text)" }}>Contemporaneous Event:</strong> {current.eventLog}
                </span>
              </div>
              <div className="row gap-2">
                <span className="mono xs dim">DELAY EXPOSURE:</span>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
