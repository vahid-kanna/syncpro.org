import { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  GitMerge,
  FileCheck,
  Radio,
} from "lucide-react";
import { useReveal } from "../lib/useReveal";

interface Scenario {
  id: string;
  name: string;
  source: string;
  time: string;
  rawInput: string;
  extractedEntity: string;
  matchedActivity: string;
  corroboratingSource: string;
  confidence: number;
  criticalPathImpact: string;
  action: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "rebar",
    name: "Structural Rebar Progress",
    source: "Site Engineer WhatsApp Voice Note",
    time: "Today, 14:15",
    rawInput:
      '"Completed rebar tying for Level 4 West deck. Waiting on consultant engineer sign-off before 4 PM pour."',
    extractedEntity: 'Trade: Structural Rebar | Location: Level 4 West | State: Ready for Inspection',
    matchedActivity: 'CPM Node #A1082: L4-W Slab Rebar & Tendon Placement',
    corroboratingSource: 'Delivery Docket #DT-9102 (42t High-Yield Steel delivered & QA accepted)',
    confidence: 96,
    criticalPathImpact: 'On Schedule · 0 days variance to master baseline',
    action: 'Confidence threshold passed (96% > 90%). Update staged for Planner review.',
  },
  {
    id: "mep",
    name: "MEP Riser Shaft Delay",
    source: "HVAC Subcontractor Daily Log",
    time: "Today, 11:30",
    rawInput:
      '"Clash detected at Level 5 riser with plumbing main. RFI #104 submitted. Chilled water pipe installation on hold."',
    extractedEntity: 'Trade: HVAC Piping | Location: Shaft B, Level 5 | Status: Blocked by Clash #RFI-104',
    matchedActivity: 'CPM Node #A2410: L5 Chilled Water Riser Installation',
    corroboratingSource: 'Procore RFI #104 (Opened 09:12 today by Mech Lead)',
    confidence: 94,
    criticalPathImpact: '+5 Days Float Consumption · Near-critical path risk',
    action: 'Flagged to Project Controls Lead. Shadow reforecast generated automatically.',
  },
  {
    id: "curtain",
    name: "Curtain Wall Glazing Delivery",
    source: "Facade Supervisor Field Note",
    time: "Today, 16:00",
    rawInput:
      '"Unitized glass panels for North Elevation Floors 8-10 arrived at staging yard. Crane hoisting starts tomorrow."',
    extractedEntity: 'Trade: Facade / Glazing | Location: North Elevation L8-10 | State: Material on Site',
    matchedActivity: 'CPM Node #A3320: North Facade Panel Installation L8-10',
    corroboratingSource: 'Supplier Bill of Lading #BOL-4491 + Crane Booking Confirmation',
    confidence: 98,
    criticalPathImpact: '+2 Days Ahead of P6 target start date',
    action: 'Early start opportunity identified. Downstream trades notified.',
  },
];

