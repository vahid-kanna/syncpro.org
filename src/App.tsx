import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { EcosystemStrip } from "./components/EcosystemStrip";
import { Problem } from "./components/Problem";
import { PillarsWalkthrough } from "./components/PillarsWalkthrough";
import { CapabilityCards } from "./components/CapabilityCards";
import { WhoItsFor } from "./components/WhoItsFor";
import { Sectors } from "./components/Sectors";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EcosystemStrip />
        <Problem />
        <PillarsWalkthrough />
        <CapabilityCards />
        <WhoItsFor />
        <Sectors />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
