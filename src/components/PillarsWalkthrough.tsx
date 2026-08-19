import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface PillarData {
  id: string;
  num: string;
  title: string;
  headline: string;
  subhead: string;
  points: string[];
  mockupBadge: string;
  mockupContent: React.ReactNode;
}

const PILLARS: PillarData[] = [
  {
    id: "know-plan",
    num: "01",
    title: "Know the Plan",
    headline: "Automate DCMA-14 health audits and make complex CPM logic instantly legible.",
    subhead:
      "Ingest .xer and .mpp schedules into a rich knowledge graph. Instantly identify missing logic, hidden float traps, and long lead dependencies without hours of manual spreadsheet auditing.",
    points: [
      "Instant 14-point DCMA compliance score with line-by-line risk classification",
      "Living CPM dependency mapping that uncovers circular and redundant relationships",
      "Plain-English schedule search: ask questions across 10,000+ activities effortlessly",
    ],
    mockupBadge: "Schedule Intelligence · Graph Engine",
    mockupContent: (
      <div className="card-tight stack" style={{ background: "var(--bg-sunken)" }}>
        <div className="row between">
          <span className="status xs">
            <span className="sdot sdot-live pulse" /> DCMA-14 Audit Report
          </span>
          <span className="grade grade-A" style={{ padding: "2px 8px", fontSize: 12 }}>
            Score: 92/100
          </span>
        </div>
        <div className="table-wrap mt-2">
          <table className="table table-dense">
            <thead>
              <tr>
                <th>Health Metric</th>
                <th>Status</th>
                <th className="num">Fails</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="strong">Missing Logic (Open Ends)</td>
                <td>
                  <span className="tag tag-success">Passed</span>
                </td>
                <td className="num">0.4%</td>
              </tr>
              <tr>
                <td className="strong">High Float (&gt; 44 days)</td>
                <td>
                  <span className="tag tag-warning">Warning</span>
                </td>
                <td className="num">4.1%</td>
              </tr>
              <tr>
                <td className="strong">Negative Lag (Lead Time)</td>
                <td>
                  <span className="tag tag-success">Clean</span>
                </td>
                <td className="num">0</td>
              </tr>
              <tr>
                <td className="strong">Hard Date Constraints</td>
                <td>
                  <span className="tag tag-brand">Audited</span>
                </td>
                <td className="num">2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row between mt-2 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
          <span className="xs dim">Source: Baseline_Rev04.xer</span>
          <span className="xs t-brand">0 Critical Logic Breaks</span>
        </div>
      </div>
    ),
  },
  {
    id: "know-reality",
    num: "02",
    title: "Know Reality",
    headline: "Corroborate field claims across multiple independent sources before committing.",
    subhead:
      "Site signals are messy: WhatsApp voice notes, subcontractor logs, and inspection sheets. SyncPro maps real-world language to the correct CPM activity and requires multi-source evidence before updating.",
    points: [
      "Graph-grounded entity resolution: matches field jargon to precise CPM activity IDs",
      "Confidence-gated commits: updates require cross-corroboration (e.g. daily log + material docket)",
      "Counter-party trust scoring that prevents optimistic self-reporting from skewing forecasts",
    ],
    mockupBadge: "Corroboration Engine · Reality Gate",
    mockupContent: (
      <div className="card-tight stack" style={{ background: "var(--bg-sunken)" }}>
        <div className="row between">
          <span className="status xs">
            <span className="sdot sdot-hivis pulse" /> Inbound Field Signal
          </span>
          <span className="tag tag-brand">Resolution: #A1082</span>
        </div>
        <div
          className="bubble bubble-ai mt-2"
          style={{ width: "100%", maxWidth: "100%", fontSize: "12.5px" }}
        >
          <div className="row between mb-1">
            <span className="xs strong">Site Engineer WhatsApp Audio</span>
            <span className="xs dim">14:22 Today</span>
          </div>
          <em>&ldquo;Completed structural rebar for Level 4 West Slab, awaiting inspection.&rdquo;</em>
        </div>
        <div className="mt-2 stack-sm">
          <div className="row between xs" style={{ padding: "4px 8px", background: "var(--bg-elevated)", borderRadius: 4 }}>
            <span className="row gap-2">
              <CheckCircle2 className="ico" style={{ width: 13, height: 13, color: "var(--success)" }} />
              Delivery Docket #8819 (Concrete)
            </span>
            <span className="tag tag-success">Matched</span>
          </div>
          <div className="row between xs" style={{ padding: "4px 8px", background: "var(--bg-elevated)", borderRadius: 4 }}>
            <span className="row gap-2">
              <CheckCircle2 className="ico" style={{ width: 13, height: 13, color: "var(--success)" }} />
              QA/QC Sign-off Slip
            </span>
            <span className="tag tag-success">Verified</span>
          </div>
        </div>
        <div className="row between mt-2 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
          <span className="xs dim">Corroboration Level</span>
          <span className="xs t-success">High Confidence (96%) · Ready to Commit</span>
        </div>
      </div>
    ),
  },
  {
    id: "run-project",
    num: "03",
    title: "Run the Project",
    headline: "Maintain a tamper-evident audit trail that makes every schedule update defensible.",
    subhead:
      "Construction claims cost millions because retrospective delay analysis relies on reconstructed memories. SyncPro logs contemporaneous proof with every update, protecting your margins.",
    points: [
      "Tamper-evident contemporaneous log of every change, reason, and supporting artifact",
      "Live shadow forecasting that highlights critical path deviations weeks before month-end",
      "One-click dispute defense dossiers ready for claims consultants, PMOs, and dispute boards",
    ],
    mockupBadge: "As-Built Evidence Graph · Defensibility",
    mockupContent: (
      <div className="card-tight stack" style={{ background: "var(--bg-sunken)" }}>
        <div className="row between">
          <span className="status xs">
            <span className="sdot sdot-live pulse" /> As-Built Evidence Record
          </span>
          <span className="tag tag-info">Audit Trail #TR-9421</span>
        </div>
        <div className="mt-2 stack-sm">
          <div className="props" style={{ fontSize: "12px" }}>
            <dt>Activity</dt>
            <dd>MEP Riser Shaft Penetrations (L5)</dd>
            <dt>Variance</dt>
            <dd style={{ color: "var(--danger)" }}>+6 Days Critical Path Delay</dd>
            <dt>Root Cause</dt>
            <dd>Subcontractor MEP Clash #RFI-34</dd>
            <dt>Corroboration</dt>
            <dd style={{ color: "var(--success)" }}>3 Independent Logs + Photos</dd>
            <dt>Contract Notice</dt>
            <dd style={{ color: "var(--brand-400)" }}>Clause 20.1 Draft Generated</dd>
          </div>
        </div>
        <div className="row between mt-3 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
          <span className="xs dim">Defensible Dossier Status</span>
          <span className="xs t-info">Exportable PDF / XER Commit</span>
        </div>
      </div>
    ),
  },
];

