/**
 * SyncPro v2 — capabilities, core platform matrix, FAQ with humanized prose.
 */
import { Reveal, MaskLines } from "./Chrome";
import { ScrubHeading, Tilt } from "./Motion";

/* ============ CAPABILITIES ============ */

const CAPS = [
  {
    n: "01",
    t: "Verified Shadow Updates",
    d: "SyncPro maps each field update directly to its corresponding CPM activity, validates the progress against independent delivery and inspection records, and posts verified updates to a shadow schedule. Your master P6 file remains completely untouched.",
  },
  {
    n: "02",
    t: "Connected Schedule Agent",
    d: "Query your schedule in plain language. SyncPro retrieves answers directly from a connected project graph, linking every date and float calculation back to the specific activity that produced it.",
  },
  {
    n: "03",
    t: "Contemporaneous Claim Dossiers",
    d: "An immutable audit trail records every schedule adjustment, compiles supporting site documentation, and prepares formal FIDIC and NHAI extension of time notices before contractual notification windows close.",
  },
];

export function BuiltFor() {
  return (
    <section className="sec wrap builtfor">
      <MaskLines
        className="sec-h"
        baseDelay={0}
        lines={[<>SyncPro turns daily site records into</>, <><em>defensible schedule reality.</em></>]}
      />
      <Reveal variant="down" delay={200}>
        <p className="mono lbl cap-kick">BUILT FOR MODERN CONTROLS TEAMS.</p>
      </Reveal>
      <div className="caps">
        {CAPS.map((c, i) => (
          <Reveal key={c.n} variant="up" delay={i * 140} className="capwrap">
            <Tilt max={5}>
              <div className={`cap cap-${i}`}>
                <span className="cap-n mono">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ CORE PLATFORM CAPABILITIES ============ */

const CAPABILITIES_GRID: Array<[string, string]> = [
  ["DCMA 14-POINT HEALTH", "Automated audit of logic breaks, open ends, float abuse, and relationship integrity."],
  ["NATIVE SCHEDULE PARSING", "Direct parsing of Oracle Primavera P6 (.xer/.xml), MS Project (.mpp), and Asta (.pp)."],
  ["MULTI-SOURCE CORROBORATION", "Cross-validates field voice notes, batch dockets, and inspection challans against CPM logic."],
  ["GROUNDED GRAPH ENGINE", "Natural language schedule queries citing exact activity IDs and calculated float values."],
  ["PARALLEL SHADOW FORECAST", "Live actual vs planned reconciliation with complete isolation from contractual master P6."],
  ["CONTEMPORANEOUS CLAIMS", "Tamper-evident audit logs and pre-drafted FIDIC and NHAI extension of time dossiers."],
];

export function Stack() {
  return (
    <section className="sec wrap">
      <ScrubHeading
        className="sec-h"
        segs={[{ t: "Engineered for complex" }, { t: "megaproject controls.", em: true }]}
      />
      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">CORE PLATFORM CAPABILITIES.</p>
      </Reveal>
      <div className="stackgrid">
        {CAPABILITIES_GRID.map(([name, desc], i) => (
          <Reveal key={name} variant="fade" delay={i * 70}>
            <div className="stackcell">
              <span className="mono stackname">{name}</span>
              <span className="stackdesc">{desc}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ FAQ ============ */

const QA: Array<[string, string]> = [
  [
    "What is SyncPro?",
    "SyncPro is an automated schedule controls platform built for large capital projects. It processes routine field records including voice updates, concrete batch receipts, and delivery dockets, links them to specific activities in your Primavera P6 baseline, validates the work through independent site records, and maintains a parallel forecast to reveal schedule delays weeks before monthly reports."
  ],
  [
    "Does SyncPro modify our master contractual schedule?",
    "No. Updates are posted only to a parallel shadow schedule once cross checked against supporting site records. Any unverified claims route to your planning team for review, ensuring your contractual baseline remains secure and unmodified."
  ],
  [
    "Which scheduling software does SyncPro support?",
    "SyncPro works directly with files from Primavera P6 (.xer), Microsoft Project (.mpp), and Asta Powerproject (.pp), as well as standard XML exports. It integrates into your existing project controls workflow without requiring new software on site."
  ],
  [
    "How does SyncPro prevent incorrect or fabricated outputs?",
    "Answers are computed directly from your project data rather than generated from statistical memory. SyncPro queries your project graph directly and references the exact activity IDs behind every calculation, eliminating fabricated dates and quantities."
  ],
  [
    "Is our proprietary project data used to train AI models?",
    "Never. All project data is stored in dedicated, encrypted databases for each organization. Your proprietary schedules and site records are never shared across accounts or used to train public models."
  ],
  [
    "How does SyncPro assist with contractual delay claims?",
    "The built-in audit trail reconstructs project timelines, organizes supporting site documentation, and prepares formal extension of time claims in compliance with FIDIC and NHAI contractual deadlines."
  ],
];

export function FAQ() {
  return (
    <section className="sec wrap">
      <ScrubHeading className="sec-h" segs={[{ t: "Frequently asked questions.", em: true }]} />
      <Reveal variant="down" delay={160}>
        <p className="mono lbl cap-kick">PROJECT CONTROLS FAQ.</p>
      </Reveal>
      <div className="faq">
        {QA.map(([q, a], i) => (
          <Reveal key={i} variant="up" delay={Math.min(i * 60, 240)}>
            <details className="qa">
              <summary className="qa-q">
                <span className="mono qa-n">{String(i + 1).padStart(2, "0")}</span>
                {q}
              </summary>
              <p className="qa-a">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
