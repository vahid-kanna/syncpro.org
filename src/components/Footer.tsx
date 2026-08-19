import { Brand } from "./Brand";
import { CONTACT_EMAIL } from "../lib/waitlist";
import { Lock, Globe } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-sunken)" }}>
      <div className="wrap-lg" style={{ paddingBlock: 56 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 36 }}>
          <div>
            <Brand />
            <p className="body small mt-3 measure" style={{ color: "var(--text-3)" }}>
              SyncPro is the AI Project Controls Engineer for construction — closing the gap between
              the schedule and field reality so every update is a defensible fact.
            </p>
            <div className="row gap-4 mt-4 xs dim">
              <span className="row gap-1">
                <Globe className="ico" style={{ width: 13, height: 13, color: "var(--brand-400)" }} />
                syncpro.org
              </span>
              <span className="row gap-1">
                <Lock className="ico" style={{ width: 13, height: 13, color: "var(--success)" }} />
                Enterprise Encryption
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>PRODUCT PILLARS</div>
            <div className="col gap-2">
              <a className="small dim" href="#how">Know the Plan (P6/MPXJ)</a>
              <a className="small dim" href="#how">Know Reality (Corroboration)</a>
              <a className="small dim" href="#how">Run the Project (As-Built)</a>
              <a className="small dim" href="#capabilities">Anti-Hallucination Graph</a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>SOLUTIONS</div>
            <div className="col gap-2">
              <a className="small dim" href="#who">Project Controls Leads</a>
              <a className="small dim" href="#who">Planners &amp; Schedulers</a>
              <a className="small dim" href="#who">Project Managers</a>
              <a className="small dim" href="#sectors">Data Centers &amp; Infrastructure</a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>COMPANY &amp; ACCESS</div>
            <div className="col gap-2">
              <a className="small dim" href="#waitlist">Request Early Access</a>
              <a className="small dim" href={`mailto:${CONTACT_EMAIL}`}>Direct Enquiry ({CONTACT_EMAIL})</a>
              <a className="small dim" href="#problem">Industry Research</a>
              <span className="small dim" style={{ opacity: 0.6 }}>San Francisco · Global</span>
            </div>
          </div>
        </div>

        <div
          className="between wrapf gap-4 mt-8 pt-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span className="hint">
            &copy; {year} SyncPro Inc. (`syncpro.org`). All rights reserved. Built for construction project controls.
          </span>
          <span className="hint">
            All trademarks (Oracle Primavera P6, Asta Powerproject, Microsoft Project, Procore, Autodesk) belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  );
}
