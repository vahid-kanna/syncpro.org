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
    <header
      className="nav-header"
      style={{
        height: "64px",
        background: "rgba(11, 12, 14, 0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="wrap-lg row between" style={{ width: "100%", alignItems: "center" }}>
        {/* Left: Brand + System Indicator */}
        <div className="row gap-3" style={{ alignItems: "center" }}>
          <Brand />
          <span
            className="mono xs desktop-nav"
            style={{
              color: "var(--text-3)",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--line-soft)",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              letterSpacing: "0.04em",
            }}
          >
            SYS.NODE_01
          </span>
        </div>

        {/* Center: Clean, Spaced Navigation Links */}
        <nav
          className="desktop-nav row gap-7"
          style={{
            alignItems: "center",
            fontSize: "13.5px",
            fontWeight: 500,
          }}
        >
          <a
            href="#signal-deconstructor"
            style={{ color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Signal Deconstructor
          </a>
          <a
            href="#digital-twin-studio"
            style={{ color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Digital Twin
          </a>
          <a
            href="#dcma-scanner"
            style={{ color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Schedule Health
          </a>
          <a
            href="#claims-shield"
            style={{ color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Dispute Shield
          </a>
          <a
            href="#financial-sandbox"
            style={{ color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
          >
            Capital Sandbox
          </a>
        </nav>

        {/* Right: Real-Time Clock + Action Button */}
        <div className="row gap-4" style={{ alignItems: "center" }}>
          <div className="desktop-nav row gap-2 mono xs" style={{ color: "var(--brass)", fontSize: "12px" }}>
            <Radio className="ico pulse" style={{ width: 12, height: 12, color: "var(--brand)" }} />
            <span>{time || "00:00:00 UTC"}</span>
          </div>

          <a
            className="btn btn-primary mono xs"
            href="#waitlist"
            style={{
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "9px 18px",
              borderRadius: "var(--r-xs)",
              fontSize: "12px",
            }}
          >
            INITIALIZE_PILOT
            <ArrowRight className="ico" style={{ width: 13, height: 13, marginLeft: 4 }} />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="btn btn-outline mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            style={{ width: 36, height: 36, padding: 0, justifyContent: "center" }}
          >
            {mobileOpen ? <X className="ico" /> : <Menu className="ico" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--line-strong)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            zIndex: 100,
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <a
            href="#signal-deconstructor"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text)", textDecoration: "none", fontSize: "14px" }}
          >
            Signal Deconstructor
          </a>
          <a
            href="#digital-twin-studio"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text)", textDecoration: "none", fontSize: "14px" }}
          >
            3D Digital Twin
          </a>
          <a
            href="#dcma-scanner"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text)", textDecoration: "none", fontSize: "14px" }}
          >
            DCMA-14 Diagnostics
          </a>
          <a
            href="#claims-shield"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text)", textDecoration: "none", fontSize: "14px" }}
          >
            Dispute Defense Shield
          </a>
          <a
            href="#financial-sandbox"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text)", textDecoration: "none", fontSize: "14px" }}
          >
            Capital Exposure Sandbox
          </a>
          <a
            className="btn btn-primary btn-sm mono xs"
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            style={{ marginTop: 8, justifyContent: "center", padding: "10px" }}
          >
            INITIALIZE_PILOT
          </a>
        </div>
      )}
    </header>
  );
}
