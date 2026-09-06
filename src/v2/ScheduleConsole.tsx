/**
 * SyncPro v2 — Section 03 / Schedule Intelligence Console
 * Sourced directly from Astra's blueprint:
 * "One site event. Follow the consequences."
 * Interactive CPM Gantt schedule comparison with 3 realistic disruption toggles.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { Check, Info } from "lucide-react";

export function ScheduleConsole() {
  const [dIFC, setDIFC] = useState(false);
  const [dRain, setDRain] = useState(false);
  const [dSupply, setDSupply] = useState(false);

  // Exact CPM math from Astra blueprint:
  const delayA = dIFC ? 5 : 0;
  const delayB = dSupply ? 7 : 0;
  const delayC = dRain ? 4 : 0;

  const aFinish = 8 + delayA;
  const bFinish = 16 + delayB;
  const cStart = aFinish;
  const cFinish = aFinish + 12 + delayC;
  const startD = Math.max(bFinish, cFinish);
  const finish = startD + 17;
  const slipDays = finish - 37;

  // Exact explanation text from Astra
  let explanation = "";
  if (!dIFC && !dRain && !dSupply) {
    explanation = "No disruptions selected. The shadow forecast matches the baseline. The equipment path has 4 working days of float.";
  } else if (dSupply && !dIFC && !dRain) {
    explanation = "The delivery delay consumes 4 days of float, then moves completion by 3 working days. Procurement now drives installation.";
  } else {
    explanation = `Foundations drive installation. The shadow finish is working day ${finish}. Parallel delays are evaluated together, not added blindly.`;
  }

  // Gantt task rows [Name, BaseStart, BaseEnd, ShadowStart, ShadowEnd]
  const rows = [
    { id: "A", name: "IFC Design Release", b0: 0, b1: 8, s0: 0, s1: aFinish },
    { id: "B", name: "Pump Procurement", b0: 0, b1: 16, s0: 0, s1: bFinish },
    { id: "C", name: "Foundations & Civil", b0: 8, b1: 20, s0: cStart, s1: cFinish },
    { id: "D", name: "Pump Installation", b0: 20, b1: 30, s0: startD, s1: startD + 10 },
    { id: "E", name: "Testing & Handover", b0: 30, b1: 37, s0: startD + 10, s1: finish },
  ];

  return (
    <section className="section console-sec" id="console">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">03 / SCHEDULE INTELLIGENCE CONSOLE</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>One site event.</>, <><span className="accent">Follow the consequences.</span></>]}
            />
          </div>
          <p className="head-desc">
            Toggle a disruption. Compare the contractual baseline with a separate shadow forecast, activity by activity.
          </p>
        </div>

        {/* The Interactive Schedule Panel */}
        <Reveal variant="up" delay={180}>
          <div className="console-panel spotlight-card">
            {/* Top Bar */}
            <div className="panel-topbar mono xs">
              <div className="pkg-info">
                <span className="pkg-name">Package 01 / Pump Station Installation</span>
                <span className="pkg-tag dim">ILLUSTRATIVE CPM MODEL · WORKING DAYS</span>
              </div>
              <div className="pkg-status">
                <span className="status-dot ok" />
                <span className="ok">P6 Baseline Preserved (Read-Only)</span>
              </div>
            </div>

            {/* Event Toggles Toolbar */}
            <div className="disruption-toolbar mono xs">
              <span className="dim toolbar-lbl">SIMULATE DISRUPTIONS:</span>
              <div className="toolbar-checkboxes">
                <label className={`toggle-pill ${dIFC ? "active bad" : ""}`}>
                  <input
                    type="checkbox"
                    checked={dIFC}
                    onChange={(e) => setDIFC(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="pill-box">{dIFC && <Check className="ico-xs" />}</span>
                  <span>Late IFC Release <strong className="mono">+5d</strong></span>
                </label>

                <label className={`toggle-pill ${dRain ? "active bad" : ""}`}>
                  <input
                    type="checkbox"
                    checked={dRain}
                    onChange={(e) => setDRain(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="pill-box">{dRain && <Check className="ico-xs" />}</span>
                  <span>Monsoon Stoppage <strong className="mono">+4d</strong></span>
                </label>

                <label className={`toggle-pill ${dSupply ? "active bad" : ""}`}>
                  <input
                    type="checkbox"
                    checked={dSupply}
                    onChange={(e) => setDSupply(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="pill-box">{dSupply && <Check className="ico-xs" />}</span>
                  <span>Pump Delivery Delay <strong className="mono">+7d</strong></span>
                </label>
              </div>
            </div>

            {/* Legend Bar */}
            <div className="gantt-legend-bar mono xs">
              <div className="legend-items">
                <span className="legend-item"><i className="legend-swatch base" /> P6 Baseline (Fixed: Day 37)</span>
                <span className="legend-item"><i className="legend-swatch shadow" /> SyncPro Shadow Forecast</span>
              </div>
              <div className="legend-slip">
                <span className="dim">CONTROLLING IMPACT:</span>
                <span className={`slip-val ${slipDays > 0 ? "bad fw-bold" : "ok fw-bold"}`}>
                  +{slipDays} WORKING DAYS
                </span>
              </div>
            </div>

            {/* Gantt Timeline SVG Chart */}
            <div className="gantt-chart-container">
              <div className="gantt-scroll-wrap">
                <svg className="cpm-gantt-svg" viewBox="0 0 920 280" role="img" aria-label="Gantt chart comparison">
                  {/* Grid Lines */}
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((day) => {
                    const x = 180 + day * 14;
                    return (
                      <g key={day} className="grid-group">
                        <line x1={x} y1={30} x2={x} y2={260} className="grid-line" />
                        <text x={x} y={20} textAnchor="middle" className="grid-tick mono xs">{day}</text>
                      </g>
                    );
                  })}

                  {/* Baseline Target Line (Day 37) */}
                  <line
                    x1={180 + 37 * 14}
                    y1={25}
                    x2={180 + 37 * 14}
                    y2={265}
                    className="target-line"
                  />
                  <text x={180 + 37 * 14} y={275} textAnchor="middle" className="target-text mono xs dim">
                    Day 37 Handover
                  </text>

                  {/* Task Rows */}
                  {rows.map((row, i) => {
                    const y = 50 + i * 44;
                    const baseX = 180 + row.b0 * 14;
                    const baseW = (row.b1 - row.b0) * 14;
                    const shadowX = 180 + row.s0 * 14;
                    const shadowW = (row.s1 - row.s0) * 14;
                    const isSlipped = row.s1 > row.b1;

                    return (
                      <g key={row.id} className="task-row-group">
                        {/* Task Label */}
                        <text x={10} y={y + 12} className="task-name-text mono xs">
                          {row.id} {row.name}
                        </text>

                        {/* Baseline Bar */}
                        <rect
                          x={baseX}
                          y={y - 3}
                          width={baseW}
                          height={7}
                          rx={3}
                          className="gantt-bar-base"
                        />

                        {/* Shadow Bar */}
                        <rect
                          x={shadowX}
                          y={y + 10}
                          width={shadowW}
                          height={7}
                          rx={3}
                          className={`gantt-bar-shadow ${isSlipped ? "bad" : "ok"}`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="console-bottom mono xs">
              <div className="bottom-insight">
                <Info className="ico-xs acc" />
                <p className="insight-text">{explanation}</p>
              </div>
              <span className="dim footnote">Illustrative CPM network. Concurrency resolved via longest path.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
