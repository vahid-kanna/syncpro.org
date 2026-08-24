import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, ShieldCheck, ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

export function DelayCostCalculator() {
  const [capexCr, setCapexCr] = useState<number>(1200); // ₹1,200 Cr CAPEX
  const [delayWeeks, setDelayWeeks] = useState<number>(6); // 6 Weeks delay

  // Financial Calculations in INR Crores & Lakhs
  // Daily LD: 0.1% per week / 7 days
  const dailyLdCr = (capexCr * 0.001) / 7;
  const totalLdCr = dailyLdCr * (delayWeeks * 7);

  // Extended Preliminaries (8% CAPEX over 24 months = ~0.33% / mo)
  const monthlyPrelimsCr = (capexCr * 0.08) / 24;
  const extendedPrelimsCr = (monthlyPrelimsCr / 4.33) * delayWeeks;

  // Working Capital Finance Carrying Cost @ 9% APR
  const carryingCostCr = capexCr * 0.09 * (delayWeeks / 52);

  const totalExposureCr = totalLdCr + extendedPrelimsCr + carryingCostCr;

  // SyncPro 3-week early detection recovery (~76% preserved capital)
  const syncproRecoveryCr = totalExposureCr * 0.76;

  return (
    <section
      id="financial-sandbox"
      style={{
        position: "relative",
        paddingTop: "110px",
        paddingBottom: "110px",
        background: "rgba(7, 8, 10, 0.9)",
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
              Financial Risk Sandbox · ROI Impact
            </span>
            <span className="mono xs dim desktop-nav">Indian Megaproject Exposure Modeling</span>
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
            Quantify the cost of <br />
            <span style={{ color: "var(--brand)" }}>3 weeks of schedule blindness.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4 measure"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            On a ₹1,200 Cr megaproject, every week of undetected critical path slip costs over ₹1.8 Cr in liquidated
            damages, plant &amp; machinery idle overheads, and debt carrying interest.
          </motion.p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          {/* Left Column: Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card spotlight-card animated-border-glow"
            style={{
              background: "rgba(15, 18, 24, 0.95)",
              border: "1px solid var(--line-strong)",
              padding: "32px",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div className="row between mb-6 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                Project Input Parameters
              </span>
              <Sliders className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
            </div>

            {/* Slider 01: Project CAPEX in ₹ Crores */}
            <div className="mb-6">
              <div className="row between mb-2">
                <label htmlFor="capex-slider" style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--text)" }}>
                  Contract Package Value (CAPEX)
                </label>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700, fontSize: "16px" }}>
                  ₹{capexCr.toLocaleString()} Crores
                </span>
              </div>
              <input
                id="capex-slider"
                type="range"
                min="100"
                max="5000"
                step="50"
                value={capexCr}
                onChange={(e) => setCapexCr(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "var(--brand)",
                  cursor: "pointer",
                }}
              />
              <div className="row between mono xs dim mt-1">
                <span>₹100 Cr</span>
                <span>₹2,500 Cr</span>
                <span>₹5,000 Cr+</span>
              </div>
            </div>

            {/* Slider 02: Delay Duration */}
            <div className="mb-6">
              <div className="row between mb-2">
                <label htmlFor="delay-slider" style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--text)" }}>
                  Undetected Critical Path Slip
                </label>
                <span className="mono xs" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "16px" }}>
                  {delayWeeks} Weeks ({delayWeeks * 7} Days)
                </span>
              </div>
              <input
                id="delay-slider"
                type="range"
                min="1"
                max="24"
                step="1"
                value={delayWeeks}
                onChange={(e) => setDelayWeeks(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "var(--accent)",
                  cursor: "pointer",
                }}
              />
              <div className="row between mono xs dim mt-1">
                <span>1 Week</span>
                <span>12 Weeks</span>
                <span>24 Weeks</span>
              </div>
            </div>

            <div
              className="p-3 mt-4"
              style={{
                background: "rgba(7, 8, 10, 0.8)",
                border: "1px solid var(--line-soft)",
                borderRadius: "var(--r-xs)",
              }}
            >
              <div className="mono xs dim mb-1">Contractual Benchmarks:</div>
              <p className="xs dim" style={{ margin: 0, lineHeight: 1.5 }}>
                Liquidated damages modeled at 0.1%/week (FIDIC/NHAI standard); site overheads &amp; idle plant at 8% total CAPEX; cost of debt at 9% p.a.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Output Card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card spotlight-card animated-border-glow"
            style={{
              background: "rgba(15, 18, 24, 0.95)",
              border: "1px solid var(--line-strong)",
              padding: "32px",
              borderRadius: "var(--r-lg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div>
              <div className="row between mb-4 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  Total Unmitigated Exposure
                </span>
                <span className="mono xs" style={{ color: "var(--danger)", fontWeight: 700 }}>
                  Direct Capital Loss
                </span>
              </div>

              {/* Huge Total Exposure Number in ₹ Crores */}
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(36px, 4vw, 52px)",
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ₹{totalExposureCr.toFixed(2)} Cr
                </div>
                <div className="mono xs dim">ACCUMULATED DIRECT LOSSES ACROSS {delayWeeks} WEEKS</div>
              </div>

              {/* Breakdown Rows */}
              <div className="col gap-2 mb-4" style={{ fontSize: "13.5px" }}>
                <div className="row between p-2" style={{ background: "rgba(7, 8, 10, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Liquidated Damages (LDs):</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>
                    ₹{totalLdCr.toFixed(2)} Cr ({((dailyLdCr * 100)).toFixed(1)} Lakhs/Day)
                  </span>
                </div>
                <div className="row between p-2" style={{ background: "rgba(7, 8, 10, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Extended Site Overheads &amp; Plant Idle:</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>
                    ₹{extendedPrelimsCr.toFixed(2)} Cr
                  </span>
                </div>
                <div className="row between p-2" style={{ background: "rgba(7, 8, 10, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Debt Service &amp; Carrying Interest:</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>
                    ₹{carryingCostCr.toFixed(2)} Cr
                  </span>
                </div>
              </div>

              {/* SyncPro Margin Recovery Box */}
              <div
                className="p-3"
                style={{
                  background: "rgba(0, 229, 153, 0.08)",
                  border: "1px solid var(--brand-line)",
                  borderRadius: "var(--r-xs)",
                }}
              >
                <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                  <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brand)" }} />
                  <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                    SyncPro Early Protection:
                  </span>
                </div>
                <div className="row between mt-1">
                  <span className="xs" style={{ color: "var(--text-2)" }}>Protected Capital via 3-Week Early Detection:</span>
                  <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700, fontSize: "14.5px" }}>
                    +₹{syncproRecoveryCr.toFixed(2)} Cr
                  </span>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-block mt-4 xs"
              href="#waitlist"
              style={{ justifyContent: "center", padding: "12px", fontWeight: 700, borderRadius: "var(--r-full)" }}
            >
              Protect Project Capital
              <ArrowRight className="ico" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
