/**
 * SyncPro v2 — Section 02 / The Four Connected Capabilities (The 4 Pillars)
 * Modeled after ZeroEka's "The Four Pillars":
 * Clean, balanced, non-overwhelming 4-card grid with micro-drawings.
 */
import { Reveal, MaskLines } from "./Chrome";
import { Database, GitFork, ShieldAlert, Scale } from "lucide-react";

const PILLARS = [
  {
    num: "01 / INGESTION",
    title: "Start with your P6 schedule.",
    desc: "Bring the master .xer schedule and selected site records (voice notes, dockets, gate logs) into one review. Trace every update back to its verifiable physical source.",
    icon: Database,
    color: "acc",
  },
  {
    num: "02 / SHADOW SCHEDULING",
    title: "Test change. Keep the baseline.",
    desc: "Model reviewed site events in a parallel Neo4j CPM graph. Forward and backward passes show exactly which downstream milestones move and which float buffers deplete.",
    icon: GitFork,
    color: "ok",
  },
  {
    num: "03 / DCMA 14 DIAGNOSTICS",
    title: "Find the weak links.",
    desc: "Audit schedule health against the Defense Contract Management Agency 14-point framework: logic open ends, negative leads, high float, and critical path length index.",
    icon: ShieldAlert,
    color: "amber",
  },
  {
    num: "04 / FIDIC CLAIMS DEFENSE",
    title: "Build the record as work happens.",
    desc: "Organize dated evidence chronologies and auto-draft contract-specific extension of time (EOT) notices under FIDIC 8.4/20.1 before 28-day contractual notification windows expire.",
    icon: Scale,
    color: "acc",
  },
];

export function FourPillars() {
  return (
    <section className="section pillars-sec" id="workflow">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">02 / FOUR CONNECTED CAPABILITIES</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>From source file</>, <><span className="accent">to a clearer decision.</span></>]}
            />
          </div>
          <p className="head-desc">
            Pilot workflow in development. One continuous chain of evidence from field observation to schedule recomputation, reviewed by your team.
          </p>
        </div>

        {/* 4 Restrained, Elegant Pillar Panels */}
        <div className="pillars-grid">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <Reveal key={pillar.num} variant="up" delay={idx * 90} className="pillar-wrap">
                <article className="pillar-card spotlight-card">
                  <div className="pillar-topbar mono xs">
                    <span className="pillar-num">{pillar.num}</span>
                    <IconComponent className={`ico-xs ${pillar.color}`} />
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
