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
      className="wrap-lg py-16"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div ref={reveal.ref} className={`${reveal.className} mb-12`}>
        <div className="row gap-2 mb-3">
          <span className="sdot" style={{ background: "var(--brass)" }} />
          <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
            ENGINEERING INSTRUMENT 04 // MEGAPROJECT CAPITAL EXPOSURE SANDBOX
          </span>
        </div>
        <h2
          className="display"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 3.8vw, 52px)",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "840px",
          }}
        >
          Quantify the cost of <br />
          <span style={{ fontStyle: "italic", color: "var(--brand)" }}>3 weeks of schedule blindness.</span>
        </h2>
        <p className="lead mt-4 measure" style={{ color: "var(--text-2)", fontSize: "16.5px" }}>
          On a $250M megaproject, every week of undetected critical path slip costs ~$400,000 in liquidated damages,
          extended preliminaries, and carrying costs. Calculate your project's exposure below.
        </p>
      </div>

      <div className="grid-2 gap-6">
        {/* Left Column: Interactive Titanium Sliders */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.95)",
            border: "1px solid var(--line)",
            padding: "28px",
            borderRadius: "var(--r-md)",
          }}
        >
          <div className="row between mb-6 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
            <span className="mono xs" style={{ color: "var(--brass)" }}>
              PROJECT PARAMETERS
            </span>
            <Sliders className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
          </div>

          {/* Slider 1: Project CAPEX */}
          <div className="mb-6">
            <div className="row between mb-2">
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>Total Project CAPEX</span>
              <span className="mono xs" style={{ color: "var(--brand)", fontSize: "15px", fontWeight: 700 }}>
                ${capexM}M USD
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={1500}
              step={10}
              value={capexM}
              onChange={(e) => setCapexM(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--brand)",
                cursor: "pointer",
              }}
            />
            <div className="row between mt-1">
              <span className="mono xs dim">$20M (Medium Civil)</span>
              <span className="mono xs dim">$1.5B (Megaproject)</span>
            </div>
          </div>

          {/* Slider 2: Unmitigated Critical Path Delay Weeks */}
          <div className="mb-6">
            <div className="row between mb-2">
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>Unmitigated Float Slip</span>
              <span className="mono xs" style={{ color: "var(--brand)", fontSize: "15px", fontWeight: 700 }}>
                {delayWeeks} Weeks ({delayWeeks * 7} Days)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={16}
              step={1}
              value={delayWeeks}
              onChange={(e) => setDelayWeeks(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--brand)",
                cursor: "pointer",
              }}
            />
            <div className="row between mt-1">
              <span className="mono xs dim">1 Week Slip</span>
              <span className="mono xs dim">16 Weeks Slip</span>
            </div>
          </div>

          {/* Key Breakdown Metrics */}
          <div className="col gap-2 pt-3" style={{ borderTop: "1px solid var(--line-soft)" }}>
            <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.6)", borderRadius: "var(--r-xs)" }}>
              <span className="xs dim">Contractual Liquidated Damages (LDs):</span>
              <span className="mono xs" style={{ color: "var(--text)" }}>
                ${(totalLDs / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.6)", borderRadius: "var(--r-xs)" }}>
              <span className="xs dim">Extended Site Preliminaries (Site General Conditions):</span>
              <span className="mono xs" style={{ color: "var(--text)" }}>
                ${(extendedPrelims / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="row between p-2" style={{ background: "rgba(10, 11, 14, 0.6)", borderRadius: "var(--r-xs)" }}>
              <span className="xs dim">Capital Carrying &amp; Financing Interest:</span>
              <span className="mono xs" style={{ color: "var(--text)" }}>
                ${(carryingCostInterest / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Exposure Output & SyncPro Margin Recovery */}
        <div
          className="card"
          style={{
            background: "rgba(18, 20, 24, 0.95)",
            border: "1px solid var(--line-strong)",
            padding: "28px",
            borderRadius: "var(--r-md)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="row between mb-4 pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                TOTAL CAPITAL AT RISK
              </span>
              <span className="status xs" style={{ color: "var(--brand)" }}>
                UNMITIGATED STATUS
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div className="mono xs dim mb-1">TOTAL FINANCIAL EXPOSURE:</div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "clamp(36px, 4vw, 54px)",
                  fontWeight: 700,
                  color: "var(--brand)",
                  letterSpacing: "-0.02em",
                }}
              >
                ${(totalExposure / 1000000).toFixed(2)}M
              </div>
            </div>

            {/* SyncPro Recovery Shield Box */}
            <div
              style={{
                padding: "20px",
                background: "rgba(10, 11, 14, 0.9)",
                border: "1px solid var(--brass-line)",
                borderRadius: "var(--r-xs)",
              }}
            >
              <div className="row between mb-2">
                <span className="mono xs" style={{ color: "var(--brass)", fontWeight: 700 }}>
                  SYNCPRO REVENUE &amp; MARGIN RECOVERY
                </span>
                <ShieldCheck className="ico" style={{ width: 15, height: 15, color: "var(--brass)" }} />
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--brass)",
                  marginBottom: "8px",
                }}
              >
                +${(syncproRecovery / 1000000).toFixed(2)}M Protected
              </div>
              <p style={{ fontSize: "12.5px", color: "var(--text-2)", lineHeight: 1.4, margin: 0 }}>
                By detecting float erosion 21 days before traditional monthly contractor reports and assembling contemporaneous
                FIDIC/NEC4 evidence, SyncPro neutralizes dispute liabilities and recovers 70–85% of downstream delay costs.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3" style={{ borderTop: "1px solid var(--line-soft)" }}>
            <a
              className="btn btn-primary mono xs"
              href="#waitlist"
              style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}
            >
              PROTECT_PROJECT_MARGINS
              <ArrowRight className="ico" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
