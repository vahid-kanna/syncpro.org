/**
 * SyncPro v2 — Stage 07: Executive FAQ
 * 6 rigorous enterprise Q&As defined in Astra's blueprint,
 * addressing P6 integrity, 95% confidence threshold, hallucination prevention,
 * supported file formats, and data isolation.
 */
import { Reveal, MaskLines } from "./Chrome";

interface QAItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: QAItem[] = [
  {
    q: "Will SyncPro overwrite our contractual Primavera P6 schedule?",
    a: "No. The system ingests your schedule as a read-only source baseline and constructs an independent shadow graph. Qualified field observations update only the shadow forecast. Any change proposed to the master programme must be explicitly reviewed, validated, and approved by your project controls lead via a version-bound change set.",
  },
  {
    q: "What does the 95% confidence threshold mean?",
    a: "It is an automated admission threshold for evidence reconciliation. A field update is admitted to the shadow graph only when multi-source evidence (e.g., site superintendent voice log corroborated by an independent material batch ticket and gate timestamp) clears >=95% certainty. Conflicting or ambiguous claims are immediately routed to a human planner queue.",
  },
  {
    q: "How do you prevent hallucinated schedule dates or activities?",
    a: "SyncPro separates natural language understanding from critical path calculations. LLMs are used solely to extract structured entities from unstructured site shorthand. Forward and backward CPM passes, early/late dates, and total float calculations are computed deterministically by our graph engine directly from the CPM network, completely eliminating fabricated dates.",
  },
  {
    q: "Which scheduling software and file formats are supported?",
    a: "SyncPro natively parses Oracle Primavera P6 (.xer and PMXML), Microsoft Project (.mpp and XML), and Asta Powerproject (.pp). Full support for multi-calendar projects, resource assignments, and complex precedence relationships is validated during the initial pilot phase.",
  },
  {
    q: "Does SyncPro replace our planning engineers or claims consultants?",
    a: "No. SyncPro is designed to augment your existing team by automating the manual drudgery of tracking down WhatsApp messages, physical dockets, and inspection logs. It gives planning heads early critical path visibility weeks before monthly cutoffs, and provides claims consultants with immutable, contemporaneous evidence dossiers for FIDIC/NEC4 entitlement.",
  },
  {
    q: "Is our proprietary project and schedule data protected?",
    a: "Strictly. Every enterprise client operates in an isolated Virtual Private Cloud (VPC) with AES-256 encryption at rest and in transit. Your proprietary schedule baselines, contractor rates, and site communications are never shared across tenants and never used to train public AI models.",
  },
];

export function ExecutiveFaq() {
  return (
    <section className="sec wrap faq-sec" id="faq">
      <MaskLines as="h2" className="sec-h center" baseDelay={80} lines={[<>Frequently asked</>, <><em>executive questions.</em></>]} />

      <div className="sechead mono xs center-head">
        <span className="num">07</span>
        <span>TECHNICAL DUE DILIGENCE &amp; FREQUENTLY ASKED QUESTIONS</span>
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, idx) => (
          <Reveal key={idx} variant="up" delay={idx * 60}>
            <details className="faq-accordion">
              <summary className="faq-summary">
                <span className="mono xs dim faq-index">0{idx + 1}</span>
                <span className="faq-question">{item.q}</span>
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
