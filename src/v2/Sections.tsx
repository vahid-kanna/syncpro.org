/**
 * SyncPro v2 — sections with humanized editorial copy,
 * hero telemetry ticker, and Section 01: "The Two Realities".
 * Features 3D TiltCards, cursor spotlight luminescence,
 * and the kinetic Reconciliation Bridge between Office P6 and Living Field.
 */
import { useState } from "react";
import { Reveal, MaskLines, scrollToId } from "./Chrome";
import { ScrubHeading, Magnetic, Tilt, CardSpotlight } from "./Motion";
import { FileText, ShieldCheck, Zap, Lock, Activity, Clock } from "lucide-react";

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

/* ============ SECTION 01: THE TWO REALITIES ============ */

interface RealityScenario {
  id: string;
  name: string;
  code: string;
  badge: string;
  // Reality 01: Contractual Office (.XER)
  p6Milestone: string;
  p6Float: string;
  p6Status: string;
  p6Insight: string;
  // Reality 02: Living Field Ground Truth
  siteForecast: string;
  siteFloat: string;
  siteTone: "bad" | "warn" | "ok";
  siteEvidence: string;
  siteExposure: string;
  // Reconciliation Bridge
  bridgeConfidence: string;
  bridgeDelta: string;
}

const REALITY_SCENARIOS: RealityScenario[] = [
  {
    id: "pt-slab",
    name: "Level 18 Post-Tension Slab",
    code: "A1230",
    badge: "MATERIAL SUPPLY DELAY",
    p6Milestone: "Dec 08",
    p6Float: "0d · Balanced",
    p6Status: "Reported On Plan",
    p6Insight: "The monthly P6 snapshot assumes continuous strand delivery. Stalls at the fabricator yard remain invisible until month-end cutoffs.",
    siteForecast: "Dec 20 (+12d)",
    siteFloat: "-8d Float Deficit",
    siteTone: "bad",
    siteEvidence: "Challan #SN882: 42T prestressing strand fabrication held 4 days at fabricator. Deshoring stalled.",
    siteExposure: "₹14.4 Cr Exposure at Risk",
    bridgeConfidence: "98.4%",
    bridgeDelta: "+12 Days Critical Divergence",
  },
  {
    id: "mep-risers",
    name: "MEP Chilled Water Risers",
    code: "A1240",
    badge: "CONSULTANT DRAWING REVISION",
    p6Milestone: "Dec 11",
    p6Float: "+3d · Safe Buffer",
    p6Status: "Buffer Intact",
    p6Insight: "Office baseline reflects initial IFC drawings. Engineering shaft coordination clashes have not been incorporated into the master schedule.",
    siteForecast: "Dec 27 (+16d)",
    siteFloat: "-11d Critical Slip",
    siteTone: "bad",
    siteEvidence: "Consultant transmittal Rev-04 shifted riser shaft clearance by 300mm on Level 09. Erection halted.",
    siteExposure: "₹18.2 Cr Delay Liability",
    bridgeConfidence: "97.8%",
    bridgeDelta: "+16 Days Critical Divergence",
  },
  {
    id: "secant-piles",
    name: "Secant Wall Foundations",
    code: "A1210",
    badge: "QA/QC INTEGRITY CLEARANCE",
    p6Milestone: "Oct 12",
    p6Float: "+2d · On Track",
    p6Status: "In Progress",
    p6Insight: "Awaiting physical testing certificates. Float calculations rely on verbal site superintendent updates.",
    siteForecast: "Oct 10 (-2d)",
    siteFloat: "+4d Float Safe",
    siteTone: "ok",
    siteEvidence: "32/32 ultrasonic pile integrity logs (ASTM D5882) cross-referenced with concrete batch tickets #2201–#2232.",
    siteExposure: "₹0.00 Risk (Ahead of Plan)",
    bridgeConfidence: "99.2%",
    bridgeDelta: "-2 Days Early Completion",
  },
];