export function PillarsWalkthrough() {
  const [activeTab, setActiveTab] = useState(0);
  const reveal = useReveal();
  const current = PILLARS[activeTab];

  return (
    <section id="how" className="wrap-lg section" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-8" style={{ maxWidth: "680px" }}>
          <div className="eyebrow mb-2">HOW IT WORKS · THE 3 PILLARS</div>
          <h2 className="h1">The intelligence layer between site reality and your schedule.</h2>
          <p className="lead mt-3">
            Not a dumb chat wrapper and not another rigid scheduling tool. SyncPro provides the
            grounded verification and reasoning necessary for enterprise project controls.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tabs mb-8" style={{ overflowX: "auto" }}>
          {PILLARS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`tab ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span className="mono dim">{p.num}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Pillar Content Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <div className="eyebrow mb-2 t-brand">PILLAR {current.num}</div>
            <h3 className="h2">{current.headline}</h3>
            <p className="body mt-4">{current.subhead}</p>

            <div className="stack-sm mt-6">
              {current.points.map((pt, i) => (
                <div key={i} className="row gap-3 start" style={{ padding: "8px 0" }}>
                  <CheckCircle2
                    className="ico grow0"
                    style={{ color: "var(--brand-500)", marginTop: 2, width: 16, height: 16 }}
                  />
                  <span className="body small">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="frame">
              <div className="frame-bar">
                <span className="tl" />
                <span className="tl" />
                <span className="tl" />
                <span className="crumbs" style={{ marginLeft: 8, fontSize: "11px" }}>
                  <span className="cur">{current.mockupBadge}</span>
                </span>
              </div>
              <div style={{ padding: 20 }}>{current.mockupContent}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
