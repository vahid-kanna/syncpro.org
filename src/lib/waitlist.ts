export type WaitlistKind = "early-access" | "investor";

export interface WaitlistPayload {
  kind: WaitlistKind;
  name: string;
  email: string;
  company: string;
  role: string;
  projectScale?: string;
  tools?: string;
  message: string;
}

export const CONTACT_EMAIL = "founders@syncpro.org";

/**
 * Submits the waitlist / contact form directly to founders@syncpro.org
 * using FormSubmit AJAX endpoint, with fallback to mailto.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const subject =
    payload.kind === "investor"
      ? `[SyncPro] New Investor / Advisor Enquiry from ${payload.name} (${payload.company || "Individual"})`
      : `[SyncPro] New Pilot Access Request from ${payload.name} (${payload.company || "Individual"})`;

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name: payload.name,
        email: payload.email,
        company: payload.company,
        role: payload.role,
        enquiry_type: payload.kind === "investor" ? "Investor / Advisor" : "Early Access Pilot",
        project_scale: payload.projectScale || "Not specified",
        scheduling_tools: payload.tools || "Not specified",
        message: payload.message || "No additional notes provided.",
      }),
    });

    if (res.ok) {
      return;
    }
  } catch {
    // If blocked by adblocker / CORS, fallback to mailto
  }

  // Graceful fallback to pre-filled mailto
  openMailtoFallback(payload);
}

function openMailtoFallback(p: WaitlistPayload) {
  const subject =
    p.kind === "investor"
      ? `SyncPro — investor / advisor enquiry (${p.name})`
      : `SyncPro — early access pilot request (${p.name})`;
  const body = [
    `Name: ${p.name}`,
    `Work Email: ${p.email}`,
    `Company: ${p.company}`,
    `Role: ${p.role}`,
    p.projectScale ? `Project Scale: ${p.projectScale}` : "",
    p.tools ? `Current Scheduling Tools: ${p.tools}` : "",
    "",
    "--- Project Details / Note ---",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
