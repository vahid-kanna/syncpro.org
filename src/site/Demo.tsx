import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANSWER,
  CHECKS,
  DEMO_TABS,
  FLAGS,
  SAMPLE,
  STAGES,
  type Check as DcmaCheck,
  type DemoTabId,
} from "./lib/audit";
import { scrollToId } from "./lib/hooks";
import { Alert, ArrowRight, Check, FileDoc, Upload } from "./lib/icons";

/* ---- Citation renderer --------------------------------------------------- */

/** Turns `text [A10240] more` into prose with inline evidence chips. */
function Cited({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span className="cite" key={i}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/* ---- Processing overlay -------------------------------------------------- */

function StageRun({ stage }: { stage: number }) {
  const shown = Math.min(stage, STAGES.length);

  return (
    <div className="demo-stage" role="status" aria-live="polite">
      <div className="stage-head">
        <span className="label">Auditing {SAMPLE.file}</span>
        <span className="mono xs faint">
          {shown}/{STAGES.length}
        </span>
      </div>

      <div className="meter is-warn" style={{ marginBottom: 20 }}>
        <i style={{ width: `${(shown / STAGES.length) * 100}%` }} />
      </div>

      <ol className="stage-list">
        {STAGES.map((s, i) => {
          const state = i < stage ? "done" : i === stage ? "active" : "wait";
          return (
            <li key={s} data-state={state}>
              <span className="stage-ico" aria-hidden>
                {state === "done" ? <Check size={12} /> : <i />}
              </span>
              <span>{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---- Health tab ---------------------------------------------------------- */

function DcmaRow({ c }: { c: DcmaCheck }) {
  return (
    <li className="dcma-item" data-grade={c.grade}>
      <span className={`g g-${c.grade}`} aria-hidden>
        {c.grade === "pass" ? "✓" : c.grade === "warn" ? "!" : "×"}
      </span>
      <span className="fill">
        <span className="dcma-top">
          <span className="dcma-name">{c.name}</span>
          <span className="dcma-val mono">{c.value}</span>
        </span>
        <span className="meter" data-grade={c.grade}>
          <i style={{ width: `${Math.min(100, c.fill)}%` }} />
        </span>
        {/* Passes get no prose. Failures get the explanation they need. */}
        {c.grade !== "pass" ? (
          <span className="dcma-note">
            {c.note} <span className="faint">Gate {c.gate}.</span>
          </span>
        ) : null}
      </span>
    </li>
  );
}

function HealthTab() {
  const counts = CHECKS.reduce(
    (a, c) => ({ ...a, [c.grade]: a[c.grade as "pass" | "warn" | "fail"] + 1 }),
    { pass: 0, warn: 0, fail: 0 },
  );
  const mid = Math.ceil(CHECKS.length / 2);

  return (
    <div className="demo-pane">
      <div className="pane-head">
        <div>
          <div className="h3">DCMA 14-point assessment</div>
          <div className="xs faint mt-1">
            {SAMPLE.baseline} · {SAMPLE.relationships.toLocaleString("en-IN")} relationships
          </div>
        </div>
        <div className="row gap-3 xs">
          <span className="t-danger">{counts.fail} fail</span>
          <span className="t-warning">{counts.warn} warn</span>
          <span className="t-success">{counts.pass} pass</span>
        </div>
      </div>

      <div className="dcma-cols">
        <ul className="dcma-col">
          {CHECKS.slice(0, mid).map((c) => (
            <DcmaRow c={c} key={c.name} />
          ))}
        </ul>
        <ul className="dcma-col">
          {CHECKS.slice(mid).map((c) => (
            <DcmaRow c={c} key={c.name} />
          ))}
        </ul>
      </div>

      <div className="callout is-steel mt-6">
        <p className="small dim" style={{ lineHeight: 1.65 }}>
          Every check is measured against a published gate, not a house opinion.{" "}
          <a
            className="t-info"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
          >
            Run this on your own file
          </a>{" "}
          — the pilot audit is free and takes about ten minutes.
        </p>
      </div>
    </div>
  );
}

/* ---- Flags tab ----------------------------------------------------------- */

function FlagsTab() {
  return (
    <div className="demo-pane">
      <div className="pane-head">
        <div>
          <div className="h3">Flags, in plain English</div>
          <div className="xs faint mt-1">
            What the audit saw, and the one action that resolves it
          </div>
        </div>
        <span className="tag tag-warning">
          <i className="dot" />
          5 flagged
        </span>
      </div>

      {FLAGS.map((f) => (
        <div className="flag" key={f.id}>
          <div className="flag-head">
            <span className={`g g-${f.grade}`} aria-hidden>
              {f.grade === "fail" ? "×" : "!"}
            </span>
            <b>{f.title}</b>
          </div>
          <p>{f.saw}</p>
          <div className="fix">
            <span className="label" style={{ display: "block", marginBottom: 4 }}>
              Proposed fix
            </span>
            <Cited text={f.fix} />
          </div>
          <div className="flag-refs">
            {f.refs.map((r) => (
              <span className="cite" key={r}>
                {r}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Ask tab ------------------------------------------------------------- */

function AskTab() {
  return (
    <div className="demo-pane">
      <div className="pane-head">
        <div>
          <div className="h3">Ask the schedule</div>
          <div className="xs faint mt-1">Answers carry their evidence, or they do not ship</div>
        </div>
        <span className="tag tag-steel">
          <i className="dot" />
          Graph-grounded
        </span>
      </div>

      <div className="ask-q">
        <span className="label">Question</span>
        <p className="h2" style={{ marginTop: 6 }}>
          {ANSWER.question}
        </p>
      </div>

      <div className="ask-a">
        {ANSWER.answer.map((p, i) => (
          <p key={i} className="ask-para">
            <Cited text={p} />
          </p>
        ))}
      </div>

      <div className="ask-foot">
        <span className="row gap-2 xs faint">
          <Alert size={13} />
          Every sentence above resolves to an activity in your file. Nothing here is generated from
          general knowledge.
        </span>
      </div>
    </div>
  );
}

/* ---- Demo ---------------------------------------------------------------- */

export function Demo() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [stage, setStage] = useState(0);
  const [tab, setTab] = useState<DemoTabId>("health");
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /* Advance the staged run, then reveal the result. */
  useEffect(() => {
    if (phase !== "running") return;
    if (stage < STAGES.length) {
      const t = setTimeout(() => setStage((s) => s + 1), 620);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("done"), 340);
    return () => clearTimeout(t);
  }, [phase, stage]);

  const run = useCallback(() => {
    setStage(0);
    setTab("health");
    setPhase("running");
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setStage(0);
    setFileName(null);
  }, []);

  /* The hero CTA scrolls here and fires this, so a visitor never has to hunt
     for the trigger after the page has already moved them. */
  useEffect(() => {
    const h = () => run();
    window.addEventListener("syncpro:run-audit", h);
    return () => window.removeEventListener("syncpro:run-audit", h);
  }, [run]);

  /* Arrow-key navigation across the tablist. */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + DEMO_TABS.length) % DEMO_TABS.length;
    setTab(DEMO_TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const paneId = (id: string) => `demo-panel-${id}`;
  const tabId = (id: string) => `demo-tab-${id}`;

  return (
    <section className="section" id="demo">
      <div className="wrap-lg">
        <div className="sec-head rv">
          <span className="label">The wedge</span>
          <h2 className="h1">Turn a P6 file into a queryable graph — and score its health.</h2>
          <p className="lead measure mt-4">
            This is the whole product in ten minutes. Drop a file, get a health score against
            published gates, a plain-English explanation of every flag, a proposed fix for each one,
            and a cited answer to the question every controls lead is actually asked.
          </p>
        </div>

        <div className="demo-shell rv">
          <div className="demo-bar">
            <div className="demo-tabs" role="tablist" aria-label="Audit output">
              {DEMO_TABS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={tabId(t.id)}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  className="demo-tab"
                  aria-selected={tab === t.id}
                  aria-controls={paneId(t.id)}
                  tabIndex={tab === t.id ? 0 : -1}
                  disabled={phase !== "done"}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="row gap-3">
              <span className="row gap-2 mono xs faint">
                <FileDoc size={13} />
                {fileName ?? SAMPLE.file}
              </span>
              {phase === "done" ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
                  Reset
                </button>
              ) : null}
            </div>
          </div>

          <div className="demo-main" data-phase={phase}>
            <div className="demo-left">
              {phase === "idle" ? (
                <div
                  className={`dropzone${dragging ? " is-drag" : ""}`}
                  onClick={run}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      run();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    const f = e.dataTransfer.files?.[0];
                    if (f) setFileName(f.name);
                    run();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Run the sample schedule audit"
                >
                  <Upload size={26} className="dropzone-ico t-brand" />
                  <div className="h3" style={{ marginBottom: 6 }}>
                    Run the sample audit
                  </div>
                  <p className="small dim" style={{ maxWidth: "38ch", margin: "0 auto 16px" }}>
                    A real DCMA 14-point assessment of an illustrative data-centre file — 3,412
                    activities, 14 checks, five flags.
                  </p>
                  <span className="btn btn-primary">Run audit</span>
                  <p className="xs faint mt-4">
                    Or{" "}
                    <button
                      type="button"
                      className="linkish"
                      onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                      }}
                    >
                      choose your own XER
                    </button>{" "}
                    — the pilot runs it inside your tenancy.
                  </p>
                  <input
                    ref={inputRef}
                    type="file"
                    className="sr-only"
                    accept=".xer,.xml,.mpp,.csv"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setFileName(f ? f.name : null);
                      run();
                    }}
                  />
                </div>
              ) : null}

              {phase === "running" ? <StageRun stage={stage} /> : null}

              {phase === "done" ? (
                <>
                  <div
                    role="tabpanel"
                    id={paneId(tab)}
                    aria-labelledby={tabId(tab)}
                    tabIndex={0}
                    className="pane-wrap"
                  >
                    {tab === "health" ? <HealthTab /> : null}
                    {tab === "flags" ? <FlagsTab /> : null}
                    {tab === "ask" ? <AskTab /> : null}
                  </div>
                  {fileName ? (
                    <p className="xs faint mt-4">
                      Preview running on the sample file. {fileName} is audited inside your tenancy
                      during the pilot.
                    </p>
                  ) : null}
                </>
              ) : null}
            </div>

            <aside className="demo-right" aria-label="What the audit produces">
              <div className="demo-rail">
                <div className="label mb-4">What you get back</div>
                <ul className="out-list">
                  {[
                    ["Health score", "One number, fourteen measured checks, every gate published."],
                    ["Flags explained", "Plain English. No P6 jargon, no hand-waving."],
                    ["A fix per flag", "One concrete action, with the activities it touches."],
                    ["Cited answers", "Ask a question; every sentence resolves to an activity."],
                  ].map(([t, d]) => (
                    <li key={t}>
                      <Check size={14} className="t-brand" />
                      <span>
                        <b>{t}</b>
                        <span className="dim">{d}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="demo-cta">
                  <p className="small dim" style={{ lineHeight: 1.6 }}>
                    The pilot audit is free, runs on one of your own files, and takes about ten
                    minutes.
                  </p>
                  <a
                    className="btn btn-primary btn-block mt-3"
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("contact");
                    }}
                  >
                    Request pilot access
                    <ArrowRight className="ico" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
