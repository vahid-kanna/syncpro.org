import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Activity, Sparkles } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

interface Hotspot {
  id: string;
  label: string;
  phase: string;
  x: number; // percentage from left
  y: number; // percentage from top
  status: "ON_TRACK" | "RISK" | "DISPUTE_SHIELDED";
  statusText: string;
  floatRemaining: string;
  delayExposure: string;
  evidence: string;
  dcmaScore: string;
  detail: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "podium-mep",
    label: "Podium Level 04: MEP Risers & Heavy Ductwork",
    phase: "Phase 2 · Mechanical & Electrical",
    x: 48,
    y: 62,
    status: "RISK",
    statusText: "CRITICAL FLOAT DEPLETION (-8D)",
    floatRemaining: "-8 Days Negative Total Float",
    delayExposure: "$1.24M LD Risk if Unmitigated",
    evidence: "Acoustic duct scans + Supplier delay receipt #SN-882",
    dcmaScore: "DCMA #05 Hard Constraint Violation Flagged",
    detail:
      "Chilled water riser spool fabrication 3 weeks behind. SyncPro's graph sort parallelized 2nd fix branch runs, recovering 6 days without moving contractual handover.",
  },
  {
    id: "facade-spire",
    label: "Apex Facade: Structural Glazing Spire",
    phase: "Phase 4 · Building Enclosure",
    x: 52,
    y: 22,
    status: "DISPUTE_SHIELDED",
    statusText: "FIDIC SUB-CLAUSE 20.1 NOTICE GENERATED",
    floatRemaining: "+14 Days Total Float",
    delayExposure: "$0.00 Unbudgeted Contractor Liability",
    evidence: "Drone lidar point cloud vs. IFC model (0.3mm delta)",
    dcmaScore: "DCMA #06 Critical Path Length Index: 1.04 Pass",
    detail:
      "Architectural revision to curtain wall bracket clips issued late by Engineer. SyncPro timestamped the IFC clash and drafted the formal Notice of Claim before the 28-day FIDIC time-bar.",
  },
  {
    id: "basement-substructure",
    label: "Substructure: Secant Wall Piling & Dewatering",
    phase: "Phase 1 · Foundations & Earthworks",
    x: 32,
    y: 84,
    status: "ON_TRACK",
    statusText: "CORROBORATED AS-BUILT",
    floatRemaining: "+3 Days Total Float",
    delayExposure: "$0.00 Risk (Ahead of Baseline)",
    evidence: "78 Ultrasonic pile integrity logs + Concrete tickets",
    dcmaScore: "DCMA #01 Logic Open Ends: 0.0% Pass",
    detail:
      "All 80 secant piles completed with cryptographic QA/QC hashes stored in the audit graph. Zero logic gaps in Primavera P6 relationship ties.",
  },
];

