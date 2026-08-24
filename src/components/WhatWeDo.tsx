import { motion } from "framer-motion";
import { Zap, ShieldCheck, Activity } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";
import { TiltCard } from "./TiltCard";

const PILLARS = [
  {
    step: "01",
    title: "Zero Manual Data Entry",
    subtitle: "Ingest Messy Field Signals",
    description:
      "Site voice notes, concrete batch tickets, and delivery dockets are automatically structured and mapped to exact Primavera P6 CPM activity nodes with zero manual typing.",
    icon: Zap,
    metric: "100% Autonomous",
    metricLabel: "Multimodal field signal extraction",
    color: "var(--brand)",
    bgColor: "var(--brand-bg)",
    lineColor: "var(--brand-line)",
  },
  {
    step: "02",
    title: "Zero Retrospective Blindness",
    subtitle: "Reconcile in Real Time",
    description:
      "Catch critical path slips 3 weeks before contractors report them. SyncPro maintains a live shadow schedule updated continuously from site telemetry.",
    icon: Activity,
    metric: "3-Week Lead Time",
    metricLabel: "Early critical path detection",
    color: "var(--accent)",
    bgColor: "var(--accent-bg)",
    lineColor: "var(--accent-line)",
  },
  {
    step: "03",
    title: "Zero Dispute Liability",
    subtitle: "Seal Contractual Immunity",
    description:
      "Generate 1-click contemporaneous evidence dossiers and formal FIDIC / NHAI extension-of-time notices before strict contractual time-bars expire.",
    icon: ShieldCheck,
    metric: "₹50 Cr+ Protected",
    metricLabel: "Per megaproject dispute averted",
    color: "var(--brand)",
    bgColor: "var(--brand-bg)",
    lineColor: "var(--brand-line)",
  },
];

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      style={{
        position: "relative",
        paddingTop: "110px",
        paddingBottom: "110px",
        background: "rgba(11, 13, 17, 0.6)",
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
          className="mb-14 text-center"
          style={{ maxWidth: "780px", margin: "0 auto 52px auto" }}
        >
          <motion.div variants={fadeUpVariants} className="row center gap-2 mb-3">
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
              Core Capabilities · Zero Guesswork
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="display"
            style={{
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
            }}
          >
            Three non-negotiable truths of <br />
            <span style={{ color: "var(--brand)", textDecoration: "underline", textUnderlineOffset: "6px" }}>
              autonomous project controls.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            Continuous, deterministic schedule reconciliation that replaces delayed monthly reports.
          </motion.p>
        </motion.div>

        {/* 3 Stacking Cards with 3D Tilt & Cursor Spotlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid-3 gap-6"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <TiltCard
                key={pillar.step}
                className="card animated-border-glow"
                style={{
                  background: "rgba(15, 18, 24, 0.95)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-lg)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div className="row between mb-6">
                    <span className="mono xs" style={{ color: pillar.color, fontWeight: 700, fontSize: "14px" }}>
                      0{pillar.step}
                    </span>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "10px",
                        background: pillar.bgColor,
                        border: `1px solid ${pillar.lineColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon className="ico" style={{ width: 20, height: 20, color: pillar.color }} />
                    </div>
                  </div>

                  <div className="mono xs dim mb-1" style={{ color: "var(--text-3)", letterSpacing: "0.02em" }}>
                    {pillar.subtitle}
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: "14.5px", color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4" style={{ borderTop: "1px solid var(--line-soft)" }}>
                  <div className="mono xs" style={{ color: pillar.color, fontWeight: 700, fontSize: "16px" }}>
                    {pillar.metric}
                  </div>
                  <div className="xs dim mt-1">{pillar.metricLabel}</div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
