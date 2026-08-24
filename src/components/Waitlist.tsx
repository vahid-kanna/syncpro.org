import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Mail, ShieldCheck, Lock } from "lucide-react";
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
    <section id="waitlist" style={{ padding: "110px 0", borderTop: "1px solid var(--line)" }}>
      <div className="wrap-sm">
        <div
          className="card spotlight-card animated-border-glow"
          style={{
            background: "rgba(15, 18, 24, 0.95)",
            border: "1px solid var(--line-strong)",
            borderRadius: "var(--r-lg)",
            padding: "36px 32px",
            boxShadow: "var(--shadow-pop)",
          }}
        >
          {status === "done" ? (
            <div className="row gap-4" style={{ alignItems: "flex-start", padding: "16px 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: "var(--success-bg)",
                  border: "1px solid var(--success-line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 className="ico" style={{ width: 24, height: 24, color: "var(--success)" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)" }}>
                  You're on the early access priority list.
                </h3>
                <p className="lead mt-3 measure" style={{ fontSize: "15px", color: "var(--text-2)" }}>
                  Thank you for reaching out, <strong>{form.name}</strong>. We are onboarding a small cohort of
                  design partners personally and will be in touch shortly via <strong>{form.email}</strong>.
                </p>
                <p className="xs dim mt-3">
                  Need immediate project controls assistance? Reach out directly to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="row center gap-2 mb-3">
                <span
                  className="mono xs"
                  style={{
                    color: "var(--brand)",
                    background: "var(--brand-bg)",
                    border: "1px solid var(--brand-line)",
                    padding: "4px 16px",
                    borderRadius: "var(--r-full)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Join the Design Partner Cohort
                </span>
              </div>
              <h2 className="display text-center" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.15, textAlign: "center", marginBottom: "12px" }}>
                Deploy SyncPro on your live megaproject.
              </h2>
              <p className="lead text-center" style={{ textAlign: "center", fontSize: "15.5px", color: "var(--text-2)", marginBottom: "32px" }}>
                We are reviewing incoming requests personally and granting early access to select general contractors,
                developers, and project controls directors.
              </p>

              {/* Kind Selector Tabs */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(7, 8, 10, 0.8)",
                  border: "1px solid var(--line-soft)",
                  borderRadius: "var(--r-full)",
                  padding: "4px",
                  marginBottom: "28px",
                }}
                role="tablist"
                aria-label="Enquiry type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isInvestor}
                  onClick={() => setKind("early-access")}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: "var(--r-full)",
                    background: !isInvestor ? "var(--brand)" : "transparent",
                    color: !isInvestor ? "#07080A" : "var(--text-2)",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    transition: "all 0.2s ease",
                  }}
                >
                  I Run / Support Projects
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isInvestor}
                  onClick={() => setKind("investor")}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: "var(--r-full)",
                    background: isInvestor ? "var(--brand)" : "transparent",
                    color: isInvestor ? "#07080A" : "var(--text-2)",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    transition: "all 0.2s ease",
                  }}
                >
                  Investor / Advisor
                </button>
              </div>

              {status === "error" && (
                <div
                  className="row gap-2 mb-4"
                  style={{
                    padding: "10px 14px",
                    background: "var(--danger-bg)",
                    border: "1px solid var(--danger-line)",
                    borderRadius: "var(--r-xs)",
                    color: "var(--danger)",
                    fontSize: 13,
                  }}
                >
                  <AlertCircle className="ico" style={{ width: 16, height: 16 }} />
                  <span>
                    {errorMessage} You can also email us directly at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "underline", fontWeight: 600 }}>
                      {CONTACT_EMAIL}
                    </a>.
                  </span>
                </div>
              )}

              <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="grid-2 gap-3">
                  <div className="col gap-1">
                    <label htmlFor="name" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                      Full Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(7, 8, 10, 0.8)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-xs)",
                        color: "var(--text)",
                      }}
                    />
                  </div>

                  <div className="col gap-1">
                    <label htmlFor="email" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="rajesh.sharma@contractor.com"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(7, 8, 10, 0.8)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-xs)",
                        color: "var(--text)",
                      }}
                    />
                  </div>

                  <div className="col gap-1">
                    <label htmlFor="company" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                      Company / Organization *
                    </label>
                    <input
                      id="company"
                      required
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="e.g. L&amp;T, Tata Projects, Shapoorji, DLF"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(7, 8, 10, 0.8)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-xs)",
                        color: "var(--text)",
                      }}
                    />
                  </div>

                  <div className="col gap-1">
                    <label htmlFor="role" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                      Your Role / Title *
                    </label>
                    <input
                      id="role"
                      required
                      value={form.role}
                      onChange={(e) => set("role", e.target.value)}
                      placeholder={isInvestor ? "e.g. Partner, Principal" : "e.g. Project Director / GM Planning"}
                      style={{
                        padding: "10px 14px",
                        background: "rgba(7, 8, 10, 0.8)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--r-xs)",
                        color: "var(--text)",
                      }}
                    />
                  </div>
                </div>

                <div className="col gap-1">
                  <label htmlFor="message" style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                    {isInvestor ? "Note or Focus Areas" : "What is the biggest scheduling bottleneck on your projects?"}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder={
                      isInvestor
                        ? "Tell us how you'd like to collaborate..."
                        : "e.g. Subcontractor progress reporting is always 2 weeks late..."
                    }
                    style={{
                      padding: "10px 14px",
                      background: "rgba(7, 8, 10, 0.8)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-xs)",
                      color: "var(--text)",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div className="row between wrapf gap-4 pt-3" style={{ alignItems: "center" }}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary"
                    style={{ minWidth: 220, padding: "12px 28px", borderRadius: "var(--r-full)", justifyContent: "center" }}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="ico" style={{ animation: "spin 1s linear infinite" }} />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Request Pilot Access
                        <ArrowRight className="ico" />
                      </>
                    )}
                  </button>
                  <span className="xs dim row gap-1" style={{ alignItems: "center" }}>
                    <Mail className="ico" style={{ width: 13, height: 13, color: "var(--brand)" }} />
                    Direct line: {CONTACT_EMAIL}
                  </span>
                </div>

                {/* Trust Guarantee Badges */}
                <div
                  className="row between wrapf gap-3 mt-4 pt-3"
                  style={{ borderTop: "1px solid var(--line-soft)", fontSize: "11.5px", color: "var(--text-3)" }}
                >
                  <span className="row gap-1" style={{ alignItems: "center" }}>
                    <ShieldCheck className="ico" style={{ width: 13, height: 13, color: "var(--accent)" }} />
                    Zero Model Training on Customer Schedules
                  </span>
                  <span className="row gap-1" style={{ alignItems: "center" }}>
                    <Lock className="ico" style={{ width: 13, height: 13, color: "var(--brand)" }} />
                    SOC 2 Type II &amp; AES-256 Encryption
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
