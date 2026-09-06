/**
 * SyncPro v2 — Stage 05: Unified Architecture & Enterprise Security
 * Sourced directly from Astra's blueprint:
 * Dual input lanes (Schedule vs Evidence), deterministic scheduling core,
 * immutable audit ledger, and enterprise security commitments.
 */
import { Reveal, MaskLines } from "./Chrome";
import { Database, ShieldCheck, Lock, Cpu, GitBranch, Server, CheckCircle2 } from "lucide-react";

export function ArchitectureSecurity() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="sec wrap arch-sec" id="architecture">
      <MaskLines
        as="h2"
        className="sec-h center"
        baseDelay={80}
        lines={[<>A controlled boundary between</>, <><em>site evidence and your baseline.</em></>]}
      />

      <div className="sechead mono xs center-head">
        <span className="num">05</span>
        <span>UNIFIED GRAPH ARCHITECTURE &amp; ENTERPRISE SECURITY</span>
      </div>

      {/* Interactive Architecture Diagram */}
      <Reveal variant="up" delay={150}>
        <div className="arch-diagram spotlight-card" onMouseMove={handleMouseMove}>
          {/* Top Layer: Two Input Lanes */}
          <div className="arch-lanes">
            {/* Lane 1: Schedule Ingestion */}
            <div className="lane-card lane-schedule">
              <div className="lane-tag mono xs">
                <Database className="ico-xs acc" />
                <span>SCHEDULE INGESTION LANE (READ-ONLY)</span>
              </div>
              <h4 className="lane-title">Contract Programme Files</h4>
              <p className="lane-desc xs dim">
                Native parsing of Oracle Primavera P6 (.xer, PMXML), Microsoft Project (.mpp, XML), and Asta Powerproject (.pp)
                with exact preservation of project calendars, WBS hierarchy, and relationship constraints.
              </p>
              <div className="format-pills mono xs">
                <span>.XER</span>
                <span>.MPP</span>
                <span>.PP</span>
                <span>PMXML</span>
              </div>
            </div>

            {/* Lane 2: Field Signal Ingestion */}
            <div className="lane-card lane-signals">
              <div className="lane-tag mono xs">
                <Server className="ico-xs ok" />
                <span>MULTIMODAL FIELD EVIDENCE LANE</span>
              </div>
              <h4 className="lane-title">Unstructured Site Records</h4>
              <p className="lane-desc xs dim">
                Ingestion of daily site records: superintendent voice notes, WhatsApp communications, batching plant
                delivery dockets, gate security logs, and drone LiDAR progress point clouds.
              </p>
              <div className="format-pills mono xs">
                <span>VOICE NOTE</span>
                <span>CHALLAN OCR</span>
                <span>GATE LOG</span>
                <span>DPR PDF</span>
              </div>
            </div>
          </div>

          {/* Animated Signal Connectors 1 */}
          <div className="arch-connector-flow" aria-hidden="true">
            <div className="connector-line"><span className="flow-dot flow-dot-1" /></div>
            <div className="connector-line"><span className="flow-dot flow-dot-2" /></div>
          </div>

          {/* Middle Layer: Core Processing Engine */}
          <div className="arch-core">
            <div className="core-header mono xs">
              <Cpu className="ico-xs acc" />
              <span>DETERMINISTIC GRAPH ENGINE &amp; MULTI-AGENT REASONING CORE</span>
            </div>
            <div className="core-modules-grid">
              <div className="core-module">
                <span className="mono xs mod-name">MPXJ PARSER</span>
                <span className="xs dim">Zero-data-loss CPM parsing &amp; calendar reconciliation</span>
              </div>
              <div className="core-module">
                <span className="mono xs mod-name">NEO4J GRAPH DB</span>
                <span className="xs dim">Relational graph mapping activities, lags &amp; predecessors</span>
              </div>
              <div className="core-module">
                <span className="mono xs mod-name">FASTAPI ENGINE</span>
                <span className="xs dim">Sub-second forward &amp; backward critical path passes</span>
              </div>
              <div className="core-module">
                <span className="mono xs mod-name">LANGCHAIN AGENTS</span>
                <span className="xs dim">Evidence grounding &amp; confidence evaluation (&ge;95%)</span>
              </div>
            </div>
          </div>

          {/* Animated Signal Connectors 2 */}
          <div className="arch-connector-flow" aria-hidden="true">
            <div className="connector-line"><span className="flow-dot flow-dot-3" /></div>
            <div className="connector-line"><span className="flow-dot flow-dot-4" /></div>
          </div>

          {/* Bottom Layer: Immutable Ledger & Safe Delivery */}
          <div className="arch-output">
            <div className="output-card">
              <div className="output-tag mono xs">
                <ShieldCheck className="ico-xs ok" />
                <span>IMMUTABLE AUDIT LEDGER (POSTGRESQL)</span>
              </div>
              <p className="xs dim">
                Cryptographic SHA-256 chain of custody logging every field observation, timestamp, confidence score,
                and shadow float calculation for court-ready FIDIC/NEC4 dispute defense.
              </p>
            </div>
            <div className="output-card highlight-output">
              <div className="output-tag mono xs">
                <GitBranch className="ico-xs warn" />
                <span>CONTROLLED PUBLICATION BOUNDARY</span>
              </div>
              <p className="xs dim">
                Updates remain strictly quarantined in the shadow model. Only human planners hold the authority to approve,
                version-bind, and commit changes to the master schedule.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Enterprise Security Commitments Grid */}
      <Reveal variant="up" delay={240}>
        <div className="security-commitments-grid">
          <div className="sec-item">
            <div className="sec-icon-wrap">
              <Lock className="ico-sm acc" />
            </div>
            <h4 className="sec-title">Dedicated Tenant Isolation</h4>
            <p className="xs dim">
              Every enterprise customer operates inside an isolated, encrypted Virtual Private Cloud (VPC).
              Project schedules and site records are cryptographically separated and never co-mingled.
            </p>
          </div>

          <div className="sec-item">
            <div className="sec-icon-wrap">
              <ShieldCheck className="ico-sm ok" />
            </div>
            <h4 className="sec-title">Zero Client Data Training</h4>
            <p className="xs dim">
              Your proprietary schedule files, commercial contracts, and site records are never used to train
              public artificial intelligence models. Your IP remains your exclusive property.
            </p>
          </div>

          <div className="sec-item">
            <div className="sec-icon-wrap">
              <CheckCircle2 className="ico-sm warn" />
            </div>
            <h4 className="sec-title">Non-Repudiation Audit Logs</h4>
            <p className="xs dim">
              Every schedule change proposal includes source citations and immutable timestamps, ensuring complete
              evidentiary admissibility for dispute adjudication boards (DAB) and arbitrations.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
