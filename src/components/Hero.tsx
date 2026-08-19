import { ArrowRight, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function Hero() {
  const reveal = useReveal();

  return (
    <header className="wrap-lg blueprint" style={{ position: "relative", paddingTop: 72, paddingBottom: 64, overflow: "hidden" }}>
      {/* Background Architectural Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" aria-hidden="true">
        <div style={{ position: "absolute", left: "25%", top: 0, bottom: 0, width: "1px", background: "var(--line)" }} />
        <div style={{ position: "absolute", right: "25%", top: 0, bottom: 0, width: "1px", background: "var(--line)" }} />
        <div style={{ position: "absolute", top: "35%", left: 0, right: 0, height: "1px", background: "var(--line)" }} />
      </div>

      <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>
        {/* Left Column: Bold Architectural Headline & Controls */}
        <div ref={reveal.ref} className={reveal.className}>
          <div className="mb-4 row gap-2" style={{ border: "1px solid var(--line)", padding: "4px 12px", background: "var(--bg-sunken)", width: "max-content" }}>
            <span className="sdot pulse" style={{ background: "var(--brand)" }} />
            <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
              SYS.STATUS: OPERATIONAL // DCMA-14 VERIFIED
            </span>
          </div>

          <h1 className="display" style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            The Schedule <br />
            <span style={{ color: "var(--text-3)", paddingLeft: "18px", display: "inline-block" }}>Never Lies.</span> <br />
            Neither Do We.
          </h1>

          <p className="lead mt-5 measure">
            SyncPro is the AI Project Controls Engineer for heavy civil &amp; megaprojects. It resolves unstructured
            site language to exact CPM activities, corroborates evidence across delivery dockets &amp; QA slips,
            and produces tamper-evident audit records — so every update is a defensible fact, not a data-entry event.
          </p>

          <div className="row gap-3 mt-8 wrapf">
            <a className="btn btn-primary btn-lg mono xs" href="#waitlist" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              INITIALIZE_SEQUENCE
              <ArrowRight className="ico" />
            </a>
            <a className="btn btn-outline btn-lg mono xs" href="#demo" style={{ letterSpacing: "0.05em" }}>
              VIEW_TELEMETRY
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

        {/* Right Column: Architectural CAD Render + Live CPM Overlay Terminal */}
        <div className="reveal d2" style={{ position: "relative" }}>
          {/* Main Visual Frame */}
          <div
            className="cad-image-frame"
            style={{
              position: "relative",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line-strong)",
              background: "var(--bg-sunken)",
              overflow: "hidden",
              boxShadow: "var(--shadow-pop)",
            }}
          >
            {/* Architectural Header Tag */}
            <div
              className="row between px-3 py-2"
              style={{
                background: "rgba(10, 11, 14, 0.95)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11,
              }}
            >
              <span className="mono xs" style={{ color: "var(--brass)" }}>
                [FIG.A1-WIREFRAME] // MEGAPROJECT_CORE_TOWER
              </span>
              <span className="mono xs dim">FOV: 45° · SECTOR_07</span>
            </div>

            {/* AI Generated Photorealistic Megaproject CAD Asset */}
            <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden" }}>
              <img
                src="/hero-cad.jpg"
                alt="Megaproject Skyscraper Under Construction with CAD Overlays"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "contrast(1.08) brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(10,11,14,0.1) 0%, rgba(10,11,14,0.7) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Embedded Live Planned vs Field Reconciliation Gantt Bar */}
            <div style={{ padding: "16px 20px", background: "rgba(15, 17, 22, 0.95)" }}>
              <div className="row between mb-2">
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
                  <span className="lab" style={{ fontSize: 11 }}>Columns — L2 Pour</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "4%", width: "26%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-field anim-grow s1" style={{ left: "4%", width: "26%", background: "var(--brass)" }} title="Corroborated Field Progress" />
                  </div>
                </div>
                <div className="gantt-row">
                  <span className="lab" style={{ fontSize: 11 }}>Slab Post-Tensioning</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "30%", width: "24%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-field anim-grow s2" style={{ left: "28%", width: "20%", background: "var(--brass)" }} title="Corroborated Field Progress" />
                  </div>
                </div>
                <div className="gantt-row">
                  <span className="lab" style={{ fontSize: 11 }}>Core Wall Formwork</span>
                  <div className="gtrack">
                    <div className="gbar gbar-plan" style={{ left: "54%", width: "28%" }} title="Planned (Baseline)" />
                    <div className="gbar gbar-crit anim-grow s3" style={{ left: "49%", width: "25%", background: "var(--brand)" }} title="Critical Path Slip Identified" />
                    <span className="gtick data" style={{ left: "52%" }} />
                  </div>
                </div>
              </div>

              <div className="row between mt-3" style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 8 }}>
                <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Sparkles className="ico" style={{ width: 12, height: 12, color: "var(--brass)" }} />
                  4 field signals matched to CPM node #A1090
                </span>
                <span className="status xs" style={{ color: "var(--brand)" }}>
                  <ShieldAlert className="ico" style={{ width: 12, height: 12, color: "var(--brand)" }} />
                  +4d float variance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
