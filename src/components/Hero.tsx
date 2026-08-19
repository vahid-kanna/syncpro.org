import { ArrowRight, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { ThreeBuildingCanvas } from "./ThreeBuildingCanvas";

export function Hero() {
  const reveal = useReveal();

  return (
    <header className="wrap-lg blueprint" style={{ position: "relative", paddingTop: 80, paddingBottom: 64, overflow: "hidden" }}>
      {/* 3D Architectural Construction Megastructure & Tower Crane Canvas */}
      <ThreeBuildingCanvas />

      <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>
        <div ref={reveal.ref} className={reveal.className}>
          <div className="eyebrow mb-4" style={{ letterSpacing: ".06em", color: "var(--brass)" }}>
            [SYS_NODE: ONLINE] · DCMA-14 COMPLIANT · FIDIC DEFENSE
          </div>
          <h1 className="display">
            Earn the <span className="it" style={{ color: "var(--brand)" }}>right</span> to update the construction schedule.
          </h1>
          <p className="lead mt-5 measure">
            SyncPro is the AI Project Controls Engineer for heavy civil &amp; megaprojects. It resolves unstructured
            site language to exact CPM activities, corroborates evidence across delivery dockets &amp; QA slips,
            and produces tamper-evident audit records — so every update is a defensible fact, not a data-entry event.
          </p>
          <div className="row gap-3 mt-8 wrapf">
            <a className="btn btn-primary btn-lg" href="#waitlist">
              Request Early Access
              <ArrowRight className="ico" />
            </a>
            <a className="btn btn-outline btn-lg" href="#demo">
              View Live Pipeline
              <ChevronRight className="ico" />
            </a>
          </div>
          
          <div className="row gap-4 mt-6 wrapf" style={{ alignItems: "center" }}>
            <div className="status">
              <span className="sdot sdot-live pulse" style={{ background: "var(--brand)" }} /> Onboarding first cohort of design partners
            </div>
            <div className="row gap-2 xs dim" style={{ borderLeft: "1px solid var(--line)", paddingLeft: 12 }}>
              <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
              <span>SOC 2 Type II Ready · Private VPC</span>
            </div>
          </div>
        </div>

        {/* Embedded product frame: live planned-vs-field reconciliation */}
        <div className="reveal d2">
          <div className="frame" style={{ background: "rgba(21, 24, 32, 0.88)", backdropFilter: "blur(14px)", borderColor: "var(--line-strong)" }}>
            <div className="frame-bar">
              <span className="tl" />
              <span className="tl" />
              <span className="tl" />
              <span className="crumbs" style={{ marginLeft: 8, fontSize: "11.5px" }}>
                <span>Tower A — Commercial Core</span>
                <span className="sep">/</span>
                <span className="cur" style={{ color: "var(--brass)" }}>Live Shadow Schedule</span>
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row between mb-3">
                <span className="status xs">
                  <span className="sdot pulse" style={{ background: "var(--brand)" }} /> Field Reality · Corroborated
                </span>
                <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                  <CheckCircle2 className="ico" style={{ width: 11, height: 11, marginRight: 2 }} />
                  91% confidence score
                </span>
              </div>

              <div className="gantt">
                <div className="gantt-row">
                  <span className="lab">Columns — L2 Pour</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "4%", width: "26%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-field anim-grow s1" style={{ left: "4%", width: "26%", background: "var(--brass)" }} title="Corroborated Field Progress" />
                  </div>
                </div>
                <div className="gantt-row">
                  <span className="lab">Slab Post-Tensioning</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "30%", width: "24%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-field anim-grow s2" style={{ left: "28%", width: "20%", background: "var(--brass)" }} title="Corroborated Field Progress" />
                  </div>
                </div>
                <div className="gantt-row">
                  <span className="lab">Core Wall Formwork — L3</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "54%", width: "28%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-crit anim-grow s3" style={{ left: "49%", width: "25%", background: "var(--brand)" }} title="Critical Path Slip Identified" />
                    <span className="gtick data" style={{ left: "52%" }} />
                  </div>
                </div>
              </div>

              {/* Dynamic flowline vector */}
              <svg viewBox="0 0 320 44" width="100%" height="44" style={{ marginTop: 14 }} aria-hidden="true">
                <polyline
                  points="6,32 64,32 64,16 150,16 150,30 244,30 244,12 314,12"
                  fill="none"
                  style={{ stroke: "var(--line-strong)" }}
                  strokeWidth="1.5"
                />
                <polyline
                  points="6,32 64,32 64,16 150,16 150,30 244,30 244,12 314,12"
                  fill="none"
                  style={{ stroke: "var(--brand)" }}
                  strokeWidth="1.75"
                  className="anim-flow"
                />
                <circle cx="6" cy="32" r="3.5" style={{ fill: "var(--steel)" }} />
                <circle cx="64" cy="16" r="3.5" style={{ fill: "var(--brass)" }} />
                <circle cx="150" cy="30" r="3.5" style={{ fill: "var(--brass)" }} />
                <circle cx="244" cy="12" r="3.5" style={{ fill: "var(--brand)" }} />
                <circle cx="314" cy="12" r="3.5" style={{ fill: "none", stroke: "var(--brand)" }} strokeWidth="1.5" />
              </svg>

              <div className="row between mt-3" style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 10 }}>
                <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Sparkles className="ico" style={{ width: 12, height: 12, color: "var(--brass)" }} />
                  4 field signals matched to CPM node #A1090
                </span>
                <span className="status xs" style={{ color: "var(--brand)" }}>
                  <ShieldAlert className="ico" style={{ width: 12, height: 12, color: "var(--brand)" }} />
                  +4d critical float variance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
