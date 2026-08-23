import { Brand } from "./Brand";
import { CONTACT_EMAIL } from "../lib/waitlist";
import { Lock, Globe, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-sunken)" }}>
      <div className="wrap-lg" style={{ paddingBlock: 56 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 36 }}>
          <div>
            <Brand />
            <p className="body small mt-3 measure" style={{ color: "var(--text-3)" }}>
              SyncPro is the AI Project Controls Engineer for capital megaprojects — closing the gap between
              the baseline schedule and field reality so every update is a defensible fact.
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
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>PLATFORM</div>
            <div className="col gap-2">
              <a className="small dim" href="#what-we-do">What We Do</a>
              <a className="small dim" href="#how-it-works">How It Works</a>
              <a className="small dim" href="#digital-twin-studio">3D Digital Twin</a>
              <a className="small dim" href="#dcma-scanner">DCMA-14 Diagnostics</a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>IMPACT &amp; ROI</div>
            <div className="col gap-2">
              <a className="small dim" href="#financial-sandbox">Capital Risk Sandbox</a>
              <a className="small dim" href="#financial-sandbox">Liquidated Damages Model</a>
              <a className="small dim" href="#waitlist">Design Partner Cohort</a>
              <a className="small dim" href="#waitlist">Zero P6 Training Guarantee</a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3" style={{ color: "var(--text)" }}>CONTACT &amp; ACCESS</div>
            <div className="col gap-2">
              <a className="small dim" href="#waitlist">Request Pilot Access</a>
              <a className="small dim row gap-1" href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brand)" }}>
                <Mail className="ico" style={{ width: 12, height: 12 }} />
                {CONTACT_EMAIL}
              </a>
              <span className="small dim" style={{ opacity: 0.6 }}>Direct Founders Line</span>
            </div>
          </div>
        </div>

        <div
          className="between wrapf gap-4 mt-8 pt-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span className="hint">
            &copy; {year} SyncPro Inc. (`syncpro.org`). All rights reserved.
          </span>
          <span className="hint">
            All trademarks (Oracle Primavera P6, Asta Powerproject, Microsoft Project, Procore, Autodesk) belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  );
}
