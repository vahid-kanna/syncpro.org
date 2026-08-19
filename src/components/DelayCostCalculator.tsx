import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function DelayCostCalculator() {
  const [projectValue, setProjectValue] = useState(150); // in millions
  const [delayWeeks, setDelayWeeks] = useState(4); // in weeks
  const reveal = useReveal();

  // Industry estimation formulas (FMI / Arcadis benchmarks)
  // Daily LD rate is typically 0.05% - 0.1% of project value / day, capped
  const dailyLdRate = Math.round((projectValue * 1000000 * 0.0006));
  const totalLdExposure = dailyLdRate * delayWeeks * 7;
  const estimatedDisputeCost = Math.round(projectValue * 1000000 * 0.04);
  const potentialSavings = Math.round(totalLdExposure * 0.65 + estimatedDisputeCost * 0.5);

  return (
    <section id="roi" className="wrap-lg section-sm" style={{ borderTop: "1px solid var(--line)" }}>
      <div ref={reveal.ref} className={reveal.className}>
        <div className="inset" style={{ padding: "40px 32px", background: "var(--bg-surface)", borderColor: "var(--line-strong)" }}>
          <div className="grid" style={{ gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div className="eyebrow mb-2 t-brand">INTERACTIVE VALUE CALCULATOR</div>
              <h2 className="h1">Quantify your project's delay exposure &amp; dispute risk.</h2>
              <p className="body mt-3 measure">
                On capital megaprojects, a 2-week blind spot on the critical path often compounds into
                months of cumulative delay, liquidated damages, and protracted contractor claims.
              </p>

              {/* Sliders */}
              <div className="stack-lg mt-6">
                <div>
                  <div className="row between mb-2">
                    <label className="xs strong">Total Project Contract Value (CAPEX):</label>
                    <span className="mono t-brand" style={{ fontSize: 16, fontWeight: 700 }}>
                      ${projectValue} Million
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={1000}
                    step={10}
                    value={projectValue}
                    onChange={(e) => setProjectValue(Number(e.target.value))}
                    className="slider-range"
                  />
                  <div className="row between xs dim mt-1">
                    <span>$20M</span>
                    <span>$500M</span>
                    <span>$1B+</span>
                  </div>
                </div>

                <div>
                  <div className="row between mb-2">
                    <label className="xs strong">Estimated Critical Path Delay Exposure:</label>
                    <span className="mono t-warning" style={{ fontSize: 16, fontWeight: 700 }}>
                      {delayWeeks} Weeks
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={16}
                    step={1}
                    value={delayWeeks}
                    onChange={(e) => setDelayWeeks(Number(e.target.value))}
                    className="slider-range"
                  />
                  <div className="row between xs dim mt-1">
                    <span>1 Week</span>
                    <span>8 Weeks</span>
                    <span>16 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="card" style={{ background: "var(--bg-sunken)", borderColor: "var(--brand-line)", padding: 28 }}>
              <div className="row between mb-4">
                <span className="status xs">
                  <Calculator className="ico t-brand" style={{ width: 14, height: 14 }} />
                  Financial Risk Model
                </span>
                <span className="tag tag-brand">Industry Benchmark</span>
              </div>

              <div className="stack gap-3">
                <div className="row between xs" style={{ padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <span className="dim">Estimated Liquidated Damages (LDs):</span>
                  <span className="mono" style={{ color: "var(--danger)", fontWeight: 600 }}>
                    ~${(totalLdExposure / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="row between xs" style={{ padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <span className="dim">Estimated Dispute &amp; Claims Exposure:</span>
                  <span className="mono" style={{ color: "var(--warning)", fontWeight: 600 }}>
                    ~${(estimatedDisputeCost / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="mt-3 p-3" style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: 8 }}>
                  <div className="xs dim" style={{ color: "var(--success)" }}>
                    Estimated Margin Saved via SyncPro:
                  </div>
                  <div className="figure mt-1" style={{ color: "var(--success)", fontSize: 32 }}>
                    ${(potentialSavings / 1000000).toFixed(2)}M
                  </div>
                  <div className="xs mt-1" style={{ color: "var(--text-2)" }}>
                    Through 3-week early slip detection &amp; tamper-evident contemporaneous records.
                  </div>
                </div>
              </div>

              <a className="btn btn-primary btn-block mt-5" href="#waitlist">
                Model Your Live Project
                <ArrowRight className="ico" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
