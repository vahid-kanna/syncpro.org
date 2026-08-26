import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

/**
 * SignalIQ-style hero: flanking mono eyebrows, one confident statement
 * headline, a quantified hook, and a quiet tool-stack strip. The heavy
 * data artifacts live in the numbered narrative sections below.
 */

const TOOLS = [
  "ORACLE PRIMAVERA P6 (.XER)",
  "ASTA POWERPROJECT (.PP)",
  "MS PROJECT (.MPP)",
  "PRIMAVERA XML / MSPDI",
];

export function Hero() {
  return (
    <section className="hero-signal" aria-label="Introduction">
      <motion.div
        className="wrap-lg"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        transition={{ staggerChildren: 0.09 }}
      >
        {/* Flanking eyebrow pair */}
        <motion.div variants={fadeUpVariants} className="hero-eyebrows mono xs" aria-hidden="true">
          <span>AUTONOMOUS PROJECT CONTROLS</span>
          <span className="hero-eyebrow-rule" />
          <span>P6 · CPM · FIDIC</span>
        </motion.div>

        <motion.h1 variants={fadeUpVariants} className="display hero-title">
          The autonomous<br />Project Controls Engineer.
        </motion.h1>

        <motion.p variants={fadeUpVariants} className="lead measure hero-sub">
          Contractors report critical-path slips three weeks after they happen. On a
          ₹1,200&nbsp;Cr megaproject, that blind spot burns{" "}
          <strong style={{ color: "var(--text)" }}>₹1.8&nbsp;Cr every week.</strong>{" "}
          SyncPro reads every site signal and reconciles it against your P6 baseline in
          real time — so the schedule updates itself before the delay gets expensive.
        </motion.p>

        <motion.div variants={fadeUpVariants} className="row center gap-4 wrapf hero-ctas">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary"
            href="#waitlist"
            style={{ padding: "13px 32px", borderRadius: "var(--r-full)", fontWeight: 700 }}
          >
            Get In Touch
            <ArrowRight className="ico" style={{ width: 15, height: 15 }} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline"
            href="#financial-sandbox"
            style={{ padding: "13px 28px", borderRadius: "var(--r-full)", fontWeight: 600 }}
          >
            Calculate Delay Exposure
          </motion.a>
        </motion.div>

        {/* Tool stack strip */}
        <motion.div variants={fadeUpVariants} className="hero-tools" aria-label="Supported scheduling platforms">
          {TOOLS.map((t) => (
            <span key={t} className="mono xs dim">{t}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
