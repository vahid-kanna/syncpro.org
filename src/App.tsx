import { ModularGridBackground } from "./components/ModularGridBackground";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SignalNarrative } from "./components/SignalNarrative";
import { WhatWeDo } from "./components/WhatWeDo";
import { HowItWorks } from "./components/HowItWorks";
import { Statement } from "./components/Statement";
import { DigitalTwinStudio } from "./components/DigitalTwinStudio";
import { DelayCostCalculator } from "./components/DelayCostCalculator";
import { FAQSection } from "./components/FAQSection";
import { BrandMarquee } from "./components/Statement";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <ModularGridBackground />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* Editorial hook — SignalIQ grammar */}
        <Hero />
        <SignalNarrative />

        {/* Product depth */}
        <WhatWeDo />
        <HowItWorks />

        {/* Breather statement */}
        <Statement />

        <DigitalTwinStudio />
        <DelayCostCalculator />

        {/* Trust + conversion */}
        <BrandMarquee />
        <FAQSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
