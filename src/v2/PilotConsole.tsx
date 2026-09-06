/**
 * SyncPro v2 — Section 08 / Pilot Enquiry Console & Modal
 * Sourced directly from Astra's blueprint:
 * "Bring one package. Start a conversation."
 * Clean 3-step qualification form with zero overwhelming friction.
 */
import { useState } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, X } from "lucide-react";

interface PilotFormData {
  name: string;
  email: string;
  organization: string;
  role: string;
  projectName: string;
  capexRange: string;
  tool: string;
  interest: string;
  consent: boolean;
}

const INITIAL_FORM: PilotFormData = {
  name: "",
  email: "",
  organization: "",
  role: "",
  projectName: "",
  capexRange: "₹500 Cr - ₹1,500 Cr ($60M - $180M)",
  tool: "Oracle Primavera P6 (.xer)",
  interest: "Critical Path Delay Early Detection",
  consent: true,
};

export function PilotConsole() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PilotFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 700);
    }
  };

  return (
    <section className="section intake-sec" id="intake">
      <div className="wrap">
        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow mono xs dim">08 / PILOT ENQUIRY</span>
            <MaskLines
              as="h2"
              className="sec-h"
              baseDelay={80}
              lines={[<>Bring one package.</>, <><span className="accent">Start a conversation.</span></>]}
            />
          </div>
          <p className="head-desc">
            Tell us what you’re working on. We’ll discuss fit and schedule export compatibility before requesting project data.
          </p>
        </div>

        <Reveal variant="up" delay={180}>
          <div className="intake-card spotlight-card">
            {/* Steps Progress Header */}
            <div className="intake-steps-bar mono xs">
              <span className={`step-item ${step >= 1 ? "active" : ""}`}>01 / You</span>
              <span className="step-sep">→</span>
              <span className={`step-item ${step >= 2 ? "active" : ""}`}>02 / Package</span>
              <span className="step-sep">→</span>
              <span className={`step-item ${step >= 3 ? "active" : ""}`}>03 / Review</span>
            </div>

            {!submitted ? (
              <form onSubmit={handleNext} className="intake-form">
                {/* Step 1: You */}
                {step === 1 && (
                  <div className="form-step">
                    <h3 className="form-step-title">Your Details</h3>
                    <p className="form-step-sub xs dim">
                      Let us know who you are and where you manage capital project delivery.
                    </p>

                    <div className="form-grid">
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="fn-input">FULL NAME *</label>
                        <input
                          id="fn-input"
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="em-input">WORK EMAIL *</label>
                        <input
                          id="em-input"
                          type="email"
                          required
                          placeholder="rajesh@contractor.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="org-input">ORGANIZATION *</label>
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
                        <label className="mono xs dim" htmlFor="role-input">ROLE / DESIGNATION *</label>
                        <input
                          id="role-input"
                          type="text"
                          required
                          placeholder="e.g. Planning Head, Project Controls Lead"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-actions right mt-6">
                      <button type="submit" className="hero-btn mono xs">
                        Continue to Package <ArrowRight className="ico-xs" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Package */}
                {step === 2 && (
                  <div className="form-step">
                    <h3 className="form-step-title">Package &amp; Tooling</h3>
                    <p className="form-step-sub xs dim">
                      Select your primary scheduling environment and pilot focus area.
                    </p>

                    <div className="form-grid">
                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="pn-input">PROJECT / PACKAGE NAME *</label>
                        <input
                          id="pn-input"
                          type="text"
                          required
                          placeholder="e.g. Mumbai Metro Package 04"
                          value={formData.projectName}
                          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="tool-select">SCHEDULING SOFTWARE *</label>
                        <select
                          id="tool-select"
                          value={formData.tool}
                          onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                          className="form-select"
                        >
                          <option value="Oracle Primavera P6 (.xer)">Oracle Primavera P6 (.xer)</option>
                          <option value="Oracle Primavera P6 (PMXML)">Oracle Primavera P6 (PMXML)</option>
                          <option value="Asta Powerproject (.pp)">Asta Powerproject (.pp)</option>
                          <option value="Microsoft Project (.mpp)">Microsoft Project (.mpp)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="capex-select">PACKAGE ESTIMATED CAPEX *</label>
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

                      <div className="form-group">
                        <label className="mono xs dim" htmlFor="focus-select">PRIMARY PILOT FOCUS *</label>
                        <select
                          id="focus-select"
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="form-select"
                        >
                          <option value="Critical Path Delay Early Detection">Critical Path Delay Early Detection</option>
                          <option value="DCMA 14 Schedule Health Diagnostics">DCMA 14 Schedule Health Diagnostics</option>
                          <option value="Contemporaneous FIDIC 8.4 Claims Dossier">Contemporaneous FIDIC 8.4 Claims Dossier</option>
                          <option value="Multi-Source WhatsApp / Docket Entity Ingestion">Multi-Source WhatsApp / Docket Entity Ingestion</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-actions between mt-6">
                      <button type="button" className="btn-back mono xs dim" onClick={() => setStep(1)}>
                        <ArrowLeft className="ico-xs" /> Back
                      </button>
                      <button type="submit" className="hero-btn mono xs">
                        Continue to Review <ArrowRight className="ico-xs" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="form-step">
                    <h3 className="form-step-title">Review &amp; Submit</h3>
                    <p className="form-step-sub xs dim">
                      Please confirm your details. We will email you to discuss package fit and schedule a call.
                    </p>

                    <div className="review-box mono xs">
                      <div className="review-row">
                        <span className="dim">CONTACT:</span>
                        <span>{formData.name} · {formData.role} ({formData.organization})</span>
                      </div>
                      <div className="review-row">
                        <span className="dim">EMAIL:</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="review-row">
                        <span className="dim">PACKAGE:</span>
                        <span>{formData.projectName} ({formData.capexRange})</span>
                      </div>
                      <div className="review-row">
                        <span className="dim">ENVIRONMENT:</span>
                        <span>{formData.tool} · Focus: {formData.interest}</span>
                      </div>
                    </div>

                    <label className="consent-label mono xs dim mt-4">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        required
                      />
                      <span>I confirm SyncPro may contact me regarding this read-only pilot enquiry.</span>
                    </label>

                    <div className="form-actions between mt-6">
                      <button type="button" className="btn-back mono xs dim" onClick={() => setStep(2)}>
                        <ArrowLeft className="ico-xs" /> Back
                      </button>
                      <button type="submit" disabled={isSubmitting} className="hero-btn mono xs">
                        {isSubmitting ? "Sending Enquiry..." : "Request a Pilot Conversation"} <Send className="ico-xs" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              /* Success Confirmation */
              <div className="submission-success mono xs">
                <div className="success-icon-wrap">
                  <CheckCircle2 className="ico-md ok" />
                </div>
                <h3 className="success-title">Request Received</h3>
                <p className="success-desc xs dim">
                  Thank you, <strong>{formData.name}</strong>. Our project controls team will review the package details
                  for <strong>{formData.projectName}</strong> and reach out at <strong>{formData.email}</strong> within
                  24 business hours to discuss read-only schedule ingestion.
                </p>
                <div className="direct-note xs dim mt-4">
                  <span>Direct co-founder contact: </span>
                  <a href="mailto:founders@syncpro.org" className="acc">founders@syncpro.org</a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
