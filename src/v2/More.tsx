/**
 * SyncPro v2 — capabilities, core platform matrix, and interactive FAQ.
 * Features the Canonical 3-Pillar Framework and CardSpotlight physics.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { ScrubHeading, Tilt, CardSpotlight } from "./Motion";

/* ============ 3 CANONICAL STRATEGIC PILLARS ============ */

const PILLARS = [
  {
    pillar: "PILLAR 01",
    tag: "READ-ONLY P6 ISOLATION",
    title: "Know the Plan · Schedule Graph",
    desc: "Traversable CPM network with native Primavera P6, MS Project, and Asta ingestion. Automated DCMA 14-point integrity audits flag missing logic, open ends, and artificial float manipulation before baseline approval.",
  },
  {
    pillar: "PILLAR 02",
    tag: "PARALLEL SHADOW FORECAST",
    title: "Know Reality · Shadow Engine",
    desc: "Captures routine voice notes, batch tickets, and delivery dockets. Disambiguates each field claim to its exact CPM task ID and commits only multi-source verified updates to a parallel shadow schedule without touching the contract baseline.",
  },
  {
    pillar: "PILLAR 03",
    tag: "FIDIC & NHAI COMPLIANCE",
    title: "Run the Project · Claim Protection",
    desc: "An event-sourced immutable audit log records every graph adjustment, compiling time-stamped evidence dossiers and drafting formal FIDIC Clause 20.1 and NHAI Extension-of-Time notices inside contractual notification windows.",
  },
];

export function BuiltFor() {
  return (
    <section className="sec wrap builtfor" id="capabilities">
      <MaskLines
        className="sec-h"
        baseDelay={0}
        lines={[<>SyncPro turns daily site records into</>, <><em>defensible schedule reality.</em></>]}
      />
      <Reveal variant="down" delay={200}>
        <p className="mono lbl cap-kick">THE THREE-PILLAR CONTROLS ARCHITECTURE.</p>
      </Reveal>
      <div className="caps">
        {PILLARS.map((p, i) => (
          <Reveal key={p.pillar} variant="up" delay={i * 140} className="capwrap">
            <Tilt max={4}>
              <CardSpotlight className="cap-spotlight">
                <div className={`cap cap-${i}`}>
                  <div className="cap-meta">
                    <span className="cap-n mono">{p.pillar}</span>
                    <span className="cap-badge mono xs">{p.tag}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </CardSpotlight>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ CORE PLATFORM CAPABILITIES ============ */

const CAPABILITIES_GRID = [
  {
    name: "DCMA 14-POINT HEALTH",
    tag: "14/14 CHECKS",
    desc: "Automated audit of logic breaks, open ends, float abuse, and relationship integrity before baseline lock.",
  },
  {
    name: "NATIVE SCHEDULE PARSING",
    tag: "P6 · MPP · PP",
    desc: "Direct parsing of Oracle Primavera P6 (.xer/.xml), MS Project (.mpp), and Asta Powerproject (.pp).",
  },
  {
    name: "MULTI-SOURCE CORROBORATION",
    tag: "TRIANGULATION",
    desc: "Cross-validates field voice notes, batch dockets, and inspection challans against CPM schedule logic.",
  },
  {
    name: "GROUNDED GRAPH ENGINE",
    tag: "NEO4J CYPHER",
    desc: "Natural language schedule queries citing exact activity IDs and calculated float values without hallucinations.",
  },
  {
    name: "PARALLEL SHADOW FORECAST",
    tag: "ZERO OVERWRITE",
    desc: "Live actual vs planned reconciliation with complete isolation from your contractual master P6 file.",
  },
  {
    name: "CONTEMPORANEOUS CLAIMS",
    tag: "EOT READY",
    desc: "Tamper-evident audit logs and pre-drafted FIDIC and NHAI extension of time dispute packages.",
  },
];

export function Stack() {
  return (
    <section className="sec wrap" id="platform">
      <ScrubHeading
        className="sec-h"
        segs={[{ t: "Engineered for complex" }, { t: "megaproject controls.", em: true }]}
      />
      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">CORE PLATFORM CAPABILITIES.</p>
      </Reveal>
      <Reveal variant="up" delay={240}>
        <div className="stackgrid">
          {CAPABILITIES_GRID.map((cap) => (
            <div key={cap.name} className="stackcell">
              <div className="stackcell-head">
                <span className="mono stackname">{cap.name}</span>
                <span className="stack-tag mono xs">{cap.tag}</span>
              </div>
              <p className="stackdesc">{cap.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============ INTERACTIVE FAQ ACCORDION ============ */

const QA: Array<[string, string]> = [
  [
    "What is SyncPro?",
    "SyncPro is an automated schedule controls platform built for large capital projects. It processes routine field records including voice updates, concrete batch receipts, and delivery dockets, links them to specific activities in your Primavera P6 baseline, validates the work through independent site records, and maintains a parallel forecast to reveal schedule delays weeks before monthly reports."
  ],
  [
    "Does SyncPro modify our master contractual schedule?",
    "No. Updates are posted only to a parallel shadow schedule once cross-checked against supporting site records. Any unverified claims route to your planning team for review, ensuring your contractual baseline remains secure and unmodified."
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx((curr) => (curr === i ? null : i));
  };

  return (
    <section className="sec wrap" id="faq">
      <ScrubHeading className="sec-h" segs={[{ t: "Frequently asked questions.", em: true }]} />
      <Reveal variant="down" delay={160}>
        <p className="mono lbl cap-kick">PROJECT CONTROLS FAQ.</p>
      </Reveal>
      <div className="faq-accordion">
        {QA.map(([q, a], i) => {
          const isOpen = openIdx === i;
          return (
            <Reveal key={i} variant="up" delay={Math.min(i * 60, 240)}>
              <div className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <span className="mono faq-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-title">{q}</span>
                  </div>
                  <span className="faq-toggle-ico mono">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-body">
                    <p className="faq-ans">{a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
