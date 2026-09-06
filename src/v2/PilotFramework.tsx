/**
 * SyncPro v2 — Section 06 / The Scoped Pilot Framework
 * Benchmarked directly against ZeroEka's "Pilot Plan vs Enterprise Plan":
 * Two clean, non-overwhelming cards detailing the 30-day evaluation.
 */
import { Reveal, MaskLines } from "./Chrome";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function PilotFramework({ onOpenPilot }: { onOpenPilot: () => void }) {
  return (
    <section className="section pilot-framework-sec" id="pilot">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">06 / THE SCOPED PILOT FRAMEWORK</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>Start with one package.</>, <><span className="accent">Judge the work.</span></>]}
            />
          </div>
          <p className="head-desc">
            Agree the inputs, diagnostic questions and success criteria before the pilot begins. Read-only and non-destructive.
          </p>
        </div>

        {/* Dual Plan Cards: 30-Day Pilot vs Enterprise Expansion */}
        <div className="plans-grid">
          {/* Plan 1: Proposed Pilot / 30 Days */}
          <Reveal variant="up" delay={100} className="plan-wrap">
            <article className="plan-card spotlight-card primary-plan">
              <div className="plan-badge mono xs acc">PROPOSED PILOT / 30 DAYS</div>
              <h3 className="plan-title">One package.<br />Read-only review.</h3>
              <p className="plan-desc">
                A focused 30-day evaluation executed alongside your planning and commercial heads.
              </p>
              <div className="plan-price mono xs">CUSTOM SCOPE &amp; EVALUATION FEE</div>

              <div className="plan-schedule mono xs">
                <div className="schedule-row">
                  <span className="week-tag acc">Week 1</span>
                  <span>Validate P6 inputs and preserve the contract baseline.</span>
                </div>
                <div className="schedule-row">
                  <span className="week-tag acc">Week 2</span>
                  <span>Review DCMA 14 diagnostics and routine event mapping.</span>
                </div>
                <div className="schedule-row">
                  <span className="week-tag acc">Week 3</span>
                  <span>Compare shadow forecast scenarios with your project planner.</span>
                </div>
                <div className="schedule-row">
                  <span className="week-tag acc">Week 4</span>
                  <span>Deliver forensic findings report and decide next steps.</span>
                </div>
              </div>

              <button type="button" className="hero-btn mono xs mt-6" onClick={onOpenPilot}>
                Scope a 30-Day Pilot <ArrowRight className="ico-xs" />
              </button>

              <p className="plan-footnote mono xs dim mt-4">
                Proposed outputs: Schedule diagnostic review, scenario comparison report, and contemporaneous evidence register.
              </p>
            </article>
          </Reveal>

          {/* Plan 2: Enterprise / Planned Expansion */}
          <Reveal variant="up" delay={200} className="plan-wrap">
            <article className="plan-card spotlight-card">
              <div className="plan-badge mono xs dim">ENTERPRISE / PLANNED EXPANSION</div>
              <h3 className="plan-title">Expand after<br />the evidence.</h3>
              <p className="plan-desc">
                Plan a phased rollout across active project packages, site teams and monthly reporting cycles.
              </p>
              <div className="plan-price mono xs dim">DEPLOYMENT SCOPED SEPARATELY</div>

              <div className="plan-schedule mono xs">
                <div className="schedule-row">
                  <CheckCircle2 className="ico-xs ok" />
                  <span>Portfolio-wide multi-package scheduling &amp; WBS rollups</span>
                </div>
                <div className="schedule-row">
                  <CheckCircle2 className="ico-xs ok" />
                  <span>Dedicated tenant VPC with enterprise access-control review</span>
                </div>
                <div className="schedule-row">
                  <CheckCircle2 className="ico-xs ok" />
                  <span>Automated WhatsApp &amp; site docket ingestion pipelines</span>
                </div>
                <div className="schedule-row">
                  <CheckCircle2 className="ico-xs ok" />
                  <span>Dedicated project controls lead support &amp; custom SLAs</span>
                </div>
              </div>

              <button type="button" className="hero-btn-outline mono xs mt-6" onClick={onOpenPilot}>
                Discuss Enterprise Scope <ArrowRight className="ico-xs" />
              </button>

              <p className="plan-footnote mono xs dim mt-4">
                Availability follows technical validation during the initial pilot and a formal written agreement.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
