import { useState } from "react";
import { CONTACT, CONTACT_EMAIL } from "./lib/content";
import { submitWaitlist, type WaitlistKind } from "../lib/waitlist";
import { ArrowRight, Check, Mail } from "./lib/icons";
import { Magnetic } from "./lib/interactions";

const SCALES = [
  "Under $50M",
  "$50M – $150M",
  "$150M – $500M",
  "Over $500M",
];

const REQUIRED = ["name", "email", "company", "role"] as const;
type Field = (typeof REQUIRED)[number] | "projectScale" | "tools" | "message";

export function Contact() {
  const [kind, setKind] = useState<WaitlistKind>("early-access");
  const [v, setV] = useState<Record<Field, string>>({
    name: "",
    email: "",
    company: "",
    role: "",
    projectScale: "",
    tools: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((s) => ({ ...s, [f]: e.target.value }));
    if (errors[f]) setErrors((s) => ({ ...s, [f]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    REQUIRED.forEach((f) => {
      if (!v[f].trim()) next[f] = "Required";
    });
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      next.email = "Enter a valid work email";
    }
    if (Object.keys(next).length) {
      setErrors(next);
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setState("sending");
    await submitWaitlist({
      kind,
      name: v.name,
      email: v.email,
      company: v.company,
      role: v.role,
      projectScale: v.projectScale,
      tools: v.tools,
      message: v.message,
    });
    setState("done");
  };

  const err = (f: Field) =>
    errors[f] ? (
      <span className="ferr" id={`e-${f}`} role="alert">
        {errors[f]}
      </span>
    ) : null;

  const aria = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `e-${f}` : undefined,
  });

  return (
    <section className="section" id="contact">
      <div className="wrap-lg">
        <div className="contact-grid">
          <div className="rv">
            <span className="label">{CONTACT.label}</span>
            <h2 className="h1 mt-4">{CONTACT.h2}</h2>
            <p className="lead mt-4" style={{ maxWidth: "46ch" }}>
              {CONTACT.lead}
            </p>

            <div className="contact-alt">
              <span className="label">{CONTACT.altLead}</span>
              <div className="contact-line">
                <Mail size={15} className="faint" />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <p className="xs faint" style={{ maxWidth: "44ch", lineHeight: 1.6 }}>
                We are a small team. Enquiries reach the founders directly, and every pilot is run by
                one of us rather than routed to a queue.
              </p>
            </div>
          </div>

          <div className="rv">
            {state === "done" ? (
              <div className="cform-done" role="status">
                <Check size={18} style={{ flex: "0 0 auto", marginTop: 1 }} />
                <div>
                  <b style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
                    Enquiry received
                  </b>
                  <span>{CONTACT.success}</span>
                </div>
              </div>
            ) : (
              <form className="cform" onSubmit={submit} noValidate>
                <fieldset className="cform-fieldset">
                  <legend className="label">What are you here for?</legend>
                  <div className="seg" role="radiogroup" aria-label="Enquiry type">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={kind === "early-access"}
                      className="seg-btn"
                      onClick={() => setKind("early-access")}
                    >
                      Pilot access
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={kind === "investor"}
                      className="seg-btn"
                      onClick={() => setKind("investor")}
                    >
                      Investor / advisor
                    </button>
                  </div>
                </fieldset>

                <div className="cform-grid">
                  <div className="field">
                    <label className="label" htmlFor="f-name">
                      Full name
                    </label>
                    <input
                      id="f-name"
                      className="input"
                      value={v.name}
                      onChange={set("name")}
                      autoComplete="name"
                      required
                      {...aria("name")}
                    />
                    {err("name")}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="f-email">
                      Work email
                    </label>
                    <input
                      id="f-email"
                      className="input"
                      type="email"
                      inputMode="email"
                      value={v.email}
                      onChange={set("email")}
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                      {...aria("email")}
                    />
                    {err("email")}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="f-company">
                      Company
                    </label>
                    <input
                      id="f-company"
                      className="input"
                      value={v.company}
                      onChange={set("company")}
                      autoComplete="organization"
                      required
                      {...aria("company")}
                    />
                    {err("company")}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="f-role">
                      Role
                    </label>
                    <input
                      id="f-role"
                      className="input"
                      value={v.role}
                      onChange={set("role")}
                      autoComplete="organization-title"
                      placeholder="VP Project Controls"
                      required
                      {...aria("role")}
                    />
                    {err("role")}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="f-scale">
                      Portfolio value <span className="faint">· optional</span>
                    </label>
                    <select id="f-scale" className="select" value={v.projectScale} onChange={set("projectScale")}>
                      <option value="">Select a range</option>
                      {SCALES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="f-tools">
                      Scheduling tools <span className="faint">· optional</span>
                    </label>
                    <input
                      id="f-tools"
                      className="input"
                      value={v.tools}
                      onChange={set("tools")}
                      placeholder="P6, Procore, OpenSpace"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="f-message">
                    Anything specific about the schedule <span className="faint">· optional</span>
                  </label>
                  <textarea
                    id="f-message"
                    className="textarea"
                    rows={3}
                    value={v.message}
                    onChange={set("message")}
                    placeholder="Project type, the argument you are trying to win, or the file you want audited."
                  />
                </div>

                <Magnetic strength={0.16}>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={state === "sending"}>
                    {state === "sending" ? "Sending…" : "Request pilot access"}
                    {state === "sending" ? null : <ArrowRight className="ico" />}
                  </button>
                </Magnetic>

                <p className="xs faint" style={{ lineHeight: 1.6 }}>
                  No newsletter, no drip sequence. One reply from a founder, within two working days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
