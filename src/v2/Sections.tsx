/**
 * SyncPro v2 — sections with full SignalIQ motion language:
 * masked-line headlines sliding DOWN, staggered artifact reveals,
 * blur-in labels, count-up verdicts.
 */
import { useEffect, useRef, useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { ScrubHeading, Magnetic } from "./Motion";

/* ================= HERO ================= */

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-in">
        <Reveal variant="down" className="hero-lblwrap">
          <p className="mono lbl hero-lbl">INFRASTRUCTURE-GRADE AI</p>
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
            Contractors report critical-path slips three weeks after they happen. SyncPro
            reads every site signal and reconciles it against your P6 baseline in real
            time — before the delay gets expensive.
          </p>
        </Reveal>
        <Reveal variant="up" delay={780} className="hero-btnrow">
          <Magnetic>
            <a className="hero-btn mono xs" href="#contact">
              Initialize Pilot <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <a className="hero-anchor mono xs dim" href="#narrative">
            Explore Schedule Engine ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ GAP STATEMENT + 01 ARTIFACT ============ */

const P6_ROWS = [
  { id: "A1210", name: "Secant piling — podium", start: "Oct 12", tf: "+2d", tone: "" },
  { id: "A1230", name: "L18 post-tension slab", start: "Dec 08", tf: "0d ⚑", tone: "warn" },
  { id: "A1240", name: "MEP risers L04–L18", start: "Dec 11", tf: "-8d", tone: "bad" },
  { id: "A1250", name: "Facade unitisation", start: "Jan 20", tf: "+5d", tone: "" },
];

/** Count-up number for the verdict line. */
function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { rootMargin: "-40px" });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

export function GapSection() {
  return (
    <section className="sec wrap st-wrap" id="narrative">
      <ScrubHeading
        className="gap-h center"
        segs={[
          { t: "A slip you can’t see" },
          { t: "is money you can’t keep.", em: true },
        ]}
      />

      <div className="sechead mono xs">
        <span className="num">01</span>
        <span>WHAT YOUR SCHEDULE SEES</span>
      </div>

      <Reveal variant="up" delay={100}>
        <div className="artifact">
          <div className="abar mono xs">
            <span>BASELINE · ORACLE PRIMAVERA P6 (.XER)</span>
            <span className="dim">STATUS CUT-OFF W12</span>
          </div>
          <table className="xer">
            <thead>
              <tr><th>ACTIVITY</th><th>TASK</th><th>START</th><th>TF</th></tr>
            </thead>
            <tbody>
              {P6_ROWS.map((row, i) => (
                <tr key={row.id} style={{ ["--ri" as never]: i }}>
                  <td className="mono dim">{row.id}</td>
                  <td>{row.name}</td>
                  <td className="mono">{row.start}</td>
                  <td className={`mono ${row.tone}`}>{row.tf}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="atotals">
            <p className="mono xs">
              <span className="dim">PARSER VERDICT&nbsp;&nbsp;</span>
              <span className="ok">ON TRACK · LD EXPOSURE ₹0</span>
            </p>
            <div className="rawwall mono xs" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <p key={i}>
                  SIG/2026-08-19/14:32:11/VOICE-NOTE/site-eng-07/GRID-C3-C7/120M3-M40/BATCH-#4902/SLUMP-140MM-OK/
                  PT-CABLE-DELAYED-2DAYS/FAB-HOLD-VENDOR-09/DOCKET-SN-882/PENDING-CORROBATION/UNMAPPED-ACTIVITY/
                </p>
              ))}
            </div>
            <p className="mono xs verdict">
              <span className="dim">SYNCPRO READS&nbsp;&nbsp;</span>
              <span className="bad">
                CRITICAL SLIP −<CountUp to={8} />D · LD EXPOSURE ₹<CountUp to={14} />.<CountUp to={4} /> CR
              </span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={220}>
        <p className="gap-punch">
          The truth was in the field all along. <em>Nobody could read it.</em>
        </p>
      </Reveal>
    </section>
  );
}
