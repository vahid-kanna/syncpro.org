import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TelemetryMarquee } from "./components/TelemetryMarquee";
import { DigitalTwinStudio } from "./components/DigitalTwinStudio";
import { EcosystemStrip } from "./components/EcosystemStrip";
import { Problem } from "./components/Problem";
import { PillarsWalkthrough } from "./components/PillarsWalkthrough";
import { AIReasoningTerminal } from "./components/AIReasoningTerminal";
import { CapabilityCards } from "./components/CapabilityCards";
import { DelayCostCalculator } from "./components/DelayCostCalculator";
import { BeforeAfterComparison } from "./components/BeforeAfterComparison";
import { WhoItsFor } from "./components/WhoItsFor";
import { Sectors } from "./components/Sectors";
import { TrustValidation } from "./components/TrustValidation";
import { FAQSection } from "./components/FAQSection";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";
import { VideoBackgroundFrame } from "./components/VideoBackgroundFrame";

export default function App() {
  return (
    <>
      <VideoBackgroundFrame />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <TelemetryMarquee />
        <DigitalTwinStudio />
        <EcosystemStrip />
        <Problem />
        <PillarsWalkthrough />
        <AIReasoningTerminal />
        <CapabilityCards />
        <DelayCostCalculator />
        <BeforeAfterComparison />
        <WhoItsFor />
        <Sectors />
        <TrustValidation />
        <FAQSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
