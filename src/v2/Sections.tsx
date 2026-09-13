/**
 * SyncPro v2 — sections with humanized editorial copy,
 * hero telemetry ticker, and the redesigned Schedule Divergence Radar.
 * Replaces the dense, cluttered table with a stunning, high-contrast
 * dual-horizon comparison and interactive latency timeline slider. (Zero 3D).
 */
import { useState } from "react";
import { Reveal, MaskLines, scrollToId } from "./Chrome";
import { ScrubHeading, Magnetic } from "./Motion";
import { Clock, Sliders, FileText } from "lucide-react";

/* ================= HERO ================= */

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-in">
        <Reveal variant="down" className="hero-lblwrap">
          <p className="mono lbl hero-lbl">
            <span className="hero-tracer" />
            INFRASTRUCTURE CONTROLS
          </p>
        </Reveal>
        <MaskLines
          as="h1"
          className="hero-h"
          baseDelay={150}
          step={140}
          lines={[<>SyncPro</>, <>Schedule Intelligence Engine.</>]}
        />
        <Reveal variant="up" delay={620}>
          <p className="hero-sub">
            Contractors typically report critical path delays three weeks after they happen on site. SyncPro
            captures daily field signals and reconciles them against your P6 baseline in real
            time, catching schedule slippage before costs escalate.
          </p>
        </Reveal>
        <Reveal variant="up" delay={780} className="hero-actions">
          <Magnetic>
            <a
              className="btn-pri mono xs"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact", true);
              }}
            >
              <span>Initialize Pilot</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              className="btn-sec mono xs"
              href="#narrative"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("narrative");
              }}
            >
              <span>Explore Schedule Engine</span>
              <span className="btn-arrow-down" aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </Reveal>

        {/* Executive Telemetry Ticker */}
        <Reveal variant="up" delay={920} className="hero-telemetry-wrap">
          <div className="hero-telemetry">
            <div className="telem-cell">
              <span className="telem-val mono">0</span>
              <span className="telem-lbl mono xs">MASTER OVERWRITES</span>
              <span className="telem-sub xs dim">Parallel Shadow Isolation</span>
            </div>
            <div className="telem-cell">
              <span className="telem-val mono">&lt; 10M</span>
              <span className="telem-lbl mono xs">DCMA HEALTH AUDIT</span>
              <span className="telem-sub xs dim">14-Point Integrity Checks</span>
            </div>
            <div className="telem-cell">
              <span className="telem-val mono">100%</span>
              <span className="telem-lbl mono xs">GRAPH-GROUNDED</span>
              <span className="telem-sub xs dim">Zero Fabricated Dates</span>
            </div>
            <div className="telem-cell">
              <span className="telem-val mono">EOT</span>
              <span className="telem-lbl mono xs">CLAIMS DEFENDED</span>
              <span className="telem-sub xs dim">FIDIC / NHAI Time-Bars</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ REDESIGNED 01: SCHEDULE DIVERGENCE RADAR ============ */

interface Scenario {
  id: string;
  name: string;
  badge: string;
  activityCode: string;
  p6Date: string;
  p6Float: string;
  syncproDate: string;
  syncproFloat: string;
  syncproFloatTone: "bad" | "warn" | "ok";
  evidenceNote: string;
  delayExposure: string;
  remedyAction: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "pt-slab",
    name: "Level 18 Post-Tension Slab",
    badge: "MATERIAL SUPPLY DISRUPTION",
    activityCode: "A1230",
    p6Date: "Dec 08",
    p6Float: "0d (Reported On Plan)",
    syncproDate: "Dec 20 (+12 Days)",
    syncproFloat: "-8 Days Exhausted",
    syncproFloatTone: "bad",
    evidenceNote: "Challan #SN882: 42T prestressing strand fabrication held 4 days at vendor yard.",
    delayExposure: "₹14.4 Cr",
    remedyAction: "Formwork stripping parallelized across Grid C–D · 6 days float recovered",
  },
  {
    id: "mep-risers",
    name: "MEP Chilled Water Risers L04–L18",
    badge: "ENGINEERING REVISION CLASH",
    activityCode: "A1240",
    p6Date: "Dec 11",
    p6Float: "+3d (Reported Buffer)",
    syncproDate: "Dec 27 (+16 Days)",
    syncproFloat: "-11 Days Critical Slip",
    syncproFloatTone: "bad",
    evidenceNote: "Consultant transmittal Rev-04 shifted shaft clearance by 300mm on Level 09.",
    delayExposure: "₹18.2 Cr",
    remedyAction: "Contemporaneous FIDIC 8.4 claim notice auto-drafted before 28-day time-bar",
  },
  {
    id: "secant-piles",
    name: "Secant Wall Foundation Piling",
    badge: "INDEPENDENT QA/QC CLEARANCE",
    activityCode: "A1210",
    p6Date: "Oct 12",
    p6Float: "+2d (Safe Buffer)",
    syncproDate: "Oct 10 (-2 Days Ahead)",
    syncproFloat: "+4d Float Preserved",
    syncproFloatTone: "ok",
    evidenceNote: "32/32 ultrasonic pile integrity logs cross-referenced with concrete batch tickets #2201–#2232.",
    delayExposure: "₹0.00",
    remedyAction: "As-built verification sealed to immutable audit ledger with cryptographic hash",
  },
];

