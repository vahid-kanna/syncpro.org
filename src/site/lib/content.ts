/* ============================================================================
   content.ts — every word on the site
   ----------------------------------------------------------------------------
   Single source of truth for copy. Figures are sourced and must not be
   invented; product statuses are taken verbatim from
   docs/architecture/README.md in the SyncPro monorepo.
   ========================================================================== */

/* Order here must match the DOM order of sections in App.tsx, because the nav
   highlights the section currently in view. */
export const NAV_LINKS = [
  { id: "roi-sandbox", label: "Holding cost" },
  { id: "demo", label: "Live audit" },
  { id: "platform", label: "Platform" },
  { id: "products", label: "Products" },
  { id: "who", label: "Who it's for" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
] as const;

export const CONTACT_EMAIL = "founders@syncpro.org";
export const GITHUB_URL = "https://github.com/vahid-kanna";

/* ---- Hero ---------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Incubated at Nirmaan · IIT Madras",
  /** Second chip in the hero eyebrow — deliberately different from the nav
   *  status pill so the two do not repeat each other. */
  eyebrowNote: "Free XER health audit · ~10 minutes",
  status: "Schedule Intelligence live",
  /** `em` is rendered in brand amber. */
  h1: ["The AI project controls engineer that ", "earns the right", " to update your schedule."],
  sub: "SyncPro reads a P6 file into a project knowledge graph, resolves messy site language to the correct CPM activity, and commits a change only when independent evidence agrees. Every update carries its citation.",
  ctaPrimary: "Run a live schedule audit",
  ctaSecondary: "Request pilot access",
  note: "Free DCMA-style audit on one of your own XER files. No integration, no data leaves your tenancy.",
} as const;

export const CREDS = [
  { b: "IIT Madras", s: "Incubated at Nirmaan" },
  { b: "P6 native", s: "XER · XML · EPPM API" },
  { b: "Evidence-gated", s: "No uncited schedule writes" },
  { b: "Append-only", s: "Every change is replayable" },
] as const;

/* ---- The problem --------------------------------------------------------- */

export const PROBLEM = {
  label: "The cost of a schedule you cannot defend",
  h2: "Schedules fail quietly, then get argued about loudly.",
  lead: "A baseline that cannot survive a schedule-quality audit will not survive a delay claim either. By the time anyone opens the file in earnest, the money is already gone.",
  close:
    "None of these are scheduling problems. They are evidence problems. The schedule was wrong, the field knew it, and nobody could prove which.",
  figures: [
    {
      v: "$1.85T",
      l: "lost to bad data across global construction, every year.",
      s: "Autodesk / FMI, 2021",
    },
    {
      v: "88%",
      l: "of baselines fail recognised quality benchmarks. Sample: 70,000+ schedules.",
      s: "SmartPM",
    },
    {
      v: "$84.4B",
      l: "in dispute across 2,002 construction projects in 2024.",
      s: "HKA CRUX, 2025",
    },
    {
      v: "$60.1M",
      l: "average value of a construction dispute in 2025 — up 40% on 2023.",
      s: "Arcadis, 2025",
    },
    {
      v: "$177.5B",
      l: "of US construction labour is non-productive every year.",
      s: "PlanGrid / FMI, 2018",
    },
    {
      v: "98%",
      l: "of megaprojects run over budget or late.",
      s: "McKinsey",
    },
  ],
} as const;

/* ---- Three pillars ------------------------------------------------------- */

export const PILLARS = {
  label: "Three jobs, one live graph",
  h2: "Ask the plan. Ask reality. Then defend the answer.",
  lead: "Each pillar is a question a project controls lead actually has to answer — and each one is anchored on a problem the industry has not solved well.",
  items: [
    {
      n: "01",
      q: "Is the baseline any good?",
      title: "Know the Plan",
      body: "Score every schedule against the DCMA 14-point and GAO gates before it is approved, then keep it honest as work moves.",
      list: [
        "DCMA 14-point and GAO schedule-quality scoring",
        "Logic repair for open-ended and dangling activities",
        "Living CPM re-forecast, not a monthly re-plan",
      ],
    },
    {
      n: "02",
      q: "What actually happened?",
      title: "Know Reality",
      body: "Resolve what the site said to the activity it belongs to, then decide whether it is allowed to change the schedule.",
      list: [
        "Graph-grounded resolution of field language",
        "Corroboration across independent evidence",
        "Confidence-gated commit — never a silent write",
      ],
    },
    {
      n: "03",
      q: "Can you defend the call?",
      title: "Run the Project",
      body: "Every decision is written to an immutable log you can replay, per project and across the portfolio.",
      list: [
        "Append-only event log for every graph mutation",
        "Replayable CPM decisions with the query that made them",
        "Portfolio and benchmark roll-up from the same corpus",
      ],
    },
  ],
} as const;

