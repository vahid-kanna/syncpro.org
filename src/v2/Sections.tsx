/**
 * SyncPro v2 — sections with humanized editorial copy,
 * hero telemetry ticker, interactive corroboration engine,
 * voice waveform indicator, and grounded agent query simulation.
 */
import { useEffect, useRef, useState } from "react";
import { Reveal, MaskLines, scrollToId } from "./Chrome";
import { ScrubHeading, Magnetic } from "./Motion";

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
          lines={[<>The complete</>, <>Schedule Intelligence Engine.</>]}
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

/* ============ GAP STATEMENT + 01 ARTIFACT ============ */

interface ActivityDetail {
  id: string;
  name: string;
  start: string;
  tf: string;
  tone: string;
  isVoice?: boolean;
  signalTitle: string;
  signalDetail: string;
  corroboration: string;
  queryAnswer: string;
}

const P6_ACTIVITIES: ActivityDetail[] = [
  {
    id: "A1210",
    name: "Secant piling, podium package",
    start: "Oct 12",
    tf: "+2d",
    tone: "",
    isVoice: false,
    signalTitle: "DRILLING LOG · RIG #02 COMPLETE",
    signalDetail: "32/32 piles cast. Concrete cylinder break test verified at 42 MPa. Work on schedule.",
    corroboration: "Piling log cross-referenced with batch challans #2201–#2232. Float intact (+2 days).",
    queryAnswer: "Activity A1210 is 100% on schedule with +2d float. 32/32 secant piles cast and verified against concrete batch dockets #2201–#2232.",
  },
  {
    id: "A1230",
    name: "Level 18 post-tension slab",
    start: "Dec 08",
    tf: "0d ⚑",
    tone: "warn",
    isVoice: true,
    signalTitle: "SITE VOCAL NOTE · FORMWORK INSPECTION",
    signalDetail: "Formwork deshoring cleared on L17. Rebar inspection signed off by third-party consultant.",
    corroboration: "Zero float remaining. Any material delivery disruption here shifts the critical path.",
    queryAnswer: "Activity A1230 has 0 days float. Formwork deshoring cleared, but PT cable delay will convert this into the primary critical path within 48h.",
  },
  {
    id: "A1240",
    name: "MEP risers Level 04 to 18",
    start: "Dec 11",
    tf: "-8d",
    tone: "bad",
    isVoice: true,
    signalTitle: "BATCH TICKET #4902 & SUPPLIER CHALLAN #SN882",
    signalDetail: "Post-tension strand vendor announced 2-day fabrication hold · Site crew reassigned.",
    corroboration: "Unlinked to P6 baseline yet consumes 8 days total float. Triggers ₹14.4 Cr liquidated damages risk.",
    queryAnswer: "Activity A1240 consumed 8 days float because PT strand vendor announced a 2-day yard hold (Challan #SN882). Triggers 8-day critical path slip to Milestone M-04. Master P6 baseline remains isolated and untouched.",
  },
  {
    id: "A1250",
    name: "Facade unitisation",
    start: "Jan 20",
    tf: "+5d",
    tone: "",
    isVoice: false,
    signalTitle: "FABRICATION DISPATCH · FACTORY QC",
    signalDetail: "Glazed curtain-wall modules 140–210 packed for road transit from Pune facility.",
    corroboration: "Factory dispatch manifest aligns with baseline buffer. 5 days positive float preserved.",
    queryAnswer: "Activity A1250 retains +5d positive float. Factory dispatch manifest confirms curtain-wall panels are in road transit with ample schedule buffer.",
  },
];

/** Count-up number for the verdict line. */
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

