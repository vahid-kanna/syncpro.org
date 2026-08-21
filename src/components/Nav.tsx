import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Radio } from "lucide-react";
import { Brand } from "./Brand";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="nav"
      style={{
        height: "56px",
        background: "rgba(11, 12, 14, 0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="wrap-lg row between" style={{ height: "100%" }}>
        {/* Left: Brand + System Version */}
        <div className="row gap-4">
          <Brand />
          <span
            className="mono xs desktop-nav"
            style={{
              color: "var(--text-3)",
              borderLeft: "1px solid var(--line)",
              paddingLeft: "14px",
              letterSpacing: "0.06em",
            }}
          >
            SYS.NODE_01 // PROD
          </span>
        </div>

        {/* Center: Monospaced Telemetry Navigation */}
        <nav className="desktop-nav row gap-5 mono xs" style={{ letterSpacing: "0.07em" }}>
          <a href="#hero" className="nav-link">TIME_MACHINE</a>
          <a href="#signal-deconstructor" className="nav-link">DECONSTRUCTOR</a>
          <a href="#digital-twin-studio" className="nav-link">DIGITAL_TWIN</a>
          <a href="#dcma-scanner" className="nav-link">DCMA_14</a>
          <a href="#claims-shield" className="nav-link">DISPUTE_SHIELD</a>
          <a href="#financial-sandbox" className="nav-link">CAPITAL_SANDBOX</a>
        </nav>

        {/* Right: Real-Time Clock + Action */}
        <div className="row gap-4">
          <div className="desktop-nav row gap-2 mono xs" style={{ color: "var(--brass)" }}>
            <Radio className="ico pulse" style={{ width: 12, height: 12, color: "var(--brand)" }} />
            <span>{time || "00:00:00 UTC"}</span>
          </div>

          <a className="btn btn-primary btn-sm mono xs" href="#waitlist" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
            INITIALIZE_PILOT
            <ArrowRight className="ico" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="btn btn-outline btn-sm mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            style={{ width: 34, padding: 0 }}
          >
            {mobileOpen ? <X className="ico" /> : <Menu className="ico" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer dropdown */}
      {mobileOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--line-strong)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 100,
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <a href="#hero" className="nav-link" onClick={() => setMobileOpen(false)}>TIME_MACHINE</a>
          <a href="#signal-deconstructor" className="nav-link" onClick={() => setMobileOpen(false)}>SIGNAL_DECONSTRUCTOR</a>
          <a href="#digital-twin-studio" className="nav-link" onClick={() => setMobileOpen(false)}>3D_DIGITAL_TWIN</a>
          <a href="#dcma-scanner" className="nav-link" onClick={() => setMobileOpen(false)}>DCMA_14_DIAGNOSTICS</a>
          <a href="#claims-shield" className="nav-link" onClick={() => setMobileOpen(false)}>DISPUTE_SHIELD</a>
          <a href="#financial-sandbox" className="nav-link" onClick={() => setMobileOpen(false)}>CAPITAL_SANDBOX</a>
          <a
            className="btn btn-primary btn-sm mono xs"
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            style={{ marginTop: 8, justifyContent: "center" }}
          >
            INITIALIZE_PILOT
          </a>
        </div>
      )}
    </div>
  );
}
