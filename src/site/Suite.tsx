import { INTEGRATIONS, PRODUCTS, SUITE_NOTE, type Product } from "./lib/content";
import { Bolt } from "./lib/icons";

const TAG_FOR: Record<Product["statusKind"], string> = {
  live: "tag tag-success",
  built: "tag tag-brand",
  partial: "tag tag-steel",
  planned: "tag",
  core: "tag tag-brand",
};

function ProductCard({ p }: { p: Product }) {
  const planned = p.statusKind === "planned";

  return (
    <article className={`card card-hover prod rv${planned ? " is-planned" : ""}`}>
      <div className="prod-top">
        <span className="prod-n">{p.n}</span>
        <span className={TAG_FOR[p.statusKind]}>
          <i className="dot" />
          {p.status}
        </span>
      </div>

      <h3 className="h3">{p.name}</h3>
      <span className="prod-pillar">
        {p.pillar} <span className="faint">· {p.horizon}</span>
      </span>
      <p>{p.body}</p>

      {p.problem ? (
        <div className="prod-foot">
          <Bolt size={12} className="t-brand" />
          <span>{p.problem}</span>
        </div>
      ) : null}
    </article>
  );
}

export function Suite() {
  return (
    <section className="section" id="products">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">The suite</span>
          <h2 className="h1 measure">Built as a suite, shipped in sequence.</h2>
          <p className="lead measure mt-4">
            Six products, one shared graph. Each one is anchored on a specific problem the industry
            has not solved — and each one is honest about whether it is running yet.
          </p>
        </div>

        <div className="suite-grid">
          {PRODUCTS.map((p) => (
            <ProductCard p={p} key={p.n} />
          ))}
        </div>

        <div className="callout is-steel mt-8 rv">
          <p className="small dim" style={{ lineHeight: 1.65 }}>
            {SUITE_NOTE}
          </p>
        </div>

        <div className="integ rv">
          <div className="between wrapf gap-4 mb-4">
            <div>
              <span className="label">{INTEGRATIONS.label}</span>
              <p className="h3 mt-2">{INTEGRATIONS.h2}</p>
            </div>
            <span className="xs faint">{INTEGRATIONS.note}</span>
          </div>
          <ul className="integ-row">
            {INTEGRATIONS.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