export function GapSection() {
  const [activeId, setActiveId] = useState("pt-slab");
  const activeScenario = REALITY_SCENARIOS.find((s) => s.id === activeId) || REALITY_SCENARIOS[0];

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
        <span>THE TWO REALITIES · SYNCHRONIZING CONTRACT WITH GROUND TRUTH</span>
      </div>

      {/* Scenario Selector Chips */}
      <div className="two-realities-selector mono xs">
        <span className="selector-lbl dim">SELECT PROJECT SCENARIO:</span>
        <div className="selector-chips">
          {REALITY_SCENARIOS.map((sc) => {
            const isSel = sc.id === activeId;
            return (
              <button
                key={sc.id}
                type="button"
                className={`scenario-pill ${isSel ? "active" : ""}`}
                onClick={() => setActiveId(sc.id)}
              >
                <span className={`pill-dot ${sc.siteTone}`} />
                <span className="pill-name">{sc.name}</span>
                <span className="pill-code dim">{sc.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The 3D Composition: Two Juxtaposed Realities with Reconciliation Bridge */}
      <Reveal variant="up" delay={140}>
        <div className="two-realities-wrapper">
          {/* Card 01: The Contractual Office (3D Tilt Card) */}
          <div className="reality-col">
            <Tilt max={6}>
              <CardSpotlight className="reality-card reality-office">
                <div className="reality-inner-3d">
                  <div className="card-top-row mono xs">
                    <div className="card-tag dim">
                      <FileText className="ico-xs" />
                      <span>REALITY 01 // CONTRACTUAL OFFICE</span>
                    </div>
                    <span className="airgap-badge">P6 (.XER) · FROZEN</span>
                  </div>

                  <div className="cad-blueprint-overlay" aria-hidden="true" />

                  <div className="reality-metric-box">
                    <span className="metric-tag mono xs dim">REPORTED CONTRACT MILESTONE</span>
                    <div className="metric-primary mono">
                      {activeScenario.p6Milestone}
                    </div>
                    <div className="metric-sub-row mono xs">
                      <span className="dim">REPORTED FLOAT: <strong className="ok">{activeScenario.p6Float}</strong></span>
                      <span className="dim">STATUS: <strong className="txt">{activeScenario.p6Status}</strong></span>
                    </div>
                  </div>

                  <div className="reality-description">
                    <p className="desc-text xs dim">
                      {activeScenario.p6Insight}
                    </p>
                  </div>

                  <div className="float-3d-badge mono xs">
                    <Lock className="ico-xs ok" />
                    <span>MASTER PROGRAM PRESERVED · ZERO AUTO-OVERWRITES</span>
                  </div>
                </div>
              </CardSpotlight>
            </Tilt>
          </div>

          {/* Center Connector: The Reconciliation Bridge */}
          <div className="bridge-conduit-container">
            <div className="conduit-line" aria-hidden="true">
              <span className="conduit-pulse conduit-pulse-left" />
              <span className="conduit-pulse conduit-pulse-right" />
            </div>
            <div className="bridge-emblem mono xs">
              <div className="emblem-core">
                <Zap className="ico-xs acc" />
                <span className="emblem-title">SYNCPRO BRIDGE</span>
              </div>
              <span className="emblem-meta ok">{activeScenario.bridgeConfidence} CORROBORATED</span>
            </div>
          </div>

          {/* Card 02: The Living Field Reality (3D Tilt Card) */}
          <div className="reality-col">
            <Tilt max={6}>
              <CardSpotlight className="reality-card reality-field">
                <div className="reality-inner-3d">
                  <div className="card-top-row mono xs">
                    <div className="card-tag acc">
                      <Activity className="ico-xs acc" />
                      <span>REALITY 02 // LIVING GROUND TRUTH</span>
                    </div>
                    <span className={`live-badge ${activeScenario.siteTone}`}>
                      SHADOW CPM · LIVE
                    </span>
                  </div>

                  <div className="telemetry-mesh-overlay" aria-hidden="true" />

                  <div className="reality-metric-box">
                    <span className="metric-tag mono xs dim">CORROBORATED SHADOW FORECAST</span>
                    <div className={`metric-primary mono ${activeScenario.siteTone}`}>
                      {activeScenario.siteForecast}
                    </div>
                    <div className="metric-sub-row mono xs">
                      <span className="dim">TRUE FLOAT: <strong className={activeScenario.siteTone}>{activeScenario.siteFloat}</strong></span>
                      <span className="dim">EXPOSURE: <strong className={activeScenario.siteTone === "bad" ? "bad" : "ok"}>{activeScenario.siteExposure}</strong></span>
                    </div>
                  </div>

                  <div className="reality-evidence-box mono xs">
                    <div className="evidence-header">
                      <Clock className="ico-xs acc" />
                      <span>DAILY SITE EVIDENCE (UNLINKED TO P6)</span>
                    </div>
                    <p className="evidence-text">
                      {activeScenario.siteEvidence}
                    </p>
                  </div>

                  <div className="float-3d-badge mono xs highlight-badge">
                    <ShieldCheck className="ico-xs acc" />
                    <span>DIVERGENCE DETECTED 3 WEEKS EARLY · AUDIT SHIELDED</span>
                  </div>
                </div>
              </CardSpotlight>
            </Tilt>
          </div>
        </div>
      </Reveal>

      {/* Synthesis Outcome Deck */}
      <Reveal variant="up" delay={200}>
        <div className="synthesis-deck mono xs">
          <div className="synthesis-cell">
            <span className="cell-num acc">01</span>
            <div className="cell-text">
              <strong className="cell-title">CONTRACTUAL P6 AIR-GAP</strong>
              <span className="cell-desc dim">The master .xer program remains 100% untouched. Planners hold exclusive authorization.</span>
            </div>
          </div>

          <div className="synthesis-cell">
            <span className="cell-num acc">02</span>
            <div className="cell-text">
              <strong className="cell-title">3-WEEK RECOVERY HEADROOM</strong>
              <span className="cell-desc dim">Catch critical path divergence on Day 3 instead of Day 28, preserving float recovery options.</span>
            </div>
          </div>

          <div className="synthesis-cell">
            <span className="cell-num acc">03</span>
            <div className="cell-text">
              <strong className="cell-title">FIDIC &amp; NHAI CLAIMS DEFENSE</strong>
              <span className="cell-desc dim">Date-stamped evidence automatically compiles into EOT notices before contractual time-bars close.</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={260}>
        <p className="gap-punch center">
          The reality was documented on site from day one. <em>The master schedule just never saw it.</em>
        </p>
      </Reveal>
    </section>
  );
}
