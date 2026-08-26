/**
 * SyncPro v2 — chrome primitives + reveal engine.
 * Motion system: direction-aware reveals (slide-down from above /
 * rise-up), staggered children, masked-line headlines, blur-in.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollFx, Magnetic } from "./Motion";

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
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const r = useReveal();
  return (
    <div
      ref={r.ref}
      className={`rv rv-${variant}${r.shown ? " in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Masked-line headline: each child line is clipped and slides DOWN
 * into view (SignalIQ's signature move). Wrap each line in <span>.
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

/* ---------------- nav ---------------- */

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  useScrollFx((_y, _m, dy) => {
    const y = window.scrollY;
    const shouldHide = dy > 2 && y > 140;
    const shouldShow = dy < -2 || y <= 140;
    setHidden((prev) => {
      if (shouldHide && !prev) return true;
      if (shouldShow && prev) return false;
      return prev;
    });
  });

  return (
    <header ref={ref} className={`v2nav${hidden ? " hide" : ""}`}>
      <div className="v2nav-in">
        <a className="wordmark" href="#top" aria-label="SyncPro home">
          SYNCPRO<span className="wm-dot">.</span>
        </a>

        <nav className="v2nav-links desktop-nav mono xs">
          <a href="#narrative" className="v2nav-a">Signal Engine</a>
          <a href="#twin" className="v2nav-a">3D Twin</a>
          <a href="#sandbox" className="v2nav-a">ROI Sandbox</a>
          <a href="#platform" className="v2nav-a">Platform</a>
          <a href="#faq" className="v2nav-a">FAQ</a>
        </nav>

        <Magnetic>
          <a className="v2cta" href="#pilot">
            Request Pilot <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}

/* ---------------- brand marquee ---------------- */

export function BrandMarquee() {
  return (
    <div className="brandband" aria-hidden="true">
      <div className="brandtrack">
        {[0, 1].map((half) => (
          <div className="brandrow" key={half}>
            {Array.from({ length: 8 }, (_, i) => (
              <span className="brandname" key={i}>SYNCPRO</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- footer ---------------- */

export function Footer() {
  const r = useReveal();
  return (
    <footer className="v2footer" id="contact">
      <div ref={r.ref} className={`foot-in ${r.shown ? "in" : ""}`}>
        <MaskLines
          as="h2"
          className={`foot-h ${r.shown ? "in" : ""}`}
          baseDelay={80}
          lines={[
            <>The complete</>,
            <>Schedule Intelligence Engine.</>,
          ]}
        />
        <Reveal variant="up" delay={260}>
          <p className="foot-mailrow">
            <Magnetic>
              <a className="foot-mail" href="mailto:founders@syncpro.org">
                founders@syncpro.org <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </p>
        </Reveal>
        <div className="foot-meta mono xs">
          <span>SET FOR THE MEGAPROJECT ERA</span>
          <span>© 2026 SYNCPRO · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
