/**
 * SyncPro v2 — interactive enterprise modules:
 * 1. DigitalTwin: 3D BIM Spatial Node Inspector
 * 2. DelaySandbox: Indian Megaproject Delay Risk & ROI Simulator (₹ Cr / Lakhs)
 * 3. PilotTerminal: Inline frictionless Pilot Intake connected to founders@syncpro.org
 */
import { useState, type FormEvent } from "react";
import { Reveal, MaskLines } from "./Chrome";
import { ScrubHeading, Magnetic } from "./Motion";
import { submitWaitlist, CONTACT_EMAIL, type WaitlistKind, type WaitlistPayload } from "../lib/waitlist";

/* ================= 1. 3D BIM SPATIAL TWIN ================= */

interface Hotspot {
  id: string;
  label: string;
  phase: string;
  x: number; // percentage from left
  y: number; // percentage from top
  status: "RISK" | "SHIELDED" | "ON_TRACK";
  statusText: string;
  floatDelta: string;
  ldExposure: string;
  evidence: string;
  detail: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "podium-mep",
    label: "Podium Level 04: MEP Risers & Heavy Ductwork",
    phase: "Phase 2 · Mechanical & Electrical Rough-ins",
    x: 48,
    y: 62,
    status: "RISK",
    statusText: "CRITICAL FLOAT DEPLETION (−8D)",
    floatDelta: "−8 Days Negative Float",
    ldExposure: "₹9.4 Cr Delay Risk if Unmitigated",
    evidence: "Acoustic duct scans + Supplier delay challan #SN-882",
    detail: "Chilled water riser spool fabrication 3 weeks behind. SyncPro's graph sort parallelized 2nd fix branch runs, recovering 6 days without moving contractual handover.",
  },
  {
    id: "facade-spire",
    label: "Apex Facade: Structural Glazing Spire",
    phase: "Phase 4 · Building Enclosure & Curtain Wall",
    x: 52,
    y: 22,
    status: "SHIELDED",
    statusText: "FIDIC / NHAI CLAIM NOTICE GENERATED",
    floatDelta: "+14 Days Total Float",
    ldExposure: "₹0.00 Unbudgeted Contractor Liability",
    evidence: "Drone lidar point cloud vs IFC model (0.3mm delta)",
    detail: "Architectural revision to curtain wall bracket clips issued late by Engineer. SyncPro timestamped the IFC clash and drafted the formal Notice of Claim before the 28-day FIDIC time-bar.",
  },
  {
    id: "basement-piles",
    label: "Substructure: Secant Wall Piling & Dewatering",
    phase: "Phase 1 · Foundations & Earthworks",
    x: 32,
    y: 84,
    status: "ON_TRACK",
    statusText: "CORROBORATED AS-BUILT",
    floatDelta: "+3 Days Total Float",
    ldExposure: "₹0.00 Risk (Ahead of Baseline)",
    evidence: "78 Ultrasonic pile integrity logs + RMC tickets",
    detail: "All 80 secant piles completed with cryptographic QA/QC hashes stored in the audit graph. Zero logic gaps in Primavera P6 relationship ties.",
  },
];

