import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "How does SyncPro integrate with Oracle Primavera P6 or Microsoft Project?",
    a: "SyncPro natively parses and writes standard industry schedule formats (.xer, .mpp, .pp, and Primavera XML/MSPDI) via high-fidelity MPXJ engines. You do not need to replace your current scheduling software or migrate data. SyncPro acts as the intelligence and corroboration layer on top of your existing files.",
  },
  {
    q: "Are our proprietary project schedules used to train public AI models?",
    a: "Strictly no. SyncPro enforces enterprise-grade data boundaries. Your project schedule data, cost codes, subcontractor details, and field logs are isolated in dedicated tenant databases and are never used for model training or cross-customer indexing.",
  },
  {
    q: "Does SyncPro automatically overwrite our master schedule baseline?",
    a: "No. SyncPro operates under a strict 'Confidence-Gated Commit' governance model. Field updates and reforecasts are generated in an isolated shadow schedule. Once evidence is corroborated, proposed updates are staged for review and require explicit approval by the Project Controls Lead before syncing back to the master baseline.",
  },
  {
    q: "Can SyncPro be deployed in our private cloud (VPC) or on-premise?",
    a: "Yes. For enterprise design partners with strict data residency requirements (defense, critical infrastructure, government), SyncPro offers private VPC deployment options (AWS, Azure, GCP) with enterprise SSO and SOC2-compliant encryption at rest and in transit.",
  },
  {
    q: "How does the Design Partner / Early Access Pilot program work?",
    a: "We are onboarding a select cohort of General Contractors, EPCs, and Capital Owners. During the pilot, our team works directly with your project controls department to ingest your active .xer/.mpp schedules, configure site signal channels (WhatsApp/Procore), and benchmark delay prediction accuracy on a live project.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reveal = useReveal();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-8" style={{ maxWidth: "640px" }}>
          <div className="eyebrow mb-2">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h1">Everything you need to know about enterprise deployment.</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="faq-item"
                style={{
                  borderBottom: "1px solid var(--line)",
                  padding: "18px 0",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="row between full"
                  style={{
                    textAlign: "left",
                    color: isOpen ? "var(--text)" : "var(--text-2)",
                    fontSize: 16,
                    fontWeight: 550,
                  }}
                >
                  <span className="row gap-3">
                    <HelpCircle
                      className="ico grow0"
                      style={{
                        width: 16,
                        height: 16,
                        color: isOpen ? "var(--brand-500)" : "var(--text-4)",
                      }}
                    />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="ico grow0"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                      color: "var(--text-3)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="faq-answer fade-up"
                    style={{
                      padding: "12px 0 6px 28px",
                      color: "var(--text-2)",
                      fontSize: 14,
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
