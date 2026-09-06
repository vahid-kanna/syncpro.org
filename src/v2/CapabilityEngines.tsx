/**
 * SyncPro v2 — Stage 04: The 4 Category-Defining Capability Engines
 * Built strictly according to Astra's blueprint:
 * Tab rail with interactive work surfaces for:
 * 1. Multimodal Signal Ingestion & Entity Resolution
 * 2. Confidence-Gated Shadow Scheduling (P6 Master Isolation)
 * 3. DCMA 14-Point Logic Diagnostics
 * 4. Contemporaneous Dispute Defense & FIDIC Claims Shield
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { Mic, FileText, CheckCircle2, Activity } from "lucide-react";

export function CapabilityEngines() {
  const [activeEngine, setActiveEngine] = useState<number>(1);

  // DCMA Matrix state
  const [activeDcma, setActiveDcma] = useState<number>(0);

  // Claims dossier tab state
  const [claimsTab, setClaimsTab] = useState<"CHRONOLOGY" | "EXHIBIT" | "NOTICE">("NOTICE");

  return (
    <section className="sec wrap capability-engines-sec" id="engines">
      <MaskLines
        as="h2"
        className="sec-h center"
        baseDelay={80}
        lines={[<>One evidence chain.</>, <><em>Four control engines.</em></>]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">04</span>
        <span>THE PLATFORM CAPABILITY SUITE</span>
      </div>

      {/* Tab Selector Rail */}
      <Reveal variant="up" delay={120}>
        <div className="engine-tabs-rail mono xs">
          <button
            type="button"
            className={`engine-tab-btn ${activeEngine === 1 ? "active" : ""}`}
            onClick={() => setActiveEngine(1)}
          >
            <span className="tab-num">01</span>
            <span className="tab-title">MULTIMODAL INGESTION</span>
          </button>
          <button
            type="button"
            className={`engine-tab-btn ${activeEngine === 2 ? "active" : ""}`}
            onClick={() => setActiveEngine(2)}
          >
            <span className="tab-num">02</span>
            <span className="tab-title">SHADOW SCHEDULING</span>
          </button>
          <button
            type="button"
            className={`engine-tab-btn ${activeEngine === 3 ? "active" : ""}`}
            onClick={() => setActiveEngine(3)}
          >
            <span className="tab-num">03</span>
            <span className="tab-title">DCMA 14 DIAGNOSTICS</span>
          </button>
          <button
            type="button"
            className={`engine-tab-btn ${activeEngine === 4 ? "active" : ""}`}
            onClick={() => setActiveEngine(4)}
          >
            <span className="tab-num">04</span>
            <span className="tab-title">DISPUTE DEFENSE</span>
          </button>
        </div>
      </Reveal>

      {/* Main Interactive Work Surface */}
      <Reveal variant="up" delay={200} className="engine-display-wrap">
        <div className="engine-surface">
          {/* ================= ENGINE 01: MULTIMODAL INGESTION ================= */}
          {activeEngine === 1 && (
            <div className="engine-content">
              <div className="engine-meta mono xs">
                <span className="engine-badge acc">ENGINE 01 // UNSTRUCTURED SIGNAL RESOLUTION</span>
                <span className="dim">NEO4J ENTITY EXTRACTION PIPELINE</span>
              </div>
              <h3 className="engine-h">From site shorthand to a traceable CPM activity.</h3>
              <p className="engine-sub">
                Resolve raw WhatsApp audio notes, gate security logs, and concrete delivery dockets against
                your project’s spatial locations, work breakdown structures (WBS), and CPM logic activities.
              </p>

              <div className="ingestion-grid">
                {/* Step 1: Raw Signal */}
                <div className="ingest-col">
                  <span className="mono xs dim col-tag">01. RAW SITE SIGNAL</span>
                  <div className="ingest-box">
                    <div className="signal-badge mono xs">
                      <Mic className="ico-xs acc" />
                      <span>VOICE NOTE // SITE SUPERINTENDENT</span>
                    </div>
                    <div className="audio-wave-wrap" aria-hidden="true">
                      {Array.from({ length: 22 }).map((_, i) => (
                        <span
                          key={i}
                          className="audio-bar"
                          style={{
                            animationDelay: `${(i * 0.07).toFixed(2)}s`,
                            height: `${Math.max(6, Math.sin(i * 0.45) * 16 + 10)}px`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="signal-quote mono xs">
                      “Level 47 core wall pour complete. Putzmeister boom pump operating normally. 14 ready-mix trucks delivered
                      80 MPa mix. Waiting on 7-day cube break tests before stripping forms.”
                    </p>
                    <div className="signal-meta mono xs dim">
                      <span>TIMESTAMP: 19:40 UTC</span>
                      <span className="ok">AUDIO TRANSCRIBED</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Extracted Entities */}
                <div className="ingest-col">
                  <span className="mono xs dim col-tag">02. EXTRACTED ENTITIES</span>
                  <div className="ingest-box">
                    <div className="entity-item mono xs">
                      <span className="dim">LOCATION:</span>
                      <span>Level 47 // Core Wall Grid C3-C7</span>
                    </div>
                    <div className="entity-item mono xs">
                      <span className="dim">MATERIAL:</span>
                      <span>140 m³ High-Strength Concrete (M80)</span>
                    </div>
                    <div className="entity-item mono xs">
                      <span className="dim">EQUIPMENT:</span>
                      <span>Hydraulic Boom Pump #02</span>
                    </div>
                    <div className="entity-item mono xs">
                      <span className="dim">INDEPENDENT EVIDENCE:</span>
                      <span className="ok">Batch Ticket #4902 Corroborated</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Candidate CPM Node Match */}
                <div className="ingest-col">
                  <span className="mono xs dim col-tag">03. CANDIDATE ACTIVITY MATCH</span>
                  <div className="ingest-box highlight-box">
                    <div className="cpm-match-head mono xs">
                      <span className="dim">ACTIVITY ID:</span>
                      <span className="act-id">#A1084</span>
                    </div>
                    <p className="cpm-act-name">Core Wall High-Strength Concrete Placement</p>
                    <div className="cpm-match-bar">
                      <span className="mono xs ok">98.4% MATCH CONFIDENCE</span>
                      <span className="mono xs dim">&ge; 95% THRESHOLD</span>
                    </div>
                    <div className="cpm-status mono xs ok">
                      <CheckCircle2 className="ico-xs" />
                      <span>ADMITTED TO SHADOW GRAPH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= ENGINE 02: SHADOW SCHEDULING ================= */}
          {activeEngine === 2 && (
            <div className="engine-content">
              <div className="engine-meta mono xs">
                <span className="engine-badge ok">ENGINE 02 // DUAL-MODEL CPM INTEGRITY</span>
                <span className="dim">STRICT MASTER BASELINE ISOLATION</span>
              </div>
              <h3 className="engine-h">Recompute the forecast. Preserve the source.</h3>
              <p className="engine-sub">
                Qualified site observations update a parallel shadow graph model. Your contractual Primavera P6 baseline
                remains completely unchanged until an authorized change set is reviewed by the project controls lead.
              </p>

              <div className="shadow-architecture-grid">
                <div className="shadow-box frozen-lane">
                  <div className="lane-header mono xs">
                    <span className="dim">CONTRACTUAL P6 BASELINE (.XER)</span>
                    <span className="badge-status dim">READ-ONLY · PRESERVED</span>
                  </div>
                  <ul className="lane-features mono xs">
                    <li>· Master contractual baseline program remains 100% frozen</li>
                    <li>· Zero unvetted writes or accidental schedule logic overwrites</li>
                    <li>· Serves as the benchmark for delay attribution &amp; liquidated damages</li>
                    <li>· Compliant with owner specifications &amp; contract audits</li>
                  </ul>
                </div>

                <div className="shadow-box live-lane">
                  <div className="lane-header mono xs">
                    <span className="ok">SYNCPRO SHADOW GRAPH (NEO4J)</span>
                    <span className="badge-status ok">CONTINUOUS CPM PASSES</span>
                  </div>
                  <ul className="lane-features mono xs">
                    <li>· Ingests qualified field evidence clearing &ge;95% confidence</li>
                    <li>· Calculates sub-second forward &amp; backward passes for true float</li>
                    <li>· Detects critical path divergence 3 weeks before monthly PDFs</li>
                    <li>· Generates version-bound change proposals for planner sign-off</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ================= ENGINE 03: DCMA 14 DIAGNOSTICS ================= */}
          {activeEngine === 3 && (
            <div className="engine-content">
              <div className="engine-meta mono xs">
                <span className="engine-badge warn">ENGINE 03 // SCHEDULE QUALITY DIAGNOSTIC</span>
                <span className="dim">DEFENSE CONTRACT MANAGEMENT AGENCY 14-POINT</span>
              </div>
              <h3 className="engine-h">Stress-test the schedule logic before you trust the forecast.</h3>
              <p className="engine-sub">
                88% of construction baselines harbor hidden logic defects: missing successors, artificial hard constraints,
                and negative lags that distort the critical path. SyncPro audits the graph against DCMA 14-point standards in seconds.
              </p>

              <div className="dcma-table-container">
                <table className="dcma-table">
                  <thead>
                    <tr className="mono xs dim">
                      <th>CHECK</th>
                      <th>METRIC NAME</th>
                      <th>THRESHOLD</th>
                      <th>MEASURED VALUE</th>
                      <th>DIAGNOSTIC STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        name: "Logic Open Ends (Missing Links)",
                        thresh: "< 5.0% of activities",
                        val: "0.2% (2 of 2,846 tasks)",
                        status: "PASSED",
                        remedy: "Neo4j mapped unlinked slab tasks to downstream MEP risers.",
                      },
                      {
                        id: 2,
                        name: "Negative Lags / Leads (DoD Prohibition)",
                        thresh: "0.0% (Strict Prohibition)",
                        val: "0.0% (Zero leads detected)",
                        status: "PASSED",
                        remedy: "Zero negative leads found in current baseline network.",
                      },
                      {
                        id: 3,
                        name: "Excessive Positive Lags (>5 Days)",
                        thresh: "< 5.0% of relationships",
                        val: "1.4% (13 relationships)",
                        status: "PASSED",
                        remedy: "Curing lags verified against ASTM C39 strength curves.",
                      },
                      {
                        id: 4,
                        name: "Finish-to-Start (FS) Relationship Dominance",
                        thresh: "> 90.0% Finish-to-Start",
                        val: "94.2% FS relationships",
                        status: "PASSED",
                        remedy: "Robust precedence logic with minimal Start-to-Start chaining.",
                      },
                      {
                        id: 5,
                        name: "Hard Constraints (Mandatory Date Locks)",
                        thresh: "< 5.0% of activities",
                        val: "0.6% (Milestones only)",
                        status: "PASSED",
                        remedy: "Artificial hard locks removed in favor of dynamic float passes.",
                      },
                      {
                        id: 6,
                        name: "Critical Path Length Index (CPLI)",
                        thresh: "CPLI >= 1.00",
                        val: "1.04 (Positive Float)",
                        status: "PASSED",
                        remedy: "Critical path float intact across primary structural packages.",
                      },
                    ].map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`dcma-row ${activeDcma === idx ? "active-row" : ""}`}
                        onClick={() => setActiveDcma(idx)}
                      >
                        <td className="mono xs dim">#0{item.id}</td>
                        <td className="metric-title">{item.name}</td>
                        <td className="mono xs dim">{item.thresh}</td>
                        <td className="mono xs ok fw-bold">{item.val}</td>
                        <td className="mono xs ok">
                          <CheckCircle2 className="ico-xs" /> {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ENGINE 04: DISPUTE DEFENSE ================= */}
          {activeEngine === 4 && (
            <div className="engine-content">
              <div className="engine-meta mono xs">
                <span className="engine-badge acc">ENGINE 04 // CONTEMPORANEOUS CLAIMS SHIELD</span>
                <span className="dim">FIDIC 8.4 / 20.1 &amp; NEC4 TIME-BAR DEFENSE</span>
              </div>
              <h3 className="engine-h">Build the defense record while facts are still recoverable.</h3>
              <p className="engine-sub">
                The average megaproject dispute takes 16 months to resolve because site documentation is scattered across
                emails and paper tickets. SyncPro continuously compiles legally admissible evidence dossiers and auto-drafts
                Extension of Time (EOT) notices before contractual time-bars close.
              </p>

              <div className="claims-terminal">
                {/* Terminal Sub-tabs */}
                <div className="terminal-tabs mono xs">
                  <button
                    type="button"
                    className={`terminal-tab ${claimsTab === "NOTICE" ? "active" : ""}`}
                    onClick={() => setClaimsTab("NOTICE")}
                  >
                    <FileText className="ico-xs" />
                    <span>FORMAL FIDIC 8.4 NOTICE DRAFT</span>
                  </button>
                  <button
                    type="button"
                    className={`terminal-tab ${claimsTab === "EXHIBIT" ? "active" : ""}`}
                    onClick={() => setClaimsTab("EXHIBIT")}
                  >
                    <Activity className="ico-xs" />
                    <span>TIME IMPACT ANALYSIS EXHIBIT</span>
                  </button>
                  <button
                    type="button"
                    className={`terminal-tab ${claimsTab === "CHRONOLOGY" ? "active" : ""}`}
                    onClick={() => setClaimsTab("CHRONOLOGY")}
                  >
                    <CheckCircle2 className="ico-xs" />
                    <span>EVIDENCE CHRONOLOGY PACKET (5)</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="terminal-body mono xs">
                  {claimsTab === "NOTICE" && (
                    <div className="notice-view">
                      <div className="notice-meta dim mb-3">
                        <span>TO: THE ENGINEER / EMPLOYER'S REPRESENTATIVE</span>
                        <span>REFERENCE: NOT-EOT-FIDIC-2026-084</span>
                        <span className="ok">TIME-BAR STATUS: 18 DAYS REMAINING (FIDIC 20.1 28-DAY RULE)</span>
                      </div>
                      <div className="notice-text">
                        <p>
                          “Pursuant to Sub-Clause 8.4 [Extension of Time for Completion] and Sub-Clause 20.1
                          [Contractor’s Claims] of the Conditions of Contract, the Contractor hereby gives formal
                          notice of an event causing critical delay to the Time for Completion.
                        </p>
                        <p className="mt-2">
                          <strong>Event:</strong> Architectural revision to curtain wall anchor embed clips issued late
                          by the Engineer's structural consultant on 14-Oct-2026, halting unitized facade installation on
                          North Elevation (Grids 4-8).
                        </p>
                        <p className="mt-2">
                          <strong>Impact:</strong> Critical Path Float depleted from +3 days to -8 days. Net critical
                          path delay assessed at 11 calendar days. Supporting contemporaneous exhibits appended herewith.”
                        </p>
                      </div>
                    </div>
                  )}

                  {claimsTab === "EXHIBIT" && (
                    <div className="exhibit-view">
                      <div className="exhibit-metric-row">
                        <div className="ex-item">
                          <span className="dim">METHODOLOGY:</span>
                          <span>Time Impact Analysis (TIA) - SCL Delay Protocol</span>
                        </div>
                        <div className="ex-item">
                          <span className="dim">FRAGNET INSERTED:</span>
                          <span>Activity #F-882: Client Design Revision</span>
                        </div>
                        <div className="ex-item">
                          <span className="dim">CRITICAL VARIANCE:</span>
                          <span className="bad">+11 Calendar Days Contract Extension</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {claimsTab === "CHRONOLOGY" && (
                    <div className="chronology-view">
                      <div className="chrono-item">
                        <span className="dim">14-OCT 09:15 UTC:</span>
                        <span>IFC Revision Drawing Rev-04 received via Aconex with revised bracket dimensions.</span>
                      </div>
                      <div className="chrono-item">
                        <span className="dim">14-OCT 14:30 UTC:</span>
                        <span>Site Superintendent voice log confirms facade erection stopped on Grid 4-8.</span>
                      </div>
                      <div className="chrono-item">
                        <span className="dim">15-OCT 11:00 UTC:</span>
                        <span>Subcontractor written notice received registering idle workforce of 22 men.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
