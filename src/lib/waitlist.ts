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

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
export const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ||
  "founders@syncpro.org";

/**
 * Submits the waitlist form.
 *
 * 1. If VITE_WEB3FORMS_ACCESS_KEY is set, posts to Web3Forms API.
 * 2. If VITE_WAITLIST_ENDPOINT is set (Formspree / Web3Forms / Formspark / custom webhook),
 *    POSTs payload as JSON and resolves on 2xx.
 * 3. Otherwise falls back to opening a pre-filled mailto: so the site is 100% operational
 *    even before an API key is configured.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  // Web3Forms direct support
  if (WEB3FORMS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject:
          payload.kind === "investor"
            ? `SyncPro Investor Enquiry: ${payload.name} (${payload.company || "Individual"})`
            : `SyncPro Pilot Access Request: ${payload.name} (${payload.company || "Individual"})`,
        from_name: payload.name,
        ...payload,
      }),
    });

    if (!res.ok) {
      throw new Error(`Submission failed (${res.status})`);
    }
    return;
  }

  // Custom Endpoint support (Formspree, Cloudflare Worker, Supabase Edge Function)
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Submission failed (${res.status})`);
    }
    return;
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
