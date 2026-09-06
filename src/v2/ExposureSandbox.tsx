/**
 * SyncPro v2 — Section 04 / Financial Exposure Sandbox
 * Sourced directly from Astra's blueprint:
 * "Put a cost against the delay."
 * Clean, beautifully proportioned capital exposure model with editable assumptions.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

export function ExposureSandbox({ onOpenPilot }: { onOpenPilot: () => void }) {
  const [capexCr, setCapexCr] = useState<number>(1000); // ₹1,000 Cr default
  const [delayDays, setDelayDays] = useState<number>(90); // 90 days default
  const [exposedShare, setExposedShare] = useState<number>(60); // 60% default
  const [carryingRate, setCarryingRate] = useState<number>(10); // 10% APR default
  const [mitigationRate, setMitigationRate] = useState<number>(76); // 76% default
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  // Exact math from Astra blueprint:
  // E = C * (f/100) * (r/100) * (D / 365)
  const grossExposureCr = (capexCr * (exposedShare / 100) * (carryingRate / 100) * delayDays) / 365;
  const residualCr = grossExposureCr * (1 - mitigationRate / 100);
  const avoidedCr = grossExposureCr * (mitigationRate / 100);

  return (
    <section className="section exposure-sec" id="exposure">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">04 / FINANCIAL EXPOSURE SANDBOX</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>Put a cost</>, <><span className="accent">against the delay.</span></>]}
            />
          </div>
          <p className="head-desc">
            Explore the carrying cost of capital tied up by undetected schedule slip. Change the assumptions to match your package value.
          </p>
        </div>

        <Reveal variant="up" delay={180}>
          <div className="sandbox-panel spotlight-card">
            <div className="sandbox-grid">
              {/* Left Column: Sliders & Controls */}
              <div className="sandbox-controls">
                {/* Slider 1: CAPEX */}
                <div className="control-group">
                  <div className="control-header mono xs">
                    <span className="dim">PACKAGE CONTRACT VALUE (CAPEX)</span>
                    <span className="val-display acc fw-bold">₹{capexCr.toLocaleString("en-IN")} Crore</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={capexCr}
                    onChange={(e) => setCapexCr(Number(e.target.value))}
                    className="sandbox-slider"
                    aria-label="Package CAPEX in Crores"
                  />
                  <div className="slider-ends mono xs dim">
                    <span>₹100 Cr</span>
                    <span>₹5,000 Cr</span>
                    <span>₹10,000 Cr</span>
                  </div>
                </div>

                {/* Slider 2: Delay in Days */}
                <div className="control-group mt-6">
                  <div className="control-header mono xs">
                    <span className="dim">UNDETECTED DELAY DURATION</span>
                    <span className="val-display bad fw-bold">{delayDays} Calendar Days</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={180}
                    step={5}
                    value={delayDays}
                    onChange={(e) => setDelayDays(Number(e.target.value))}
                    className="sandbox-slider slider-bad"
                    aria-label="Delay Duration in Calendar Days"
                  />
                  <div className="slider-ends mono xs dim">
                    <span>0 Days</span>
                    <span>90 Days (~3 Months)</span>
                    <span>180 Days</span>
                  </div>
                </div>

                {/* Collapsible Assumptions Panel */}
                <div className="assumptions-box mt-6">
                  <button
                    type="button"
                    className="assumptions-toggle mono xs"
                    onClick={() => setShowAssumptions(!showAssumptions)}
                  >
                    <span>{showAssumptions ? "Hide model assumptions" : "Edit financing and mitigation assumptions"}</span>
                    {showAssumptions ? <ChevronUp className="ico-xs" /> : <ChevronDown className="ico-xs" />}
                  </button>

                  {showAssumptions && (
                    <div className="assumptions-body mono xs">
                      <div className="param-grid">
                        <label className="param-item">
                          <span className="dim">Exposed CAPEX Share (%)</span>
                          <input
                            type="number"
                            min={10}
                            max={100}
                            value={exposedShare}
                            onChange={(e) => setExposedShare(Number(e.target.value))}
                            className="param-input"
                          />
                        </label>
                        <label className="param-item">
                          <span className="dim">Annual Carrying Rate (%)</span>
                          <input
                            type="number"
                            min={4}
                            max={25}
                            step={0.5}
                            value={carryingRate}
                            onChange={(e) => setCarryingRate(Number(e.target.value))}
                            className="param-input"
                          />
                        </label>
                        <label className="param-item">
                          <span className="dim">Assumed Mitigation (%)</span>
                          <input
                            type="number"
                            min={10}
                            max={95}
                            value={mitigationRate}
                            onChange={(e) => setMitigationRate(Number(e.target.value))}
                            className="param-input"
                          />
                        </label>
                      </div>
                      <p className="param-note dim mt-3">
                        Formula: Modeled Exposure = CAPEX × Exposed Share × Carrying Rate × Delay ÷ 365.
                      </p>
                    </div>
                  )}
                </div>

                <p className="disclaimer-note mono xs dim mt-4">
                  Illustration only. The reduction is an input assumption, not a guaranteed SyncPro result.
                  Excludes contractor prolongation claims, escalation, and liquidated damages.
                </p>
              </div>

              {/* Right Column: Calculated Exposure & Visual Gauge */}
              <div className="sandbox-output-col">
                <div className="output-card">
                  <span className="eyebrow mono xs dim">ILLUSTRATIVE SCENARIO / FINANCIAL IMPACT</span>

                  <dl className="exposure-dl mono xs">
                    <div className="dl-row">
                      <dt className="dim">Modeled Delay Exposure</dt>
                      <dd className="bad fw-bold">₹{grossExposureCr.toFixed(2)} Cr</dd>
                    </div>
                    <div className="dl-row">
                      <dt className="dim">Residual Exposure Under Assumption</dt>
                      <dd className="warn">₹{residualCr.toFixed(2)} Cr</dd>
                    </div>
                    <div className="dl-row highlight-row">
                      <dt className="ok fw-bold">Illustrative Exposure Avoided</dt>
                      <dd className="ok fw-bold">₹{avoidedCr.toFixed(2)} Cr</dd>
                    </div>
                  </dl>

                  {/* Visual Reduction Gauge */}
                  <div className="gauge-wrap mt-4">
                    <div className="gauge-header mono xs">
                      <span className="dim">PRESERVED CAPITAL RATIO</span>
                      <span className="ok fw-bold">{mitigationRate}% MITIGATED</span>
                    </div>
                    <div className="gauge-track">
                      <div
                        className="gauge-fill"
                        style={{ width: `${mitigationRate}%` }}
                      />
                    </div>
                    <p className="gauge-caption mono xs dim mt-2">
                      {mitigationRate}% assumed reduction in modeled carrying cost, not total project CAPEX.
                    </p>
                  </div>

                  <button type="button" className="hero-btn mono xs mt-6" onClick={onOpenPilot}>
                    Audit Package Exposure <ShieldCheck className="ico-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
