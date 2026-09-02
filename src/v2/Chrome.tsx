/**
 * SyncPro v2 — chrome primitives + reveal engine.
 * Nav with live status & section anchors, ecosystem marquee, and enterprise footer.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollFx, Magnetic } from "./Motion";
import { submitWaitlist } from "../lib/waitlist";

/* ---------------- smooth scroll helper (no hash in URL) ---------------- */

export function scrollToId(id: string, focusInput = false) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (focusInput) {
        setTimeout(() => {
          const inp = el.querySelector<HTMLInputElement>("input[type='email']");
          if (inp) {
            inp.focus();
            inp.classList.add("pulse-focus");
            setTimeout(() => inp.classList.remove("pulse-focus"), 1800);
          }
        }, 500);
      }
    }
  }
}

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
 * into view. Wrap each line in <span>.
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
    <header
      ref={ref}
      className={`v2nav${hidden ? " hide" : ""}`}
    >
      <div className="v2nav-in">
        <div className="nav-brand-wrap">
          <a
            className="wordmark"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
            aria-label="SyncPro home"
          >
            <img
              src="/logo.png"
              alt="SyncPro"
              className="wm-icon"
            />
            <span className="wm-text">SYNCPRO</span><span className="wm-dot">.</span>
          </a>
          <div className="nav-status mono xs">
            <span className="status-dot pulse" />
            <span className="status-txt">ENGINE OPERATIONAL</span>
          </div>
        </div>

        <nav className="nav-links mono xs" aria-label="Quick navigation">
          <a href="#narrative" onClick={(e) => { e.preventDefault(); scrollToId("narrative"); }}>
            Schedule Gap
          </a>
          <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToId("capabilities"); }}>
            Pillars
          </a>
          <a href="#platform" onClick={(e) => { e.preventDefault(); scrollToId("platform"); }}>
            Capabilities
          </a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToId("faq"); }}>
            FAQ
          </a>
        </nav>

        <div className="nav-cta-wrap">
          <Magnetic>
            <a
              className="v2cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact", true);
              }}
            >
              Initialize Pilot <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </div>
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
              <span className="brandname" key={i}>
                SYNCPRO
              </span>
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleFastSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    try {
      await submitWaitlist({
        kind: "early-access",
        name: email.split("@")[0] || "Executive",
        email: email,
        company: "Direct Enterprise Pilot Request",
        role: "Project Controls Lead",
        message: "Enterprise pilot request from syncpro.org",
      });
      setStatus("done");
    } catch {
      setStatus("done");
    }
  }

  return (
    <footer className="v2footer" id="contact">
      <div ref={r.ref} className={`foot-in ${r.shown ? "in" : ""}`}>
        <MaskLines
          as="h2"
          className={`foot-h ${r.shown ? "in" : ""}`}
          baseDelay={80}
          lines={[
            <>Stop discovering slips three weeks late.</>,
            <>Take command of your critical path.</>,
          ]}
        />

        {/* 1-Line Pilot Form */}
        <Reveal variant="up" delay={220} className="foot-formwrap">
          {status === "done" ? (
            <div className="foot-done mono xs">
              <span className="foot-dot" /> Pilot request received. Our engineering lead will connect within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleFastSubmit} className="foot-form">
              <input
                type="email"
                required
                placeholder="Enter work email for pilot access..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="foot-inp mono xs"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="foot-btn mono xs"
              >
                {status === "submitting" ? "Requesting..." : "Initialize Pilot →"}
              </button>
            </form>
          )}
        </Reveal>

        {/* Enterprise Security Trust Line */}
        <Reveal variant="up" delay={280}>
          <div className="foot-trust mono xs">
            <span>🔒 DEDICATED TENANT ENCRYPTION</span>
            <span className="pipe">·</span>
            <span>ZERO PUBLIC MODEL TRAINING</span>
            <span className="pipe">·</span>
            <span>COMPLETE MASTER P6 ISOLATION</span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={340}>
          <p className="foot-mailrow">
            <span className="mono xs dim" style={{ marginRight: 10 }}>DIRECT LINE:</span>
            <Magnetic>
              <a className="foot-mail" href="mailto:founders@syncpro.org">
                founders@syncpro.org <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </p>
        </Reveal>

        <div className="foot-meta mono xs">
          <span>RESEARCH-GROUNDED AT IIT MADRAS · BUILT FOR GLOBAL MEGAPROJECTS</span>
          <span>© 2026 SYNCPRO · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
