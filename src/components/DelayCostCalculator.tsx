import { useState } from "react";
import { Sliders, ShieldCheck, ArrowRight } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function DelayCostCalculator() {
  const reveal = useReveal();
  const [capexM, setCapexM] = useState<number>(250); // $250M CAPEX
  const [delayWeeks, setDelayWeeks] = useState<number>(6); // 6 Weeks delay

  // Financial Calculations
  const dailyLD = Math.round((capexM * 1000000 * 0.001) / 7); // ~0.1% per week / 7 days
  const totalLDs = dailyLD * (delayWeeks * 7);
  const monthlyPrelims = Math.round((capexM * 1000000 * 0.08) / 24); // 8% total prelims over 24 mo
  const extendedPrelims = Math.round((monthlyPrelims / 4.33) * delayWeeks);
  const carryingCostInterest = Math.round((capexM * 1000000 * 0.07 * (delayWeeks / 52))); // 7% cost of capital
  const totalExposure = totalLDs + extendedPrelims + carryingCostInterest;

  // SyncPro 3-week early detection recovery (typically recovers 70-85% of critical path slip)
  const syncproRecovery = Math.round(totalExposure * 0.76);

  return (
    <section
      id="financial-sandbox"
      style={{
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "100px",
        background: "rgba(14, 15, 18, 0.6)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap-lg">
        {/* Section Header */}
        <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
          <div className="row gap-2 mb-3" style={{ alignItems: "center" }}>
            <span
              className="mono xs"
              style={{
                color: "var(--brass)",
                background: "var(--brass-bg)",
                border: "1px solid var(--brass-line)",
                padding: "3px 10px",
                borderRadius: "4px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              MODULE 05 // MEGAPROJECT CAPITAL EXPOSURE SANDBOX
            </span>
            <span className="mono xs dim desktop-nav">FINANCIAL RISK QUANTIFICATION</span>
          </div>
          <h2
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.08,
              color: "var(--text)",
              maxWidth: "840px",
              marginTop: "8px",
            }}
          >
            Quantify the cost of <br />
            <span style={{ fontStyle: "italic", color: "var(--brand)" }}>3 weeks of schedule blindness.</span>
          </h2>
          <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "17px", lineHeight: 1.6 }}>
            On a $250M megaproject, every week of undetected critical path slip costs ~$400,000 in liquidated damages,
            extended preliminaries, and carrying costs. Calculate your project's exposure below.
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          {/* Left Column: Interactive Titanium Sliders */}
          <div
            className="card"
            style={{
              background: "rgba(18, 20, 24, 0.96)",
              border: "1px solid var(--line-strong)",
              padding: "30px",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div className="row between mb-6 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 600 }}>
                PROJECT INPUT PARAMETERS
              </span>
              <Sliders className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
            </div>

            {/* Slider 01: Project CAPEX */}
            <div className="mb-6">
              <div className="row between mb-2">
                <label htmlFor="capex-slider" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                  Total Project Contract Value (CAPEX)
                </label>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700, fontSize: "15px" }}>
                  ${capexM}M USD
                </span>
              </div>
              <input
                id="capex-slider"
                type="range"
                min="20"
                max="1500"
                step="10"
                value={capexM}
                onChange={(e) => setCapexM(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "var(--brand)",
                  cursor: "pointer",
                }}
              />
              <div className="row between mono xs dim mt-1">
                <span>$20M</span>
                <span>$500M</span>
                <span>$1.5B+</span>
              </div>
            </div>

            {/* Slider 02: Delay Duration */}
            <div className="mb-6">
              <div className="row between mb-2">
                <label htmlFor="delay-slider" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                  Undetected Critical Path Slip Duration
                </label>
                <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 700, fontSize: "15px" }}>
                  {delayWeeks} WEEKS ({delayWeeks * 7} DAYS)
                </span>
              </div>
              <input
                id="delay-slider"
                type="range"
                min="1"
                max="24"
                step="1"
                value={delayWeeks}
                onChange={(e) => setDelayWeeks(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "var(--brass)",
                  cursor: "pointer",
                }}
              />
              <div className="row between mono xs dim mt-1">
                <span>1 Week</span>
                <span>12 Weeks</span>
                <span>24 Weeks</span>
              </div>
            </div>

            <div
              className="p-3 mt-4"
              style={{
                background: "rgba(10, 11, 14, 0.8)",
                border: "1px solid var(--line-soft)",
                borderRadius: "var(--r-xs)",
              }}
            >
              <div className="mono xs dim mb-1">CONTRACT STANDARD BENCHMARKS:</div>
              <p className="xs dim" style={{ margin: 0, lineHeight: 1.5 }}>
                Liquidated damages modeled at 0.1% per week (capped at 10% contract sum); site preliminaries modeled at 8% total CAPEX.
              </p>
            </div>
          </div>

          {/* Right Column: Financial Exposure Output & Margin Recovery */}
          <div
            className="card stack"
            style={{
              background: "rgba(18, 20, 24, 0.96)",
              border: "1px solid var(--line-strong)",
              padding: "30px",
              borderRadius: "var(--r-md)",
              justifyContent: "space-between",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div>
              <div className="row between mb-4 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  TOTAL UNMITIGATED FINANCIAL RISK
                </span>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  ESTIMATED EXPOSURE
                </span>
              </div>

              {/* Huge Total Exposure Number */}
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(34px, 3.8vw, 48px)",
                    fontWeight: 700,
                    color: "var(--brand)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ${(totalExposure / 1000000).toFixed(2)}M
                </div>
                <div className="mono xs dim">ACCUMULATED DIRECT LOSSES ACROSS {delayWeeks} WEEKS</div>
              </div>

              {/* Breakdown Rows */}
              <div className="stack gap-2 mb-4" style={{ fontSize: "13px" }}>
                <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Liquidated Damages (LDs):</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>${(totalLDs / 1000).toLocaleString()} USD</span>
                </div>
                <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Extended Site Preliminaries (Site Overhead):</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>${(extendedPrelims / 1000).toLocaleString()} USD</span>
                </div>
                <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.8)", borderRadius: "var(--r-xs)" }}>
                  <span className="dim">Carrying Costs &amp; Working Capital Interest:</span>
                  <span className="mono" style={{ color: "var(--text)", fontWeight: 600 }}>${(carryingCostInterest / 1000).toLocaleString()} USD</span>
                </div>
              </div>

              {/* SyncPro Margin Recovery Box */}
              <div
                className="p-3"
                style={{
                  background: "rgba(212, 155, 75, 0.08)",
                  border: "1px solid var(--brass-line)",
                  borderRadius: "var(--r-xs)",
                }}
              >
                <div className="row gap-2 mb-1" style={{ alignItems: "center" }}>
                  <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
                  <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 700 }}>
                    SYNCPRO EARLY RECOVERY PROTECTION:
                  </span>
                </div>
                <div className="row between mt-1">
                  <span className="xs" style={{ color: "var(--text-2)" }}>Protected Capital via 3-Week Early Detection:</span>
                  <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 700, fontSize: "14px" }}>
                    +${(syncproRecovery / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            </div>

            <a className="btn btn-primary btn-block mt-4 mono xs" href="#waitlist" style={{ justifyContent: "center", padding: "12px", fontWeight: 700 }}>
              PROTECT_MY_CAPITAL_PROJECT
              <ArrowRight className="ico" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