/* ---- The commit gate ----------------------------------------------------- */

export const GATE = {
  label: "How a claim becomes a fact",
  h2: "Nothing writes to the schedule on one person's word.",
  lead: "Four stages between \"the riser is done\" and a committed update. Each one is inspectable, and any of them can stop the write.",
  stages: [
    {
      n: "01",
      title: "Ingest",
      body: "A P6 XER, P6 XML, MS Project or CSV file lands in a project knowledge graph. In the sample file: 3,412 activities and 4,987 relationships, in under a minute.",
    },
    {
      n: "02",
      title: "Resolve",
      body: "\"Riser done on L12\" resolves to A10240 through the graph — not by keyword matching. Graph-grounded resolution is the entire point; fuzzy string matching is how schedule tools lose their credibility.",
    },
    {
      n: "03",
      title: "Corroborate",
      body: "A claim is accepted when independent evidence agrees on the same activity. One source is a message; three are a fact. Disagreement is surfaced to a human, never averaged away.",
    },
    {
      n: "04",
      title: "Commit",
      body: "The update passes the confidence gate and writes to an append-only event log. Neo4j keeps a pointer. The record is replayable years later, when the claim arrives.",
    },
  ],
  stackLabel: "Platform Core",
  stackTitle: "One shared foundation, built once.",
  stackBody:
    "Every product in the suite sits on the same core. That is a deliberate architectural bet: the audit log and the graph schema cannot be retrofitted later, so they were built in week one.",
  stack: [
    {
      t: "Agent mesh",
      d: "LangChain-orchestrated agents, one per product, on a single runtime.",
    },
    {
      t: "Knowledge graph",
      d: "Neo4j holds the dual-state schedule — plan and reality side by side.",
    },
    {
      t: "Event-sourced audit",
      d: "Postgres append-only schedule_events for every graph mutation.",
    },
    {
      t: "Cypher export",
      d: "Every CPM decision is loggable and replayable for dispute use.",
    },
    {
      t: "Model gateway",
      d: "Groq, Gemini and OpenAI behind one interface — no single-vendor dependency.",
    },
    {
      t: "Single-tenant",
      d: "VPC or dedicated deployment available from day one, not as a roadmap item.",
    },
  ],
} as const;

/* ---- Products ------------------------------------------------------------ */

export interface Product {
  n: string;
  name: string;
  pillar: "Know the Plan" | "Know Reality" | "Run the Project" | "Foundation";
  horizon: string;
  status: string;
  statusKind: "live" | "built" | "partial" | "planned" | "core";
  body: string;
  problem?: string;
}

export const PRODUCTS: Product[] = [
  {
    n: "01",
    name: "Schedule Intelligence",
    pillar: "Know the Plan",
    horizon: "H1",
    status: "Live",
    statusKind: "live",
    body: "Scores, repairs and re-forecasts the critical path. The load-bearing base — every other product reads and writes its knowledge graph.",
    problem: "Living CPM re-forecast and logic repair",
  },
  {
    n: "02",
    name: "Shadow Schedule Engine",
    pillar: "Know Reality",
    horizon: "H2",
    status: "Built",
    statusKind: "built",
    body: "Ingests field reality and proposes confidence-gated updates against the live graph. Built end to end; hardening with pilot feedback.",
    problem: "Confidence-gated commit · graph-grounded activity resolution",
  },
  {
    n: "04",
    name: "Forensic Evidence",
    pillar: "Run the Project",
    horizon: "H1 infra",
    status: "Substrate live",
    statusKind: "partial",
    body: "The immutable event log every other product writes to. Built first and monetised later — when a claim arrives, the record is already there.",
    problem: "Forensic delay and evidence graph",
  },
  {
    n: "03",
    name: "Constraint Intelligence",
    pillar: "Know Reality",
    horizon: "H2",
    status: "Planned",
    statusKind: "planned",
    body: "Extends the same graph with constraint and spatial-zone nodes to predict what will block a crew before it blocks them.",
    problem: "Make-ready prediction · spatiotemporal conflict",
  },
  {
    n: "05",
    name: "Portfolio & Benchmark",
    pillar: "Run the Project",
    horizon: "H3",
    status: "Planned",
    statusKind: "planned",
    body: "Aggregates the verified corpus across projects for VP, CFO and insurer buyers — the compounding half of the moat.",
    problem: "Cross-project intelligence",
  },
  {
    n: "06",
    name: "Schedule Genesis",
    pillar: "Know the Plan",
    horizon: "H2",
    status: "Planned",
    statusKind: "planned",
    body: "Generates a defensible CPM baseline for firms that have never had one, then hands it to Schedule Intelligence to run.",
    problem: "No-planner schedule genesis",
  },
];

