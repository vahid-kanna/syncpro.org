/**
 * SyncPro v2 — Stage 08: Enterprise Pilot Qualification Console & Modal
 * Sourced directly from Astra's blueprint:
 * High-conversion 3-step qualification workflow replacing the cold mailto link.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, X } from "lucide-react";

interface PilotFormData {
  projectName: string;
  organization: string;
  capexRange: string;
  software: string;
  primaryGoal: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
}

const INITIAL_FORM: PilotFormData = {
  projectName: "",
  organization: "",
  capexRange: "₹500 Cr - ₹1,500 Cr ($60M - $180M)",
  software: "Oracle Primavera P6 (.xer)",
  primaryGoal: "Critical Path Delay Early Detection",
  contactName: "",
  role: "",
  email: "",
  phone: "",
};

export function PilotConsole() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PilotFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate direct dispatch or Formspree / mailto submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="sec wrap pilot-console-sec" id="pilot-console">
      <MaskLines as="h2" className="sec-h center" baseDelay={80} lines={[<>Start with one package.</>, <><em>Keep complete control.</em></>]} />

      <div className="sechead mono xs center-head">
        <span className="num">08</span>
        <span>ENTERPRISE PILOT QUALIFICATION CONSOLE</span>
      </div>

      <Reveal variant="up" delay={140}>
        <div className="pilot-card">
          <div className="pilot-card-topbar mono xs">
            <div className="topbar-status">
              <span className="pulse-dot" />
              <span>SCOPED PILOT EVALUATION INTAKE</span>
            </div>
            <div className="step-indicator">
              <span>STEP 0{step} OF 03</span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleNext} className="pilot-form">
              {/* Step 1: Package Profile */}
              {step === 1 && (
                <div className="form-step">
                  <h3 className="step-title">Tell us about your project package.</h3>
                  <p className="step-desc xs dim">
                    We initiate pilots on a single, critical-path package to prove value without disturbing site operations.
                  </p>

                  <div className="form-fields">
                    <div className="form-group">
                      <label className="mono xs dim" htmlFor="org-input">
                        CONTRACTOR / DEVELOPER ORGANIZATION *
                      </label>
                      <input
                        id="org-input"
                        type="text"
                        required
                        placeholder="e.g. Larsen & Toubro, Tata Projects, Afcons"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="mono xs dim" htmlFor="proj-input">
                        PROJECT / PACKAGE NAME *
                      </label>
                      <input
                        id="proj-input"
                        type="text"
                        required
                        placeholder="e.g. Mumbai Metro Line 4 / Expressway Package 3"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="mono xs dim" htmlFor="capex-select">
                        PACKAGE ESTIMATED CAPEX *
                      </label>
                      <select
                        id="capex-select"
                        value={formData.capexRange}
                        onChange={(e) => setFormData({ ...formData, capexRange: e.target.value })}
                        className="form-select"
                      >
                        <option value="₹100 Cr - ₹500 Cr ($12M - $60M)">₹100 Cr - ₹500 Cr ($12M - $60M)</option>
                        <option value="₹500 Cr - ₹1,500 Cr ($60M - $180M)">₹500 Cr - ₹1,500 Cr ($60M - $180M)</option>
                        <option value="₹1,500 Cr - ₹5,000 Cr ($180M - $600M)">₹1,500 Cr - ₹5,000 Cr ($180M - $600M)</option>
                        <option value="> ₹5,000 Cr ($600M+ Megaproject)">&gt; ₹5,000 Cr ($600M+ Megaproject)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="hero-btn mono xs">
                      Proceed to Scheduling Stack <ArrowRight className="ico-xs" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Scheduling Stack & Goals */}
              {step === 2 && (
                <div className="form-step">
                  <h3 className="step-title">Your scheduling tools and controls objective.</h3>
                  <p className="step-desc xs dim">
                    SyncPro natively parses standard CPM files. No proprietary software is required on your site.
                  </p>

                  <div className="form-fields">
                    <div className="form-group">
                      <label className="mono xs dim" htmlFor="software-select">
                        PRIMARY SCHEDULING SOFTWARE *
                      </label>
                      <select
                        id="software-select"
                        value={formData.software}
                        onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                        className="form-select"
                      >
                        <option value="Oracle Primavera P6 (.xer)">Oracle Primavera P6 (.xer)</option>
                        <option value="Oracle Primavera P6 (PMXML)">Oracle Primavera P6 (PMXML)</option>
                        <option value="Asta Powerproject (.pp)">Asta Powerproject (.pp)</option>
                        <option value="Microsoft Project (.mpp)">Microsoft Project (.mpp)</option>
                        <option value="Other / Multiple Tools">Other / Multiple Tools</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="mono xs dim" htmlFor="goal-select">
                        PRIMARY OBJECTIVE FOR THE PILOT *
                      </label>
                      <select
                        id="goal-select"
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="form-select"
                      >
                        <option value="Critical Path Delay Early Detection">Critical Path Delay Early Detection</option>
                        <option value="Liquidated Damages & Financial Risk Mitigation">Liquidated Damages &amp; Financial Risk Mitigation</option>
                        <option value="Contemporaneous FIDIC / RERA Dispute Defense">Contemporaneous FIDIC / RERA Dispute Defense</option>
                        <option value="Automated WhatsApp & Docket Entity Extraction">Automated WhatsApp &amp; Docket Entity Extraction</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions between">
                    <button
                      type="button"
                      className="btn-back mono xs dim"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft className="ico-xs" /> Back
                    </button>
                    <button type="submit" className="hero-btn mono xs">
                      Proceed to Contact Details <ArrowRight className="ico-xs" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Direct Dispatch */}
              {step === 3 && (
                <div className="form-step">
                  <h3 className="step-title">Where should we deliver the pilot scope?</h3>
                  <p className="step-desc xs dim">
                    We will prepare a customized read-only pilot evaluation agreement and technical checklist.
                  </p>

                  <div className="form-fields">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="name-input">
                          YOUR FULL NAME *
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="role-input">
                          JOB TITLE / DESIGNATION *
                        </label>
                        <input
                          id="role-input"
                          type="text"
                          required
                          placeholder="e.g. Planning Head / Project Director"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="email-input">
                          CORPORATE WORK EMAIL *
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          required
                          placeholder="rajesh.s@contractor.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="phone-input">
                          DIRECT PHONE / WHATSAPP NUMBER
                        </label>
                        <input
                          id="phone-input"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions between">
                    <button
                      type="button"
                      className="btn-back mono xs dim"
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft className="ico-xs" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="hero-btn mono xs"
                    >
                      {isSubmitting ? "Submitting Scope..." : "Submit Pilot Request"} <Send className="ico-xs" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Confirmation State */
            <div className="submission-success mono xs">
              <div className="success-icon-wrap">
                <CheckCircle2 className="ico-md ok" />
              </div>
              <h3 className="success-h">Pilot Scope Received</h3>
              <p className="success-desc xs dim">
                Thank you, <strong>{formData.contactName}</strong>. Our project controls team will review the package
                details for <strong>{formData.projectName}</strong> ({formData.organization}) and reach out at{" "}
                <strong>{formData.email}</strong> within 24 business hours to coordinate read-only schedule ingestion.
              </p>
              <div className="direct-note xs dim mt-4">
                <span>Direct co-founder contact: </span>
                <a href="mailto:founders@syncpro.org" className="acc">founders@syncpro.org</a>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Enterprise Pilot Modal: triggered when clicking any 'Request Enterprise Pilot' CTA
 */
export function PilotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X className="ico-sm" />
        </button>
        <PilotConsole />
      </div>
    </div>
  );
}
