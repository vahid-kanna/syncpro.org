/**
 * SyncPro v2 — Section 07 / Executive FAQ
 * Sourced directly from Astra's blueprint:
 * "Clear scope. No surprises."
 * 5 essential, high-clarity Q&As answering the critical EPC buyer questions.
 */
import { Reveal, MaskLines } from "./Chrome";

interface QAItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: QAItem[] = [
  {
    q: "Does SyncPro replace Primavera P6?",
    a: "No. The proposed workflow sits alongside Oracle Primavera P6. The approved contract baseline remains the inviolable reference; reviewed site events are modeled in a separate shadow forecast without modifying master project files.",
  },
  {
    q: "What do we need for a pilot?",
    a: "One active or completed package, its approved baseline (.xer) and latest update, selected routine site records (DPRs, batch dockets, voice notes), and access to a planning lead. We confirm P6 export compatibility and data requirements before agreeing a start date.",
  },
  {
    q: "Can SyncPro guarantee savings or a successful claim?",
    a: "No. Schedule diagnostics support review; they do not guarantee delivery. Financial examples are modeled assumptions, and any formal extension of time (EOT) claim depends on the commercial contract, physical evidence, causation, and applicable law.",
  },
  {
    q: "How will proprietary project data be handled?",
    a: "Data access, storage, retention, and deletion terms are agreed before any files are shared. The proposed pilot is strictly read-only. Your proprietary schedule baselines and commercial dockets are never used to train public AI models.",
  },
  {
    q: "Is SyncPro available today?",
    a: "SyncPro is in active development at Nirmaan, IIT Madras, and currently evaluating pilot candidate packages. Pilot timing, supported capabilities, and evaluation scopes are confirmed after technical scoping.",
  },
];

export function ExecutiveFaq() {
  return (
    <section className="section faq-sec" id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">07 / EXECUTIVE FAQ</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>Clear scope.</>, <><span className="accent">No surprises.</span></>]}
            />
          </div>
          <p className="head-desc">
            Direct answers regarding master schedule integrity, pilot requirements, and proprietary data handling.
          </p>
        </div>

        <div className="faq-list mt-6">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={idx} variant="up" delay={idx * 60}>
              <details className="faq-accordion spotlight-card">
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
      </div>
    </section>
  );
}
