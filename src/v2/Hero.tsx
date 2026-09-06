/**
 * SyncPro v2 — Hero section with the interactive Living Control Room console.
 * Incorporates Astra's master design blueprint:
 * "Your site changed. Your baseline didn't."
 * Interactive P6 vs. Shadow schedule comparison with live field signal triggers.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { Magnetic } from "./Motion";
import { ShieldCheck, Clock, GitFork, Database } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  tag: string;
  sourceType: string;
  sourceText: string;
  activityId: string;
  activityName: string;
  baselineStart: string;
  baselineEnd: string;
  shadowEnd: string;
  floatDelta: string;
  floatTone: "bad" | "warn" | "ok";
  exposureCr: string;
  confidence: number;
  statusText: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "crane-p4",
    name: "Pier P4 Crawler Crane Breakdown",
    tag: "EQUIPMENT FAILURE",
    sourceType: "WhatsApp Voice Note · Site Resident Eng.",
    sourceText:
      "“Crawler crane C-02 hydraulic slew ring failed at Pier P4. Rebar cage lifting suspended until mobile replacement arrives Friday morning.”",
    activityId: "A1210",
    activityName: "Substructure Pier P4 Rebar Cage Erection",
    baselineStart: "Oct 12",
    baselineEnd: "Nov 04",
    shadowEnd: "Nov 12 (+8d)",
    floatDelta: "-8d Float",
    floatTone: "bad",
    exposureCr: "₹9.4 Cr",
    confidence: 98.2,
    statusText: "Shadow Reconciled · P6 Baseline Preserved",
  },
  {
    id: "strand-delay",
    name: "L18 Post-Tension Strand Delivery Slip",
    tag: "MATERIAL LOGISTICS",
    sourceType: "Gate Telemetry & Challan OCR #SN882",
    sourceText:
      "“Challan #SN882 for 42T high-tensile prestressing strands delayed 4 days at fabricator yard. Formwork stripping at L18 blocked.”",
    activityId: "A1230",
    activityName: "Level 18 Post-Tension Slab Pour & Stressing",
    baselineStart: "Dec 08",
    baselineEnd: "Dec 22",
    shadowEnd: "Jan 03 (+12d)",
    floatDelta: "-12d Float",
    floatTone: "bad",
    exposureCr: "₹14.8 Cr",
    confidence: 96.7,
    statusText: "Shadow Reconciled · P6 Baseline Preserved",
  },
  {
    id: "secant-piling",
    name: "Podium Secant Piling Verified",
    tag: "QUALITY CLEARANCE",
    sourceType: "78 Ultrasonic Pile Integrity Logs (ASTM D5882)",
    sourceText:
      "“All 80 secant piles cast and cured. Cross-hole ultrasonic sonic logging completed with zero anomalies. Ready for capping beam.”",
    activityId: "A1190",
    activityName: "Secant Piling & Basement Dewatering",
    baselineStart: "Sep 15",
    baselineEnd: "Oct 28",
    shadowEnd: "Oct 26 (-2d)",
    floatDelta: "+2d Float",
    floatTone: "ok",
    exposureCr: "₹0.00",
    confidence: 99.4,
    statusText: "As-Built Verified · Cryptographic Hash Sealed",
  },
];

export function Hero({ onOpenPilot }: { onOpenPilot: () => void }) {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <section className="hero" id="top">
      <div className="wrap hero-in">
        {/* Eyebrow badge */}
        <Reveal variant="down" className="hero-lblwrap">
          <div className="hero-badge mono xs">
            <span className="badge-dot" />
            <span>AI PROJECT CONTROLS ENGINEER</span>
            <span className="badge-sep">·</span>
            <span className="dim">NIRMAAN, IIT MADRAS</span>
          </div>
        </Reveal>

        {/* Hero Display Headline */}
        <MaskLines
          as="h1"
          className="hero-h"
          baseDelay={120}
          step={130}
          lines={[<>Your site changed.</>, <><em>Your baseline didn't.</em></>]}
        />

        {/* Supporting thesis */}
        <Reveal variant="up" delay={500}>
          <p className="hero-sub">
            Contractors typically report critical path delays three weeks after they occur on site. SyncPro connects
            daily field signals to your P6 schedule in real time, running a shadow forecast that reveals schedule slippage
            and liquidated damages exposure before costs escalate.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal variant="up" delay={650} className="hero-btnrow">
          <Magnetic>
            <button type="button" className="hero-btn mono xs" onClick={onOpenPilot}>
              Request Enterprise Pilot <span aria-hidden="true">→</span>
            </button>
          </Magnetic>
          <a className="hero-anchor mono xs dim" href="#control-room">
            Explore Live Scenario ↓
          </a>
        </Reveal>

        {/* Trust Commitment Bar */}
        <Reveal variant="fade" delay={800} className="hero-trust-bar">
          <div className="trust-item mono xs">
            <ShieldCheck className="ico-xs ok" />
            <span>Evidence-Gated Reconciliation</span>
          </div>
          <span className="trust-sep">·</span>
          <div className="trust-item mono xs">
            <Database className="ico-xs acc" />
            <span>Contract P6 File Preserved</span>
          </div>
          <span className="trust-sep">·</span>
          <div className="trust-item mono xs">
            <GitFork className="ico-xs warn" />
            <span>Planner-Controlled Publication</span>
          </div>
        </Reveal>

        {/* ================= HERO LIVING CONTROL ROOM ================= */}
        <Reveal variant="up" delay={950} className="hero-console-wrap" id="control-room">
          <div className="console-card">
            {/* Console Header Bar */}
            <div className="console-topbar mono xs">
              <div className="topbar-left">
                <span className="console-pulse" />
                <span className="console-title">P4 VIADUCT PACKAGE (₹1,200 CR)</span>
                <span className="dim">· SYNTHETIC DEMO</span>
              </div>
              <div className="topbar-right">
                <span className="dim">STATUS CUTOFF: WEEK 14</span>
                <span className="topbar-tag">P6 .XER (READ-ONLY)</span>
              </div>
            </div>

            {/* Scenario Selector Tabs */}
            <div className="console-scenario-row">
              <span className="mono xs dim trigger-lbl">TEST A SITE SIGNAL:</span>
              <div className="scenario-chips">
                {SCENARIOS.map((sc) => {
                  const isSel = sc.id === activeScenario.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setActiveScenario(sc)}
                      className={`scenario-chip mono xs ${isSel ? "active" : ""}`}
                    >
                      <span className={`chip-indicator ${sc.floatTone}`} />
                      <span className="chip-name">{sc.name}</span>
                      <span className="chip-tag dim">{sc.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Console Split View: Left Gantt Comparison / Right Evidence Inspector */}
            <div className="console-grid">
              {/* Left Pane: P6 Baseline vs Shadow Schedule Comparison */}
              <div className="console-left">
                <div className="pane-header mono xs">
                  <span>CPM LOGIC & SCHEDULE DIVERGENCE</span>
                  <span className="dim">DATA DATE: 14-OCT-2026</span>
                </div>

                <div className="schedule-table-wrap">
                  <table className="schedule-table">
                    <thead>
                      <tr className="mono xs dim">
                        <th>MODEL</th>
                        <th>ACTIVITY</th>
                        <th>START</th>
                        <th>FINISH</th>
                        <th>FLOAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Frozen Baseline Row */}
                      <tr className="row-baseline">
                        <td className="mono xs">
                          <span className="badge-model baseline">P6 BASELINE</span>
                        </td>
                        <td>
                          <div className="act-cell">
                            <span className="mono xs dim">{activeScenario.activityId}</span>
                            <span className="act-name">{activeScenario.activityName}</span>
                          </div>
                        </td>
                        <td className="mono xs">{activeScenario.baselineStart}</td>
                        <td className="mono xs">{activeScenario.baselineEnd}</td>
                        <td className="mono xs ok">+3d (Safe)</td>
                      </tr>

                      {/* Dynamic SyncPro Shadow Row */}
                      <tr className="row-shadow">
                        <td className="mono xs">
                          <span className="badge-model shadow">SYNCPRO SHADOW</span>
                        </td>
                        <td>
                          <div className="act-cell">
                            <span className="mono xs dim">{activeScenario.activityId}</span>
                            <span className="act-name highlight">{activeScenario.activityName}</span>
                          </div>
                        </td>
                        <td className="mono xs">{activeScenario.baselineStart}</td>
                        <td className={`mono xs ${activeScenario.floatTone} fw-bold`}>
                          {activeScenario.shadowEnd}
                        </td>
                        <td className={`mono xs ${activeScenario.floatTone} fw-bold`}>
                          {activeScenario.floatDelta}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Visual Gantt Bar Track */}
                <div className="gantt-viz">
                  <div className="gantt-row">
                    <span className="mono xs dim gantt-lbl">BASELINE:</span>
                    <div className="gantt-track">
                      <div className="gantt-bar baseline-bar" style={{ width: "65%", left: "10%" }}>
                        <span className="mono xs">Contract Target: {activeScenario.baselineEnd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="gantt-row">
                    <span className="mono xs dim gantt-lbl">SHADOW:</span>
                    <div className="gantt-track">
                      <div
                        className={`gantt-bar shadow-bar ${activeScenario.floatTone}`}
                        style={{
                          width: activeScenario.floatTone === "bad" ? "82%" : "62%",
                          left: "10%",
                        }}
                      >
                        <span className="mono xs">
                          Forecast: {activeScenario.shadowEnd} ({activeScenario.floatDelta})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exposure Metric Ribbon */}
                <div className="console-metrics mono xs">
                  <div className="metric-box">
                    <span className="dim">CRITICAL PATH SLIP</span>
                    <span className={`metric-val ${activeScenario.floatTone}`}>
                      {activeScenario.floatDelta}
                    </span>
                  </div>
                  <div className="metric-box">
                    <span className="dim">PROJECTED LD EXPOSURE</span>
                    <span className={`metric-val ${activeScenario.floatTone === "bad" ? "bad" : "ok"}`}>
                      {activeScenario.exposureCr}
                    </span>
                  </div>
                  <div className="metric-box">
                    <span className="dim">CORROBORATION</span>
                    <span className="metric-val ok">{activeScenario.confidence}% MATCH</span>
                  </div>
                </div>
              </div>

              {/* Right Pane: Evidence Inspector & Safeguard Gate */}
              <div className="console-right">
                <div className="pane-header mono xs">
                  <span>UNSTRUCTURED SIGNAL RESOLUTION</span>
                  <span className="ok">CONFIDENCE &ge; 95%</span>
                </div>

                {/* Raw Field Observation Card */}
                <div className="evidence-card">
                  <div className="evidence-type mono xs dim">
                    <Clock className="ico-xs" />
                    <span>{activeScenario.sourceType}</span>
                  </div>
                  <p className="evidence-quote">{activeScenario.sourceText}</p>
                </div>

                {/* Entity Resolution Flow */}
                <div className="resolution-flow mono xs">
                  <div className="flow-step">
                    <span className="dim">GRAPH ENTITY:</span>
                    <span className="flow-val">{activeScenario.activityId} // {activeScenario.activityName}</span>
                  </div>
                  <div className="flow-step">
                    <span className="dim">CONFIDENCE SCORE:</span>
                    <span className="flow-val ok">{activeScenario.confidence}% (Admission Passed)</span>
                  </div>
                  <div className="flow-step">
                    <span className="dim">SYSTEM ACTION:</span>
                    <span className="flow-val warn">{activeScenario.statusText}</span>
                  </div>
                </div>

                {/* Non-Destructive Isolation Guarantee */}
                <div className="safeguard-box">
                  <div className="safeguard-head mono xs">
                    <ShieldCheck className="ico-xs ok" />
                    <span>P6 MASTER IMMUNITY SAFEGUARD</span>
                  </div>
                  <p className="xs dim">
                    The master Primavera P6 file remains completely untouched. SyncPro updates only the parallel
                    shadow graph, allowing planners to simulate delay claims and mitigation options without risking
                    contractual baseline audit integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
