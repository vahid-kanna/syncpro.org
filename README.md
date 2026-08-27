# SyncPro — Autonomous Project Controls Engine

<div align="center">

[![Status](https://img.shields.io/badge/Status-Live%20on%20Edge-00F59B?style=for-the-badge&logo=cloudflare&logoColor=black)](https://syncpro.org)
[![Incubator](https://img.shields.io/badge/Incubated%20At-Nirmaan%20IIT%20Madras-FF5722?style=for-the-badge&logo=google-scholar&logoColor=white)](https://nirmaan.iitm.ac.in)
[![Framework](https://img.shields.io/badge/Framework-React%2019%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Bundler](https://img.shields.io/badge/Bundler-Vite%206-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![3D Engine](https://img.shields.io/badge/3D%20Engine-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)

**The Autonomous Schedule Intelligence & Delay Prediction Platform for Infrastructure Megaprojects.**

[🌐 Explore Live Site (`syncpro.org`)](https://syncpro.org) • [📊 Delay Exposure Calculator](https://syncpro.org/#financial-sandbox) • [📩 Request Pilot Access](https://syncpro.org/#waitlist)

</div>

---

## 📌 Executive Summary & Problem Statement

Contractors and project heads routinely report critical-path slips **three weeks after they physically happen** on site. On a typical **₹1,200+ Cr infrastructure megaproject**, this communication blind spot silently drains **₹1.8 Cr every week** in unmitigated delay damages, contractor disputes, and liquidated damages (LD).

**SyncPro** bridges the gap between field reality and schedule governance. It continuously reads unformatted site signals (voice notes, DPRs, material manifests, subcontractor logs) and automatically reconciles them against your baseline schedule in real time — detecting critical-path variance before slips become irreversible financial losses.

```
                  ┌────────────────────────────────────────────────┐
                  │           UNSTRUCTURED SITE SIGNALS            │
                  │  (Daily Logs, Voice Notes, Batch Dockets, BIM) │
                  └───────────────────────┬────────────────────────┘
                                          ▼
                  ┌────────────────────────────────────────────────┐
                  │             SYNCPRO SIGNAL PARSER              │
                  │    LLM Extraction & Field Activity Mapping     │
                  └───────────────────────┬────────────────────────┘
                                          ▼
┌───────────────────────────┐             │             ┌───────────────────────────┐
│     ORACLE PRIMAVERA      │             ▼             │      SHADOW SCHEDULE      │
│   P6 / ASTA / MSP (.XER)  │ ◄───────► [ CPM ] ◄───────┤     CONFIDENCE GATING     │
│     Baseline Schedule     │      Reconciliation       │   Predictive Slip Alerts  │
└───────────────────────────┘                           └───────────────────────────┘
```

---

## ⚡ Key Capabilities & Engineering Highlights

- **Multi-Format Enterprise Ingestion:** Native parsing and schedule reconciliation for **Oracle Primavera P6 (`.XER`)**, **Asta Powerproject (`.PP`)**, **Microsoft Project (`.MPP`)**, and **Primavera XML / MSPDI**.
- **SignalIQ Editorial Motion Language:** High-performance, precision dark aesthetic engineered with a custom requestAnimationFrame (rAF) motion engine — deliverable in a lightweight **<70 KB gzipped** total footprint with zero third-party animation bloat.
- **Interactive 3D Digital Twin Studio:** Browser-based spatial project controls built with **Three.js**, enabling structural progress visualization and layer-by-layer delay inspection.
- **Dynamic Delay Exposure Sandbox:** Real-time financial modeling tool calculating daily liquidated damages (LD), critical-path float erosion, and contractor claim exposure.
- **Shadow Schedule Confidence Gating:** Uses probabilistic scheduling graphs to separate genuine delay risks from normal field variability, avoiding alert fatigue for project managers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript 5.7, Vite 6 |
| **3D & Visualization** | Three.js, Lucide Icons |
| **Motion Architecture** | Custom rAF Interpolation Engine, Framer Motion |
| **Design System** | SignalIQ Dark Precision CSS (`v2.css` / `syncpro.css`), JetBrains Mono, Inter |
| **Edge Deployment** | Cloudflare Pages, Edge Caching, Spaceship DNS |
| **Lead Capture** | Web3Forms & Formspree Edge Integration |

---

## 📂 Project Structure

```bash
syncpro.org/
├── public/                 # Static public assets & brand icons
├── src/
│   ├── v2/                 # Current SignalIQ Production Architecture
│   │   ├── App.tsx         # Master application orchestrator
│   │   ├── Chrome.tsx      # Navigation, status indicators & scroll progress
│   │   ├── Sections.tsx    # Hero, P6 artifact reveals & problem narrative
│   │   ├── More.tsx        # Delay calculator, 3D twin studio & waitlist
│   │   ├── Motion.tsx      # Custom rAF scrub heading & reveal engine
│   │   └── v2.css          # Precision dark design system stylesheet
│   ├── components/         # Modular v1 components & sandbox tools
│   ├── lib/                # Shared utilities & animation helpers
│   └── main.tsx            # Application entrypoint
├── index.html              # HTML shell & SEO metadata
├── vite.config.ts          # Vite build & bundle configuration
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm, pnpm, or bun

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/vahid-kanna/syncpro.org.git
cd syncpro.org
npm install
```

### 2. Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```
Outputs an optimized, tree-shaken static bundle to `/dist`.

---

## 🌐 Production Deployment

The production site is deployed directly to **Cloudflare Pages** with automated CI/CD:

1. **Build Configuration:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
2. **Custom Domain:** `syncpro.org` & `www.syncpro.org` configured via DNS CNAME records pointing to Cloudflare Edge endpoints with automatic SSL/TLS termination.

---

## 👥 Team & Incubation

- **Co-founder & Business Lead:** [Shaik Vahid Basha](https://github.com/vahid-kanna) (Civil Engineering, IIT Madras)
- **Co-founder:** Balaji (IIT Madras)
- **Incubated At:** [Nirmaan Startup Accelerator](https://nirmaan.iitm.ac.in), Indian Institute of Technology Madras (IIT Madras)

---

## 📄 License

Copyright © 2026 SyncPro. All rights reserved.
