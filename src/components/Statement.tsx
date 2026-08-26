import { useReveal } from "../lib/useReveal";

/**
 * Editorial two-line statement moment (SignalIQ "A gap in the data /
 * a gap in the truth" pattern), set in Newsreader italic accents.
 */
export function Statement() {
  const reveal = useReveal();
  return (
    <section className="statement" aria-label="Why schedule blindness costs money">
      <div ref={reveal.ref} className={reveal.className}>
        <p className="statement-line">
          A delay you can&rsquo;t see
        </p>
        <p className="statement-line">
          is <em>money you can&rsquo;t keep.</em>
        </p>
        <p className="statement-caption mono xs">
          When the baseline and ground reality diverge, the project pays for the gap.
        </p>
      </div>
    </section>
  );
}

/**
 * Quiet brand marquee band (SignalIQ repeats its wordmark before FAQs).
 */
const MARQUEE_ITEMS = [
  "SYNCPRO",
  "AUTONOMOUS PROJECT CONTROLS",
  "PRIMAVERA P6 RECONCILIATION",
  "LIVE SHADOW SCHEDULE",
  "FIDIC · NHAI CLAIM DEFENSE",
  "EVIDENCE-GRADE FIELD SIGNALS",
];

export function BrandMarquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="brand-marquee" aria-hidden="true">
      <div className="marquee-track brand-track">
        {[0, 1].map((half) => (
          <div className="row gap-8" key={half} style={{ paddingRight: "4rem" }}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span className="brand-item mono" key={`${half}-${i}`}>
                {item}
                <span className="brand-dot">✦</span>
              </span>
            ))}
            <span className="sr-only">{row.length} items</span>
          </div>
        ))}
      </div>
    </div>
  );
}
