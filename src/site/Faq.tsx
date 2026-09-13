import { useState } from "react";
import { FAQ, TRUST } from "./lib/content";
import { Plus, Shield, Scale, Database } from "./lib/icons";
import { TiltCard } from "./lib/interactions";

const TRUST_ICONS = [Shield, Scale, Database];

/* ---- FAQ ----------------------------------------------------------------- */

function FaqRow({ i, q, a }: { i: number; q: string; a: readonly string[] }) {
  const [open, setOpen] = useState(i === 0);
  const qid = `faq-q-${i}`;
  const aid = `faq-a-${i}`;

  return (
    <div className="faq-item">
      <h3>
        <button
          type="button"
          className="faq-trigger"
          id={qid}
          aria-expanded={open}
          aria-controls={aid}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="faq-q">{q}</span>
          <Plus size={17} className="faq-ico" />
        </button>
      </h3>
      <div
        className="faq-body"
        id={aid}
        role="region"
        aria-labelledby={qid}
        hidden={!open}
      >
        {a.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="label">{FAQ.label}</span>
          <h2 className="h1 measure">{FAQ.h2}</h2>
        </div>

        <div className="faq rv">
          {FAQ.items.map((f, i) => (
            <FaqRow i={i} q={f.q} a={f.a} key={f.q} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Trust --------------------------------------------------------------- */

export function Trust() {
  return (
    <section className="section" id="trust">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{TRUST.label}</span>
          <h2 className="h1 measure">{TRUST.h2}</h2>
        </div>

        <div className="trust-grid">
          {TRUST.items.map((t, i) => {
            const Ico = TRUST_ICONS[i % TRUST_ICONS.length];
            return (
              <TiltCard className="card card-hover trust-cell rv" key={t.t} maxTilt={5}>
                <Ico size={19} className="t-brand" />
                <h3 className="h3">{t.t}</h3>
                <p className="small dim" style={{ lineHeight: 1.65 }}>
                  {t.d}
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
