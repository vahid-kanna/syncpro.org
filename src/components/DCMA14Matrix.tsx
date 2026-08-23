import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

interface DCMAItem {
  id: number;
  metric: string;
  threshold: string;
  measured: string;
  status: "PASSED" | "FLAGGED";
  remediation: string;
}

const DCMA_METRICS: DCMAItem[] = [
  {
    id: 1,
    metric: "Logic Open Ends (Missing Links)",
    threshold: "< 5.0% of total activities",
    measured: "0.2% (2 of 2,846 activities)",
    status: "PASSED",
    remediation: "Neo4j graph sort mapped unlinked slab tasks to downstream MEP risers.",
  },
  {
    id: 2,
    metric: "Leads (Negative Lags)",
    threshold: "0.0% (Strict DoD Prohibition)",
    measured: "0.0% (Zero leads found)",
    status: "PASSED",
    remediation: "Negative leads converted to Start-to-Start (SS) with positive lag.",
  },
  {
    id: 3,
    metric: "Excessive Positive Lags (> 5 Days)",
    threshold: "< 5.0% of relationships",
    measured: "1.4% (13 relationships)",
    status: "PASSED",
    remediation: "Cure lags verified against ASTM C39 strength curves.",
  },
  {
    id: 4,
    metric: "Finish-to-Start Dominance",
    threshold: "> 90.0% Finish-to-Start (FS)",
    measured: "94.2% FS relationships",
    status: "PASSED",
    remediation: "Start-to-finish anomalies refactored to clean FS logic.",
  },
  {
    id: 5,
    metric: "Hard Constraints (Mandatory Locks)",
    threshold: "< 5.0% of activities",
    measured: "0.6% (Milestones only)",
    status: "PASSED",
    remediation: "Artificial date hard locks removed in favor of dynamic float passes.",
  },
  {
    id: 6,
    metric: "Critical Path Length Index (CPLI)",
    threshold: "CPLI >= 1.00",
    measured: "1.04 (On schedule)",
    status: "PASSED",
    remediation: "Float consumption monitored in real time across primary critical paths.",
  },
];

export function DCMA14Matrix() {
  const [activeItem, setActiveItem] = useState<DCMAItem>(DCMA_METRICS[0]);

  return (
    <section
      id="dcma-scanner"
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
                color: "var(--brass)",
                background: "var(--brass-bg)",
                border: "1px solid var(--brass-line)",
                padding: "3px 10px",
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              DEFENSE-GRADE SCHEDULE HEALTH // DCMA-14
            </span>
            <span className="mono xs dim desktop-nav">STANDARD: DoD 5000.2 COMPLIANCE</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
              maxWidth: "840px",
              marginTop: "8px",
            }}
          >
            Automated defense-grade <br />
            <span style={{ fontStyle: "italic", color: "var(--brand)" }}>schedule diagnostics.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4 measure"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            Before any update touches your baseline, SyncPro executes all 14 Defense Contract Management Agency (DCMA)
            integrity checks across your Oracle Primavera P6 (.xer) schedules in milliseconds.
          </motion.p>
        </motion.div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr", gap: "28px" }}>
          {/* Left Column: Interactive Criteria List */}
          <div
            className="card"
            style={{
              background: "rgba(18, 20, 24, 0.9)",
              border: "1px solid var(--line)",
              padding: "24px",
              borderRadius: "var(--r-md)",
              maxHeight: "520px",
              overflowY: "auto",
            }}
          >
            <div className="row between mb-4 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                DCMA-14 AUDIT METRICS
              </span>
              <span className="mono xs dim">STATUS: 100% HEALTH</span>
            </div>

            <div className="col gap-2">
              {DCMA_METRICS.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveItem(item)}
                    style={{
                      padding: "14px 16px",
                      background: isSelected ? "var(--bg-elevated)" : "rgba(10, 11, 14, 0.6)",
                      border: isSelected ? "1px solid var(--brand)" : "1px solid var(--line-soft)",
                      borderRadius: "var(--r-xs)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div className="row between mb-1">
                      <span className="mono xs" style={{ color: isSelected ? "var(--brand)" : "var(--text-3)", fontWeight: 700 }}>
                        CHECK #{item.id.toString().padStart(2, "0")}
                      </span>
                      <span className="row gap-1 xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                        <CheckCircle2 className="ico" style={{ width: 12, height: 12 }} />
                        {item.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text)" }}>{item.metric}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tablet Visual Asset + Selected Check Inspection */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="card"
              style={{
                background: "rgba(18, 20, 24, 0.96)",
                border: "1px solid var(--line-strong)",
                padding: "26px",
                borderRadius: "var(--r-md)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Tablet Image Asset Frame */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    borderRadius: "var(--r-xs)",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    marginBottom: "18px",
                  }}
                >
                  <img
                    src="/dcma-audit-tablet.jpg"
                    alt="Primavera P6 Schedule Health Audit Tablet"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "contrast(1.06) brightness(0.96)",
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
                      bottom: 10,
                      left: 14,
                      right: 14,
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      fontFamily: "var(--mono)",
                      color: "#FFFFFF",
                    }}
                  >
                    <span>[PROJECT: AURORA-7 TOWER]</span>
                    <span style={{ color: "var(--brass)" }}>OVERALL HEALTH: 92/100 GOOD</span>
                  </div>
                </div>

                <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                  <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 600 }}>
                    CHECK #{activeItem.id.toString().padStart(2, "0")} INSPECTION
                  </span>
                  <span className="status xs" style={{ color: "var(--brass)" }}>
                    <ShieldCheck className="ico" style={{ width: 12, height: 12, color: "var(--brass)" }} />
                    COMPLIANT
                  </span>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>
                  {activeItem.metric}
                </h3>

                <div className="grid-2 gap-3 mb-4">
                  <div className="p-3" style={{ background: "rgba(10, 11, 14, 0.85)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                    <div className="mono xs dim mb-1">ALLOWED THRESHOLD:</div>
                    <div className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                      {activeItem.threshold}
                    </div>
                  </div>
                  <div className="p-3" style={{ background: "rgba(10, 11, 14, 0.85)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                    <div className="mono xs dim mb-1">ACTUAL MEASURED:</div>
                    <div className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                      {activeItem.measured}
                    </div>
                  </div>
                </div>

                <div className="p-3" style={{ background: "rgba(10, 11, 14, 0.9)", borderLeft: "3px solid var(--brass)", borderRadius: "var(--r-xs)" }}>
                  <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                    <RefreshCw className="ico" style={{ width: 13, height: 13, color: "var(--brass)" }} />
                    <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                      AUTOMATED GRAPH LOGIC REMEDIATION:
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5, margin: 0 }}>
                    {activeItem.remediation}
                  </p>
                </div>
              </div>

              <div className="row between mt-4 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
                <span className="mono xs dim">AUDIT ENGINE: NEO4J TOPOLOGICAL SORT</span>
                <span className="mono xs" style={{ color: "var(--text-3)" }}>
                  CORRECTION TIME: &lt; 40ms
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
