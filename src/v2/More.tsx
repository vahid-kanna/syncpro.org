/**
 * SyncPro v2 — capabilities, platform stack, FAQ.
 */
import { Reveal, MaskLines } from "./Chrome";
import { ScrubHeading, Tilt } from "./Motion";

/* ============ CAPABILITIES ============ */

const CAPS = [
  {
    n: "01",
    t: "Confidence-Gated Shadow Updates",
    d: "Every field signal is resolved to its exact CPM activity, corroborated across independent evidence, and committed only when calibrated confidence clears the gate. The contract P6 is never touched.",
  },
  {
    n: "02",
    t: "Cited Schedule Agent",
    d: "Ask your schedule anything in plain language. Answers come from a Neo4j knowledge graph — every number traceable to the activity node that produced it.",
  },
  {
    n: "03",
    t: "Forensic Evidence Trail",
    d: "An append-only audit log replays any schedule decision, assembles contemporaneous dossiers, and drafts FIDIC / NHAI extension-of-time notices before time-bars expire.",
  },
];

export function BuiltFor() {
  return (
    <section className="sec wrap builtfor">
      <MaskLines
        className="sec-h"
        baseDelay={0}
        lines={[<>SyncPro turns site noise into</>, <><em>defensible schedule fact.</em></>]}
      />
      <Reveal variant="down" delay={200}>
        <p className="mono lbl cap-kick">BUILT FOR THE MODERN BASELINE.</p>
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

/* ============ PLATFORM STACK ============ */

const STACK: Array<[string, string]> = [
  ["NEO4J", "CPM knowledge graph"],
  ["FASTAPI", "Modular monolith core"],
  ["MPXJ", ".XER / .MPP / .PP parsing"],
  ["LANGCHAIN", "Grounded multi-LLM agents"],
  ["POSTGRES", "Append-only audit ledger"],
  ["GROQ · LLAMA 3.3", "Realtime inference"],
];

export function Stack() {
  return (
    <section className="sec wrap">
      <ScrubHeading
        className="sec-h"
        segs={[{ t: "A platform built like the" }, { t: "schedules it reads.", em: true }]}
      />
      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">ONE GRAPH UNDER EVERYTHING.</p>
      </Reveal>
      <div className="stackgrid">
        {STACK.map(([name, desc], i) => (
          <Reveal key={name} variant="fade" delay={i * 70}>
            <div className="stackcell">
              <span className="mono stackname">{name}</span>
              <span className="xs dim">{desc}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ FAQ ============ */

const QA: Array<[string, string]> = [
  ["What is SyncPro?",
   "SyncPro is an autonomous schedule intelligence engine for construction megaprojects. It ingests messy field signals — voice notes, batch tickets, delivery dockets — resolves each to the exact CPM activity in your Primavera P6 baseline, corroborates the claim across independent evidence sources, and maintains a live shadow forecast so critical-path slips surface weeks before contractors report them."],
  ["Does SyncPro change our master schedule?",
   "No. Updates land on a parallel, evidence-linked shadow schedule and are committed only after calibrated confidence gates pass. Anything below threshold routes to a planner review queue. Your contractual P6 baseline stays untouched."],
  ["Which scheduling tools does it support?",
   "Native parsing of Primavera P6 (.xer), Microsoft Project (.mpp), Asta Powerproject (.pp), plus Primavera XML/MSPDI via high-fidelity MPXJ engines. SyncPro layers on top of the tools you already run."],
  ["How do the AI answers stay trustworthy?",
   "Answers never come from a model's memory. A LangChain agent generates Cypher against your project's Neo4j graph and cites the activity nodes behind every figure — zero hallucinated quantities or dates."],
  ["Is our schedule data used to train models?",
   "Never. Project data lives in isolated tenant databases with enterprise encryption. Nothing crosses tenants, nothing trains public models."],
  ["Can it help with delay claims?",
   "Yes — the append-only audit trail replays any period of the job, assembles contemporaneous evidence dossiers, and drafts formal FIDIC / NHAI extension-of-time notices inside the contractual time-bar window."],
];

export function FAQ() {
  return (
    <section className="sec wrap">
      <ScrubHeading className="sec-h" segs={[{ t: "Everything else.", em: true }]} />
      <Reveal variant="down" delay={160}>
        <p className="mono lbl cap-kick">FAQS.</p>
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
