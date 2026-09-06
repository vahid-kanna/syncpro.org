/**
 * SyncPro v2 — Chrome primitives (Nav, Footer, BrandMarquee, Reveal, MaskLines)
 * Upgraded directly to Astra's master design blueprint:
 * High-contrast glassmorphic navbar with telemetry badge,
 * enterprise industry standards marquee, and monolithic institutional footer.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollFx, Magnetic } from "./Motion";
import { ShieldCheck, ArrowUpRight, Award, GitBranch } from "lucide-react";

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

/**
 * Masked-line headline: each child line is clipped and slides into view.
 */
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

/* ---------------- nav ---------------- */

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
          <span className="nav-telemetry mono xs dim">DEMO · P4 VIADUCT</span>
        </div>

        {/* Navigation Anchors */}
        <nav className="nav-anchors mono xs dim" aria-label="Page sections">
          <a href="#control-room">Control Room</a>
          <a href="#forensic-gap">The Gap</a>
          <a href="#exposure">Exposure</a>
          <a href="#engines">4 Engines</a>
          <a href="#architecture">Architecture</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* Primary CTA */}
        <div className="nav-actions">
          <Magnetic>
            <button type="button" className="v2cta mono xs" onClick={onOpenPilot}>
              Request Pilot <span aria-hidden="true">→</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

/* ---------------- brand marquee ---------------- */

const MARQUEE_ITEMS = [
  "ORACLE PRIMAVERA P6 (.XER)",
  "ASTA POWERPROJECT (.PP)",
  "MICROSOFT PROJECT (.MPP)",
  "FIDIC CLAUSE 8.4 & 20.1",
  "DCMA 14-POINT QUALITY",
  "NEO4J CPM GRAPH",
  "RERA SECTION 18",
  "SCL DELAY PROTOCOL",
  "FASTAPI SCHEDULER",
  "CRYPTOGRAPHIC AUDIT LEDGER",
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

/* ---------------- footer ---------------- */

export function Footer({ onOpenPilot }: { onOpenPilot: () => void }) {
  const r = useReveal();
  return (
    <footer className="v2footer" id="contact">
      <div ref={r.ref} className={`foot-in ${r.shown ? "in" : ""}`}>
        {/* Foot Headline */}
        <div className="foot-head-wrap">
          <span className="mono xs dim mb-2 d-block">THE AI PROJECT CONTROLS ENGINEER</span>
          <h2 className="foot-display">
            Earn the right to update <br />
            <span className="foot-italic">the construction schedule.</span>
          </h2>
        </div>

        {/* Action Row */}
        <div className="foot-action-row">
          <button type="button" className="hero-btn mono xs" onClick={onOpenPilot}>
            Request Enterprise Pilot <span aria-hidden="true">→</span>
          </button>
          <a className="foot-mail mono xs" href="mailto:founders@syncpro.org">
            founders@syncpro.org <ArrowUpRight className="ico-xs" />
          </a>
        </div>

        {/* Institutional & Standard Badges */}
        <div className="foot-badges-grid mono xs dim">
          <div className="badge-cell">
            <Award className="ico-xs acc" />
            <span>INCUBATED AT NIRMAAN, IIT MADRAS</span>
          </div>
          <div className="badge-cell">
            <ShieldCheck className="ico-xs ok" />
            <span>SCL DELAY PROTOCOL &amp; FIDIC 8.4 / 20.1 COMPLIANT</span>
          </div>
          <div className="badge-cell">
            <GitBranch className="ico-xs warn" />
            <span>DCMA 14-POINT SCHEDULE INTEGRITY AUDIT</span>
          </div>
        </div>

        {/* Bottom Legal Meta */}
        <div className="foot-meta mono xs">
          <span>SYNCPRO TECHNOLOGIES · SET FOR THE MEGAPROJECT ERA</span>
          <span>© 2026 SYNCPRO · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
