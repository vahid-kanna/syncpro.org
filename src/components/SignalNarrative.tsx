import {
  FileAudio,
  FileText,
  Receipt,
  Mic,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Radar,
  Gavel,
  CalendarClock,
} from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { fadeUpVariants, staggerContainer } from "../lib/motion";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* 01 · WHAT YOUR SCHEDULE SEES                                        */
/* ------------------------------------------------------------------ */

const P6_ROWS = [
  { id: "A1210", name: "Secant Piling — Podium", start: "Oct 12", float: "+2d", crit: false },
  { id: "A1230", name: "L18 Post-Tension Slab", start: "Dec 08", float: "0d", crit: true },
  { id: "A1240", name: "MEP Risers L04–L18", start: "Dec 11", float: "-8d", crit: true },
  { id: "A1250", name: "Facade Unitization", start: "Jan 20", float: "+5d", crit: false },
];

const SIGNALS = [
  {
    icon: Mic,
    tag: "VOICE NOTE · SITE ENGINEER",
    body: (
      <>
        &ldquo;Batch #4902 delivered 14:15, slump 140mm ok. Poured{" "}
        <mark className="hl">120 m³ M40, Grid C3–C7</mark>.{" "}
        <mark className="hl-bad">PT cable delivery held 2 days</mark> at fabricator.&rdquo;
      </>
    ),
  },
  {
    icon: Receipt,
    tag: "RMC BATCH TICKET · #4902",
    body: (
      <>
        M40 · 120 m³ · 14:15 IST ·{" "}
        <mark className="hl">Grid C3–C7</mark> — corroborates voice note.
      </>
    ),
  },
  {
    icon: FileAudio,
    tag: "DELIVERY DOCKET SCAN",
    body: (
      <>
        Consignment: post-tension strands · ETA slipped{" "}
        <mark className="hl-bad">+2 days</mark> · vendor cert attached.
      </>
    ),
  },
];

