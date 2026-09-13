import { ICP, PRICING } from "./lib/content";
import { Check, Close } from "./lib/icons";
import { scrollToId } from "./lib/hooks";
import { Magnetic, TiltCard } from "./lib/interactions";

/* ---- Who it's for -------------------------------------------------------- */

export function Icp() {
  return (
    <section className="section" id="who">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{ICP.label}</span>
          <h2 className="h1 measure">{ICP.h2}</h2>
          <p className="lead measure mt-4">{ICP.lead}</p>
        </div>

        <div className="icp-grid">
          <div className="rv">
            <span className="label" style={{ display: "block", marginBottom: 4 }}>
              The profile that fits
            </span>
            <dl className="spec">
              {ICP.spec.map(([k, v]) => (
                <div className="spec-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rv">
            <span className="label" style={{ display: "block", marginBottom: 4 }}>
              {ICP.notLabel}
            </span>
            <div className="not-list">
              {ICP.notFor.map((n) => (
                <div className="not-item" key={n.t}>
                  <Close size={14} className="not-ico" />
                  <div>
                    <b>{n.t}</b>
                    <span>{n.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="callout mt-6">
              <p className="small dim" style={{ lineHeight: 1.65 }}>
                Saying no to four segments is not modesty — it is the reason the beachhead works.
                Each of these is a documented decision in our strategy, not a gap we forgot to fill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Pricing ------------------------------------------------------------- */

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{PRICING.label}</span>
          <h2 className="h1 measure">{PRICING.h2}</h2>
          <p className="lead measure mt-4">{PRICING.lead}</p>
        </div>

        <div className="price-grid">
          {PRICING.tiers.map((t) => (
            <TiltCard className={`card tier rv${t.featured ? " is-feature" : ""}`} key={t.name} maxTilt={4}>
              <div className="between">
                <span className="tier-name">{t.name}</span>
                {t.featured ? <span className="tag tag-brand">Most common</span> : null}
              </div>
              <span className="tier-for">{t.who}</span>

              <div className="tier-price">
                <b>{t.price}</b>
                <span>{t.unit}</span>
              </div>

              <hr className="divider" />

              <ul>
                {t.includes.map((i) => (
                  <li key={i}>
                    <Check size={13} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <Magnetic strength={0.15}>
                <a
                  className={`btn btn-block ${t.featured ? "btn-primary" : "btn-outline"}`}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                  }}
                >
                  {t.name === "Enterprise / Benchmark" ? "Talk to founders" : "Start a pilot"}
                </a>
              </Magnetic>
            </TiltCard>
          ))}
        </div>

        <p className="srcline mt-6 rv" style={{ maxWidth: "78ch" }}>
          {PRICING.note}
        </p>
      </div>
    </section>
  );
}
