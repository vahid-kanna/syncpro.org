import { CREDS, HERO } from "./lib/content";
import { CHECKS, SAMPLE } from "./lib/audit";
import { scrollToId, useCountUp, useInView } from "./lib/hooks";
import { ArrowRight, Bolt, Clock, FileDoc } from "./lib/icons";

const R = 40;
const CIRC = 2 * Math.PI * R;

/** Curated rows for the hero — a pass, two fails and a warn, so the mix is honest. */
const HERO_ROWS = [0, 7, 9, 10].map((i) => CHECKS[i]);

const GRADE_LABEL: Record<string, string> = {
  pass: "Pass",
  warn: "Warn",
  fail: "Fail",
};

function ScoreRing({ score, run }: { score: number; run: boolean }) {
  const v = useCountUp(score, run, 1300);
  const dash = (v / 100) * CIRC;

  return (
    <div className="score-ring">
      <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden>
        <circle
          cx="46"
          cy="46"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,.075)"
          strokeWidth="6"
        />
        <circle
          cx="46"
          cy="46"
          r={R}
          fill="none"
          stroke="#E6C24A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRC}`}
        />
      </svg>
      <span className="val">
        <b>{Math.round(v)}</b>
        <span>/ 100</span>
      </span>
    </div>
  );
}

function HealthCard() {
  const { ref, seen } = useInView<HTMLDivElement>(0.25);
  const counts = CHECKS.reduce(
    (a, c) => ({ ...a, [c.grade]: a[c.grade as "pass" | "warn" | "fail"] + 1 }),
    { pass: 0, warn: 0, fail: 0 },
  );

  return (
    <div className="hero-visual">
      <div className="hcard" ref={ref}>
        <div className="hcard-head">
          <span className="row gap-2">
            <FileDoc size={15} className="t-info" />
            <span className="mono xs dim">{SAMPLE.file}</span>
          </span>
          <span className="tag tag-warning">
            <i className="dot" />
            {SAMPLE.grade}
          </span>
        </div>

        <div className="hcard-body">
          <div className="score-row">
            <ScoreRing score={SAMPLE.score} run={seen} />
            <div className="fill">
              <div className="h3" style={{ marginBottom: 3 }}>
                {SAMPLE.project}
              </div>
              <div className="xs faint" style={{ marginBottom: 10 }}>
                {SAMPLE.scope}
              </div>
              <div className="row wrapf gap-3">
                <span className="row gap-2 xs dim">
                  <Bolt size={13} className="faint" />
                  {SAMPLE.activities.toLocaleString("en-IN")} activities
                </span>
                <span className="row gap-2 xs dim">
                  <Clock size={13} className="faint" />
                  Status {SAMPLE.statusDate}
                </span>
              </div>
            </div>
          </div>

          <div className="divider mt-6 mb-2" />

          <div aria-label="Selected checks from the DCMA 14-point assessment">
            {HERO_ROWS.map((c) => (
              <div className="audit-row" key={c.name}>
                <span className={`g g-${c.grade}`} aria-hidden>
                  {c.grade === "pass" ? "✓" : c.grade === "warn" ? "!" : "×"}
                </span>
                <span className="t">
                  {c.name}
                  <span className="sr-only"> — {GRADE_LABEL[c.grade]}</span>
                </span>
                <span className="v">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hcard-foot between">
          <span className="row wrapf gap-3 xs">
            <span className="row gap-2 t-danger">
              <i className="sdot" style={{ background: "currentColor" }} aria-hidden />
              {counts.fail} fails
            </span>
            <span className="row gap-2 t-warning">
              <i className="sdot" style={{ background: "currentColor" }} aria-hidden />
              {counts.warn} warnings
            </span>
            <span className="row gap-2 t-success">
              <i className="sdot" style={{ background: "currentColor" }} aria-hidden />
              {counts.pass} passes
            </span>
          </span>
          <a
            className="xs t-brand row gap-1"
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("demo");
            }}
          >
            Full audit
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap-lg hero-grid">
        <div>
          <div className="hero-eyebrow rv">
            <span className="tag tag-brand">{HERO.eyebrow}</span>
            <span className="chip-note">
              <Bolt size={12} className="t-brand" aria-hidden />
              {HERO.eyebrowNote}
            </span>
          </div>

          <h1 className="display rv">
            {HERO.h1[0]}
            <em>{HERO.h1[1]}</em>
            {HERO.h1[2]}
          </h1>

          <p className="lead hero-sub rv">{HERO.sub}</p>

          <div className="hero-cta rv">
            <a
              className="btn btn-primary btn-lg"
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("demo");
                // Let the scroll begin, then start the audit so the visitor
                // arrives to a demo already running.
                setTimeout(() => window.dispatchEvent(new Event("syncpro:run-audit")), 420);
              }}
            >
              {HERO.ctaPrimary}
              <ArrowRight className="ico" />
            </a>
            <a
              className="btn btn-outline btn-lg"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              {HERO.ctaSecondary}
            </a>
          </div>
          <p className="hero-note rv">{HERO.note}</p>

          <div className="hero-creds rv">
            {CREDS.map((c) => (
              <div className="hero-cred" key={c.b}>
                <b>{c.b}</b>
                <span>{c.s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv">
          <HealthCard />
        </div>
      </div>
    </section>
  );
}
