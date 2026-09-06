/**
 * SyncPro v2 — Section 01 / The Core Shift
 * Directly benchmarked against ZeroEka's "Learning is broken" core shift:
 * "The plan is fixed. Site reality isn’t."
 * Features clean 4-step flowline (Capture → Connect → Recalculate → Review)
 * and sourced MoSPI ₹4.92 Lakh Crore historical overrun context.
 */
import { Reveal, MaskLines } from "./Chrome";
import { ExternalLink } from "lucide-react";

export function CoreShift() {
  return (
    <section className="section core-shift-sec" id="shift">
      <div className="wrap split">
        {/* Left Column: Heading */}
        <div className="split-left">
          <span className="eyebrow mono xs dim">01 / THE CORE SHIFT</span>
          <MaskLines
            as="h2"
            className="sec-h"
            baseDelay={80}
            lines={[<>The plan is fixed.</>, <><span className="accent">Site reality isn’t.</span></>]}
          />
        </div>

        {/* Right Column: Narrative & Sourced MoSPI Context */}
        <div className="split-right">
          <Reveal variant="up" delay={150}>
            <p className="lead">
              Schedules, site reports and commercial records tell different parts of the story.
              Field engineers document delay reality on WhatsApp and delivery dockets, but master Primavera P6
              files remain blind until monthly reporting cycles.
            </p>
          </Reveal>

          <Reveal variant="up" delay={250}>
            <p className="sub-lead">
              SyncPro builds one connected graph of CPM activities, site events and physical evidence, allowing project
              teams to inspect what changed and recalculate true float without rewriting the approved contract baseline.
            </p>
          </Reveal>

          {/* Clean 4-step flowline */}
          <Reveal variant="up" delay={350}>
            <div className="flowline mono xs">
              <span className="flow-step">Capture</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Connect</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Recalculate</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Review</span>
            </div>
          </Reveal>

          {/* Sourced MoSPI Benchmark */}
          <Reveal variant="fade" delay={450}>
            <div className="source-banner mono xs">
              <div className="source-stat">
                <span className="stat-val bad fw-bold">₹4.92 LAKH CRORE</span>
                <span className="stat-desc dim">REPORTED COST OVERRUNS ACROSS INDIAN INFRASTRUCTURE</span>
              </div>
              <p className="source-note dim">
                In February 2024, MoSPI reported ₹4,92,477.11 Crore in cumulative cost escalation across 443
                monitored central megaprojects (&ge;₹150 Cr). Root cause: schedule latency between site reality and monthly reporting.
              </p>
              <a
                href="https://www.newindianexpress.com/business/2024/Mar/31/443-infra-projects-hit-by-cost-overrun-of-rs-492-lakh-crore-in-feb"
                target="_blank"
                rel="noopener noreferrer"
                className="source-link dim"
              >
                Historical context · PTI reporting on MoSPI, 31 March 2024 <ExternalLink className="ico-xs" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