export function GapSection() {
  const [selectedId, setSelectedId] = useState("A1240");
  const [showAgentQuery, setShowAgentQuery] = useState(false);
  const activeRow = P6_ACTIVITIES.find((a) => a.id === selectedId) || P6_ACTIVITIES[2];

  return (
    <section className="sec wrap st-wrap" id="narrative">
      <ScrubHeading
        className="gap-h center"
        segs={[
          { t: "A slip you cannot see" },
          { t: "is money you cannot keep.", em: true },
        ]}
      />

      <div className="sechead mono xs">
        <span className="num">01</span>
        <span>WHAT YOUR SCHEDULE SEES · INTERACTIVE GROUND TRUTH AUDIT</span>
      </div>

      <Reveal variant="up" delay={100}>
        <div className="artifact">
          <div className="abar mono xs">
            <span>BASELINE · ORACLE PRIMAVERA P6 (.XER)</span>
            <span className="dim">CLICK OR HOVER ANY ACTIVITY ROW</span>
          </div>

          <div className="table-responsive">
            <table className="xer">
              <thead>
                <tr><th>ACTIVITY</th><th>TASK</th><th>START</th><th>FLOAT</th></tr>
              </thead>
              <tbody>
                {P6_ACTIVITIES.map((row, i) => (
                  <tr
                    key={row.id}
                    className={selectedId === row.id ? "active-row" : ""}
                    onMouseEnter={() => setSelectedId(row.id)}
                    onClick={() => setSelectedId(row.id)}
                    style={{ ["--ri" as never]: i }}
                  >
                    <td className="mono dim">{row.id}</td>
                    <td>
                      {row.name}
                      {selectedId === row.id && (
                        <span className="inspect-tag mono xs">INSPECTING</span>
                      )}
                    </td>
                    <td className="mono">{row.start}</td>
                    <td className={`mono ${row.tone}`}>{row.tf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Multi-Source Field Signal Feed */}
          <div className="signal-reconciler">
            <div className="reconciler-header mono xs">
              <div className="rec-header-left">
                <span className="live-dot pulse" />
                <span>LIVE FIELD SIGNAL RECONCILER · LINKED TO [{activeRow.id}]</span>
                {activeRow.isVoice && (
                  <span className="audio-wave" aria-label="Field voice memo active">
                    <i /><i /><i /><i /><i />
                  </span>
                )}
              </div>
              <span className="reconciler-status">DISAMBIGUATED</span>
            </div>

            <div className="reconciler-body mono xs">
              <div className="reconciler-row">
                <span className="rec-badge signal">[FIELD EVENT]</span>
                <span className="rec-text">
                  <strong>{activeRow.signalTitle}</strong> — {activeRow.signalDetail}
                </span>
              </div>
              <div className="reconciler-row">
                <span className="rec-badge engine">[CORROBORATION]</span>
                <span className="rec-text">{activeRow.corroboration}</span>
              </div>
            </div>

            {/* Grounded Natural Language Schedule Query Simulator */}
            <div className="agent-query-bar">
              <button
                type="button"
                className="query-btn mono xs"
                onClick={() => setShowAgentQuery((prev) => !prev)}
                aria-expanded={showAgentQuery}
              >
                <span className="query-prompt">&gt;</span>
                <span className="query-label">Ask Graph Agent: &ldquo;Why did {activeRow.id} lose float?&rdquo;</span>
                <span className="query-badge">{showAgentQuery ? "HIDE" : "RUN QUERY"}</span>
              </button>
              {showAgentQuery && (
                <div className="query-response mono xs">
                  <span className="query-tag">[GROUNDED CYPHER ANSWER]</span>
                  <p className="query-txt">{activeRow.queryAnswer}</p>
                </div>
              )}
            </div>
          </div>

          <div className="atotals">
            <p className="mono xs">
              <span className="dim">CONTRACT P6 VERDICT&nbsp;&nbsp;</span>
              <span className="ok">ON TRACK · LIQUIDATED DAMAGES ₹0</span>
            </p>
            <p className="mono xs verdict glow-pulse">
              <span className="dim">SYNCPRO RECONCILES&nbsp;&nbsp;</span>
              <span className="bad">
                CRITICAL SLIP −<CountUp to={8} /> DAYS · EXPOSURE ₹<CountUp to={14} />.<CountUp to={4} /> CR
              </span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={220}>
        <p className="gap-punch">
          The reality was documented on site from day one. <em>The master schedule just never saw it.</em>
        </p>
      </Reveal>
    </section>
  );
}
