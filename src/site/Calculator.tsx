import { useState } from "react";
import { scrollToId } from "./lib/hooks";
import { ArrowRight, Shield } from "./lib/icons";
import { TiltCard } from "./lib/interactions";

export function DelayCalculator() {
  const [capexCr, setCapexCr] = useState<number>(1200); // ₹1,200 Cr default
  const [delayWeeks, setDelayWeeks] = useState<number>(6); // 6 Weeks delay

  // Financial calculations
  // Liquidated damages: 0.1% per week (FIDIC / standard megaproject clause)
  const dailyLdCr = (capexCr * 0.001) / 7;
  const totalLdCr = dailyLdCr * (delayWeeks * 7);

  // Extended Preliminaries (8% CAPEX over 24-month baseline)
  const monthlyPrelimsCr = (capexCr * 0.08) / 24;
  const extendedPrelimsCr = (monthlyPrelimsCr / 4.33) * delayWeeks;

  // Debt financing carrying cost @ 9% APR
  const carryingCostCr = capexCr * 0.09 * (delayWeeks / 52);

  const totalExposureCr = totalLdCr + extendedPrelimsCr + carryingCostCr;
  // SyncPro 3-week early intervention recovery (~76% preserved capital)
  const syncproRecoveryCr = totalExposureCr * 0.76;

  return (
    <section className="section" id="roi-sandbox">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <div className="row gap-2 mb-2" style={{ alignItems: "center" }}>
            <span className="tag tag-brand">Financial Exposure Sandbox</span>
            <span className="mono xs faint">Quantitative Holding Cost Model</span>
          </div>
          <h2 className="h1 measure">Quantify the cost of 3 weeks of schedule blindness.</h2>
          <p className="lead measure mt-4">
            On megaprojects, critical path slip does not announce itself as a crisis until claims arrive.
            Every week of hidden drift accumulates contractual liquidated damages, idle machinery holding costs,
            and interest during construction.
          </p>
        </div>

        <div className="grid-2 rv" style={{ alignItems: "stretch", gap: "28px" }}>
          {/* Controls Card */}
          <TiltCard className="card sandbox-card" maxTilt={4}>
            <div className="between pb-3 mb-5" style={{ borderBottom: "1px solid var(--line)" }}>
              <span className="mono xs" style={{ color: "var(--brand-400)", fontWeight: 600 }}>
                PROJECT PARAMETERS
              </span>
              <span className="tag tag-steel">FIDIC / NHAI Benchmarks</span>
            </div>

            <div className="sandbox-slider-group">
              {/* Slider 1: CAPEX */}
              <div className="slider-track-wrap">
                <div className="between mb-2">
                  <label htmlFor="calc-capex" style={{ fontSize: "13.5px", fontWeight: 550, color: "var(--text)" }}>
                    Contract Package Value (CAPEX)
                  </label>
                  <span className="mono" style={{ color: "var(--brand-400)", fontWeight: 600, fontSize: "15px" }}>
                    ₹{capexCr.toLocaleString("en-IN")} Cr
                  </span>
                </div>
                <input
                  id="calc-capex"
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={capexCr}
                  onChange={(e) => setCapexCr(Number(e.target.value))}
                />
                <div className="between mono xs faint mt-1">
                  <span>₹100 Cr</span>
                  <span>₹2,500 Cr</span>
                  <span>₹5,000 Cr+</span>
                </div>
              </div>

              {/* Slider 2: Delay Weeks */}
              <div className="slider-track-wrap">
                <div className="between mb-2">
                  <label htmlFor="calc-delay" style={{ fontSize: "13.5px", fontWeight: 550, color: "var(--text)" }}>
                    Undetected Critical Path Drift
                  </label>
                  <span className="mono" style={{ color: "var(--danger)", fontWeight: 600, fontSize: "15px" }}>
                    {delayWeeks} Weeks ({delayWeeks * 7} Days)
                  </span>
                </div>
                <input
                  id="calc-delay"
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={delayWeeks}
                  onChange={(e) => setDelayWeeks(Number(e.target.value))}
                />
                <div className="between mono xs faint mt-1">
                  <span>1 Week</span>
                  <span>12 Weeks</span>
                  <span>24 Weeks</span>
                </div>
              </div>
            </div>

            <div className="inset mt-6">
              <div className="mono xs faint mb-1">Contractual Basis:</div>
              <p className="xs dim" style={{ lineHeight: 1.55 }}>
                Liquidated damages modeled at 0.1%/week (FIDIC capped at 10%); site preliminaries &amp; idle plant
                amortized at 8% total CAPEX; cost of project debt at 9% p.a.
              </p>
            </div>
          </TiltCard>

          {/* Real-time Results Card */}
          <TiltCard className="card sandbox-card" maxTilt={4} spotlightColor="rgba(232, 104, 95, 0.12)">
            <div className="between pb-3 mb-4" style={{ borderBottom: "1px solid var(--line)" }}>
              <span className="mono xs" style={{ color: "var(--danger)", fontWeight: 600 }}>
                UNMITIGATED CAPITAL AT RISK
              </span>
              <span className="mono xs faint">HOLDING COST EXPOSURE</span>
            </div>

            <div className="mb-5">
              <div className="loss-meter-display">₹{totalExposureCr.toFixed(2)} Cr</div>
              <div className="mono xs faint mt-1">
                ACCUMULATED DIRECT LOSSES OVER {delayWeeks} WEEKS DRIFT
              </div>
            </div>

            <div className="col gap-2 mb-5">
              <div className="between inset" style={{ padding: "8px 12px" }}>
                <span className="xs dim">Liquidated Damages (LDs):</span>
                <span className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
                  ₹{totalLdCr.toFixed(2)} Cr (₹{(dailyLdCr * 100).toFixed(1)} Lakh/Day)
                </span>
              </div>
              <div className="between inset" style={{ padding: "8px 12px" }}>
                <span className="xs dim">Extended Site Overheads &amp; Idle Plant:</span>
                <span className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
                  ₹{extendedPrelimsCr.toFixed(2)} Cr
                </span>
              </div>
              <div className="between inset" style={{ padding: "8px 12px" }}>
                <span className="xs dim">Debt Service &amp; Carrying Interest:</span>
                <span className="mono xs" style={{ color: "var(--text)", fontWeight: 600 }}>
                  ₹{carryingCostCr.toFixed(2)} Cr
                </span>
              </div>
            </div>

            {/* SyncPro Recovery Callout */}
            <div className="recovery-badge mb-5">
              <Shield size={14} />
              <span>
                SyncPro 3-Week Early Detection Preserves: <b>+₹{syncproRecoveryCr.toFixed(2)} Cr</b>
              </span>
            </div>

            <a
              className="btn btn-primary btn-block"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Protect project capital
              <ArrowRight className="ico" />
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
