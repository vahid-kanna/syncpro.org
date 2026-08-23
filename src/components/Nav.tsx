import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="nav-header"
      style={{
        height: "64px",
        background: "rgba(11, 12, 14, 0.85)",
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
        {/* Left: Brand + Badge */}
        <div className="row gap-3" style={{ alignItems: "center" }}>
          <Brand />
          <span
            className="mono xs desktop-nav"
            style={{
              color: "var(--text-3)",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--line-soft)",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              letterSpacing: "0.04em",
            }}
          >
            SYS.NODE_01
          </span>
        </div>

        {/* Center: Clean Spaced Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: "13.5px",
            fontWeight: 500,
          }}
        >
          {[
            { label: "What We Do", href: "#what-we-do" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "3D Digital Twin", href: "#digital-twin-studio" },
            { label: "Schedule Health", href: "#dcma-scanner" },
            { label: "ROI Sandbox", href: "#financial-sandbox" },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -1, color: "#FFFFFF" }}
              transition={{ duration: 0.15 }}
              style={{
                color: "var(--text-2)",
                textDecoration: "none",
                padding: "6px 8px",
                position: "relative",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right: UTC Status + Primary Action */}
        <div className="row gap-4" style={{ alignItems: "center" }}>
          <div className="desktop-nav row gap-2 mono xs" style={{ color: "var(--brass)", fontSize: "12px" }}>
            <Radio className="ico pulse" style={{ width: 12, height: 12, color: "var(--brand)" }} />
            <span>{time || "00:00:00 UTC"}</span>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary mono xs"
            href="#waitlist"
            style={{
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "9px 18px",
              borderRadius: "var(--r-xs)",
              fontSize: "12px",
              boxShadow: "0 0 20px rgba(217, 119, 87, 0.25)",
            }}
          >
            INITIALIZE_PILOT
            <ArrowRight className="ico" style={{ width: 13, height: 13, marginLeft: 4 }} />
          </motion.a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="btn btn-outline mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            style={{
              width: 38,
              height: 38,
              padding: 0,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--line-strong)",
              borderRadius: "var(--r-xs)",
            }}
          >
            {mobileOpen ? <X className="ico" /> : <Menu className="ico" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-drawer"
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              right: 0,
              background: "rgba(14, 15, 18, 0.98)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--line-strong)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              zIndex: 100,
              boxShadow: "var(--shadow-pop)",
            }}
          >
            <div className="row between pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs dim">NAVIGATION MENU</span>
              <div className="row gap-2 mono xs" style={{ color: "var(--brass)" }}>
                <Radio className="ico pulse" style={{ width: 11, height: 11, color: "var(--brand)" }} />
                <span>{time || "00:00:00 UTC"}</span>
              </div>
            </div>
            {[
              { label: "What We Do", href: "#what-we-do" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "3D Digital Twin", href: "#digital-twin-studio" },
              { label: "Schedule Health", href: "#dcma-scanner" },
              { label: "ROI Sandbox", href: "#financial-sandbox" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ color: "var(--text)", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a
              className="btn btn-primary mono xs"
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              style={{ marginTop: 8, justifyContent: "center", padding: "12px", fontWeight: 700 }}
            >
              INITIALIZE_PILOT <ArrowRight className="ico" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
