import { ModularGridBackground } from "./components/ModularGridBackground";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WhatWeDo } from "./components/WhatWeDo";
import { HowItWorks } from "./components/HowItWorks";
import { DigitalTwinStudio } from "./components/DigitalTwinStudio";
import { DCMA14Matrix } from "./components/DCMA14Matrix";
import { DelayCostCalculator } from "./components/DelayCostCalculator";
import { TrustValidation } from "./components/TrustValidation";
import { FAQSection } from "./components/FAQSection";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <ModularGridBackground />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <DigitalTwinStudio />
        <DCMA14Matrix />
        <DelayCostCalculator />
        <TrustValidation />
        <FAQSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
