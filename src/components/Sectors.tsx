import { Server, TrainFront, Building2, Factory } from "lucide-react";
import { useReveal } from "../lib/useReveal";

const SECTORS = [
  {
    icon: <Server className="ico" style={{ color: "var(--brand-400)", width: 22, height: 22 }} />,
    title: "Data Centers & Mission Critical",
    body: "Compressed schedules, heavy MEP commissioning logic, and zero-tolerance delay penalties.",
  },
  {
    icon: <TrainFront className="ico" style={{ color: "var(--steel)", width: 22, height: 22 }} />,
    title: "Rail & Civil Infrastructure",
    body: "Multi-year programmes, severe interface complexity, and high dispute exposure.",
  },
  {
    icon: <Building2 className="ico" style={{ color: "var(--success)", width: 22, height: 22 }} />,
    title: "Commercial & High-Rise",
    body: "Repeating floor cycles ideal for line-of-balance tracking and multi-trade handoffs.",
  },
  {
    icon: <Factory className="ico" style={{ color: "var(--warning)", width: 22, height: 22 }} />,
    title: "Industrial & Energy Megaprojects",
    body: "Complex EPC delivery environments where 40%+ of projects suffer major schedule overruns.",
  },
];

export function Sectors() {
  const reveal = useReveal();

  return (
    <section id="sectors" className="wrap-lg section-sm">
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-6">
          <div className="eyebrow mb-2">TARGET VERTICALS</div>
          <h2 className="h2">Engineered for schedule-intensive, dispute-prone capital delivery.</h2>
        </div>
        <div className="sectors">
          {SECTORS.map((s) => (
            <div key={s.title}>
              <div>{s.icon}</div>
              <h3 className="h4 mt-2">{s.title}</h3>
              <div className="xs dim mt-1" style={{ lineHeight: 1.6 }}>
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