function GapSection() {
  const reveal = useReveal();
  return (
    <section id="narrative" className="nar wrap-lg">
      <motion.div
        ref={reveal.ref}
        className={reveal.className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="nar-head">
          <span className="mono xs nar-num">01</span>
          <span className="mono xs nar-label">WHAT YOUR SCHEDULE SEES</span>
          <span className="nar-rule" />
          <span className="mono xs dim">FRAGMENTED VIEW · UPDATED FORTNIGHTLY</span>
        </div>

        <motion.h2 variants={fadeUpVariants} className="nar-h2">
          Your planner sees rows.
          <br />
          <em>The site is telling a different story.</em>
        </motion.h2>

        {/* Split: dry P6 table vs living site signals */}
        <div className="split-grid">
          <motion.div variants={fadeUpVariants} className="artifact sched-artifact">
            <div className="artifact-bar">
              <span className="mono xs dim">BASELINE — ORACLE PRIMAVERA P6 (.XER)</span>
              <span className="mono xs" style={{ color: "var(--text-3)" }}>W12 STATUS CUT-OFF</span>
            </div>
            <table className="sched-table">
              <thead>
                <tr>
                  <th>ACTIVITY</th><th>NAME</th><th>START</th><th>TF</th>
                </tr>
              </thead>
              <tbody>
                {P6_ROWS.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{r.id}</td>
                    <td>{r.name}</td>
                    <td className="mono">{r.start}</td>
                    <td className={`mono ${r.float.startsWith("-") ? "neg" : r.crit ? "crit" : ""}`}>
                      {r.crit && r.float === "0d" ? "0d ⚑" : r.float}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="artifact-totals">
              <div className="row between">
                <span className="mono xs dim">REPORTED STATUS</span>
                <span className="mono xs ok">ON TRACK · LD EXPOSURE ₹0</span>
              </div>
              <p className="xs dim mt-2">
                Clean on paper. The -8d slip hiding behind A1240 won&rsquo;t surface until the
                next manual status cut — <strong style={{ color: "var(--text-2)" }}>three weeks from now.</strong>
              </p>
            </div>
          </motion.div>

          <div className="vs-col">
            <span className="vs-badge mono xs">SYNCPRO READS</span>
            <ArrowDown className="ico vs-arrow" aria-hidden="true" />
          </div>

          <motion.div variants={fadeUpVariants} className="artifact feed-artifact">
            <div className="artifact-bar">
              <span className="mono xs dim">GROUND REALITY — LIVE SITE SIGNALS</span>
              <span className="mono xs" style={{ color: "var(--brand)" }}>100% INGESTED</span>
            </div>
            <div className="sig-feed">
              {SIGNALS.map((s, i) => (
                <div className="sig-msg" key={i}>
                  <s.icon className="ico grow0 sig-ico" aria-hidden="true" />
                  <div>
                    <span className="mono xs dim">{s.tag}</span>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="artifact-totals">
              <div className="row between">
                <span className="mono xs dim">RECONCILED REALITY</span>
                <span className="mono xs bad">CRITICAL SLIP -8D · LD EXPOSURE ₹14.4 CR</span>
              </div>
              <p className="xs dim mt-2">
                Same project, same day. Every quantity, grid reference and delay reason
                extracted, structured and mapped to its exact CPM activity node.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p variants={fadeUpVariants} className="nar-punch text-center">
          One project. Two versions of the truth. <em>Only one of them knows it&rsquo;s late.</em>
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · FORESIGHT — SHADOW SCHEDULE                                    */
/* ------------------------------------------------------------------ */

const WEEKS = ["W10", "W11", "W12", "W13", "W14", "W15", "W16"];

function ShadowSection() {
  const reveal = useReveal();
  return (
    <section id="shadow" className="nar wrap-lg">
      <motion.div
        ref={reveal.ref}
        className={reveal.className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="nar-head">
          <span className="mono xs nar-num">02</span>
          <span className="mono xs nar-label">PREDICTIVE SCHEDULE INTELLIGENCE</span>
          <span className="nar-rule" />
          <span className="mono xs dim">LIVE SHADOW SCHEDULE · CPM ENGINE</span>
        </div>

        <motion.h2 variants={fadeUpVariants} className="nar-h2">
          Catch the slip three weeks
          <br />
          <em>before the contractor reports it.</em>
        </motion.h2>

        <motion.p variants={fadeUpVariants} className="nar-lede measure">
          SyncPro maintains a continuously updated shadow forecast beside your frozen baseline.
          Pre-delinquency patterns — float burn rates, supplier slippage, crew idle signals —
          surface while there is still time to act.
        </motion.p>

        <motion.div variants={fadeUpVariants} className="artifact tl-artifact">
          <div className="artifact-bar">
            <span className="mono xs dim">SHADOW FORECAST — OBSIDIAN COMMERCIAL TOWER</span>
            <span className="mono xs" style={{ color: "var(--danger)" }}>CPLI 0.88 · FLOAT DEPLETION -8D</span>
          </div>

          {/* Week ruler */}
          <div className="tl-ruler mono xs dim">
            {WEEKS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          {/* Slipping activity track */}
          <div className="tl-track">
            <span className="tl-name">A1240 · MEP Risers</span>
            <div className="tl-bar-wrap">
              <motion.div
                className="tl-bar plan"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="tl-bar actual"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          {/* Detection vs report markers */}
          <div className="tl-markers">
            <div className="tl-marker detect">
              <Radar className="ico" aria-hidden="true" />
              <div>
                <span className="mono xs" style={{ color: "var(--brand)", fontWeight: 700 }}>
                  W12 — SYNCPRO DETECTS
                </span>
                <p className="xs dim">
                  Graph reconciliation flags -8d critical slip. Recovery options costed automatically.
                </p>
              </div>
            </div>
            <div className="tl-marker report">
              <AlertTriangle className="ico" aria-hidden="true" />
              <div>
                <span className="mono xs" style={{ color: "var(--danger)", fontWeight: 700 }}>
                  W15 — CONTRACTOR REPORTS
                </span>
                <p className="xs dim">
                  Status cut-off surfaces the same slip. Recovery window gone. LD clock running.
                </p>
              </div>
            </div>
          </div>

          <div className="tl-stats">
            <div><span className="tl-stat-num">21<small>d</small></span><span className="mono xs dim">EARLY WARNING</span></div>
            <div><span className="tl-stat-num">₹19.16<small>Cr</small></span><span className="mono xs dim">CAPITAL PROTECTED</span></div>
            <div><span className="tl-stat-num">&lt;400<small>ms</small></span><span className="mono xs dim">RECONCILIATION LATENCY</span></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · CLAIM IMMUNITY — EVIDENCE DOSSIER                              */
/* ------------------------------------------------------------------ */

const EXHIBITS = [
  { icon: Receipt, label: "4× RMC batch tickets (#4899–#4902)", hash: "sha·a41f" },
  { icon: FileAudio, label: "Site voice note — Hindi/English transcript", hash: "sha·77b2" },
  { icon: FileText, label: "Ultrasonic sonic-logging report (piles)", hash: "sha·c90e" },
  { icon: FileText, label: "Vendor fabrication hold letter — PT strands", hash: "sha·1d63" },
];

function ClaimSection() {
  const reveal = useReveal();
  return (
    <section id="claim" className="nar wrap-lg">
      <motion.div
        ref={reveal.ref}
        className={reveal.className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="nar-head">
          <span className="mono xs nar-num">03</span>
          <span className="mono xs nar-label">CONTRACTUAL CLAIM DEFENSE</span>
          <span className="nar-rule" />
          <span className="mono xs dim">CONTEMPORANEOUS RECORD · TAMPER-EVIDENT</span>
        </div>

        <motion.h2 variants={fadeUpVariants} className="nar-h2">
          Ground truth becomes a
          <br />
          <em>defensible extension-of-time claim.</em>
        </motion.h2>

        <motion.p variants={fadeUpVariants} className="nar-lede measure">
          When delay events strike, SyncPro assembles one-click contemporaneous dossiers and
          drafts formal FIDIC / NHAI notices — filed inside the contractual time-bar, sealed
          before disputes begin.
        </motion.p>

        <div className="claim-grid">
          {/* Evidence dossier */}
          <motion.div variants={fadeUpVariants} className="artifact dossier">
            <div className="artifact-bar">
              <span className="mono xs dim">EVIDENCE DOSSIER — EVENT E-114</span>
              <span className="mono xs" style={{ color: "var(--success)" }}>CORROBORATED ×4</span>
            </div>
            <ul className="dossier-list">
              {EXHIBITS.map((ex, i) => (
                <li key={i}>
                  <ex.icon className="ico grow0" aria-hidden="true" />
                  <span className="grow">{ex.label}</span>
                  <span className="mono xs dim">{ex.hash}</span>
                  <CheckCircle2 className="ico grow0" style={{ width: 14, height: 14, color: "var(--success)" }} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <div className="artifact-totals row between">
              <span className="mono xs dim">CRITICAL PATH IMPACT</span>
              <span className="mono xs bad">+8 DAYS · WEATHER-INDEPENDENT</span>
            </div>
          </motion.div>

          <div className="vs-col">
            <Gavel className="ico vs-arrow" aria-hidden="true" style={{ width: 18, height: 18 }} />
            <span className="vs-badge mono xs">1-CLICK DRAFT</span>
          </div>

          {/* Generated notice */}
          <motion.div variants={fadeUpVariants} className="artifact notice">
            <div className="artifact-bar">
              <span className="mono xs dim">DRAFT — EXTENSION OF TIME NOTICE</span>
              <CalendarClock className="ico" style={{ width: 13, height: 13, color: "var(--warning)" }} aria-hidden="true" />
            </div>
            <div className="notice-body">
              <span className="mono xs" style={{ color: "var(--brand)" }}>
                CLAUSE 20.1 — FIDIC 2017 · CONSULTANT NOTIFIED
              </span>
              <p>
                &ldquo;The Contractor hereby gives notice of a Delay Event (E-114: fabrication
                hold, post-tension strand supply) impacting activities A1240 → A1260 on the
                critical path. Substantiation follows within 42 days per Clause 20.1.&rdquo;
              </p>
              <div className="timebar-chip mono xs">
                <span className="tb-dot" aria-hidden="true" />
                TIME-BAR CLOCK · 28-DAY WINDOW · 9 DAYS REMAINING
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          variants={fadeUpVariants}
          href="#waitlist"
          className="nar-cta btn btn-primary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Seal your first claim dossier
          <ArrowRight className="ico" style={{ width: 14, height: 14 }} />
        </motion.a>
      </motion.div>
    </section>
  );
}

export function SignalNarrative() {
  return (
    <>
      <GapSection />
      <ShadowSection />
      <ClaimSection />
    </>
  );
}
