import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brand } from "./Brand";
import { ArrowRight, Menu, X, Radio } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "sticky",
        top: "16px",
        zIndex: 50,
        width: "100%",
        padding: "0 20px",
        pointerEvents: "none",
      }}
    >
      <div
        className="wrap-lg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: scrolled ? "rgba(8, 9, 12, 0.88)" : "rgba(14, 16, 22, 0.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--line-strong)",
          borderRadius: "var(--r-full)",
          boxShadow: scrolled ? "0 20px 40px rgba(0, 0, 0, 0.7)" : "0 8px 30px rgba(0, 0, 0, 0.4)",
          transition: "all 0.3s ease",
          pointerEvents: "auto",
        }}
      >
        {/* Left: Brand + System Status */}
        <div className="row gap-3" style={{ alignItems: "center" }}>
          <Brand />
          <span
            className="mono xs desktop-nav"
            style={{
              color: "var(--brand-300)",
              background: "var(--brand-bg)",
              border: "1px solid var(--brand-line)",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            SYS.CORE_01
          </span>
        </div>

        {/* Center: Clean Spaced Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "13.5px",
            fontWeight: 500,
          }}
        >
          {[
            { label: "What We Do", href: "#what-we-do" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "3D Digital Twin", href: "#digital-twin-studio" },
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
          <div className="desktop-nav row gap-2 mono xs" style={{ color: "var(--accent)", fontSize: "12px" }}>
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
              padding: "8px 18px",
              borderRadius: "var(--r-full)",
              fontSize: "12px",
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
              width: 36,
              height: 36,
              padding: 0,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--line-strong)",
              borderRadius: "var(--r-full)",
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
              top: "72px",
              left: 20,
              right: 20,
              background: "rgba(8, 9, 12, 0.98)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--line-strong)",
              borderRadius: "var(--r-lg)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              zIndex: 100,
              boxShadow: "var(--shadow-pop)",
              pointerEvents: "auto",
            }}
          >
            <div className="row between pb-2" style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <span className="mono xs dim">NAVIGATION MENU</span>
              <div className="row gap-2 mono xs" style={{ color: "var(--accent)" }}>
                <Radio className="ico pulse" style={{ width: 11, height: 11, color: "var(--brand)" }} />
                <span>{time || "00:00:00 UTC"}</span>
              </div>
            </div>
            {[
              { label: "What We Do", href: "#what-we-do" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "3D Digital Twin", href: "#digital-twin-studio" },
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
