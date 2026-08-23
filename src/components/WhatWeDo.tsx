import { motion } from "framer-motion";
import { Zap, ShieldCheck, Activity } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";
import { TiltCard } from "./TiltCard";

const PILLARS = [
  {
    step: "01",
    title: "Ingest Messy Field Signals",
    description:
      "Field voice memos, delivery receipts, and inspection tickets are automatically structured into hard data with zero manual entry.",
    icon: Zap,
    metric: "100% Automated",
    metricLabel: "Autonomous field extraction",
    color: "var(--brand)",
    bgColor: "var(--brand-bg)",
    lineColor: "var(--brand-line)",
  },
  {
    step: "02",
    title: "Reconcile in Real Time",
    description:
      "Catch critical path slips 3 weeks before contractors report them with a live, continuous shadow schedule.",
    icon: Activity,
    metric: "3-Week Lead Time",
    metricLabel: "Early critical path detection",
    color: "var(--brass)",
    bgColor: "var(--brass-bg)",
    lineColor: "var(--brass-line)",
  },
  {
    step: "03",
    title: "Seal Dispute Immunity",
    description:
      "Generate instant contemporaneous evidence packets and contractual FIDIC/NEC4 notices before strict time-bars expire.",
    icon: ShieldCheck,
    metric: "$60M+ Protected",
    metricLabel: "Per dispute averted",
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
        background: "rgba(10, 11, 14, 0.4)",
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
          style={{ maxWidth: "720px", margin: "0 auto 48px auto" }}
        >
          <motion.div variants={fadeUpVariants} className="row center gap-2 mb-3">
            <span
              className="mono xs"
              style={{
                color: "var(--brand)",
                background: "var(--brand-bg)",
                border: "1px solid var(--brand-line)",
                padding: "4px 12px",
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              WHAT WE DO // THE AUTONOMOUS CONTROLS LAYER
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
            }}
          >
            Three pillars of <br />
            <span style={{ fontStyle: "italic", color: "var(--brass)" }}>schedule certainty.</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            Continuous, deterministic project controls that replace retrospective monthly guesswork.
          </motion.p>
        </motion.div>

        {/* 3 Pillar Cards with Landing.love 3D Tilt & Cursor Spotlight */}
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
                  background: "rgba(18, 20, 24, 0.94)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-md)",
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
                      [{pillar.step}]
                    </span>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "8px",
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
