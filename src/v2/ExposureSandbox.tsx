/**
 * SyncPro v2 — Stage 03: Financial Risk & Liquidated Damages Sandbox
 * Sourced directly from Astra's mathematical model:
 * Dynamic calculation of Liquidated Damages, Extended Preliminaries,
 * Financing Carrying Costs, and the SyncPro Early Intervention Recovery.
 */
import { useState } from "react";
import { Reveal } from "./Chrome";
import { ScrubHeading } from "./Motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function ExposureSandbox({ onOpenPilot }: { onOpenPilot: () => void }) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [capexVal, setCapexVal] = useState<number>(1200); // 1200 Cr or 150 M
  const [delayWeeks, setDelayWeeks] = useState<number>(6); // 6 weeks undetected
  const [contractRegime, setContractRegime] = useState<"EPC" | "RERA" | "FIDIC">("EPC");

  // Dynamic calculations based on currency and regime
  const isINR = currency === "INR";
  const currencySymbol = isINR ? "₹" : "$";
  const unitSuffix = isINR ? "Cr" : "M";

  // Liquidated damages rate per week
  let ldRateWeekly = 0.001; // 0.1% per week for standard EPC
  if (contractRegime === "RERA") {
    // RERA Sec 18: SBI MCLR + 2% (~11% p.a. / 52 weeks = ~0.21% per week on collected/delayed capital)
    ldRateWeekly = 0.0021;
  } else if (contractRegime === "FIDIC") {
    ldRateWeekly = 0.0012;
  }

  // 1. Liquidated Damages
  const totalLd = capexVal * ldRateWeekly * delayWeeks;

  // 2. Extended Preliminaries & Idle Plant (8% CAPEX over 24-month duration = 0.33% / mo)
  const monthlyPrelims = (capexVal * 0.08) / 24;
  const extendedPrelims = (monthlyPrelims / 4.33) * delayWeeks;

  // 3. Debt & Working Capital Carrying Interest (9.5% p.a. / 52 weeks)
  const carryingCost = capexVal * 0.095 * (delayWeeks / 52);

  // Total unmitigated exposure
  const totalExposure = totalLd + extendedPrelims + carryingCost;

  // SyncPro 3-week early detection recovery (~76% preserved capital via immediate float recovery)
  const capitalPreserved = totalExposure * 0.76;

  return (
    <section className="sec wrap exposure-sandbox-sec" id="exposure">
      <ScrubHeading
        className="sec-h center"
        segs={[
          { t: "What does an unnoticed delay" },
          { t: "cost your package?", em: true },
        ]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">03</span>
        <span>INTERACTIVE FINANCIAL EXPOSURE SANDBOX</span>
      </div>

      <Reveal variant="up" delay={120}>
        <div className="sandbox-container">
          {/* Top Controls Toolbar */}
          <div className="sandbox-toolbar mono xs">
            <div className="toolbar-left">
              <span className="dim">CURRENCY PRESET:</span>
              <div className="btn-toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${currency === "INR" ? "active" : ""}`}
                  onClick={() => {
                    setCurrency("INR");
                    setCapexVal(1200);
                  }}
                >
                  INR (₹ Crores)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${currency === "USD" ? "active" : ""}`}
                  onClick={() => {
                    setCurrency("USD");
                    setCapexVal(250);
                  }}
                >
                  USD ($ Millions)
                </button>
              </div>
            </div>

            <div className="toolbar-right">
              <span className="dim">CONTRACT REGIME:</span>
              <div className="btn-toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${contractRegime === "EPC" ? "active" : ""}`}
                  onClick={() => setContractRegime("EPC")}
                >
                  Standard EPC (0.1%/wk)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${contractRegime === "RERA" ? "active" : ""}`}
                  onClick={() => setContractRegime("RERA")}
                >
                  RERA Sec 18 (~11% p.a.)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${contractRegime === "FIDIC" ? "active" : ""}`}
                  onClick={() => setContractRegime("FIDIC")}
                >
                  FIDIC / NEC4
                </button>
              </div>
            </div>
          </div>

          {/* Sandbox Split View */}
          <div className="sandbox-grid">
            {/* Left Column: Sliders */}
            <div className="sandbox-inputs">
              <div className="input-group">
                <div className="slider-header mono xs">
                  <span className="slider-label">CONTRACT PACKAGE CAPEX</span>
                  <span className="slider-val acc fw-bold">
                    {currencySymbol}{capexVal.toLocaleString()} {unitSuffix}
                  </span>
                </div>
                <input
                  type="range"
                  min={isINR ? 100 : 25}
                  max={isINR ? 5000 : 1000}
                  step={isINR ? 50 : 25}
                  value={capexVal}
                  onChange={(e) => setCapexVal(Number(e.target.value))}
                  className="sandbox-slider"
                  aria-label="Contract Package CAPEX"
                />
                <div className="slider-limits mono xs dim">
                  <span>{currencySymbol}{isINR ? "100 Cr" : "25M"}</span>
                  <span>{currencySymbol}{isINR ? "2,500 Cr" : "500M"}</span>
                  <span>{currencySymbol}{isINR ? "5,000 Cr" : "1,000M"}</span>
                </div>
              </div>

              <div className="input-group mt-6">
                <div className="slider-header mono xs">
                  <span className="slider-label">UNDETECTED CRITICAL PATH SLIP</span>
                  <span className="slider-val bad fw-bold">{delayWeeks} WEEKS</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={delayWeeks}
                  onChange={(e) => setDelayWeeks(Number(e.target.value))}
                  className="sandbox-slider slider-bad"
                  aria-label="Undetected Critical Path Slip in Weeks"
                />
                <div className="slider-limits mono xs dim">
                  <span>1 Week</span>
                  <span>6 Weeks (Industry Average)</span>
                  <span>12 Weeks</span>
                </div>
              </div>

              {/* Formula & Basis Legend */}
              <div className="model-footnote mono xs dim mt-6">
                <p>
                  <strong>MODEL ASSUMPTIONS:</strong> Liquidated damages calculated on contract package value.
                  Extended site preliminaries model idle plant &amp; machinery, crane hire, and site overheads at ~0.33%
                  CAPEX/mo. Financing carrying charges modeled at 9.5% p.a. working capital interest.
                </p>
              </div>
            </div>

            {/* Right Column: Calculated Exposure & SyncPro Capital Recovery */}
            <div className="sandbox-outputs">
              <div className="exposure-breakdown">
                <div className="breakdown-row mono xs">
                  <span className="dim">1. CONTRACTUAL LIQUIDATED DAMAGES</span>
                  <span className="val bad">
                    {currencySymbol}{totalLd.toFixed(2)} {unitSuffix}
                  </span>
                </div>
                <div className="breakdown-row mono xs">
                  <span className="dim">2. EXTENDED PRELIMINARIES &amp; IDLE P&amp;M</span>
                  <span className="val warn">
                    {currencySymbol}{extendedPrelims.toFixed(2)} {unitSuffix}
                  </span>
                </div>
                <div className="breakdown-row mono xs">
                  <span className="dim">3. WORKING CAPITAL DEBT CARRYING COST</span>
                  <span className="val warn">
                    {currencySymbol}{carryingCost.toFixed(2)} {unitSuffix}
                  </span>
                </div>

                <div className="breakdown-total mono xs">
                  <span className="dim">TOTAL UNMITIGATED FINANCIAL RISK:</span>
                  <span className="total-val bad fw-bold">
                    {currencySymbol}{totalExposure.toFixed(2)} {unitSuffix}
                  </span>
                </div>
              </div>

              {/* SyncPro Value Creation Banner */}
              <div className="recovery-banner">
                <div className="recovery-header mono xs">
                  <ShieldCheck className="ico-xs ok" />
                  <span className="ok fw-bold">SYNCPRO 3-WEEK EARLY INTERVENTION</span>
                </div>
                <p className="recovery-lead">
                  By detecting logic slips 3 weeks before month-end cutoff, planners execute parallelized second-fix
                  workstreams and reserve contractual extension rights.
                </p>
                <div className="recovery-stat mono">
                  <span className="stat-highlight ok">
                    +{currencySymbol}{capitalPreserved.toFixed(2)} {unitSuffix}
                  </span>
                  <span className="stat-sub dim">CAPITAL PRESERVED (~76% RECOVERY)</span>
                </div>

                <button type="button" className="sandbox-cta mono xs" onClick={onOpenPilot}>
                  Audit Your Project Exposure <ArrowRight className="ico-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
