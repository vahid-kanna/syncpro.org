/* ============================================================================
   audit.ts — the DCMA-style audit sample
   ----------------------------------------------------------------------------
   This is a real-shaped DCMA 14-point assessment of an illustrative file.
   Hero visual and the interactive demo both read from here, so the score on
   the landing page can never disagree with the score in the demo.
   Thresholds are the standard DCMA / GAO schedule-quality gates.
   ========================================================================== */

export type Grade = "pass" | "warn" | "fail";

export interface Check {
  n: number;
  name: string;
  /** Human-readable measured value. */
  value: string;
  /** The gate this check is measured against. */
  gate: string;
  grade: Grade;
  /** 0–100, used for the meter width. */
  fill: number;
  /** One line of plain English — no P6 jargon. */
  note: string;
}

export const SAMPLE = {
  project: "Northgate Data Centre — Phase 2",
  scope: "MEP fit-out · Tier III",
  file: "NG-DC-P2_v14.xer",
  activities: 3412,
  relationships: 4987,
  statusDate: "12 Sep 2026",
  baseline: "BL-v14 · approved 04 Aug 2026",
  score: 62,
  grade: "At risk" as const,
} as const;

export const CHECKS: Check[] = [
  {
    n: 1,
    name: "Logic",
    value: "92.4%",
    gate: "≥ 90%",
    grade: "pass",
    fill: 92,
    note: "260 activities have a predecessor and a successor. 7.6% are open-ended.",
  },
  {
    n: 2,
    name: "Leads",
    value: "2.1%",
    gate: "≤ 5%",
    grade: "pass",
    fill: 42,
    note: "72 relationships use a negative lag. Within tolerance.",
  },
  {
    n: 3,
    name: "Lags",
    value: "6.8%",
    gate: "≤ 5%",
    grade: "warn",
    fill: 68,
    note: "232 relationships carry a lag. Lags hide duration — most are unpriced float.",
  },
  {
    n: 4,
    name: "Relationship types",
    value: "94.1%",
    gate: "≥ 90% FS",
    grade: "pass",
    fill: 94,
    note: "4,692 of 4,987 links are finish-to-start. The rest are SS or FF.",
  },
  {
    n: 5,
    name: "Hard constraints",
    value: "7.3%",
    gate: "≤ 5%",
    grade: "warn",
    fill: 73,
    note: "249 activities are pinned by a must-start-on or must-finish-on date.",
  },
  {
    n: 6,
    name: "High float",
    value: "4.2%",
    gate: "≤ 5%",
    grade: "pass",
    fill: 42,
    note: "143 activities carry more than 44 days of float.",
  },
  {
    n: 7,
    name: "Negative float",
    value: "1.6%",
    gate: "≤ 5%",
    grade: "pass",
    fill: 32,
    note: "54 activities are already behind the constraint date.",
  },
  {
    n: 8,
    name: "High duration",
    value: "9.1%",
    gate: "≤ 5%",
    grade: "fail",
    fill: 91,
    note: "311 activities run longer than 44 days, hiding real progress inside one bar.",
  },
  {
    n: 9,
    name: "Invalid dates",
    value: "0.3%",
    gate: "= 0%",
    grade: "fail",
    fill: 30,
    note: "11 activities carry actual or forecast dates beyond the status date.",
  },
  {
    n: 10,
    name: "Missed tasks",
    value: "11.2%",
    gate: "≤ 5%",
    grade: "fail",
    fill: 112,
    note: "382 activities should have finished before the status date. 271 feed the critical path.",
  },
  {
    n: 11,
    name: "Critical path test",
    value: "Break at A10240",
    gate: "Continuous",
    grade: "fail",
    fill: 100,
    note: "The driving path stops at the MEP riser because its successor link is missing.",
  },
  {
    n: 12,
    name: "Critical path length index",
    value: "0.87",
    gate: "≥ 0.95",
    grade: "fail",
    fill: 87,
    note: "The path cannot absorb the remaining work in the time left without recovery.",
  },
  {
    n: 13,
    name: "Baseline execution index",
    value: "0.91",
    gate: "≥ 0.95",
    grade: "fail",
    fill: 91,
    note: "91 activities completed for every 100 the baseline planned by now.",
  },
  {
    n: 14,
    name: "Resources",
    value: "61.4%",
    gate: "≥ 90%",
    grade: "warn",
    fill: 61,
    note: "1,317 activities carry no resource or crew assignment.",
  },
];

