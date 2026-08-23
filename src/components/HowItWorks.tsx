import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

const STEPS = [
  {
    id: "step-1",
    stepNumber: "01",
    tabTitle: "1. Capture Messy Reality",
    headline: "Multimodal Field Signal Ingestion",
    description:
      "Superintendents speak naturally in field audio notes. SyncPro extracts concrete volume, grade specs, and grid locations, mapping them directly to WBS Activity #A1084.",
    detailBadge: "AAC AUDIO STREAM // 44.1 kHz",
    sampleSignal: "“Poured Level 47 Core Wall Section W47-3B today. Putzmeister hydraulic boom pump operational. Ready-mix trucks 14 through 19 delivered 80 MPa mix.”",
    imageAsset: "/concrete-pour-corroboration.jpg",
  },
  {
    id: "step-2",
    stepNumber: "02",
    tabTitle: "2. Deterministic Corroboration",
    headline: "Multi-Source Evidence Gate",
    description:
      "No single source can alter the project baseline. SyncPro cross-corroborates delivery receipts, slump test certificates, and site gate OCR logs before updating float.",
    detailBadge: "CONFIDENCE SCORE: 98.4%",
    sampleSignal: "3 of 3 Independent Data Sources Verified: Supplier Batch Slip #CEMEX-88412 + Digital Rebar Scan #QC-47B + Gate Entry Log.",
    imageAsset: "/concrete-pour-corroboration.jpg",
  },
  {
    id: "step-3",
    stepNumber: "03",
    tabTitle: "3. Cryptographic Schedule Sync",
    headline: "Immutable As-Built Baseline Commit",
    description:
      "Once corroborated, updates are sealed with SHA-256 cryptographic proof and synchronized straight into Oracle Primavera P6 Enterprise and BIM models.",
    detailBadge: "DESTINATION: ORACLE PRIMAVERA P6",
    sampleSignal: "SHA-256 Seal: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (Tamper-evident contemporaneous record).",
    imageAsset: "/concrete-pour-corroboration.jpg",
  },
];

export function HowItWorks() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const active = STEPS[activeStepIdx];

  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "rgba(14, 15, 18, 0.7)",
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
                padding: "3px 10px",
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              HOW IT WORKS // 3-STEP PIPELINE
            </span>
            <span className="mono xs dim desktop-nav">CONTINUOUS SCHEDULE RECONCILIATION</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
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
            From field audio to <br />
            <span style={{ fontStyle: "italic", color: "var(--brass)" }}>defensible CPM commits.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4 measure"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            How SyncPro bridges the gap between chaotic site operations and rigid master schedules in three automated steps.
          </motion.p>
        </motion.div>

        {/* Step Navigation Tabs with Spring Motion */}
        <div className="row gap-3 mb-8 wrapf">
          {STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIdx;
            return (
              <motion.button
                key={step.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStepIdx(idx)}
                style={{
                  padding: "12px 20px",
                  background: isSelected ? "var(--bg-elevated)" : "rgba(18, 20, 24, 0.7)",
                  border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line)",
                  borderRadius: "var(--r-xs)",
                  color: isSelected ? "var(--text)" : "var(--text-3)",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 0 20px rgba(217, 119, 87, 0.2)" : "none",
                }}
              >
                <span style={{ color: isSelected ? "var(--brand)" : "var(--text-4)", fontWeight: 700 }}>
                  [{step.stepNumber}]
                </span>
                <span>{step.tabTitle.split(". ")[1]}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Step Viewport */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="card"
            style={{
              background: "rgba(18, 20, 24, 0.96)",
              border: "1px solid var(--line-strong)",
              padding: "32px",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div className="grid" style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: "32px", alignItems: "center" }}>
              {/* Left Column: Visual Asset Frame + Waveform */}
              <div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "280px",
                    borderRadius: "var(--r-xs)",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    marginBottom: "18px",
                  }}
                >
                  <img
                    src={active.imageAsset}
                    alt={active.headline}
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
                    <span>[STEP: {active.stepNumber} // FIELD TELEMETRY]</span>
                    <span style={{ color: "var(--brass)" }}>{active.detailBadge}</span>
                  </div>
                </div>

                {/* Animated Waveform Indicator */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    height: "24px",
                    padding: "2px 0",
                  }}
                >
                  {Array.from({ length: 42 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: ["30%", `${Math.sin(i * 0.5) * 50 + 50}%`, "30%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.03,
                        ease: "easeInOut",
                      }}
                      style={{
                        flex: 1,
                        background: i % 2 === 0 ? "var(--brand)" : "var(--brass)",
                        borderRadius: "1px",
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Step Description & Actionable Log */}
              <div>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  STEP {active.stepNumber}
                </span>

                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginTop: "6px", marginBottom: "14px" }}>
                  {active.headline}
                </h3>

                <p style={{ fontSize: "15.5px", color: "var(--text-2)", lineHeight: 1.6, marginBottom: "24px" }}>
                  {active.description}
                </p>

                {/* Sample Signal Box */}
                <div
                  style={{
                    padding: "16px 18px",
                    background: "rgba(10, 11, 14, 0.9)",
                    borderLeft: "3px solid var(--brass)",
                    borderRadius: "var(--r-xs)",
                    marginBottom: "20px",
                  }}
                >
                  <div className="mono xs dim mb-1">FIELD TELEMETRY PAYLOAD:</div>
                  <div style={{ fontSize: "13.5px", fontStyle: "italic", color: "var(--text)", lineHeight: 1.5 }}>
                    {active.sampleSignal}
                  </div>
                </div>

                <div className="row between pt-3" style={{ borderTop: "1px solid var(--line-soft)" }}>
                  <span className="mono xs dim">STATUS: GATE PASSED</span>
                  <a href="#waitlist" className="btn btn-outline btn-sm mono xs" style={{ color: "var(--brass)" }}>
                    SEE_PILOT_DEMO <ArrowRight className="ico" style={{ width: 12, height: 12 }} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
