import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="nav"
      style={{
        borderBottomColor: scrolled ? "var(--line-strong)" : "var(--line)",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <div className="wrap-lg row between" style={{ height: "100%" }}>
        <div className="row gap-6">
          <Brand />
          <nav className="topnav desktop-nav" style={{ marginLeft: 12 }}>
            <a href="#problem">The Problem</a>
            <a href="#how">How It Works</a>
            <a href="#demo">Live Pipeline</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#roi">ROI Model</a>
            <a href="#who">Who It's For</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>

        <div className="row gap-3">
          <a className="btn btn-primary btn-sm" href="#waitlist">
            Request Early Access
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
            top: "58px",
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
          <a
            href="#problem"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            The Problem
          </a>
          <a
            href="#how"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            How It Works
          </a>
          <a
            href="#demo"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            Live Pipeline
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            Capabilities
          </a>
          <a
            href="#roi"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            ROI Model
          </a>
          <a
            href="#who"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            Who It's For
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            style={{ padding: "8px 0", color: "var(--text)", fontSize: 15 }}
          >
            FAQ
          </a>
          <a
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary btn-sm mt-2"
            style={{ justifyContent: "center" }}
          >
            Request Early Access
          </a>
        </div>
      )}
    </div>
  );
}