export function DigitalTwin() {
  const [activeId, setActiveId] = useState<string>("podium-mep");
  const spot = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  return (
    <section className="sec wrap" id="twin">
      <div className="sechead mono xs">
        <span className="num">02</span>
        <span>LIVING 3D DIGITAL TWIN · BIM RECONCILIATION</span>
      </div>

      <MaskLines
        className="sec-h"
        baseDelay={0}
        lines={[<>Spatial schedule intelligence.</>, <><em>Every activity mapped to 3D reality.</em></>]}
      />

      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">SYNCHRONIZED WITH ORACLE P6 (.XER) · 60 FPS GPU VIEWPORT</p>
      </Reveal>

      <div className="twin-grid mt-6">
        {/* Left: Viewport */}
        <Reveal variant="up" delay={240}>
          <div className="twin-viewport">
            <img
              src="/apex-holographic-bim.png"
              alt="3D Holographic BIM Digital Twin Model"
              className="twin-img"
            />
            <div className="twin-glow" />

            {/* Interactive Pins */}
            {HOTSPOTS.map((h) => {
              const isSel = h.id === activeId;
              const isBad = h.status === "RISK";
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveId(h.id)}
                  className={`twin-pin${isSel ? " active" : ""}${isBad ? " bad" : ""}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={h.label}
                >
                  <span className="twin-pin-ring" />
                  <span className="twin-pin-dot" />
                  <span className="twin-pin-lbl mono xs">{h.label.split(":")[0]}</span>
                </button>
              );
            })}

            <div className="twin-hud mono xs">
              <span>VIEWPORT: APEX 80-STORY STRUCTURAL DIGITAL TWIN</span>
              <span className="dim">FPS: 60 · HARDWARE ACCELERATED</span>
            </div>
          </div>
        </Reveal>

        {/* Right: Inspection Card */}
        <Reveal variant="up" delay={340}>
          <div className="twin-card">
            <div className="twin-card-head mono xs">
              <span className="dim">SPATIAL NODE INSPECTION</span>
              <span className={spot.status === "RISK" ? "bad" : "ok"}>{spot.statusText}</span>
            </div>

            <div className="mono xs dim mt-3">{spot.phase}</div>
            <h3 className="twin-card-title">{spot.label}</h3>

            <div className="twin-metrics mono xs">
              <div className="twin-mcell">
                <span className="dim">TOTAL FLOAT DELTA</span>
                <span className={spot.status === "RISK" ? "bad" : "ok"}>{spot.floatDelta}</span>
              </div>
              <div className="twin-mcell">
                <span className="dim">FINANCIAL EXPOSURE</span>
                <span className="warn">{spot.ldExposure}</span>
              </div>
            </div>

            <div className="twin-evbox mono xs">
              <span className="dim">CONTEMPORANEOUS EVIDENCE:</span>
              <p className="mt-1">{spot.evidence}</p>
            </div>

            <div className="twin-remedbox">
              <span className="mono xs dim">// AUTONOMOUS GRAPH REMEDIATION:</span>
              <p className="mt-1 text-sm">{spot.detail}</p>
            </div>

            <Magnetic>
              <a className="v2cta mt-4 block center" href="#pilot">
                Deploy on Your BIM Model →
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 2. INDIAN CAPITAL DELAY SANDBOX ================= */

export function DelaySandbox() {
  const [capexCr, setCapexCr] = useState<number>(1200); // ₹1,200 Cr default
  const [delayWeeks, setDelayWeeks] = useState<number>(6); // 6 weeks default

  // Financial calculations
  const dailyLdCr = (capexCr * 0.001) / 7;
  const totalLdCr = dailyLdCr * (delayWeeks * 7);
  const monthlyPrelimsCr = (capexCr * 0.08) / 24;
  const extendedPrelimsCr = (monthlyPrelimsCr / 4.33) * delayWeeks;
  const carryingCostCr = capexCr * 0.09 * (delayWeeks / 52);
  const totalExposureCr = totalLdCr + extendedPrelimsCr + carryingCostCr;
  const syncproRecoveryCr = totalExposureCr * 0.76;

  return (
    <section className="sec wrap" id="sandbox">
      <div className="sechead mono xs">
        <span className="num">03</span>
        <span>FINANCIAL RISK SANDBOX · INDIAN MEGAPROJECT ROI</span>
      </div>

      <ScrubHeading
        className="sec-h"
        segs={[{ t: "Quantify the cost of" }, { t: "3 weeks of schedule blindness.", em: true }]}
      />

      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">CAPITAL EXPOSURE MODELING · FIDIC / NHAI CONTRACT BENCHMARKS</p>
      </Reveal>

      <div className="sandbox-grid mt-6">
        {/* Sliders Box */}
        <Reveal variant="up" delay={220}>
          <div className="sandbox-card">
            <div className="abar mono xs">
              <span>PROJECT INPUT PARAMETERS</span>
              <span className="dim">INDIAN MEGASCALE</span>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="row between mb-2">
                  <label htmlFor="sb-capex" className="mono xs dim">
                    CONTRACT PACKAGE VALUE (CAPEX)
                  </label>
                  <span className="mono xs ok bold">₹{capexCr.toLocaleString()} Crores</span>
                </div>
                <input
                  id="sb-capex"
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={capexCr}
                  onChange={(e) => setCapexCr(Number(e.target.value))}
                  className="sb-slider"
                />
                <div className="row between mono xs dim mt-1">
                  <span>₹100 Cr</span>
                  <span>₹2,500 Cr</span>
                  <span>₹5,000 Cr+</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="row between mb-2">
                  <label htmlFor="sb-delay" className="mono xs dim">
                    UNDETECTED CRITICAL PATH SLIP
                  </label>
                  <span className="mono xs warn bold">
                    {delayWeeks} Weeks ({delayWeeks * 7} Days)
                  </span>
                </div>
                <input
                  id="sb-delay"
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={delayWeeks}
                  onChange={(e) => setDelayWeeks(Number(e.target.value))}
                  className="sb-slider"
                />
                <div className="row between mono xs dim mt-1">
                  <span>1 Week</span>
                  <span>12 Weeks</span>
                  <span>24 Weeks</span>
                </div>
              </div>

              <div className="sb-note mono xs dim">
                <span>BENCHMARKS:</span> Liquidated damages @ 0.1%/week; site plant overheads @ 8% CAPEX; working capital interest @ 9% p.a.
              </div>
            </div>
          </div>
        </Reveal>

        {/* Output Verdict Card */}
        <Reveal variant="up" delay={340}>
          <div className="sandbox-card">
            <div className="abar mono xs">
              <span>TOTAL UNMITIGATED EXPOSURE</span>
              <span className="bad">DIRECT CAPITAL LOSS</span>
            </div>
            <div className="p-6 flex-col between" style={{ minHeight: "340px" }}>
              <div>
                <div className="sb-huge mono">₹{totalExposureCr.toFixed(2)} Cr</div>
                <div className="mono xs dim mb-4">ACCUMULATED DIRECT LOSSES ACROSS {delayWeeks} WEEKS</div>

                <div className="sb-breakdown mono xs">
                  <div className="row between p-2">
                    <span className="dim">Liquidated Damages:</span>
                    <span>₹{totalLdCr.toFixed(2)} Cr ({(dailyLdCr * 100).toFixed(1)}L/day)</span>
                  </div>
                  <div className="row between p-2">
                    <span className="dim">Extended Site Overheads:</span>
                    <span>₹{extendedPrelimsCr.toFixed(2)} Cr</span>
                  </div>
                  <div className="row between p-2">
                    <span className="dim">Carrying Cost Interest:</span>
                    <span>₹{carryingCostCr.toFixed(2)} Cr</span>
                  </div>
                </div>
              </div>

              <div className="sb-recovery mono xs mt-4">
                <span className="ok bold">// SYNCPRO 3-WEEK EARLY RECOVERY:</span>
                <div className="row between mt-1">
                  <span className="dim">Protected Capital:</span>
                  <span className="ok bold">+₹{syncproRecoveryCr.toFixed(2)} Cr</span>
                </div>
              </div>

              <Magnetic>
                <a className="v2cta mt-4 block center" href="#pilot">
                  Protect Your Capital Project →
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 3. INLINE PILOT INTAKE TERMINAL ================= */

const EMPTY_FORM: WaitlistPayload = {
  kind: "early-access",
  name: "",
  email: "",
  company: "",
  role: "",
  projectScale: "",
  tools: "",
  message: "",
};

export function PilotTerminal() {
  const [form, setForm] = useState<WaitlistPayload>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const setKind = (kind: WaitlistKind) => setForm((f) => ({ ...f, kind }));
  const setField = (k: keyof WaitlistPayload, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    try {
      await submitWaitlist(form);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Submission failed.");
    }
  }

  const isInv = form.kind === "investor";

  return (
    <section className="sec wrap" id="pilot">
      <div className="sechead mono xs">
        <span className="num">04</span>
        <span>DEPLOY SYNCPRO · DESIGN PARTNER COHORT</span>
      </div>

      <MaskLines
        className="sec-h"
        baseDelay={0}
        lines={[<>Deploy on your live megaproject.</>, <><em>Zero model training. Full dispute immunity.</em></>]}
      />

      <Reveal variant="down" delay={180}>
        <p className="mono lbl cap-kick">APPLICATION PROTOCOL · DIRECT FOUNDERS ONBOARDING</p>
      </Reveal>

      <Reveal variant="up" delay={240} className="mt-8">
        <div className="pilot-card">
          {status === "done" ? (
            <div className="p-8 text-center">
              <div className="mono xs ok bold mb-2">// PRIORITY ONBOARDING QUEUE CONFIRMED</div>
              <h3 className="text-2xl font-bold mb-3">Thank you, {form.name}.</h3>
              <p className="dim max-w-md mx-auto mb-4">
                We onboard design partners personally. Our engineering team will review your project parameters and contact you at <strong className="text-white">{form.email}</strong>.
              </p>
              <div className="mono xs dim">
                Direct Founders Line: <a href={`mailto:${CONTACT_EMAIL}`} className="ok">{CONTACT_EMAIL}</a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="p-8">
              {/* Type Switcher */}
              <div className="pilot-tabs mb-6">
                <button
                  type="button"
                  onClick={() => setKind("early-access")}
                  className={`pilot-tab mono xs${!isInv ? " active" : ""}`}
                >
                  I Run / Support Projects
                </button>
                <button
                  type="button"
                  onClick={() => setKind("investor")}
                  className={`pilot-tab mono xs${isInv ? " active" : ""}`}
                >
                  Investor / Advisor
                </button>
              </div>

              {status === "error" && (
                <div className="pilot-err mono xs mb-4">
                  {err} Or reach out directly to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
              )}

              <div className="pilot-inputs grid-2 gap-4 mb-4">
                <div>
                  <label className="mono xs dim block mb-1">FULL NAME *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="pilot-inp"
                  />
                </div>
                <div>
                  <label className="mono xs dim block mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="rajesh.sharma@contractor.com"
                    className="pilot-inp"
                  />
                </div>
                <div>
                  <label className="mono xs dim block mb-1">COMPANY / ORGANIZATION *</label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                    placeholder="e.g. L&T, Tata Projects, Shapoorji, DLF"
                    className="pilot-inp"
                  />
                </div>
                <div>
                  <label className="mono xs dim block mb-1">YOUR ROLE *</label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) => setField("role", e.target.value)}
                    placeholder={isInv ? "e.g. Partner, Principal" : "e.g. Project Controls Director"}
                    className="pilot-inp"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mono xs dim block mb-1">
                  {isInv ? "COLLABORATION FOCUS" : "BIGGEST SCHEDULING BOTTLENECK"}
                </label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder={
                    isInv
                      ? "Tell us how you'd like to collaborate..."
                      : "e.g. Subcontractor progress reporting is 2 weeks delayed..."
                  }
                  className="pilot-inp"
                />
              </div>

              <div className="row between wrapf gap-4 items-center">
                <Magnetic>
                  <button type="submit" disabled={status === "sending"} className="v2cta pilot-btn">
                    {status === "sending" ? "Transmitting..." : "Request Pilot Access →"}
                  </button>
                </Magnetic>
                <div className="mono xs dim">
                  <span>AES-256 ENCRYPTED</span> · <span>ZERO PUBLIC TRAINING</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
