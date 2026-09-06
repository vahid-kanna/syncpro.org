/**
 * SyncPro v2 — Stage 02: The Forensic Gap ("The Cost of Blindness")
 * Benchmarked directly against Astra's master blueprint:
 * Sourced MoSPI ₹4.92 Lakh Cr overruns, side-by-side monthly PDF vs live shadow reality.
 */
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Chrome";
import { ScrubHeading } from "./Motion";
import { FileText, Activity } from "lucide-react";

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function ForensicGap() {
  return (
    <section className="sec wrap forensic-gap-sec" id="forensic-gap">
      {/* Scrub Heading */}
      <ScrubHeading
        className="gap-h center"
        segs={[
          { t: "A slip you cannot see" },
          { t: "is money you cannot keep.", em: true },
        ]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">02</span>
        <span>THE LATENCY OF CONVENTIONAL PROJECT CONTROLS</span>
      </div>

      {/* Sourced MoSPI Infrastructure Reality Card */}
      <Reveal variant="up" delay={80} className="mospi-card-wrap">
        <div className="mospi-banner">
          <div className="mospi-stat">
            <span className="mono stat-num bad">₹<CountUp to={4} />.<CountUp to={92} /> LAKH CRORE</span>
            <span className="mono xs dim stat-label">CUMULATIVE COST OVERRUNS REPORTED BY MoSPI</span>
          </div>
          <div className="mospi-context">
            <p className="xs dim">
              According to the Ministry of Statistics and Programme Implementation (MoSPI, Feb 2024), 1,902 monitored
              megaprojects (&ge;₹150 Cr) reported <strong>₹4,92,477.11 Crore</strong> in cumulative cost escalation,
              with 44% delayed past scheduled commissioning. The root driver: schedule latency where field slips remain
              invisible in monthly summary reports until contractual float is completely exhausted.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Side-by-Side Dual Terminal Comparison */}
      <Reveal variant="up" delay={180}>
        <div className="comparison-grid">
          {/* Card A: The Deceptive Monthly PDF Report */}
          <div className="report-card monthly-pdf">
            <div className="report-card-header mono xs">
              <div className="header-badge dim">
                <FileText className="ico-xs" />
                <span>MONTHLY PROGRESS PDF · CONTRACTOR CUTOFF</span>
              </div>
              <span className="report-date dim">REPORT DATE: AUG 31</span>
            </div>

            <div className="report-body">
              <div className="report-metric-row">
                <div className="metric-pair">
                  <span className="mono xs dim">EXECUTIVE STATUS</span>
                  <span className="mono xs ok fw-bold">ON TRACK · 100% PLAN</span>
                </div>
                <div className="metric-pair">
                  <span className="mono xs dim">MILESTONE TARGET</span>
                  <span className="mono xs">DECEMBER 08</span>
                </div>
                <div className="metric-pair">
                  <span className="mono xs dim">REPORTED FLOAT</span>
                  <span className="mono xs ok">0 DAYS (BALANCED)</span>
                </div>
              </div>

              <div className="report-detail-box">
                <p className="mono xs dim">PROGRESS NARRATIVE (HIGH-LEVEL COMPRESSION):</p>
                <p className="narrative-text">
                  “All structural packages progressing according to schedule. Level 18 deck shuttering underway.
                  No material impact on critical path milestones. Liquidated damages risk evaluated at ₹0.”
                </p>
              </div>

              <div className="report-verdict mono xs">
                <span className="dim">CONVENTIONAL VERDICT:</span>
                <span className="ok">APPROVED FOR BILLING · ₹0 EXPOSURE</span>
              </div>
            </div>
          </div>

          {/* Card B: The Real-Time Corroborated SyncPro Shadow Reality */}
          <div className="report-card syncpro-live">
            <div className="report-card-header mono xs">
              <div className="header-badge brand">
                <Activity className="ico-xs acc" />
                <span>SYNCPRO LIVE GRAPH RECONCILIATION</span>
              </div>
              <span className="report-date acc">CONTINUOUS · 03-SEP</span>
            </div>

            <div className="report-body">
              <div className="report-metric-row">
                <div className="metric-pair">
                  <span className="mono xs dim">ACTUAL CRITICAL STATUS</span>
                  <span className="mono xs bad fw-bold">CRITICAL PATH SLIP</span>
                </div>
                <div className="metric-pair">
                  <span className="mono xs dim">CORROBORATED FINISH</span>
                  <span className="mono xs bad">DECEMBER 20 (+12D)</span>
                </div>
                <div className="metric-pair">
                  <span className="mono xs dim">CONSUMED FLOAT</span>
                  <span className="mono xs bad fw-bold">-8 DAYS DEFICIT</span>
                </div>
              </div>

              <div className="report-detail-box">
                <p className="mono xs dim">RECONCILED GROUND TRUTH (FROM DAILY EVIDENCE):</p>
                <p className="narrative-text">
                  “Challan #SN882 confirms post-tension strands delayed 4 days at dock. Crawler crane C-02 slew ring failed
                  on Pier P4. MEP risers L04-18 have already eaten all buffer float. True completion delayed 12 days.”
                </p>
              </div>

              <div className="report-verdict mono xs verdict-live">
                <span className="dim">FORENSIC EXPOSURE:</span>
                <span className="bad fw-bold">
                  CRITICAL SLIP −<CountUp to={8} /> DAYS · EXPOSURE ₹<CountUp to={14} />.<CountUp to={4} /> CR
                </span>
              </div>
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
