import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./v2/v2.css";
import AppV2 from "./v2/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppV2 />
  </StrictMode>,
);
