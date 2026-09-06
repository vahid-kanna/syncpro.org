/**
 * SyncPro v2 — Section 05 / Built for Megaprojects (Audiences)
 * Benchmarked directly against ZeroEka's "Enterprises we can help":
 * Clean 3-column segment grid with zero clutter.
 */
import { Reveal, MaskLines } from "./Chrome";
import { HardHat, Landmark, Scale } from "lucide-react";

const AUDIENCES = [
  {
    num: "01",
    title: "Tier-1 EPC Contractors",
    desc: "Connect daily site changes to the next planning review without disturbing the approved baseline. Resolve subcontractors' delay claims with indisputable as-built proof.",
    icon: HardHat,
    tag: "L&T · SHAPOORJI · TATA PROJECTS",
  },
  {
    num: "02",
    title: "Infrastructure Developers",
    desc: "Challenge contractor milestone forecasts with a clear, objective view of true critical path float, resource bottlenecks, and liquidated damages exposure.",
    icon: Landmark,
    tag: "NHAI · METRO RAIL · AIRPORT HUBS",
  },
  {
    num: "03",
    title: "Planning & Claims Consultants",
    desc: "Build a contemporaneous, court-ready chronology of delay events, time-impact analysis (TIA) exhibits, and contractual FIDIC 8.4 notices before time-bars expire.",
    icon: Scale,
    tag: "FORENSIC DELAY ADVISORY",
  },
];

export function Audiences() {
  return (
    <section className="section compact audiences-sec" id="audiences">
      <div className="wrap">
        <span className="eyebrow mono xs dim">05 / BUILT FOR MEGAPROJECTS</span>
        <MaskLines
          as="h2"
          className="sec-h"
          baseDelay={80}
          lines={[<>For the people</>, <><span className="accent">accountable for delivery.</span></>]}
        />

        <div className="audiences-grid mt-6">
          {AUDIENCES.map((aud, idx) => {
            const IconComponent = aud.icon;
            return (
              <Reveal key={aud.num} variant="up" delay={idx * 100} className="audience-wrap">
                <article className="audience-card spotlight-card">
                  <div className="audience-header mono xs">
                    <span className="audience-num">{aud.num}</span>
                    <IconComponent className="ico-xs acc" />
                  </div>
                  <h3 className="audience-title">{aud.title}</h3>
                  <p className="audience-desc">{aud.desc}</p>
                  <div className="audience-tag mono xs dim">{aud.tag}</div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
