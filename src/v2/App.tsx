/**
 * SyncPro v2 — app shell wiring every motion and interactive layer.
 */
import { Nav, Footer, BrandMarquee } from "./Chrome";
import { Hero, GapSection } from "./Sections";
import { DigitalTwin, DelaySandbox, PilotTerminal } from "./Interactive";
import { BuiltFor, Stack, FAQ } from "./More";
import { ScrollProgress, CursorGlow } from "./Motion";

export default function AppV2() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <GapSection />
        <DigitalTwin />
        <DelaySandbox />
        <BuiltFor />
        <Stack />
        <PilotTerminal />
        <BrandMarquee />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
