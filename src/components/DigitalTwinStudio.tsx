import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Activity, Sparkles } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

interface Hotspot {
  id: string;
  label: string;
  level: string;
  cpmCode: string;
  status: "verified" | "warning" | "on-schedule";
  confidence: number;
  top: string;
  left: string;
  trade: string;
  criticalFloat: string;
  action: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "pin-1",
    label: "Outrigger Level 68",
    level: "Level 68",
    cpmCode: "A1084",
    status: "verified",
    confidence: 98.7,
    top: "22%",
    left: "51%",
    trade: "Structural Steel & Outriggers",
    criticalFloat: "+0.00 Days (Zero Slip)",
    action: "Verified & Staged for Baseline Commit",
  },
  {
    id: "pin-2",
    label: "Structural Core B — Outrigger L42",
    level: "Level 42",
    cpmCode: "A1042",
    status: "warning",
    confidence: 91.2,
    top: "44%",
    left: "49%",
    trade: "Heavy Concrete Core Wall",
    criticalFloat: "-4.50 Days (Float Consumed)",
    action: "Early Delay Notice Drafted (FIDIC 8.4)",
  },
  {
    id: "pin-3",
    label: "Podium & MEP Risers",
    level: "Level 08",
    cpmCode: "A0915",
    status: "on-schedule",
    confidence: 96.4,
    top: "72%",
    left: "50%",
    trade: "Mechanical & Electrical Risers",
    criticalFloat: "+2.00 Days Total Float",
    action: "Contemporaneous Record Sealed",
  },
];

