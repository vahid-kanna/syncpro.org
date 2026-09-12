import { useEffect } from "react";
import { FAQ } from "./lib/content";

/**
 * Injects FAQPage structured data from the same source that renders the
 * visible accordion, so the schema can never drift from the copy on the page.
 */
export function Seo() {
  useEffect(() => {
    const ID = "syncpro-faq-jsonld";
    if (document.getElementById(ID)) return;

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = ID;
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
      })),
    });
    document.head.appendChild(el);
  }, []);

  return null;
}
