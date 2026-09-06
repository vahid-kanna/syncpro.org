/**
 * SyncPro v2 — Hero Section (Redesigned with ZeroEka elegance & Astra blueprint)
 * "Keep the baseline. See what's changing."
 * Features:
 * - Nirmaan · IIT Madras pre-incubation badge
 * - Restrained, authoritative typography
 * - Interactive Three.js 3D Critical Path schedule mesh
 * - Dual calls to action (Discuss a Pilot / Explore Console)
 * - Three trust commitments: Read-only scope, separate shadow forecast, planner-led review
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { Magnetic } from "./Motion";
import { ShieldCheck, Database, GitFork, ArrowRight, Box, BarChart3 } from "lucide-react";
import { ScheduleGraphCanvas } from "./ScheduleGraphCanvas";

export function Hero({ onOpenPilot }: { onOpenPilot: () => void }) {
  const [activeView, setActiveView] = useState<"3D_GRAPH" | "GANTT">("3D_GRAPH");

  // Synthetic demo disruption toggles
  const [delays, setDelays] = useState<{ ifc: boolean; rain: boolean; pump: boolean }>({
    ifc: false,
    rain: false,
    pump: false,
  });

  const toggleDelay = (key: "ifc" | "rain" | "pump") => {
    setDelays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // CPM math for the hero preview
  const dIFC = delays.ifc ? 5 : 0;
  const dRain = delays.rain ? 4 : 0;
  const dPump = delays.pump ? 7 : 0;

  const aFinish = 8 + dIFC;
  const bFinish = 16 + dPump;
  const cFinish = aFinish + 12 + dRain;
  const dStart = Math.max(bFinish, cFinish);
  const shadowFinish = dStart + 17;
  const finishMovement = shadowFinish - 37;

  return (
    <section className="hero section" id="top">
      <div className="wrap">
        <div className="hero-grid">
          {/* Left Column: Thesis, Headings & CTAs */}
          <div className="hero-content">
            <Reveal variant="down">
              <div className="hero-badge mono xs">
                <span className="badge-dot" />
                <span>NIRMAAN · IIT MADRAS</span>
                <span className="badge-sep">·</span>
                <span className="dim">PRE-INCUBATED</span>
              </div>
            </Reveal>

            <span className="eyebrow mono xs dim">SCHEDULE INTELLIGENCE FOR INFRASTRUCTURE</span>

            <MaskLines
              as="h1"
              className="hero-h"
              baseDelay={120}
              step={120}
              lines={[<>Keep the baseline.</>, <><span className="accent">See what’s changing.</span></>]}
            />

            <Reveal variant="up" delay={450}>
              <p className="hero-sub">
                SyncPro is building a clearer link between site events, schedule risk and the records behind every decision.
                Model site reality in a separate shadow forecast without rewriting your contractual P6 program.
              </p>
            </Reveal>

            <Reveal variant="up" delay={600} className="hero-actions">
              <Magnetic>
                <button type="button" className="hero-btn mono xs" onClick={onOpenPilot}>
                  Discuss a Pilot <ArrowRight className="ico-xs" />
                </button>
              </Magnetic>
              <a className="hero-anchor mono xs dim" href="#console">
                Explore the console ↓
              </a>
            </Reveal>

            <Reveal variant="fade" delay={750}>
              <p className="hero-micro mono xs dim">
                In development. Pilot enquiries open for Q3/Q4.
              </p>
            </Reveal>

            {/* Three Trust Commitments */}
            <Reveal variant="fade" delay={850} className="hero-trust-bar">
              <div className="trust-item mono xs">
                <Database className="ico-xs acc" />
                <span>Read-only pilot scope</span>
              </div>
              <span className="trust-sep">·</span>
              <div className="trust-item mono xs">
                <GitFork className="ico-xs ok" />
                <span>Separate shadow forecast</span>
              </div>
              <span className="trust-sep">·</span>
              <div className="trust-item mono xs">
                <ShieldCheck className="ico-xs warn" />
                <span>Planner-led review</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive 3D CPM Schedule Mesh / Mini Gantt */}
          <div className="hero-visual">
            <Reveal variant="up" delay={300} className="hero-canvas-card spotlight-card">
              {/* Top View Selector Bar */}
              <div className="canvas-header mono xs">
                <div className="canvas-title">
                  <span className="console-pulse" />
                  <span>CRITICAL PATH TOPOLOGY</span>
                  <span className="dim">· P4 VIADUCT</span>
                </div>
                <div className="canvas-view-toggle">
                  <button
                    type="button"
                    className={`toggle-tab ${activeView === "3D_GRAPH" ? "active" : ""}`}
                    onClick={() => setActiveView("3D_GRAPH")}
                  >
                    <Box className="ico-xs" /> 3D CPM MESH
                  </button>
                  <button
                    type="button"
                    className={`toggle-tab ${activeView === "GANTT" ? "active" : ""}`}
                    onClick={() => setActiveView("GANTT")}
                  >
                    <BarChart3 className="ico-xs" /> GANTT PREVIEW
                  </button>
                </div>
              </div>

              {/* View 1: Native Three.js 3D Critical Path Mesh */}
              {activeView === "3D_GRAPH" ? (
                <div className="three-view-box">
                  <ScheduleGraphCanvas />
                </div>
              ) : (
                /* View 2: Compact Interactive Gantt Simulation */
                <div className="hero-gantt-box mono xs">
                  <div className="disruption-chips">
                    <span className="dim">TEST DISRUPTION:</span>
                    <button
                      type="button"
                      className={`chip ${delays.ifc ? "active bad" : ""}`}
                      onClick={() => toggleDelay("ifc")}
                    >
                      Late IFC (+5d)
                    </button>
                    <button
                      type="button"
                      className={`chip ${delays.rain ? "active bad" : ""}`}
                      onClick={() => toggleDelay("rain")}
                    >
                      Monsoon (+4d)
                    </button>
                    <button
                      type="button"
                      className={`chip ${delays.pump ? "active bad" : ""}`}
                      onClick={() => toggleDelay("pump")}
                    >
                      Delivery (+7d)
                    </button>
                  </div>

                  {/* Compact Gantt Bars */}
                  <div className="mini-gantt-bars">
                    <div className="bar-row">
                      <span className="dim bar-lbl">A IFC Release</span>
                      <div className="bar-track">
                        <div className="bar baseline" style={{ width: "22%", left: "0%" }} />
                        <div
                          className={`bar shadow ${dIFC > 0 ? "bad" : "ok"}`}
                          style={{ width: `${((8 + dIFC) / 46) * 100}%`, left: "0%" }}
                        />
                      </div>
                    </div>

                    <div className="bar-row">
                      <span className="dim bar-lbl">B Procurement</span>
                      <div className="bar-track">
                        <div className="bar baseline" style={{ width: "35%", left: "0%" }} />
                        <div
                          className={`bar shadow ${dPump > 0 ? "bad" : "ok"}`}
                          style={{ width: `${((16 + dPump) / 46) * 100}%`, left: "0%" }}
                        />
                      </div>
                    </div>

                    <div className="bar-row">
                      <span className="dim bar-lbl">C Foundations</span>
                      <div className="bar-track">
                        <div className="bar baseline" style={{ width: "26%", left: "22%" }} />
                        <div
                          className={`bar shadow ${dRain > 0 || dIFC > 0 ? "bad" : "ok"}`}
                          style={{ width: `${((12 + dRain) / 46) * 100}%`, left: `${(aFinish / 46) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bar-row">
                      <span className="dim bar-lbl">D Installation</span>
                      <div className="bar-track">
                        <div className="bar baseline" style={{ width: "22%", left: "48%" }} />
                        <div
                          className="bar shadow"
                          style={{ width: `${(10 / 46) * 100}%`, left: `${(dStart / 46) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mini-gantt-summary">
                    <span className="dim">CONTROLLING SLIP:</span>
                    <span className={finishMovement > 0 ? "bad fw-bold" : "ok fw-bold"}>
                      +{finishMovement} Working Days ({finishMovement > 0 ? "Critical Path Extended" : "On Plan"})
                    </span>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