export function DigitalTwinStudio() {
  const [selectedPin, setSelectedPin] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <section
      id="digital-twin-studio"
      style={{
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "100px",
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
          className="mb-12"
        >
          <div className="row between mb-8 wrapf" style={{ alignItems: "flex-end" }}>
            <div>
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
                  SPATIAL 4D CONTROLS // LIVING DIGITAL TWIN
                </span>
                <span className="mono xs dim desktop-nav">PROJECT: APEX-80</span>
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
                Living spatial twin of your <br />
                <span style={{ fontStyle: "italic", color: "var(--brass)" }}>project controls.</span>
              </motion.h2>

              <motion.p
                variants={fadeUpVariants}
                className="lead mt-3 measure"
                style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}
              >
                Click spatial pins to inspect real-time progress, float variances, and automated contract notice drafts.
              </motion.p>
            </div>

            <motion.div variants={fadeUpVariants} className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
              <Sparkles className="ico" style={{ width: 12, height: 12, marginRight: 4 }} />
              BIM 4D SPATIAL MODEL
            </motion.div>
          </div>
        </motion.div>

        {/* Studio Canvas Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.35fr 0.85fr",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          {/* Left: Interactive Holographic BIM Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
            style={{
              position: "relative",
              padding: 0,
              overflow: "hidden",
              minHeight: 480,
              background: "rgba(10, 11, 14, 0.95)",
              border: "1px solid var(--line-strong)",
              boxShadow: "var(--shadow-pop)",
              borderRadius: "var(--r-md)",
            }}
          >
            {/* Viewport Header */}
            <div
              className="row between px-4 py-3"
              style={{
                background: "rgba(18, 20, 24, 0.95)",
                borderBottom: "1px solid var(--line)",
                fontSize: 12,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 20,
              }}
            >
              <div className="row gap-2 mono xs" style={{ color: "var(--brass)" }}>
                <Activity className="ico pulse" style={{ width: 13, height: 13, color: "var(--brand)" }} />
                <span>APEX-80 // HOLOGRAPHIC BIM TWIN</span>
              </div>
              <span className="mono xs dim">ACCURACY: ±2.3mm · 2.48B PTS</span>
            </div>

            {/* High-Definition Holographic Asset */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 480 }}>
              <img
                src="/apex-holographic-bim.png"
                alt="Apex-80 3D Holographic BIM Digital Twin"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 35%",
                  filter: "contrast(1.08) brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, transparent 40%, rgba(10,11,14,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Interactive Telemetry Hotspot Pins */}
              {HOTSPOTS.map((pin) => {
                const isSelected = selectedPin.id === pin.id;
                return (
                  <motion.button
                    key={pin.id}
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPin(pin)}
                    style={{
                      position: "absolute",
                      top: pin.top,
                      left: pin.left,
                      transform: "translate(-50%, -50%)",
                      zIndex: 30,
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    {/* Pulse Ring */}
                    <span
                      style={{
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        background: pin.status === "warning" ? "rgba(217, 119, 87, 0.45)" : "rgba(212, 155, 75, 0.45)",
                        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      }}
                    />
                    {/* Pin Center */}
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: isSelected ? "#FFFFFF" : pin.status === "warning" ? "var(--brand)" : "var(--brass)",
                        color: "#08090C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 800,
                        boxShadow: "0 0 16px rgba(0,0,0,0.8)",
                        border: "2px solid #FFFFFF",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {pin.level.replace("Level ", "L")}
                    </div>
                    {/* Pin Label Tag */}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: 30,
                        transform: "translateX(-50%)",
                        background: "rgba(10, 11, 14, 0.95)",
                        border: `1px solid ${isSelected ? "var(--brand)" : "var(--line)"}`,
                        padding: "3px 8px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      <span className="mono xs" style={{ fontSize: 10.5, color: isSelected ? "#FFFFFF" : "var(--brass)" }}>
                        {pin.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Controls Overlay */}
            <div
              className="row between px-4 py-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(18, 20, 24, 0.95)",
                borderTop: "1px solid var(--line)",
                zIndex: 20,
              }}
            >
              <span className="xs dim">Tap pins to inspect live schedule corroboration</span>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                TARGET: #{selectedPin.cpmCode} ({selectedPin.level})
              </span>
            </div>
          </motion.div>

          {/* Right: Telemetry Inspection Console */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPin.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="card stack"
              style={{
                background: "rgba(18, 20, 24, 0.96)",
                border: "1px solid var(--line-strong)",
                padding: 28,
                justifyContent: "space-between",
                borderRadius: "var(--r-md)",
              }}
            >
              <div>
                {/* Header */}
                <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
                  <div>
                    <span className="mono xs dim">LOCATION TARGET</span>
                    <h3 className="h3 mt-1" style={{ color: "var(--text)", fontSize: "18px" }}>
                      {selectedPin.label}
                    </h3>
                  </div>
                  <span
                    className="tag"
                    style={{
                      background: selectedPin.status === "warning" ? "var(--brand-bg)" : "var(--brass-bg)",
                      color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)",
                      borderColor: selectedPin.status === "warning" ? "var(--brand-line)" : "var(--brass-line)",
                    }}
                  >
                    {selectedPin.confidence}% Corroborated
                  </span>
                </div>

                {/* Data Properties */}
                <div className="props mb-4" style={{ fontSize: 13 }}>
                  <dt>CPM Node ID</dt>
                  <dd className="mono" style={{ color: "var(--brass)", fontWeight: 700 }}>
                    #{selectedPin.cpmCode}
                  </dd>

                  <dt>Discipline</dt>
                  <dd>{selectedPin.trade}</dd>

                  <dt>Critical Float</dt>
                  <dd
                    style={{
                      color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)",
                      fontWeight: 700,
                    }}
                  >
                    {selectedPin.criticalFloat}
                  </dd>
                </div>

                {/* Staged Action */}
                <div
                  style={{
                    padding: 16,
                    background: selectedPin.status === "warning" ? "rgba(217, 119, 87, 0.08)" : "rgba(212, 155, 75, 0.08)",
                    border: `1px solid ${selectedPin.status === "warning" ? "var(--brand-line)" : "var(--brass-line)"}`,
                    borderRadius: "var(--r-xs)",
                  }}
                >
                  <span className="mono xs dim block" style={{ color: selectedPin.status === "warning" ? "var(--brand)" : "var(--brass)" }}>
                    AUTOMATED CONTROLS ACTION:
                  </span>
                  <p className="xs mt-1" style={{ color: "var(--text)", fontWeight: 600, margin: 0 }}>
                    {selectedPin.action}
                  </p>
                </div>
              </div>

              {/* Bottom Action CTA */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-block mt-6 mono xs"
                href="#waitlist"
                style={{ fontWeight: 700, justifyContent: "center", padding: "12px" }}
              >
                INITIALIZE_PILOT_SEQUENCE
                <ChevronRight className="ico" />
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
