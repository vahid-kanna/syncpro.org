import { GATE, PILLARS, PROBLEM } from "./lib/content";
import { ArrowRight } from "./lib/icons";
import { scrollToId } from "./lib/hooks";
import { TiltCard } from "./lib/interactions";

/* ---- The problem --------------------------------------------------------- */

export function Problem() {
  return (
    <section className="section" id="problem">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{PROBLEM.label}</span>
          <h2 className="h1 measure">{PROBLEM.h2}</h2>
          <p className="lead measure mt-4">{PROBLEM.lead}</p>
        </div>

        <div className="proof-grid rv">
          {PROBLEM.figures.map((f) => (
            <TiltCard className="proof-cell" key={f.v} maxTilt={4}>
              <span className="v">{f.v}</span>
              <span className="l">{f.l}</span>
              <span className="s">{f.s}</span>
            </TiltCard>
          ))}
        </div>

        <div className="callout mt-8 rv">
          <p className="h3" style={{ lineHeight: 1.5, fontWeight: 500, color: "var(--text-2)" }}>
            {PROBLEM.close}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- Three pillars ------------------------------------------------------- */

export function Pillars() {
  return (
    <section className="section" id="pillars">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{PILLARS.label}</span>
          <h2 className="h1 measure">{PILLARS.h2}</h2>
          <p className="lead measure mt-4">{PILLARS.lead}</p>
        </div>

        <div className="grid-3">
          {PILLARS.items.map((p) => (
            <TiltCard className="card card-hover pillar rv" key={p.n} maxTilt={5}>
              <span className="pillar-n">{p.n}</span>
              <h3 className="h2">{p.title}</h3>
              <p className="pillar-q">{p.q}</p>
              <p>{p.body}</p>
              <ul className="pillar-list">
                {p.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- The commit gate ----------------------------------------------------- */

export function Gate() {
  return (
    <section className="section" id="platform">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">{GATE.label}</span>
          <h2 className="h1 measure">{GATE.h2}</h2>
          <p className="lead measure mt-4">{GATE.lead}</p>
        </div>

        <ol className="gate-grid rv">
          {GATE.stages.map((s) => (
            <li className="gate-step" key={s.n}>
              <span className="gate-num mono">{s.n}</span>
              <h3 className="h3">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="panel mt-12 rv">
          <div className="panel-head">
            <span className="row gap-3">
              <span className="tag tag-brand">{GATE.stackLabel}</span>
              <span className="h3">{GATE.stackTitle}</span>
            </span>
            <a
              className="btn btn-ghost btn-sm"
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("products");
              }}
            >
              See the suite
              <ArrowRight className="ico" />
            </a>
          </div>
          <div className="panel-body">
            <p className="body measure mb-6">{GATE.stackBody}</p>
            <div className="stack-grid">
              {GATE.stack.map((s) => (
                <div className="stack-item" key={s.t}>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
