/**
 * SyncPro v2 — Main Application Shell (Refined with ZeroEka elegance & Astra blueprint)
 * 10-section narrative architecture designed for executive clarity:
 * - 01. Global Glassmorphic Nav
 * - 02. Hero Section with 3D Three.js CPM Topology
 * - 03. The Core Shift ("The plan is fixed. Site reality isn't.")
 * - 04. Four Connected Capabilities (Ingestion, Shadow Scheduling, DCMA 14, FIDIC)
 * - 05. Schedule Intelligence Console (Interactive CPM Gantt simulation)
 * - 06. Financial Exposure Sandbox (Modeled capital risk & mitigation gauge)
 * - 07. Built for Megaprojects (EPC Contractors, Developers, Claims Consultants)
 * - 08. The Scoped Pilot Framework (30-Day Evaluation vs Enterprise Rollout)
 * - 09. Executive FAQ & Pilot Enquiry Console (5 Q&As + 3-step intake form)
 * - 10. Institutional Footer (Nirmaan, IIT Madras attribution)
 */
import { useState } from "react";
import { Nav, Footer, BrandMarquee } from "./Chrome";
import { ScrollProgress, CursorGlow } from "./Motion";
import { Hero } from "./Hero";
import { CoreShift } from "./CoreShift";
import { FourPillars } from "./FourPillars";
import { ScheduleConsole } from "./ScheduleConsole";
import { ExposureSandbox } from "./ExposureSandbox";
import { Audiences } from "./Audiences";
import { PilotFramework } from "./PilotFramework";
import { ExecutiveFaq } from "./ExecutiveFaq";
import { PilotConsole, PilotModal } from "./PilotConsole";

export default function AppV2() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);

  const openPilot = () => {
    // On desktop, smooth scroll to intake form; on mobile/modal, trigger popup
    const el = document.getElementById("intake");
    if (el && window.innerWidth >= 768) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsPilotModalOpen(true);
    }
  };

  const closePilotModal = () => setIsPilotModalOpen(false);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav onOpenPilot={openPilot} />
      <main>
        {/* Section 02: Hero & 3D CPM Schedule Mesh */}
        <Hero onOpenPilot={openPilot} />

        {/* Section 03: The Core Shift */}
        <CoreShift />

        {/* Section 04: The Four Connected Capabilities */}
        <FourPillars />

        {/* Section 05: Schedule Intelligence Console */}
        <ScheduleConsole />

        {/* Section 06: Financial Exposure Sandbox */}
        <ExposureSandbox onOpenPilot={openPilot} />

        {/* Industry Standards Marquee */}
        <BrandMarquee />

        {/* Section 07: Built for Megaprojects (Audiences) */}
        <Audiences />

        {/* Section 08: Scoped Pilot Framework */}
        <PilotFramework onOpenPilot={openPilot} />

        {/* Section 09: Executive FAQ */}
        <ExecutiveFaq />

        {/* Section 10: Pilot Intake Console */}
        <PilotConsole />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenPilot={openPilot} />

      {/* Global Pilot Intake Modal */}
      <PilotModal isOpen={isPilotModalOpen} onClose={closePilotModal} />
    </>
  );
}