export function GapSection() {
  const [activeScenarioId, setActiveScenarioId] = useState("pt-slab");
  const [latencyDay, setLatencyDay] = useState(14); // slider from Day 1 to Day 28

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Dynamic cost calculation based on detection latency day
  let latencyStatus = "DAY 14 · FLOAT BUFFER DEPLETED";
  let latencyCost = "₹1.8 Cr";
  let latencyBadgeClass = "warn";
  let latencyAction = "Critical path float eaten. Acceleration crews required to prevent handover slip.";

  if (latencyDay <= 5) {
    latencyStatus = `DAY ${latencyDay} · EARLY DETECTION WINDOW`;
    latencyCost = "₹15 Lakhs";
    latencyBadgeClass = "ok";
    latencyAction = "SyncPro flags delivery stall on day 3. Minor sequence rebalancing fully recovers float.";
  } else if (latencyDay >= 22) {
    latencyStatus = `DAY ${latencyDay} · MONTH-END P6 REPORT RUN`;
    latencyCost = currentScenario.delayExposure;
    latencyBadgeClass = "bad";
    latencyAction = "Contractual milestone missed. Liquidated damages accrued. Subcontractor dispute locked in.";
  }

  return (
    <section className="sec wrap st-wrap" id="narrative">
      <ScrubHeading
        className="gap-h center"
        segs={[
          { t: "A slip you cannot see" },
          { t: "is money you cannot keep.", em: true },
        ]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">01</span>
        <span>THE DETECTION GAP · LIVE SCHEDULE DIVERGENCE RADAR</span>
      </div>

      <Reveal variant="up" delay={120}>
        <div className="divergence-container spotlight-card">
          {/* Top Scenario Selector Bar */}
          <div className="radar-topbar mono xs">
            <span className="radar-label dim">SELECT SITE INCIDENT:</span>
            <div className="radar-chips">
              {SCENARIOS.map((sc) => {
                const isActive = sc.id === activeScenarioId;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    className={`radar-chip ${isActive ? "active" : ""}`}
                    onClick={() => setActiveScenarioId(sc.id)}
                  >
                    <span className={`chip-dot ${sc.syncproFloatTone}`} />
                    <span className="chip-name">{sc.name}</span>
                    <span className="chip-code dim">{sc.activityCode}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual Perspective: P6 Mirage vs SyncPro Reality */}
          <div className="dual-perspective-grid">
            {/* Left Card: Monthly Primavera P6 View */}
            <div className="perspective-card p6-mirage">
              <div className="perspective-header mono xs">
                <div className="header-tag dim">
                  <FileText className="ico-xs" />
                  <span>ORACLE PRIMAVERA P6 (.XER)</span>
                </div>
                <span className="header-status dim">STATIC MONTHLY PDF</span>
              </div>

              <div className="perspective-content">
                <div className="metric-headline">
                  <span className="metric-label mono xs dim">REPORTED MILESTONE</span>
                  <span className="metric-val">{currentScenario.p6Date}</span>
                </div>

                <div className="metric-split mono xs">
                  <div className="split-item">
                    <span className="dim">REPORTED FLOAT</span>
                    <span className="ok fw-bold">{currentScenario.p6Float}</span>
                  </div>
                  <div className="split-item">
                    <span className="dim">CONTRACT RISK</span>
                    <span className="ok">₹0 EXPOSURE</span>
                  </div>
                </div>

                {/* Visual Static Baseline Bar */}
                <div className="timeline-visual">
                  <div className="timeline-track">
                    <div className="track-bar static-baseline" style={{ width: "70%" }}>
                      <span className="track-label mono xs">Target: {currentScenario.p6Date}</span>
                    </div>
                  </div>
                </div>

                <p className="perspective-note xs dim">
                  Master contractual program remains unaware of site delivery stalls until monthly status cutoff.
                </p>
              </div>
            </div>

            {/* Right Card: SyncPro Live Shadow Ground Truth */}
            <div className="perspective-card syncpro-truth">
              <div className="perspective-header mono xs">
                <div className="header-tag acc">
                  <span className="pulse-dot-acc" />
                  <span>SYNCPRO SHADOW FORECAST</span>
                </div>
                <span className={`header-status ${currentScenario.syncproFloatTone}`}>
                  CONTINUOUS GROUND TRUTH
                </span>
              </div>

              <div className="perspective-content">
                <div className="metric-headline">
                  <span className="metric-label mono xs dim">CORROBORATED HANDOVER</span>
                  <span className={`metric-val ${currentScenario.syncproFloatTone}`}>
                    {currentScenario.syncproDate}
                  </span>
                </div>

                <div className="metric-split mono xs">
                  <div className="split-item">
                    <span className="dim">TRUE CRITICAL FLOAT</span>
                    <span className={`${currentScenario.syncproFloatTone} fw-bold`}>
                      {currentScenario.syncproFloat}
                    </span>
                  </div>
                  <div className="split-item">
                    <span className="dim">EXPOSURE AT RISK</span>
                    <span className={`${currentScenario.syncproFloatTone === "bad" ? "bad" : "ok"} fw-bold`}>
                      {currentScenario.delayExposure}
                    </span>
                  </div>
                </div>

                {/* Visual Dynamic Slippage Bar */}
                <div className="timeline-visual">
                  <div className="timeline-track">
                    <div
                      className={`track-bar dynamic-shadow ${currentScenario.syncproFloatTone}`}
                      style={{ width: currentScenario.syncproFloatTone === "bad" ? "88%" : "68%" }}
                    >
                      <span className="track-label mono xs">
                        Live Forecast: {currentScenario.syncproDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="evidence-pill mono xs">
                  <Clock className="ico-xs acc" />
                  <span className="evidence-txt">{currentScenario.evidenceNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Latency Slider: Demonstrate the Cost of Delay Over Time */}
          <div className="latency-slider-panel">
            <div className="latency-header mono xs">
              <div className="latency-title">
                <Sliders className="ico-xs acc" />
                <span>INSPECT SCHEDULE LATENCY · DRAG TO REVEAL COST OF TIME-LAG</span>
              </div>
              <span className={`latency-badge ${latencyBadgeClass}`}>{latencyStatus}</span>
            </div>

            <div className="slider-wrapper">
              <input
                type="range"
                min={1}
                max={28}
                value={latencyDay}
                onChange={(e) => setLatencyDay(Number(e.target.value))}
                className="latency-range-slider"
                aria-label="Detection latency in days"
              />
              <div className="slider-labels mono xs dim">
                <span>Day 01 · Site Stall Begins</span>
                <span className="active-day-label acc">Selected: Day {latencyDay}</span>
                <span>Day 28 · Month-End P6 PDF</span>
              </div>
            </div>

            <div className="latency-impact-row mono xs">
              <div className="impact-col">
                <span className="dim">ESTIMATED COST TO MITIGATE:</span>
                <span className={`impact-cost ${latencyBadgeClass} fw-bold`}>{latencyCost}</span>
              </div>
              <div className="impact-col right">
                <span className="dim">SCHEDULE GOVERNANCE STATUS:</span>
                <span className="impact-action dim">{latencyAction}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={220}>
        <p className="gap-punch center">
          The reality was documented on site from day one. <em>The master schedule just never saw it.</em>
        </p>
      </Reveal>
    </section>
  );
}
