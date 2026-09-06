/**
 * SyncPro v2 — Chrome primitives (Nav, Footer, BrandMarquee, Reveal, MaskLines)
 * Sourced directly from Astra's ZeroEka-benchmarked elegance blueprint:
 * High-clarity sticky glassmorphic navigation, industry standard marquee,
 * and institutional footer with Sudha & Shankar Innovation Hub, IIT Madras attribution.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollFx, Magnetic } from "./Motion";
import { ArrowUpRight } from "lucide-react";

/* ---------------- reveal engine ---------------- */

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-70px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return { ref, shown };
}

type Variant = "up" | "down" | "fade" | "left";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  id,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const r = useReveal();
  return (
    <div
      id={id}
      ref={r.ref}
      className={`rv rv-${variant}${r.shown ? " in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function MaskLines({
  lines,
  className = "",
  baseDelay = 0,
  step = 130,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  baseDelay?: number;
  step?: number;
  as?: "h1" | "h2";
}) {
  const r = useReveal();
  return (
    <Tag ref={r.ref as never} className={`mlines${r.shown ? " in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span className="mline" key={i}>
          <span className="mline-in" style={{ transitionDelay: `${baseDelay + i * step}ms` }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function scrollToId(id: string, _focus?: boolean) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    if (_focus) {
      const input = el.querySelector("input, select, textarea, button") as HTMLElement | null;
      if (input) setTimeout(() => input.focus(), 400);
    }
  }
}

/* ---------------- Navigation Bar ---------------- */

export function Nav({ onOpenPilot }: { onOpenPilot: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useScrollFx((_y, _m, dy) => {
    const y = window.scrollY;
    const shouldHide = dy > 3 && y > 140;
    const shouldShow = dy < -3 || y <= 140;
    setHidden((prev) => {
      if (shouldHide && !prev) return true;
      if (shouldShow && prev) return false;
      return prev;
    });
  });

  return (
    <header ref={ref} className={`v2nav${hidden ? " hide" : ""}`}>
      <div className="v2nav-in">
        {/* Brand Wordmark */}
        <div className="nav-brand-group">
          <a className="wordmark" href="#top" aria-label="SyncPro home">
            SYNCPRO<span className="wm-dot">.</span>
          </a>
          <span className="nav-telemetry mono xs dim">NIRMAAN · IIT MADRAS</span>
        </div>

        {/* Clean, Non-Overwhelming Nav Anchors */}
        <nav className="nav-anchors mono xs dim" aria-label="Main navigation">
          <a href="#shift">The Shift</a>
          <a href="#workflow">Capabilities</a>
          <a href="#console">The Console</a>
          <a href="#exposure">Exposure</a>
          <a href="#pilot">Pilot</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* Primary CTA */}
        <div className="nav-actions">
          <Magnetic>
            <button type="button" className="v2cta mono xs" onClick={onOpenPilot}>
              Discuss a Pilot <ArrowUpRight className="ico-xs" />
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Brand Marquee ---------------- */

const MARQUEE_ITEMS = [
  "ORACLE PRIMAVERA P6 (.XER)",
  "ASTA POWERPROJECT (.PP)",
  "MICROSOFT PROJECT (.MPP)",
  "DCMA 14-POINT QUALITY AUDIT",
  "FIDIC CLAUSE 8.4 & 20.1",
  "SCL DELAY PROTOCOL",
  "NEO4J CPM GRAPH ENGINE",
  "IMMUTABLE AS-BUILT AUDIT LEDGER",
];

export function BrandMarquee() {
  return (
    <div className="brandband" aria-hidden="true">
      <div className="brandtrack">
        {[0, 1].map((half) => (
          <div className="brandrow" key={half}>
            {MARQUEE_ITEMS.map((name, i) => (
              <span className="brandname mono" key={`${half}-${i}`}>
                {name} <span className="brand-dot">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Institutional Footer ---------------- */

export function Footer({ onOpenPilot }: { onOpenPilot: () => void }) {
  const r = useReveal();
  return (
    <footer className="v2footer" id="contact">
      <div ref={r.ref} className={`foot-in ${r.shown ? "in" : ""}`}>
        {/* Top Split */}
        <div className="footer-top-split">
          <div className="foot-brand-col">
            <a className="wordmark" href="#top">SYNCPRO<span className="wm-dot">.</span></a>
            <p className="foot-motto xs dim mt-2">
              Schedule intelligence.<br />
              Built around the realities of megaproject delivery.
            </p>
          </div>

          <div className="foot-incubator-col mono xs dim">
            <p className="foot-addr">
              Pre-incubated at Nirmaan, IIT Madras.<br />
              Sudha &amp; Shankar Innovation Hub<br />
              IIT Madras, Chennai 600036, India.
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="foot-action-row mt-4">
          <button type="button" className="hero-btn mono xs" onClick={onOpenPilot}>
            Discuss a Pilot <ArrowUpRight className="ico-xs" />
          </button>
          <a className="foot-mail mono xs" href="mailto:founders@syncpro.org">
            founders@syncpro.org <ArrowUpRight className="ico-xs" />
          </a>
        </div>

        {/* Monolithic Wordmark Accent */}
        <div className="footer-word mono" aria-hidden="true">
          SYNCPRO.
        </div>

        {/* Bottom Metadata */}
        <div className="foot-meta mono xs">
          <span>© 2026 SYNCPRO · ALL RIGHTS RESERVED</span>
          <div className="foot-links">
            <a href="#intake">Contact</a>
            <span className="dim">·</span>
            <a href="#faq">FAQ</a>
            <span className="dim">·</span>
            <span className="dim">In Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
