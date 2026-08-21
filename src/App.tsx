import { ModularGridBackground } from "./components/ModularGridBackground";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TelemetryMarquee } from "./components/TelemetryMarquee";
import { SignalDeconstructor } from "./components/SignalDeconstructor";
import { DigitalTwinStudio } from "./components/DigitalTwinStudio";
import { DCMA14Matrix } from "./components/DCMA14Matrix";
import { DisputeDefenseTerminal } from "./components/DisputeDefenseTerminal";
import { DelayCostCalculator } from "./components/DelayCostCalculator";
import { EcosystemStrip } from "./components/EcosystemStrip";
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
        <TelemetryMarquee />
        <SignalDeconstructor />
        <DigitalTwinStudio />
        <DCMA14Matrix />
        <DisputeDefenseTerminal />
        <DelayCostCalculator />
        <EcosystemStrip />
        <TrustValidation />
        <FAQSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
