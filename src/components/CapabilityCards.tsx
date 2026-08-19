import { GitFork, ShieldCheck, Cpu, Database, Binary, Scale } from "lucide-react";
import { useReveal } from "../lib/useReveal";

const CAPABILITIES = [
  {
    icon: <Database className="ico" style={{ color: "var(--brand-400)" }} />,
    title: "Graph-Grounded CPM Resolution",
    badge: "Anti-Hallucination",
    description:
      "Unlike generic LLMs that guess activity links, SyncPro anchors all reasoning to a deterministic project knowledge graph. Every location, contractor, trade, and CPM activity code is uniquely resolved.",
  },
  {
    icon: <ShieldCheck className="ico" style={{ color: "var(--success)" }} />,
    title: "Confidence-Gated Commit Engine",
    badge: "Multi-Source Proof",
    description:
      "A schedule update is never made on a single uncorroborated whisper. SyncPro enforces rigorous evidence thresholds across photos, delivery notes, and QA slips before staging updates for review.",
  },
  {
    icon: <GitFork className="ico" style={{ color: "var(--steel)" }} />,
    title: "Living CPM Logic Repair & Shadow Forecasting",
    badge: "Zero-Risk Simulation",
    description:
      "Simulate what-if workarounds and schedule re-sequencing in an isolated shadow environment before committing changes back to your master Oracle Primavera P6 or MS Project baseline.",
  },
  {
    icon: <Binary className="ico" style={{ color: "var(--brand-400)" }} />,
    title: "Counter-Party Trust Scoring",
    badge: "Biased-Signal Filtering",
    description:
      "Dynamically calibrates progress claims based on historical contractor reliability and variance patterns, eliminating optimistic reporting and surprise month-end delays.",
  },
  {
    icon: <Scale className="ico" style={{ color: "var(--warning)" }} />,
    title: "Contemporaneous Delay Records",
    badge: "Claims Defense",
    description:
      "Generates immutable, timestamped event records tied to contractual delay notice clauses (FIDIC, NEC4, AIA) to safeguard margins against costly retrospective disputes.",
  },
  {
    icon: <Cpu className="ico" style={{ color: "var(--info)" }} />,
    title: "Native Enterprise Stack Interop",
    badge: "No Re-Platforming",
    description:
      "Direct bidirectional synchronization with .xer, .mpp, .pp, Procore, and Autodesk ACC. Works as the intelligent copilot over your existing tools without forcing change management.",
  },
];

export function CapabilityCards() {
  const reveal = useReveal();

  return (
    <section id="capabilities" className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-8" style={{ maxWidth: "640px" }}>
          <div className="eyebrow mb-2">ENTERPRISE CAPABILITIES</div>
          <h2 className="h1">Engineered specifically for high-stakes capital projects.</h2>
          <p className="body mt-3">
            A purpose-built intelligence layer that respects critical path methodology, contractual
            governance, and strict data confidentiality.
          </p>
        </div>

        <div className="grid-3 gap-5">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="card card-hover"
              style={{ display: "flex", flexDirection: "column", gap: 12, padding: "24px 22px" }}
            >
              <div className="row between">
                <span className="iconbox brand">{cap.icon}</span>
                <span className="tag tag-brand">{cap.badge}</span>
              </div>
              <h3 className="h3 mt-2">{cap.title}</h3>
              <p className="xs dim" style={{ lineHeight: 1.65 }}>
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
