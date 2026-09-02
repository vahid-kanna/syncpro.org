/**
 * SyncPro v2 — scroll motion engine.
 * One rAF-batched pipeline driving: parallax, word-scrub headings,
 * progress rail, cursor aurora, magnetic hover, 3D tilt.
 * Everything respects prefers-reduced-motion by refusing to register.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------- engine ---------------- */

type Fx = (y: number, max: number, dy: number) => void;
const subs = new Set<Fx>();
let lastY = 0;
let queued = false;

function pump() {
  queued = false;
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  subs.forEach((f) => f(y, max, y - lastY));
  lastY = y;
}
function kick() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(pump);
  }
}

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof window !== "undefined") {
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", kick);
}

export function useScrollFx(fx: Fx) {
  const ref = useRef(fx);
  ref.current = fx;
  useEffect(() => {
    if (prefersReduced()) return;
    const fn: Fx = (y, m, d) => ref.current(y, m, d);
    subs.add(fn);
    kick();
    return () => {
      subs.delete(fn);
    };
  }, []);
}

/* ---------------- scroll progress rail ---------------- */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFx((y, max) => {
    ref.current?.style.setProperty("--p", `${((y / max) * 100).toFixed(2)}%`);
  });
  return (
    <div className="sprog" ref={ref} aria-hidden="true">
      <i />
    </div>
  );
}

/* ---------------- parallax ---------------- */

export function Parallax({
  children,
  speed = 0.18,
  extraScale = 1.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  extraScale?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useScrollFx(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i) return;
    const r = w.getBoundingClientRect();
    const mid = r.top + r.height / 2 - window.innerHeight / 2;
    i.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0) scale(${extraScale})`;
  });
  return (
    <div ref={wrap} className={`plxw ${className}`}>
      <div ref={inner} className="plxi">
        {children}
      </div>
    </div>
  );
}

/* ---------------- word-by-word scrub heading ---------------- */

export interface Seg {
  t: string;
  em?: boolean;
}

export function ScrubHeading({
  segs,
  className = "",
}: {
  segs: Seg[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [lit, setLit] = useState(0);
  const total = segs.reduce((n, s) => n + s.t.split(" ").length, 0);

  useScrollFx(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.45)));
    const n = Math.round(p * total);
    setLit((prev) => (prev === n ? prev : n));
  });

  let i = 0;
  return (
    <h2 ref={ref} className={`scrub ${className}`} aria-label={segs.map((s) => s.t).join(" ")}>
      {segs.map((s, k) => (
        <span key={k} className={s.em ? "sem" : undefined}>
          {s.t.split(" ").map((w, j) => {
            const idx = i++;
            return (
              <span key={j} className={`sw ${idx < lit ? "lit" : ""}`}>
                {w}{" "}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

/* ---------------- cursor aurora ---------------- */

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || prefersReduced()) return;
    const el = document.createElement("div");
    el.className = "cglow";
    document.body.appendChild(el);
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;
    const mv = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.11;
      y += (ty - y) * 0.11;
      el.style.transform = `translate(${x - 280}px, ${y - 280}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", mv, { passive: true });
    loop();
    return () => {
      window.removeEventListener("pointermove", mv);
      cancelAnimationFrame(raf);
      el.remove();
    };
  }, []);
  return null;
}

/* ---------------- magnetic hover ---------------- */

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const mv = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.3}px)`;
    };
    const lv = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", lv);
    return () => {
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", lv);
    };
  }, []);
  return (
    <span ref={ref} className="mag">
      {children}
    </span>
  );
}

/* ---------------- 3D tilt ---------------- */

export function Tilt({ children, max = 6 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const mv = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    };
    const lv = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", lv);
    return () => {
      el.removeEventListener("pointermove", mv);
      el.removeEventListener("pointerleave", lv);
    };
  }, [max]);
  return (
    <div className="tiltw">
      <div ref={ref} className="tilt">
        {children}
      </div>
    </div>
  );
}

/* ---------------- card spotlight (linear/vercel effect) ---------------- */

export function CardSpotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--opacity", "1");
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--opacity", "0");
  };

  return (
    <div
      ref={ref}
      className={`card-spotlight ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
