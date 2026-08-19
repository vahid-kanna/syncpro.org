# SyncPro — Pre-Launch Marketing Site (`syncpro.org`)

A standalone, ultra-fast static B2B marketing & early-access web application for **SyncPro**. Decoupled from the internal platform core in `apps/frontend` — no backend required, zero internal product logic exposed.

---

## Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Precision Dark Design System (`syncpro.css` + `site.css`)
- **Icons**: `lucide-react`
- **Lead Capture**: Web3Forms / Formspree / Mailto fallback

---

## Local Development

```bash
cd apps/site
npm install
npm run dev                 # http://localhost:5173
```

---

## Production Build

```bash
npm run build               # outputs static distribution to apps/site/dist/
npm run preview             # test the built assets locally
```

---

## Free 1-Click Hosting & Domain Setup (`syncpro.org` on Spaceship)

### 1. Free Cloudflare Pages Deployment (Recommended)
1. Push your code to GitHub.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Root directory**: `apps/site` (if monorepo) or `/`
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. In **Environment variables**, set:
   - `VITE_WEB3FORMS_ACCESS_KEY`: *(Get free at [web3forms.com](https://web3forms.com))*
   - `VITE_CONTACT_EMAIL`: `founders@syncpro.org`
5. Click **Deploy**.

### 2. Connect `syncpro.org` from Spaceship.com
1. In Cloudflare Pages > **Custom domains** > Add `syncpro.org` and `www.syncpro.org`.
2. In your [Spaceship.com](https://spaceship.com) dashboard:
   - Go to **Domain List** > **Manage** `syncpro.org` > **DNS Records**.
   - Add CNAME records pointing to your `<project-name>.pages.dev` domain:
     - **Host**: `@` | **Value**: `<project-name>.pages.dev`
     - **Host**: `www` | **Value**: `<project-name>.pages.dev`
3. SSL and edge caching are provisioned automatically within minutes.
