/**
 * SyncPro v2 — Main App Shell
 * Assembles all 8 stages of Astra's master design blueprint:
 * 00. Global Chrome (Nav with telemetry badge & modal trigger)
 * 01. Living Control Room (Interactive Hero with P6 vs Shadow schedule simulation)
 * 02. The Forensic Gap (MoSPI ₹4.92 Lakh Cr overruns & side-by-side contrast)
 * 03. Financial Risk & Liquidated Damages Sandbox (interactive sliders & capital recovery)
 * 04. The 4 Capability Engines (Multimodal Ingestion, Shadow Scheduling, DCMA 14, Claims Shield)
 * 05. Unified Architecture & Enterprise Security (Dual lanes, Neo4j, deterministic engine)
 * 06. Validation, Pedigree & 30-Day Scoped Pilot Framework (Nirmaan, IIT Madras)
 * 07. Executive FAQ (Technical due diligence)
 * 08. Enterprise Pilot Qualification Console (High-conversion 3-step qualification form)
 * 09. Institutional Footer (Legal standards, IIT Madras attribution)
 */
import { useState } from "react";
import { Nav, Footer, BrandMarquee } from "./Chrome";
import { ScrollProgress, CursorGlow } from "./Motion";
import { Hero } from "./Hero";
import { ForensicGap } from "./ForensicGap";
import { ExposureSandbox } from "./ExposureSandbox";
import { CapabilityEngines } from "./CapabilityEngines";
import { ArchitectureSecurity } from "./ArchitectureSecurity";
import { ValidationPedigree } from "./ValidationPedigree";
import { ExecutiveFaq } from "./ExecutiveFaq";
import { PilotConsole, PilotModal } from "./PilotConsole";

export default function AppV2() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);

  const openPilot = () => {
    setIsPilotModalOpen(true);
  };

  const closePilotModal = () => setIsPilotModalOpen(false);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav onOpenPilot={openPilot} />
      <main>
        {/* Stage 01: Hero & Living Control Room Console */}
        <Hero onOpenPilot={openPilot} />

        {/* Stage 02: The Forensic Gap */}
        <ForensicGap />

        {/* Stage 03: Financial Risk & Liquidated Damages Sandbox */}
        <ExposureSandbox onOpenPilot={openPilot} />

        {/* Stage 04: The 4 Category-Defining Capability Engines */}
        <CapabilityEngines />

        {/* Stage 05: Unified Architecture & Enterprise Security */}
        <ArchitectureSecurity />

        {/* Industry Standards & Format Marquee */}
        <BrandMarquee />

        {/* Stage 06: Pedigree & Scoped Pilot Validation */}
        <ValidationPedigree onOpenPilot={openPilot} />

        {/* Stage 07: Executive FAQ */}
        <ExecutiveFaq />

        {/* Stage 08: Enterprise Pilot Qualification Console */}
        <PilotConsole />
      </main>

      {/* Stage 09: Monolithic Institutional Footer */}
      <Footer onOpenPilot={openPilot} />

      {/* Modal Dialog for Global Pilot Trigger */}
      <PilotModal isOpen={isPilotModalOpen} onClose={closePilotModal} />
    </>
  );
}
