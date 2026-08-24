import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { fadeUpVariants, staggerContainer, kineticTextFlipVariants } from "../lib/motion";

interface MilestoneData {
  week: number;
  date: string;
  phase: string;
  fieldTruth: string;
  cpmStatus: "ON_TRACK" | "SLIP_FLAGGED" | "REMEDIATED";
  floatDelta: string;
  confidence: number;
}

const MILESTONES: MilestoneData[] = [
  {
    week: 4,
    date: "W04 · OCT 12",
    phase: "Substructure & Piling",
    fieldTruth: "78 of 80 secant piles poured. Sonic integrity tests verified via drone acoustic telemetry.",
    cpmStatus: "ON_TRACK",
    floatDelta: "+2 Days Total Float",
    confidence: 99.4,
  },
  {
    week: 12,
    date: "W12 · DEC 08",
    phase: "Level 4 Slab & Rebar",
    fieldTruth: "Subcontractor audio reports 3-day delay in post-tension cable delivery. P6 critical path at risk.",
    cpmStatus: "SLIP_FLAGGED",
    floatDelta: "-8 Days Critical Slip (CPLI 0.88)",
    confidence: 97.8,
  },
  {
    week: 24,
    date: "W24 · MAR 15",
    phase: "Podium MEP & Facade",
    fieldTruth: "Autonomous graph remediation executed: MEP rough-ins parallelized. Baseline restored.",
    cpmStatus: "REMEDIATED",
    floatDelta: "+1 Day Float Restored (DCMA Pass)",
    confidence: 98.9,
  },
];

const FLIP_WORDS = [
  "Rebar Placement",
  "Concrete Slump Tests",
  "MEP Riser Feeds",
  "Delivery Receipts",
  "Field Audio Notes",
];

