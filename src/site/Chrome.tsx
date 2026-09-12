import { useEffect, useState } from "react";
import {
  NAV_LINKS,
  CONTACT_EMAIL,
  GITHUB_URL,
  FOOTER,
  HERO,
} from "./lib/content";
import { scrollToId, useActiveSection, useEscape, useScrollLock } from "./lib/hooks";
import { ArrowRight, Close, Github, Linkedin, Mail, Menu, Wordmark } from "./lib/icons";

/* ---- Scroll progress ----------------------------------------------------- */

function ScrollLine() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-line" aria-hidden>
      <i style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/* ---- Nav ----------------------------------------------------------------- */

function NavLink({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "true" : undefined}
      data-active={active ? "" : undefined}
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
    >
      {label}
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const ids = NAV_LINKS.map((l) => l.id);
  const active = useActiveSection(ids as unknown as string[]);

  useScrollLock(open);
  useEscape(() => setOpen(false), open);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu unmount and scroll-lock release before scrolling.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header className="nav">
      <div className="wrap-lg nav-in">
        <a
          className="brand"
          href="#top"
          aria-label="SyncPro — back to top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Wordmark className="brand-mark" />
          <span className="brand-name">
            Sync<span>Pro</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.id} id={l.id} label={l.label} active={active === l.id} onClick={go} />
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-status">
            <i className="sdot sdot-live pulse" aria-hidden />
            {HERO.status}
          </span>
          <a
            className="btn btn-outline btn-sm nav-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("contact");
            }}
          >
            Request access
          </a>
          <button
            type="button"
            className="btn btn-ghost btn-sm nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-menu" id="mobile-menu">
          <nav aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            className="btn btn-primary btn-block"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("contact");
            }}
          >
            Request pilot access
            <ArrowRight className="ico" />
          </a>
        </div>
      ) : null}

      <ScrollLine />
    </header>
  );
}

/* ---- Footer -------------------------------------------------------------- */

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="wrap-lg">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              className="brand mb-4"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Wordmark className="brand-mark" />
              <span className="brand-name">
                Sync<span>Pro</span>
              </span>
            </a>
            <p className="small dim" style={{ maxWidth: "42ch", lineHeight: 1.65 }}>
              {FOOTER.blurb}
            </p>
            <div className="footer-social">
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email the founders">
                <Mail size={16} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SyncPro on GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SyncPro on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {FOOTER.cols.map((col) => (
            <div className="footer-col" key={col.h}>
              <h4>{col.h}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={`${col.h}-${l.label}`}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(l.id);
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>{FOOTER.copyright}</span>
          <span className="legal">
            {FOOTER.legal.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </span>
          <span className="row gap-2">
            <i className="sdot sdot-live pulse" aria-hidden />
            <span>{HERO.status}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
