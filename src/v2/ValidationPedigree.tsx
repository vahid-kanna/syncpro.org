/**
 * SyncPro v2 — Stage 06: Pedigree & Pilot Validation
 * Grounded in Nirmaan IIT Madras incubator backing and
 * the scoped 30-day low-risk contractor pilot framework.
 */
import { Reveal, MaskLines } from "./Chrome";
import { Award, CheckCircle2, ArrowRight, FileCheck } from "lucide-react";

export function ValidationPedigree({ onOpenPilot }: { onOpenPilot: () => void }) {
  return (
    <section className="sec wrap pedigree-sec" id="validation">
      <MaskLines
        as="h2"
        className="sec-h center"
        baseDelay={80}
        lines={[<>Prove it on one package</>, <><em>before expanding the mandate.</em></>]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">06</span>
        <span>ACADEMIC PEDIGREE &amp; LOW-RISK PILOT VALIDATION</span>
      </div>

      {/* Institutional Pedigree Banner */}
      <Reveal variant="up" delay={120}>
        <div className="pedigree-banner">
          <div className="pedigree-badge mono xs">
            <Award className="ico-xs acc" />
            <span>INCUBATION &amp; RESEARCH HERITAGE</span>
          </div>
          <h3 className="pedigree-title">Supported through Nirmaan, the Pre-incubator at IIT Madras</h3>
          <p className="pedigree-desc">
            SyncPro was engineered at the Indian Institute of Technology Madras by civil engineers and computer scientists,
            incorporating real-world project controls methodologies from veteran planning heads, forensic delay analysts,
            and tier-1 EPC contractors.
          </p>
        </div>
      </Reveal>

      {/* The 3-Phase Low-Risk Pilot Framework */}
      <Reveal variant="up" delay={200}>
        <div className="pilot-steps-grid">
          <div className="pilot-step-card">
            <span className="mono xs step-num">PHASE 01</span>
            <h4 className="step-h">Single Package Ingestion</h4>
            <p className="step-p xs dim">
              Provide one active or completed package baseline (.xer, .mpp, .pp). SyncPro ingests the full CPM
              logic network in seconds, auditing calendars and relationships with zero software installation on site.
            </p>
            <div className="step-tag mono xs ok">
              <CheckCircle2 className="ico-xs" /> READ-ONLY SOURCE ISOLATION
            </div>
          </div>

          <div className="pilot-step-card">
            <span className="mono xs step-num">PHASE 02</span>
            <h4 className="step-h">30-Day Shadow Forecasting</h4>
            <p className="step-p xs dim">
              Feed routine field evidence (voice notes, concrete batch tickets, delivery dockets) into SyncPro's
              shadow graph. Test the system’s early detection against your existing monthly reporting cycle.
            </p>
            <div className="step-tag mono xs acc">
              <CheckCircle2 className="ico-xs" /> ZERO MASTER PROGRAMME OVERWRITES
            </div>
          </div>

          <div className="pilot-step-card">
            <span className="mono xs step-num">PHASE 03</span>
            <h4 className="step-h">Forensic Divergence Audit</h4>
            <p className="step-p xs dim">
              Receive a comprehensive executive report quantifying undetected critical path divergence, DCMA 14 logic
              defects, and potential liquidated damages exposure before deciding on enterprise rollout.
            </p>
            <div className="step-tag mono xs warn">
              <FileCheck className="ico-xs" /> EXECUTIVE BOARD REPORT DELIVERED
            </div>
          </div>
        </div>
      </Reveal>

      {/* Pilot CTA Prompt */}
      <Reveal variant="up" delay={280} className="pedigree-cta-wrap center">
        <button type="button" className="hero-btn mono xs" onClick={onOpenPilot}>
          Schedule a Scoped Pilot Evaluation <ArrowRight className="ico-xs" />
        </button>
      </Reveal>
    </section>
  );
}
