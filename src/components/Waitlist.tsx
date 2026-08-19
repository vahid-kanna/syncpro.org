import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import {
  submitWaitlist,
  CONTACT_EMAIL,
  type WaitlistKind,
  type WaitlistPayload,
} from "../lib/waitlist";

const EMPTY: WaitlistPayload = {
  kind: "early-access",
  name: "",
  email: "",
  company: "",
  role: "",
  projectScale: "",
  tools: "",
  message: "",
};

export function Waitlist() {
  const [form, setForm] = useState<WaitlistPayload>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (k: keyof WaitlistPayload, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setKind = (kind: WaitlistKind) => setForm((f) => ({ ...f, kind }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await submitWaitlist(form);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  const isInvestor = form.kind === "investor";

  return (
    <section id="waitlist" className="wrap-sm section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="form-card">
        {status === "done" ? (
          <div className="row gap-4" style={{ alignItems: "flex-start", padding: "16px 0" }}>
            <div className="iconbox success" style={{ width: 44, height: 44 }}>
              <CheckCircle2 className="ico" style={{ width: 22, height: 22, color: "var(--success)" }} />
            </div>
            <div>
              <h3 className="h2">You're on the early access priority list.</h3>
              <p className="body mt-3 measure">
                Thank you for reaching out, <strong>{form.name}</strong>. We are onboarding a small cohort of
                design partners personally and will be in touch shortly via <strong>{form.email}</strong>.
              </p>
              <p className="xs dim mt-3">
                Need urgent project controls assistance or have immediate questions? Reach out directly to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="t-brand" style={{ textDecoration: "underline" }}>
                  {CONTACT_EMAIL}
                </a>.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="eyebrow mb-2">JOIN THE DESIGN PARTNER COHORT</div>
            <h2 className="h1">Be first to deploy SyncPro on a live project.</h2>
            <p className="body mt-2 mb-6 measure">
              Tell us about your project or firm. We are reviewing incoming requests personally and
              granting early access to select general contractors, project controls leads, and owners.
            </p>

            {/* Kind Selector Tabs */}
            <div className="seg mb-6" role="tablist" aria-label="Enquiry type">
              <button
                type="button"
                role="tab"
                aria-selected={!isInvestor}
                onClick={() => setKind("early-access")}
              >
                I run / support projects
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isInvestor}
                onClick={() => setKind("investor")}
              >
                Investor / advisor
              </button>
            </div>

            {status === "error" && (
              <div
                className="row gap-2 mb-4"
                style={{
                  padding: "10px 14px",
                  background: "var(--danger-bg)",
                  border: "1px solid var(--danger-line)",
                  borderRadius: "var(--r-md)",
                  color: "var(--danger)",
                  fontSize: 13,
                }}
              >
                <AlertCircle className="ico grow0" style={{ width: 16, height: 16 }} />
                <span>
                  {errorMessage} You can also email us directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "underline", fontWeight: 600 }}>
                    {CONTACT_EMAIL}
                  </a>.
                </span>
              </div>
            )}

            <form onSubmit={onSubmit} className="stack-lg">
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. David Ross"
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Work Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="david.ross@contractor.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="company">Company / Organization *</label>
                  <input
                    id="company"
                    required
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="e.g. Turner, Bechtel, Skanska"
                  />
                </div>

                <div className="field">
                  <label htmlFor="role">Your Role / Title *</label>
                  <input
                    id="role"
                    required
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    placeholder={isInvestor ? "e.g. Partner, Principal" : "e.g. Project Controls Manager, Lead Planner"}
                  />
                </div>

                {!isInvestor && (
                  <>
                    <div className="field">
                      <label htmlFor="projectScale">Project Scale / Type</label>
                      <input
                        id="projectScale"
                        value={form.projectScale}
                        onChange={(e) => set("projectScale", e.target.value)}
                        placeholder="e.g. $120M High-Rise / Hyperscale DC"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="tools">Current Scheduling Stack</label>
                      <input
                        id="tools"
                        value={form.tools}
                        onChange={(e) => set("tools", e.target.value)}
                        placeholder="e.g. Primavera P6, Asta, MS Project"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="field">
                <label htmlFor="message">
                  {isInvestor ? "Note or Focus Areas" : "What is the biggest scheduling / reconciliation bottleneck on your projects?"}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={
                    isInvestor
                      ? "Tell us how you'd like to collaborate..."
                      : "e.g. Subcontractor progress reporting is always 2 weeks late, making delay analysis purely retrospective..."
                  }
                />
              </div>

              <div className="row between wrapf gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary btn-lg"
                  style={{ minWidth: 200 }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="ico anim-pulse" style={{ animation: "spin 1s linear infinite" }} />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Request Early Access
                      <ArrowRight className="ico" />
                    </>
                  )}
                </button>
                <span className="xs dim" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Mail className="ico" style={{ width: 12, height: 12 }} />
                  Direct line: {CONTACT_EMAIL}
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
