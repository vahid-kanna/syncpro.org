import { XCircle, CheckCircle2 } from "lucide-react";
import { useReveal } from "../lib/useReveal";

const COMPARISONS = [
  {
    feature: "Schedule Update Cycle",
    traditional: "Monthly manual sprint (2-3 weeks lag from site event to P6 update)",
    syncpro: "Real-time daily signal ingestion with continuous shadow reforecasting",
  },
  {
    feature: "Signal Verification",
    traditional: "Subjective self-reporting on WhatsApp / Excel; prone to contractor optimism",
    syncpro: "Multi-source evidence corroboration (dockets, QA, photos) with trust scoring",
  },
  {
    feature: "Activity Code Mapping",
    traditional: "Manual guesswork to find which of 15,000 WBS activities changed",
    syncpro: "Deterministic knowledge graph matches field language to exact CPM nodes",
  },
  {
    feature: "Delay Identification",
    traditional: "Discovered after month-end run when the critical path is already lost",
    syncpro: "Proactive variance alerts 2-3 weeks ahead of master baseline impact",
  },
  {
    feature: "Dispute & Claims Defense",
    traditional: "Reconstructed memories 18 months later; costs millions in legal fees",
    syncpro: "Contemporaneous, tamper-evident audit dossier tied to contract notice clauses",
  },
];

export function BeforeAfterComparison() {
  const reveal = useReveal();

  return (
    <section className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-8" style={{ maxWidth: "660px" }}>
          <div className="eyebrow mb-2">THE RECONCILIATION UPGRADE</div>
          <h2 className="h1">The difference between guessing reality and proving it.</h2>
          <p className="body mt-3">
            Why traditional scheduling tools remain disconnected from the jobsite, and how SyncPro
            bridges the gap without replacing your existing software stack.
          </p>
        </div>

        <div className="comparison-grid">
          {/* Traditional Column */}
          <div className="card" style={{ background: "var(--bg-sunken)", borderColor: "var(--danger-line)" }}>
            <div className="row gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
              <XCircle className="ico t-danger" style={{ width: 18, height: 18 }} />
              <h3 className="h3" style={{ color: "var(--text)" }}>Traditional Project Controls</h3>
            </div>
            <div className="stack gap-4">
              {COMPARISONS.map((c, i) => (
                <div key={i} className="stack-xs">
                  <span className="label" style={{ color: "var(--text-4)" }}>{c.feature}</span>
                  <p className="xs dim mt-1" style={{ color: "var(--text-3)", lineHeight: 1.6 }}>
                    {c.traditional}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SyncPro Column */}
          <div className="card" style={{ background: "var(--bg-surface)", borderColor: "var(--brand-500)", boxShadow: "var(--shadow-pop)" }}>
            <div className="row between mb-4 pb-3" style={{ borderBottom: "1px solid var(--line)" }}>
              <div className="row gap-2">
                <CheckCircle2 className="ico t-brand" style={{ width: 18, height: 18 }} />
                <h3 className="h3" style={{ color: "var(--text)" }}>SyncPro Living Intelligence</h3>
              </div>
              <span className="tag tag-brand">Category Defining</span>
            </div>
            <div className="stack gap-4">
              {COMPARISONS.map((c, i) => (
                <div key={i} className="stack-xs">
                  <span className="label" style={{ color: "var(--brand-400)" }}>{c.feature}</span>
                  <p className="xs strong mt-1" style={{ color: "var(--text)", lineHeight: 1.6 }}>
                    {c.syncpro}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
