import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

const STEPS = [
  {
    num: "01",
    label: "Capture",
    title: "Multimodal Field Signal Ingestion",
    description:
      "Site supervisors and package managers record Hindi/English voice notes, upload delivery dockets, and snap concrete batch receipts. SyncPro extracts quantities, dates, and grids automatically.",
    badge: "Input: Multimodal Telemetry",
    badgeColor: "var(--brand)",
    visual: {
      type: "audio",
      title: "Audio Transcript · Level 18 Concrete Pour",
      quote:
        '"Batch #4902 RMC truck delivered at 14:15. Slump test 140mm verified. Poured 120m³ M40 concrete for Grid C3-C7. Post-tension cable delivery delayed by 2 days due to fabrication hold."',
      meta: "Corroborated by: 4 RMC Delivery Tickets + Ultrasonic Sounding Scan",
    },
  },
  {
    num: "02",
    label: "Corroborate",
    title: "Graph-Based Truth Corroboration",
    description:
      "Before any schedule is updated, site claims are cross-checked against drone point clouds, delivery challans, and weighbridge receipts in an anti-hallucination Neo4j knowledge graph.",
    badge: "Validation: Graph Reconciliation",
    badgeColor: "var(--accent)",
    visual: {
      type: "matrix",
      title: "Contemporaneous Fact Corroboration Matrix",
      items: [
        { claim: "120m³ M40 Concrete Poured (Grid C3-C7)", status: "Confirmed (100%)", source: "RMC Challans #4901-#4908" },
        { claim: "Rebar Density & Cover Verification", status: "Verified (100%)", source: "Drone Photogrammetry Mesh" },
        { claim: "Post-Tension Duct Hold (+2 Days)", status: "Critical Slip (+2D)", source: "Supplier Notice #SN-882" },
      ],
      meta: "Deterministic Confidence Score: 98.7%",
    },
  },
  {
    num: "03",
    label: "Commit",
    title: "Autonomous Primavera P6 Baseline Sync",
    description:
      "Reconciled progress is written into a shadow Primavera P6 CPM schedule, running real-time forward and backward float passes without touching the master baseline until signed off.",
    badge: "Output: Shadow Schedule Sync",
    badgeColor: "var(--brand)",
    visual: {
      type: "p6",
      title: "Primavera P6 Schedule Delta · Activity ID: ACT-4092",
      baselineStart: "Oct 12, 2026",
      forecastFinish: "Oct 16, 2026 (+2 Days)",
      criticalPathImpact: "Consumes 2 Days of Total Float (Float remaining: 6 Days)",
      meta: "Contractual Notice Drafted Automatically (FIDIC / NHAI Compliant)",
    },
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const step = STEPS[activeStep];

  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        paddingTop: "110px",
        paddingBottom: "110px",
        background: "rgba(7, 8, 10, 0.85)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap-lg">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeUpVariants} className="row gap-2 mb-3" style={{ alignItems: "center" }}>
            <span
              className="mono xs"
              style={{
                color: "var(--brand)",
                background: "var(--brand-bg)",
                border: "1px solid var(--brand-line)",
                padding: "4px 16px",
                borderRadius: "var(--r-full)",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              How It Works · 3-Step Pipeline
            </span>
            <span className="mono xs dim desktop-nav">Zero Hallucination Guarantee</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="display"
            style={{
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
              maxWidth: "840px",
              marginTop: "8px",
            }}
          >
            From site whisper to <br />
            <span style={{ color: "var(--brand)" }}>defensible schedule fact.</span>
          </motion.h2>
        </motion.div>

        {/* Step Selector Tabs */}
        <div className="grid-3 gap-4 mb-8">
          {STEPS.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: "18px 20px",
                  background: isSelected ? "var(--bg-elevated)" : "rgba(15, 18, 24, 0.6)",
                  border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 10px 30px rgba(0, 229, 153, 0.15)" : "none",
                }}
              >
                <div className="row between mb-2">
                  <span className="mono xs" style={{ color: isSelected ? "var(--brand)" : "var(--text-3)", fontWeight: 700 }}>
                    Step {s.num}
                  </span>
                  <span className="mono xs" style={{ color: isSelected ? "var(--text)" : "var(--text-3)", fontWeight: 600 }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Presentation Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="card spotlight-card animated-border-glow"
            style={{
              background: "rgba(15, 18, 24, 0.95)",
              border: "1px solid var(--line-strong)",
              padding: "32px",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div className="grid" style={{ gridTemplateColumns: "1.1fr 1.3fr", gap: "32px", alignItems: "center" }}>
              {/* Left Details */}
              <div>
                <div className="row gap-2 mb-3">
                  <span
                    className="mono xs"
                    style={{
                      color: step.badgeColor,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--line)",
                      padding: "3px 12px",
                      borderRadius: "var(--r-full)",
                      fontWeight: 600,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginBottom: "14px", lineHeight: 1.25 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "24px" }}>
                  {step.description}
                </p>
                <div className="p-3" style={{ background: "rgba(7, 8, 10, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                  <div className="mono xs dim mb-1">Reconciliation Speed:</div>
                  <div className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                    &lt; 400ms Deterministic Graph Reconciliation
                  </div>
                </div>
              </div>

              {/* Right Interactive Visual Simulation */}
              <div
                style={{
                  background: "rgba(7, 8, 10, 0.95)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-md)",
                  padding: "24px",
                }}
              >
                {/* Step 01: Waveform & Concrete Pour Visual */}
                {step.visual.type === "audio" && (
                  <div>
                    {/* Visual Concrete Rebar Photo Asset */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "180px",
                        borderRadius: "var(--r-xs)",
                        overflow: "hidden",
                        border: "1px solid var(--line)",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src="/concrete-pour-corroboration.jpg"
                        alt="Field Concrete Pour Rebar Inspection"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, transparent 40%, rgba(7,8,10,0.85) 100%)",
                        }}
                      />
                      <div className="mono xs" style={{ position: "absolute", bottom: 10, left: 12, color: "#FFFFFF" }}>
                        Field Sensor: Level 18 Rebar Scan
                      </div>
                    </div>

                    <div className="mono xs mb-2" style={{ color: "var(--brand)", fontWeight: 600 }}>
                      {step.visual.title}
                    </div>

                    {/* Animated Pulsing Waveform */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        height: "36px",
                        padding: "8px 12px",
                        background: "rgba(15, 18, 24, 0.8)",
                        borderRadius: "var(--r-xs)",
                        border: "1px solid var(--line-soft)",
                        marginBottom: "14px",
                      }}
                    >
                      {Array.from({ length: 42 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [6, Math.sin(i * 0.45) * 14 + 14, 6],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.04,
                            ease: "easeInOut",
                          }}
                          style={{
                            width: "3px",
                            background: "var(--brand)",
                            borderRadius: "2px",
                          }}
                        />
                      ))}
                    </div>

                    <p style={{ fontSize: "13px", color: "var(--text)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                      {step.visual.quote}
                    </p>
                    <div className="mono xs mt-3 pt-2" style={{ borderTop: "1px solid var(--line-soft)", color: "var(--accent)" }}>
                      {step.visual.meta}
                    </div>
                  </div>
                )}

                {/* Step 02: Corroboration Matrix */}
                {step.visual.type === "matrix" && (
                  <div>
                    <div className="mono xs mb-3" style={{ color: "var(--accent)", fontWeight: 600 }}>
                      {step.visual.title}
                    </div>
                    <div className="col gap-2 mb-3">
                      {step.visual.items?.map((item, i) => (
                        <div
                          key={i}
                          className="p-2"
                          style={{
                            background: "rgba(15, 18, 24, 0.8)",
                            border: "1px solid var(--line-soft)",
                            borderRadius: "var(--r-xs)",
                          }}
                        >
                          <div className="row between">
                            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text)" }}>{item.claim}</span>
                            <span className="mono xs" style={{ color: item.status.includes("Critical") ? "var(--danger)" : "var(--brand)", fontWeight: 700 }}>
                              {item.status}
                            </span>
                          </div>
                          <div className="mono xs dim mt-1">Source: {item.source}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mono xs pt-2" style={{ borderTop: "1px solid var(--line-soft)", color: "var(--brand)" }}>
                      {step.visual.meta}
                    </div>
                  </div>
                )}

                {/* Step 03: Primavera P6 Schedule Delta */}
                {step.visual.type === "p6" && (
                  <div>
                    <div className="mono xs mb-3" style={{ color: "var(--brand)", fontWeight: 600 }}>
                      {step.visual.title}
                    </div>
                    <div className="p-3 mb-3" style={{ background: "rgba(15, 18, 24, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                      <div className="row between mb-2">
                        <span className="dim xs">Baseline Finish:</span>
                        <span className="mono xs" style={{ color: "var(--text)" }}>{step.visual.baselineStart}</span>
                      </div>
                      <div className="row between mb-2">
                        <span className="dim xs">Forecast Finish:</span>
                        <span className="mono xs" style={{ color: "var(--danger)", fontWeight: 700 }}>{step.visual.forecastFinish}</span>
                      </div>
                      <div className="row between">
                        <span className="dim xs">Critical Float Impact:</span>
                        <span className="mono xs" style={{ color: "var(--accent)" }}>{step.visual.criticalPathImpact}</span>
                      </div>
                    </div>
                    <div className="mono xs pt-2" style={{ borderTop: "1px solid var(--line-soft)", color: "var(--brand)" }}>
                      {step.visual.meta}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
