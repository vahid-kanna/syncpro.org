/**
 * SyncPro v2 — app shell wiring every motion layer.
 */
import { Nav, Footer, BrandMarquee } from "./Chrome";
import { Hero, GapSection } from "./Sections";
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
        <BuiltFor />
        <Stack />
        <BrandMarquee />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