export const SUITE_NOTE =
  "We publish the real status of each product. Two of six are live or built; the rest are architected and queued. A suite that claims to be finished is a suite nobody has run in production.";

/* ---- ICP ----------------------------------------------------------------- */

export const ICP = {
  label: "Who this is built for",
  h2: "Built first for the person drowning in P6 reconciliation.",
  lead: "Not the whole industry. A specific operator with a specific file and a specific argument to win.",
  spec: [
    ["Segment", "GCC (UAE, KSA) and US data-centre contractors"],
    ["Project value", "$50M – $500M"],
    ["Portfolio", "4 – 20 concurrent projects"],
    ["Scheduling stack", "Primavera P6 shops"],
    ["Already deployed", "Procore, OpenSpace or equivalent"],
    ["Economic buyer", "VP of Project Controls"],
    ["Champion", "Project controls lead"],
    ["Sales cycle", "4 – 12 weeks"],
    ["Contract", "Annual only — no month-to-month"],
  ],
  notLabel: "Not built for, deliberately",
  notFor: [
    {
      t: "US enterprise GCs",
      d: "Six to eighteen month procurement cycles. The audit wins the file; it does not win the enterprise. That comes later.",
    },
    {
      t: "Megaproject owners",
      d: "nPlan holds that ground. We complement their forecast, we do not fight it for the same budget line.",
    },
    {
      t: "Sub-₹10 crore Indian SMB",
      d: "UPI AutoPay fails on 55–90% of attempts. The unit economics do not clear at that price point.",
    },
    {
      t: "Full digital-twin buyers",
      d: "We are not a twin and have no ambition to become one. Different problem, different buyer.",
    },
  ],
} as const;

/* ---- Integrations -------------------------------------------------------- */

export const INTEGRATIONS = {
  label: "Reads and writes",
  h2: "It works with the stack you already run.",
  note: "Format and API support. Not customer endorsement.",
  items: [
    "Primavera P6 · XER",
    "P6 XML",
    "P6 EPPM API",
    "Microsoft Project",
    "Oracle Primavera Cloud",
    "Procore",
    "OpenSpace",
    "Excel / CSV",
    "Power BI",
  ],
} as const;

/* ---- Pricing ------------------------------------------------------------- */

export interface Tier {
  name: string;
  who: string;
  price: string;
  unit: string;
  includes: string[];
  featured?: boolean;
}

export const PRICING = {
  label: "Pricing",
  h2: "Priced per project, not per seat.",
  lead: "Project controls value lands on the project, so the pricing does too. Annual contracts only — the audit log is the product, and it needs a year to be worth anything.",
  tiers: [
    {
      name: "Copilot",
      who: "One project, one controls lead.",
      price: "$400–800",
      unit: "/ mo · project",
      includes: [
        "01 Schedule Intelligence",
        "DCMA 14-point scoring",
        "Graph-grounded activity resolution",
        "Forensic event log underneath",
        "Email support",
      ],
    },
    {
      name: "Controls",
      who: "Teams running several projects at once.",
      price: "$1,200–2,000",
      unit: "/ mo · project",
      featured: true,
      includes: [
        "Everything in Copilot",
        "02 Shadow Schedule Engine",
        "03 Constraint Intelligence",
        "Field-claim corroboration",
        "Named controls engineer",
      ],
    },
    {
      name: "Portfolio",
      who: "The VP who has to report upward.",
      price: "$5–15K",
      unit: "/ mo · organisation",
      includes: [
        "Everything in Controls",
        "05 Portfolio dashboards",
        "Cross-project benchmarking",
        "Executive reporting pack",
        "Quarterly review",
      ],
    },
    {
      name: "Enterprise / Benchmark",
      who: "Sureties, insurers and owners.",
      price: "$2–10K",
      unit: "/ mo · organisation",
      includes: [
        "05 Benchmark analytics",
        "Corpus access under contract",
        "Single-tenant or VPC",
        "Explicit data-contribution terms",
        "Security review support",
      ],
    },
  ] as Tier[],
  note: "The exact figure depends on activity count and portfolio shape. Pilot engagements are priced separately and scoped on one file.",
} as const;

/* ---- Trust --------------------------------------------------------------- */

export const TRUST = {
  label: "Trust",
  h2: "The unglamorous parts, decided up front.",
  items: [
    {
      t: "Your schedule stays yours",
      d: "Single-tenant or VPC deployment is available from day one, not as a roadmap item. Data-contribution terms are explicit in every contract — never assumed, never buried.",
    },
    {
      t: "Every change is replayable",
      d: "Graph mutations write to an append-only Postgres event log; Neo4j holds a pointer only. Any CPM decision can be replayed years later with the query that produced it.",
    },
    {
      t: "The model is replaceable",
      d: "Groq, Gemini and OpenAI sit behind one gateway. No product behaviour is tied to a single vendor, and customer data does not train a third-party model by default.",
    },
  ],
} as const;

