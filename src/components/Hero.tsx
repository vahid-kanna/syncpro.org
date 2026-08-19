import { ArrowRight, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, ShieldCheck, Activity } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function Hero() {
  const reveal = useReveal();

  return (
    <header
      id="hero"
      className="hero-panoramic-frame"
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "72px",
        paddingBottom: "48px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Full-Bleed Panoramic Background Image & Motion Layer */}
      <div
        className="panoramic-bg-layer"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <img
          src="/panoramic-command.jpg"
          alt="Cinematic Megaproject Infrastructure at Night"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "brightness(0.55) contrast(1.15)",
            transform: "scale(1.03)",
          }}
        />

        {/* Ambient Dark Gradients for Text Legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,9,12,0.85) 0%, rgba(8,9,12,0.45) 45%, rgba(8,9,12,0.95) 100%), linear-gradient(90deg, rgba(8,9,12,0.9) 0%, rgba(8,9,12,0.3) 60%, rgba(8,9,12,0.85) 100%)",
          }}
        />

        {/* Architectural CAD Grid Hairlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="wrap-lg" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div ref={reveal.ref} className={reveal.className} style={{ maxWidth: "840px" }}>
          {/* System Badge */}
          <div
            className="mb-4 row gap-2"
            style={{
              border: "1px solid var(--line-strong)",
              padding: "5px 14px",
              background: "rgba(10, 11, 14, 0.85)",
              backdropFilter: "blur(12px)",
              width: "max-content",
              borderRadius: "var(--r-xs)",
            }}
          >
            <span className="sdot pulse" style={{ background: "var(--brand)" }} />
            <span className="mono xs" style={{ color: "var(--brass)", letterSpacing: "0.08em" }}>
              SYS.NODE_01 // DCMA-14 COMPLIANT // FIDIC CLAIMS SHIELD
            </span>
          </div>

          {/* Large Architectural Headline */}
          <h1
            className="display"
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontSize: "clamp(42px, 5.8vw, 76px)",
              textShadow: "0 4px 24px rgba(0,0,0,0.8)",
            }}
          >
            The Schedule <br />
            <span style={{ color: "var(--brass)", paddingLeft: "16px", display: "inline-block" }}>
              Never Lies.
            </span> <br />
            Neither Do We.
          </h1>

          {/* Subheading */}
          <p
            className="lead mt-5 measure"
            style={{
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "var(--text-2)",
              textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              lineHeight: 1.6,
            }}
          >
            SyncPro is the AI Project Controls Engineer for capital megaprojects. It resolves unstructured site language
            to exact CPM activities, corroborates evidence across delivery dockets &amp; QA slips, and produces
            tamper-evident audit records — so every update is a defensible fact, not a data-entry event.
          </p>

          {/* Sequence Action Buttons */}
          <div className="row gap-4 mt-8 wrapf">
            <a
              className="btn btn-primary btn-lg mono xs"
              href="#waitlist"
              style={{
                fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "14px 28px",
                fontSize: "13px",
              }}
            >
              INITIALIZE_SEQUENCE
              <ArrowRight className="ico" />
            </a>
            <a
              className="btn btn-outline btn-lg mono xs"
              href="#digital-twin-studio"
              style={{
                letterSpacing: "0.06em",
                padding: "14px 24px",
                fontSize: "13px",
                background: "rgba(10, 11, 14, 0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              INSPECT_3D_DIGITAL_TWIN
              <ChevronRight className="ico" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="row gap-4 mt-6 wrapf" style={{ alignItems: "center" }}>
            <div className="status" style={{ background: "rgba(10, 11, 14, 0.8)", padding: "4px 10px", borderRadius: 4 }}>
              <span className="sdot sdot-live pulse" style={{ background: "var(--brand)" }} /> Onboarding first cohort of design partners
            </div>
            <div className="row gap-2 xs dim" style={{ borderLeft: "1px solid var(--line)", paddingLeft: 14 }}>
              <ShieldCheck className="ico" style={{ width: 14, height: 14, color: "var(--brass)" }} />
              <span>SOC 2 Type II Ready · Zero Model Training on Client P6 Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Reconciled CPM Stream Console */}
      <div
        className="wrap-lg mt-10"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div
          className="card"
          style={{
            background: "rgba(12, 14, 19, 0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--line-strong)",
            padding: "18px 24px",
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <div className="row between mb-3 wrapf">
            <div className="row gap-3">
              <span className="status xs">
                <Activity className="ico pulse" style={{ width: 12, height: 12, color: "var(--brand)" }} />
                LIVE_SHADOW_SCHEDULE // RECONCILIATION_STREAM
              </span>
              <span className="mono xs dim desktop-nav">PROJECT: TOWER_A_COMMERCIAL_CORE</span>
            </div>
            <div className="row gap-3">
              <span className="tag" style={{ background: "var(--brass-bg)", color: "var(--brass)", borderColor: "var(--brass-line)" }}>
                <CheckCircle2 className="ico" style={{ width: 11, height: 11, marginRight: 3 }} />
                94.8% Multi-Source Trust Score
              </span>
              <span className="mono xs dim">UPDATED: 2 SECONDS AGO</span>
            </div>
          </div>

          {/* Full-width Gantt Stream */}
          <div className="gantt">
            <div className="gantt-row">
              <span className="lab" style={{ fontSize: 11.5 }}>L18 Core Shear Wall Pour</span>
              <div className="gtrack">
                <div className="gbar gbar-plan" style={{ left: "2%", width: "28%" }} title="Planned Baseline" />
                <div className="gbar gbar-field anim-grow s1" style={{ left: "2%", width: "28%", background: "var(--brass)" }} title="Corroborated Field Progress" />
              </div>
            </div>
            <div className="gantt-row">
              <span className="lab" style={{ fontSize: 11.5 }}>North Facade Curtain Wall</span>
              <div className="gtrack">
                <div className="gbar gbar-plan" style={{ left: "32%", width: "30%" }} title="Planned Baseline" />
                <div className="gbar gbar-crit anim-grow s2" style={{ left: "30%", width: "26%", background: "var(--brand)" }} title="Critical Path Slip Identified" />
                <span className="gtick data" style={{ left: "34%" }} />
              </div>
            </div>
            <div className="gantt-row">
              <span className="lab" style={{ fontSize: 11.5 }}>MEP Riser Shaft Penetrations</span>
              <div className="gtrack">
                <div className="gbar gbar-plan" style={{ left: "64%", width: "32%" }} title="Planned Baseline" />
                <div className="gbar gbar-field anim-grow s3" style={{ left: "64%", width: "32%", background: "var(--brass)" }} title="Corroborated Field Progress" />
              </div>
            </div>
          </div>

          <div className="row between mt-3 pt-2" style={{ borderTop: "1px solid var(--line-soft)" }}>
            <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles className="ico" style={{ width: 12, height: 12, color: "var(--brass)" }} />
              Deterministic Neo4j match: 4 field dockets reconciled to CPM Node #A1084
            </span>
            <span className="status xs" style={{ color: "var(--brand)" }}>
              <ShieldAlert className="ico" style={{ width: 12, height: 12, color: "var(--brand)" }} />
              +0.00d critical float slip staged
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
