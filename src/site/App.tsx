import "./styles/index.css";
import { Footer, Nav } from "./Chrome";
import { Hero } from "./Hero";
import { Gate, Pillars, Problem } from "./Pillars";
import { DelayCalculator } from "./Calculator";
import { Demo } from "./Demo";
import { Suite } from "./Suite";
import { Icp, Pricing } from "./Icp";
import { Faq, Trust } from "./Faq";
import { Contact } from "./Contact";
import { Seo } from "./Seo";
import { useReveal } from "./lib/hooks";

/**
 * Section order is deliberate and mirrors NAV_LINKS:
 * the argument, then the three jobs, then proof it works,
 * then the mechanism, then what it costs.
 */
export default function App() {
  useReveal();

  return (
    <>
      <Seo />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Problem />
        <DelayCalculator />
        <Pillars />
        <Demo />
        <Gate />
        <Suite />
        <Icp />
        <Pricing />
        <Trust />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