/* ---- FAQ ----------------------------------------------------------------- */

export const FAQ = {
  label: "Questions we get asked",
  h2: "The ones that matter before a pilot.",
  items: [
    {
      q: "How do you stop the AI from inventing schedule updates?",
      a: [
        "It cannot write without corroboration. A proposed update is committed only when independent evidence agrees on the same activity, and every committed change carries its source.",
        "Where the evidence disagrees, the claim is surfaced to a human instead of being averaged into a number. The agent's job is to earn the right to write — not to write.",
      ],
    },
    {
      q: "What happens to my P6 data?",
      a: [
        "Your schedule is parsed into a knowledge graph inside your tenancy. It is not pooled with other customers' data and it does not train a third-party model.",
        "Single-tenant and VPC deployment are available from day one, and data-contribution terms are written into the contract rather than assumed.",
      ],
    },
    {
      q: "Do I have to stop using Primavera P6?",
      a: [
        "No. SyncPro reads XER, P6 XML and the EPPM API, and writes back. P6 stays the system of record for the schedule.",
        "SyncPro is the layer that audits it, grounds it in field reality, and keeps the evidence. Oracle licensing stays exactly where it is.",
      ],
    },
    {
      q: "Is this a replacement for Procore or OpenSpace?",
      a: [
        "No — it sits above them. Procore and OpenSpace capture what happened on site. SyncPro resolves what they captured to the correct CPM activity and decides whether the schedule is allowed to change because of it.",
        "Most of our buyers already run both, and we are not trying to replace either.",
      ],
    },
    {
      q: "How is this different from a schedule-analytics tool?",
      a: [
        "Analytics tools score a file and stop. SyncPro closes the loop: it scores the file, resolves field claims to activities, corroborates them, commits the update under a confidence gate, and keeps the evidence.",
        "The corpus of verified field-claim-to-outcome pairs is the part that compounds. That is the moat — the data, not the graph database.",
      ],
    },
    {
      q: "Does it work on a schedule that is already broken?",
      a: [
        "That is the intended starting point. With 88% of baselines failing recognised quality benchmarks, the first thing most engagements produce is a health score and a prioritised repair list.",
        "You do not need a clean file to start. You need to know how dirty it is.",
      ],
    },
    {
      q: "What does a pilot actually involve?",
      a: [
        "You send one XER file. Within about ten minutes you get a DCMA-style health score with every flag explained in plain English, a proposed fix per flag, and a cited answer to a question like \"what is at risk in the next 14 days\".",
        "No integration, no data leaving your tenancy, no commitment. It is run by the founders, not a sales engineer.",
      ],
    },
    {
      q: "Where are you in terms of product maturity?",
      a: [
        "Schedule Intelligence is live and hardening. The Shadow Schedule Engine is built end to end. Constraint Intelligence, Portfolio and Schedule Genesis are architected but not shipped.",
        "We publish the real status of each product rather than implying the suite is finished. The forensic event log has been live since week one, because it is the one component that cannot be retrofitted.",
      ],
    },
  ],
} as const;

/* ---- Contact ------------------------------------------------------------- */

export const CONTACT = {
  label: "Request pilot access",
  h2: "Send one XER file. See what it says about your schedule.",
  lead: "The pilot is a real audit on a real file, run by the founders. We will tell you what the schedule actually says — including the parts you will not enjoy reading.",
  success: "Received. We read every one of these ourselves and reply within two working days.",
  altLead: "Prefer to write directly?",
} as const;

/* ---- Footer -------------------------------------------------------------- */

export const FOOTER = {
  blurb:
    "An AI project controls engineer for schedule-intensive, dispute-prone delivery. Built at IIT Madras, incubated at Nirmaan.",
  cols: [
    {
      h: "Product",
      links: [
        { label: "Platform", id: "platform" },
        { label: "Products", id: "products" },
        { label: "Live audit", id: "demo" },
        { label: "Pricing", id: "pricing" },
      ],
    },
    {
      h: "Company",
      links: [
        { label: "Who it's for", id: "who" },
        { label: "FAQ", id: "faq" },
        { label: "Contact", id: "contact" },
      ],
    },
    {
      h: "Trust",
      links: [
        { label: "Data handling", id: "trust" },
        { label: "Audit trail", id: "trust" },
        { label: "Deployment", id: "trust" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "#trust" },
    { label: "Terms", href: "#trust" },
    { label: "Security", href: "#trust" },
  ],
  copyright: "© 2026 SyncPro. Built in Chennai, India.",
} as const;
