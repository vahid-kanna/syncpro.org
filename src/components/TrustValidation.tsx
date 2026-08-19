import { Shield, Lock, FileCode2 } from "lucide-react";
import { useReveal } from "../lib/useReveal";

export function TrustValidation() {
  const reveal = useReveal();

  return (
    <section className="wrap-lg section-sm">
      <div ref={reveal.ref} className={reveal.className}>
        <div className="inset" style={{ padding: "32px 28px", background: "var(--bg-sunken)", borderColor: "var(--line)" }}>
          <div className="grid-3 gap-6">
            <div className="stack-sm">
              <div className="row gap-2">
                <Shield className="ico t-brand" style={{ width: 18, height: 18 }} />
                <h3 className="h4">Zero Training on Client Data</h3>
              </div>
              <p className="xs dim" style={{ lineHeight: 1.6 }}>
                Your project schedules, cost codes, and subcontractor claims remain completely private
                and isolated within your enterprise tenant.
              </p>
            </div>

            <div className="stack-sm">
              <div className="row gap-2">
                <Lock className="ico t-success" style={{ width: 18, height: 18 }} />
                <h3 className="h4">Tamper-Evident Audit Trails</h3>
              </div>
              <p className="xs dim" style={{ lineHeight: 1.6 }}>
                Every schedule modification is linked to verified supporting evidence and logged
                with cryptographic event timestamps for dispute immunity.
              </p>
            </div>

            <div className="stack-sm">
              <div className="row gap-2">
                <FileCode2 className="ico t-steel" style={{ width: 18, height: 18 }} />
                <h3 className="h4">Industry Standard Interop</h3>
              </div>
              <p className="xs dim" style={{ lineHeight: 1.6 }}>
                Native integration with Oracle Primavera P6 (.xer), Asta Powerproject (.pp),
                Microsoft Project (.mpp), and Procore workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
