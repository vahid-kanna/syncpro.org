import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./site/App";

/* The v1 (`src/components` + site.css/syncpro.css) and v2 (`src/v2`) trees are
   kept in place for rollback. The live site is `src/site`. */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