export function Hero() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const current = MILESTONES[activeStep];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % FLIP_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        paddingTop: "60px",
        paddingBottom: "100px",
        overflow: "hidden",
      }}
    >
      <div className="wrap-lg">
        {/* Top Telemetry Chip */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ maxWidth: "980px", margin: "0 auto", textAlign: "center" }}
        >
          <motion.div variants={fadeUpVariants} className="row center gap-2 mb-4">
            <span
              className="mono xs"
              style={{
                color: "var(--brand-300)",
                background: "var(--brand-bg)",
                border: "1px solid var(--brand-line)",
                padding: "4px 14px",
                borderRadius: "var(--r-full)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles className="ico" style={{ width: 12, height: 12, color: "var(--brand)" }} />
              AUTONOMOUS CONTROLS LAYER FOR MEGAPROJECTS
            </span>
          </motion.div>

          {/* Kinetic Manifesto Headline with Text Flip */}
          <motion.h1
            variants={fadeUpVariants}
            className="display"
            style={{
              fontSize: "clamp(38px, 5.2vw, 68px)",
              lineHeight: 1.08,
              color: "var(--text)",
              letterSpacing: "-0.035em",
              marginBottom: "24px",
            }}
          >
            Megaprojects don’t fail on site. <br />
            They fail in the 3-week gap between{" "}
            <span
              style={{
                display: "inline-block",
                position: "relative",
                color: "var(--brand-400)",
                minWidth: "260px",
                textAlign: "left",
                verticalAlign: "bottom",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  variants={kineticTextFlipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    display: "inline-block",
                    textDecoration: "underline",
                    textDecorationColor: "var(--brand-line)",
                    textUnderlineOffset: "6px",
                  }}
                >
                  {FLIP_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            <br />
            and the schedule.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="lead measure"
            style={{
              margin: "0 auto 36px auto",
              fontSize: "18px",
              color: "var(--text-2)",
            }}
          >
            SyncPro continuously reconciles field reality against your Primavera P6 baseline — catching critical
            path slips 3 weeks before contractors report them.
          </motion.p>

          {/* Dual Action CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="row center gap-4 wrapf mb-14"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary mono xs"
              href="#waitlist"
              style={{
                padding: "12px 28px",
                borderRadius: "var(--r-full)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              REQUEST_PILOT_ACCESS
              <ArrowRight className="ico" style={{ width: 14, height: 14 }} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-outline mono xs"
              href="#financial-sandbox"
              style={{
                padding: "12px 24px",
                borderRadius: "var(--r-full)",
                fontSize: "13px",
              }}
            >
              CALCULATE_DELAY_ROI
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Live Interactive Time-Machine Scrubber & CAD Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="card spotlight-card animated-border-glow"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "24px",
            background: "rgba(16, 19, 26, 0.95)",
            border: "1px solid var(--line-strong)",
            borderRadius: "var(--r-lg)",
            boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.9)",
          }}
        >
          {/* Top Control Bar */}
          <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line-soft)", alignItems: "center" }}>
            <div className="row gap-2" style={{ alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand)" }} />
              <span className="mono xs" style={{ color: "var(--text)", fontWeight: 700 }}>
                PROJECT: OBSIDIAN SPIRE (TOWER A) · $450M CAPEX
              </span>
            </div>
            <div className="row gap-3 xs mono dim">
              <span>ORACLE PRIMAVERA P6 (.XER)</span>
              <span style={{ color: "var(--accent)" }}>GRAPH_ENGINE: ACTIVE</span>
            </div>
          </div>

          {/* Main Visual Frame with Floating Telemetry Badges */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              marginBottom: "20px",
            }}
          >
            <img
              src="/obsidian-spire-cad.jpg"
              alt="Obsidian Spire Megaproject CAD Digital Twin"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.08) brightness(0.92)",
              }}
            />
            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(8,9,12,0.1) 0%, rgba(8,9,12,0.85) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Zero-Style Floating Telemetry Badges */}
            <div
              className="anim-float"
              style={{
                position: "absolute",
                top: "24px",
                left: "24px",
                background: "rgba(16, 19, 26, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--brand-line)",
                padding: "8px 14px",
                borderRadius: "var(--r-sm)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                color: "#FFFFFF",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Activity className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
              <span>EVIDENCE CONFIDENCE: {current.confidence}%</span>
            </div>

            <div
              className="anim-float-delayed"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(16, 19, 26, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--accent-line)",
                padding: "8px 14px",
                borderRadius: "var(--r-sm)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                color: "var(--accent)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--accent)" }} />
              <span>DISPUTE IMMUNITY: SEALED</span>
            </div>

            {/* Bottom Milestone Information Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <span className="mono xs" style={{ color: "var(--brand-300)", fontWeight: 700 }}>
                  {current.date} // PHASE: {current.phase}
                </span>
                <p style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, margin: "4px 0 0 0", maxWidth: "620px" }}>
                  {current.fieldTruth}
                </p>
              </div>
              <div className="mono xs" style={{ color: current.cpmStatus === "SLIP_FLAGGED" ? "var(--danger)" : "var(--accent)", fontWeight: 700 }}>
                {current.floatDelta}
              </div>
            </div>
          </div>

          {/* Interactive Step Slider Bar */}
          <div className="grid-3 gap-3">
            {MILESTONES.map((m, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={m.week}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: "12px 14px",
                    background: isSelected ? "var(--bg-elevated)" : "rgba(8, 9, 12, 0.6)",
                    border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line-soft)",
                    borderRadius: "var(--r-xs)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div className="row between mb-1">
                    <span className="mono xs" style={{ color: isSelected ? "var(--brand)" : "var(--text-3)", fontWeight: 700 }}>
                      MILESTONE {idx + 1}
                    </span>
                    {m.cpmStatus === "SLIP_FLAGGED" ? (
                      <AlertTriangle className="ico" style={{ width: 12, height: 12, color: "var(--danger)" }} />
                    ) : (
                      <CheckCircle2 className="ico" style={{ width: 12, height: 12, color: "var(--accent)" }} />
                    )}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: isSelected ? "var(--text)" : "var(--text-2)" }}>
                    {m.date}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
