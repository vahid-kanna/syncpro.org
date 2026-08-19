import { HardHat, CalendarClock, ClipboardList, Landmark } from "lucide-react";
import { useReveal } from "../lib/useReveal";

const PERSONAS = [
  {
    icon: <HardHat className="ico" />,
    title: "Project Controls Lead",
    tag: "Primary User",
    body: "Stop spending 80% of your week manually chasing site notes and reconciling schedule discrepancies. Command the plan, risks, and field reality in one unified view.",
  },
  {
    icon: <CalendarClock className="ico" />,
    title: "Lead Planner / Scheduler",
    tag: "Integrity & Logic",
    body: "Automate DCMA-14 health audits, identify hidden float traps, and validate proposed updates before committing changes to master Primavera P6 or MS Project baselines.",
  },
  {
    icon: <ClipboardList className="ico" />,
    title: "Project Director / PM",
    tag: "Execution & Float",
    body: "Receive plain-English weekly risk briefings on what's genuinely at risk on the critical path, backed by concrete evidence rather than optimistic subcontractor reports.",
  },
  {
    icon: <Landmark className="ico" />,
    title: "Owner / Capital PMO",
    tag: "Portfolio Governance",
    body: "Ensure an immutable, contemporaneous as-built audit record across all enterprise contractors to prevent multi-million dollar claims and ensure project transparency.",
  },
];

export function WhoItsFor() {
  const reveal = useReveal();

  return (
    <section id="who" className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="eyebrow mb-2">WHO IT'S FOR</div>
        <h2 className="h1 mb-6">Built first for the person drowning in schedule reconciliation.</h2>
        <div className="persona">
          {PERSONAS.map((p) => (
            <div key={p.title} style={{ padding: "24px 20px" }}>
              <div className="iconbox brand mb-3">{p.icon}</div>
              <h3 className="h4">{p.title}</h3>
              {p.tag && (
                <span className="tag tag-brand" style={{ margin: "8px 0" }}>
                  {p.tag}
                </span>
              )}
              <p className="xs dim mt-2" style={{ lineHeight: 1.6 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