export function AIReasoningTerminal() {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [step, setStep] = useState(4); // full display by default
  const [isRunning, setIsRunning] = useState(false);
  const reveal = useReveal();

  const runSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsRunning(true);
    setStep(1);
    setTimeout(() => setStep(2), 600);
    setTimeout(() => setStep(3), 1300);
    setTimeout(() => {
      setStep(4);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <section id="demo" className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="mb-8" style={{ maxWidth: "680px" }}>
          <div className="eyebrow mb-2">LIVE AGENT REASONING ENGINE</div>
          <h2 className="h1">See how unstructured field noise resolves into verified schedule truth.</h2>
          <p className="body mt-3">
            SyncPro doesn't blindly trust chat inputs. Watch the live verification pipeline extract
            entities, query the project graph, corroborate secondary records, and verify confidence.
          </p>
        </div>

        {/* Scenario Selector Pills */}
        <div className="row gap-3 mb-6 wrapf">
          <span className="xs dim" style={{ marginRight: 4 }}>Select Real-World Signal:</span>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              className={`btn btn-sm ${selectedScenario.id === sc.id ? "btn-primary" : "btn-outline"}`}
              onClick={() => runSimulation(sc)}
              disabled={isRunning}
            >
              <Radio className="ico" style={{ width: 13, height: 13 }} />
              {sc.name}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => runSimulation(selectedScenario)}
            disabled={isRunning}
            title="Replay Simulation"
          >
            <RotateCcw className="ico" style={{ width: 13, height: 13 }} />
            Re-run Pipeline
          </button>
        </div>

        {/* Terminal Window */}
        <div className="terminal-frame" style={{ background: "var(--bg-sunken)", borderColor: "var(--line-strong)" }}>
          <div className="terminal-bar">
            <div className="row gap-2">
              <span className="tl" style={{ background: "#FF4500" }} />
              <span className="tl" style={{ background: "#D49B4B" }} />
              <span className="tl" style={{ background: "#2563EB" }} />
            </div>
            <span className="mono xs dim" style={{ marginLeft: 12 }}>
              syncpro-agent-core // corroboration-pipeline v2.4
            </span>
            <span className="status xs" style={{ marginLeft: "auto" }}>
              <span className="sdot pulse" style={{ background: isRunning ? "var(--brand)" : "var(--brass)" }} /> 
              {isRunning ? "Corroborating Evidence..." : "Pipeline Verified"}
            </span>
          </div>

          <div className="terminal-body">
            {/* Step 1: Inbound Raw Signal */}
            <div className="terminal-step">
              <div className="row between mb-2">
                <span className="mono t-brand xs">
                  [STEP 1/4] INBOUND UNSTRUCTURED SIGNAL
                </span>
                <span className="mono xs dim">{selectedScenario.time} · {selectedScenario.source}</span>
              </div>
              <div className="code" style={{ color: "var(--text)" }}>
                {selectedScenario.rawInput}
              </div>
            </div>

            {/* Step 2: Entity Extraction & Graph Disambiguation */}
            {step >= 2 && (
              <div className="terminal-step fade-up">
                <div className="row between mb-2">
                  <span className="mono t-info xs">
                    [STEP 2/4] KNOWLEDGE GRAPH RESOLUTION
                  </span>
                  <span className="tag tag-info">Deterministic Neo4j Match</span>
                </div>
                <div className="terminal-card">
                  <div className="row gap-2 xs mb-1">
                    <Sparkles className="ico t-brand" style={{ width: 14, height: 14 }} />
                    <strong style={{ color: "var(--text)" }}>Extracted Context:</strong>
                    <span className="mono dim">{selectedScenario.extractedEntity}</span>
                  </div>
                  <div className="row gap-2 xs">
                    <GitMerge className="ico t-info" style={{ width: 14, height: 14 }} />
                    <strong style={{ color: "var(--text)" }}>Resolved Activity:</strong>
                    <span className="mono t-white" style={{ fontWeight: 600 }}>{selectedScenario.matchedActivity}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Multi-Source Corroboration */}
            {step >= 3 && (
              <div className="terminal-step fade-up">
                <div className="row between mb-2">
                  <span className="mono t-warning xs">
                    [STEP 3/4] INDEPENDENT EVIDENCE CORROBORATION
                  </span>
                  <span className="tag tag-warning">2 Independent Sources</span>
                </div>
                <div className="terminal-card">
                  <div className="row gap-2 xs">
                    <FileCheck className="ico t-success" style={{ width: 14, height: 14 }} />
                    <strong style={{ color: "var(--text)" }}>Cross-Corroboration:</strong>
                    <span className="dim">{selectedScenario.corroboratingSource}</span>
                  </div>
                  <div className="row between mt-2 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
                    <span className="xs dim">Calculated Trust &amp; Confidence:</span>
                    <span className="mono t-success" style={{ fontWeight: 700 }}>
                      {selectedScenario.confidence}% Confidence Score
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Staged Schedule Commit & Audit Record */}
            {step >= 4 && (
              <div className="terminal-step fade-up">
                <div className="row between mb-2">
                  <span className="mono t-success xs">
                    [STEP 4/4] STAGED COMMIT &amp; AS-BUILT LOG
                  </span>
                  <span className="tag tag-success">Audit Hash #SP-{Math.floor(Math.random() * 80000 + 10000)}</span>
                </div>
                <div className="terminal-card" style={{ borderLeft: "3px solid var(--success)" }}>
                  <div className="row between xs mb-1">
                    <span className="strong">Critical Path Status:</span>
                    <span className="mono t-brand">{selectedScenario.criticalPathImpact}</span>
                  </div>
                  <div className="xs dim mt-1">
                    <strong>Action:</strong> {selectedScenario.action}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
