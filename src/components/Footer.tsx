import { Brand } from "./Brand";
import { CONTACT_EMAIL } from "../lib/waitlist";
import { Lock, Globe, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "rgba(8, 9, 12, 0.95)" }}>
      <div className="wrap-lg" style={{ paddingBlock: 56 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 36 }}>
          <div>
            <Brand />
            <p className="lead mt-3 measure" style={{ fontSize: "14px", color: "var(--text-3)", lineHeight: 1.6 }}>
              SyncPro is the autonomous AI Project Controls Engineer for capital megaprojects — closing the gap between
              the baseline schedule and field reality so every update is a defensible fact.
            </p>
            <div className="row gap-4 mt-4 xs dim">
              <span className="row gap-1" style={{ alignItems: "center" }}>
                <Globe className="ico" style={{ width: 13, height: 13, color: "var(--brand-400)" }} />
                syncpro.org
              </span>
              <span className="row gap-1" style={{ alignItems: "center" }}>
                <Lock className="ico" style={{ width: 13, height: 13, color: "var(--success)" }} />
                Enterprise Encryption
              </span>
            </div>
          </div>

          <div>
            <div className="mono xs mb-3" style={{ color: "var(--text)", fontWeight: 700 }}>
              PLATFORM
            </div>
            <div className="col gap-2">
              <a className="xs dim" href="#what-we-do">What We Do</a>
              <a className="xs dim" href="#how-it-works">How It Works</a>
              <a className="xs dim" href="#digital-twin-studio">3D Digital Twin</a>
              <a className="xs dim" href="#financial-sandbox">ROI Calculator</a>
            </div>
          </div>

          <div>
            <div className="mono xs mb-3" style={{ color: "var(--text)", fontWeight: 700 }}>
              IMPACT &amp; ROI
            </div>
            <div className="col gap-2">
              <a className="xs dim" href="#financial-sandbox">Capital Risk Sandbox</a>
              <a className="xs dim" href="#financial-sandbox">Liquidated Damages Model</a>
              <a className="xs dim" href="#waitlist">Design Partner Cohort</a>
              <a className="xs dim" href="#waitlist">Zero P6 Training Guarantee</a>
            </div>
          </div>

          <div>
            <div className="mono xs mb-3" style={{ color: "var(--text)", fontWeight: 700 }}>
              CONTACT &amp; ACCESS
            </div>
            <div className="col gap-2">
              <a className="xs dim" href="#waitlist">Request Pilot Access</a>
              <a className="xs dim row gap-1" href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brand-300)" }}>
                <Mail className="ico" style={{ width: 12, height: 12 }} />
                {CONTACT_EMAIL}
              </a>
              <span className="xs dim" style={{ opacity: 0.6 }}>Direct Founders Line</span>
            </div>
          </div>
        </div>

        <div
          className="row between wrapf gap-4 mt-8 pt-4"
          style={{ borderTop: "1px solid var(--line)", fontSize: "12px", color: "var(--text-3)" }}
        >
          <span>
            &copy; {year} SyncPro Inc. (`syncpro.org`). All rights reserved.
          </span>
          <span>
            All trademarks (Oracle Primavera P6, Asta Powerproject, Microsoft Project, Procore, Autodesk) belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  );
}