export interface Flag {
  id: string;
  title: string;
  grade: Grade;
  /** What the audit saw — measurement, not opinion. */
  saw: string;
  /** What to do about it — one concrete action. */
  fix: string;
  /** Evidence rows the claim rests on. */
  refs: string[];
}

export const FLAGS: Flag[] = [
  {
    id: "f1",
    title: "Critical path continuity break",
    grade: "fail",
    saw: "The driving path terminates at A10240 (MEP riser rough-in, L12) instead of reaching the energisation milestone. No successor link exists.",
    fix: "Add finish-to-start link A10240 → A10455 (riser inspection). The path then runs unbroken to MS-EN-L12 with 0 days float.",
    refs: ["A10240", "A10455", "MS-EN-L12"],
  },
  {
    id: "f2",
    title: "382 activities are past their planned finish",
    grade: "fail",
    saw: "Missed tasks sit at 11.2% against a 5% gate. 271 of the 382 are on the critical path or feed it directly.",
    fix: "Re-baseline only the affected fragnets, and record the delay as a dated event against BL-v14 rather than moving the finish dates silently.",
    refs: ["BL-v14", "DCMA-10"],
  },
  {
    id: "f3",
    title: "High duration hides real progress",
    grade: "fail",
    saw: "311 activities exceed 44 days. 84 of them span a natural handover point, so their percent-complete is an average of two unrelated states.",
    fix: "Split at the 84 proposed cut points. The audit returns the cut list with the successor logic already staged.",
    refs: ["DCMA-08", "A10240"],
  },
  {
    id: "f4",
    title: "Negative float in the commissioning sequence",
    grade: "warn",
    saw: "54 activities are behind their constraint date. 41 of them sit inside the Level 3 commissioning sequence.",
    fix: "The negative float traces to a hard constraint at C-2201 that no longer matches the approved baseline. Remove it or justify it in writing.",
    refs: ["C-2201", "BL-v14"],
  },
  {
    id: "f5",
    title: "Dates beyond the status date",
    grade: "warn",
    saw: "11 activities carry actual or forecast dates later than the 12 Sep 2026 status date.",
    fix: "Correct the data date on the affected activities before the file is used for any earned-value or delay calculation.",
    refs: ["DCMA-09"],
  },
];

export interface CitedAnswer {
  question: string;
  /** Paragraphs; citation tokens in [brackets] are rendered as chips. */
  answer: string[];
  refs: string[];
}

export const ANSWER: CitedAnswer = {
  question: "What is at risk in the next 14 days?",
  answer: [
    "Level 12 energisation is the exposure. MEP riser rough-in completes 6 days late against the committed finish, and it is the only float-negative chain reaching the milestone. The cause is a missing successor link, not a productivity problem. [A10240] [MS-EN-L12]",
    "Chiller 2 commissioning has zero float. Its predecessor, AHU-3 ductwork, is 41% complete with 9 days of work remaining in a 6-day window. That gap is not recoverable without resequencing. [C-2201]",
    "382 activities are already past their planned finish, 271 of them on or feeding the critical path. Earliest material impact lands on day 9. [BL-v14]",
  ],
  refs: ["A10240", "MS-EN-L12", "C-2201", "BL-v14"],
};

/** Tabs shown above the demo. Only the first is a full walkthrough. */
export const DEMO_TABS = [
  { id: "health", label: "Health score" },
  { id: "flags", label: "Flags & fixes" },
  { id: "ask", label: "Ask the schedule" },
] as const;

export type DemoTabId = (typeof DEMO_TABS)[number]["id"];

/** Ordered stages of the commit gate, animated as the sample file is processed. */
export const STAGES = [
  "Reading XER · 3,412 activities",
  "Building project graph · 4,987 links",
  "Resolving site language to activities",
  "Corroborating across independent evidence",
  "Committing under the confidence gate",
] as const;