export function DigitalTwinStudio() {
  const [selectedId, setSelectedId] = useState<string>("podium-mep");
  const activeSpot = HOTSPOTS.find((h) => h.id === selectedId) || HOTSPOTS[0];

  return (
    <section
      id="digital-twin-studio"
      style={{
        position: "relative",
        paddingTop: "110px",
        paddingBottom: "110px",
        background: "rgba(11, 13, 18, 0.6)",
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
                color: "var(--brand-300)",
                background: "var(--brand-bg)",
                border: "1px solid var(--brand-line)",
                padding: "4px 14px",
                borderRadius: "var(--r-full)",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              LIVING 3D DIGITAL TWIN // BIM RECONCILIATION
            </span>
            <span className="mono xs dim desktop-nav">SYNCHRONIZED WITH ORACLE P6 (.XER)</span>
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
            Spatial schedule intelligence. <br />
            <span style={{ color: "var(--brand-400)", textDecoration: "underline", textUnderlineOffset: "6px" }}>
              Every activity mapped to 3D reality.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="lead mt-4 measure"
            style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
          >
            SyncPro binds every Primavera P6 schedule node directly to your 3D BIM model and field inspection feeds —
            click any hotspot pin to inspect real-time float variance.
          </motion.p>
        </motion.div>

        {/* Studio Grid: Viewport on Left, Telemetry on Right */}
        <div className="grid" style={{ gridTemplateColumns: "1.3fr 0.9fr", gap: 28, alignItems: "stretch" }}>
          {/* Left: Interactive Holographic BIM Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card spotlight-card animated-border-glow"
            style={{
              position: "relative",
              padding: 0,
              overflow: "hidden",
              minHeight: 480,
              background: "rgba(8, 9, 12, 0.95)",
              border: "1px solid var(--line-strong)",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            {/* Viewport Asset Image */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 480 }}>
              <img
                src="/apex-holographic-bim.png"
                alt="3D Holographic BIM Digital Twin Model"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "contrast(1.08) brightness(0.92)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 50%, rgba(46,98,255,0.06), rgba(8,9,12,0.7) 90%)",
                  pointerEvents: "none",
                }}
              />

              {/* Holographic Hotspot Pins */}
              {HOTSPOTS.map((spot) => {
                const isSelected = spot.id === selectedId;
                const isDanger = spot.status === "RISK";
                const isShield = spot.status === "DISPUTE_SHIELDED";
                const pinColor = isDanger ? "var(--danger)" : isShield ? "var(--accent)" : "var(--brand)";

                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedId(spot.id)}
                    aria-label={spot.label}
                    style={{
                      position: "absolute",
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                      zIndex: 10,
                      padding: 0,
                      background: "none",
                      border: "none",
                    }}
                  >
                    {/* Outer Pulse Ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: -10,
                        borderRadius: "50%",
                        border: `1.5px solid ${pinColor}`,
                        opacity: isSelected ? 0.8 : 0.4,
                        animation: "nodePulse 2s ease-out infinite",
                      }}
                    />
                    {/* Inner Pin Button */}
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: isSelected ? 22 : 16,
                        height: isSelected ? 22 : 16,
                        borderRadius: "50%",
                        background: pinColor,
                        border: "2px solid #FFFFFF",
                        boxShadow: `0 0 20px ${pinColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FFFFFF" }} />
                    </motion.div>

                    {/* Floating Tooltip Label */}
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: 6,
                        whiteSpace: "nowrap",
                        background: "rgba(8, 9, 12, 0.92)",
                        border: `1px solid ${isSelected ? pinColor : "var(--line-strong)"}`,
                        borderRadius: "var(--r-xs)",
                        padding: "3px 8px",
                        fontSize: 10,
                        fontFamily: "var(--mono)",
                        color: isSelected ? "#FFFFFF" : "var(--text-2)",
                        pointerEvents: "none",
                      }}
                    >
                      {spot.label.split(":")[0]}
                    </motion.div>
                  </button>
                );
              })}

              {/* Viewport HUD Status Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 16,
                  right: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(8, 9, 12, 0.9)",
                  border: "1px solid var(--line-strong)",
                  borderRadius: "var(--r-xs)",
                  padding: "6px 14px",
                  fontSize: 11,
                  fontFamily: "var(--mono)",
                }}
              >
                <span className="row gap-2" style={{ alignItems: "center" }}>
                  <Sparkles className="ico" style={{ width: 12, height: 12, color: "var(--brand)" }} />
                  <span>VIEWPORT: APEX 80-STORY STRUCTURAL DIGITAL TWIN</span>
                </span>
                <span style={{ color: "var(--accent)" }}>FPS: 60 · GPU: HARDWARE ACCELERATED</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Selected Node Inspection Terminal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpot.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="card stack"
              style={{
                background: "rgba(16, 19, 26, 0.95)",
                border: "1px solid var(--line-strong)",
                padding: "28px",
                borderRadius: "var(--r-lg)",
                boxShadow: "var(--shadow-pop)",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="row between mb-3 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                  <span className="mono xs" style={{ color: "var(--brand-300)", fontWeight: 700 }}>
                    SPATIAL NODE INSPECTION
                  </span>
                  <span
                    className="mono xs"
                    style={{
                      color: activeSpot.status === "RISK" ? "var(--danger)" : "var(--accent)",
                      fontWeight: 700,
                    }}
                  >
                    {activeSpot.statusText}
                  </span>
                </div>

                <div className="mono xs dim mb-1">{activeSpot.phase}</div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>
                  {activeSpot.label}
                </h3>

                {/* Metric Readout Grid */}
                <div className="col gap-2 mb-4">
                  <div className="p-3" style={{ background: "rgba(8, 9, 12, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                    <div className="mono xs dim mb-1">TOTAL FLOAT VARIANCE:</div>
                    <div className="mono xs" style={{ color: activeSpot.status === "RISK" ? "var(--danger)" : "var(--brand-300)", fontWeight: 700, fontSize: "13px" }}>
                      {activeSpot.floatRemaining}
                    </div>
                  </div>

                  <div className="p-3" style={{ background: "rgba(8, 9, 12, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                    <div className="mono xs dim mb-1">FINANCIAL RISK EXPOSURE:</div>
                    <div className="mono xs" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px" }}>
                      {activeSpot.delayExposure}
                    </div>
                  </div>

                  <div className="p-3" style={{ background: "rgba(8, 9, 12, 0.8)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)" }}>
                    <div className="mono xs dim mb-1">CONTEMPORANEOUS EVIDENCE:</div>
                    <div className="xs" style={{ color: "var(--text)", lineHeight: 1.4 }}>
                      {activeSpot.evidence}
                    </div>
                  </div>
                </div>

                {/* Graph Reasoning Explanation */}
                <div
                  className="p-3"
                  style={{
                    background: "rgba(46, 98, 255, 0.08)",
                    borderLeft: "3px solid var(--brand)",
                    borderRadius: "var(--r-xs)",
                  }}
                >
                  <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                    <Activity className="ico" style={{ width: 13, height: 13, color: "var(--brand)" }} />
                    <span className="mono xs" style={{ color: "var(--brand-300)", fontWeight: 700 }}>
                      AUTONOMOUS GRAPH REMEDIATION:
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.5, margin: 0 }}>
                    {activeSpot.detail}
                  </p>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline btn-block mt-4 mono xs"
                href="#waitlist"
                style={{ justifyContent: "center", padding: "10px", fontWeight: 700 }}
              >
                DEPLOY_ON_YOUR_BIM_MODEL
                <ChevronRight className="ico" />
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
