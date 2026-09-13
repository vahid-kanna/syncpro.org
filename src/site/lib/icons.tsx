import type { CSSProperties, ReactNode } from "react";

/**
 * One stroke system for the whole site: 1.6 stroke, round caps, 24-box,
 * currentColor. Icons are decorative unless a `title` is supplied, in which
 * case they are exposed to assistive tech.
 *
 * Props are deliberately narrow — no arbitrary SVG attribute spreading — so a
 * typo cannot silently become an invalid DOM attribute.
 */
export interface IcoProps {
  size?: number;
  /** Supply only when the icon is the sole label for a control. */
  title?: string;
  className?: string;
  style?: CSSProperties;
}

function Ico({ size = 16, title, className, style, children }: IcoProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Ico>
);

export const ArrowUpRight = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Ico>
);

export const Check = (p: IcoProps) => (
  <Ico {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Ico>
);

export const Plus = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 5v14M5 12h14" />
  </Ico>
);

export const Minus = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M5 12h14" />
  </Ico>
);

export const Close = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Ico>
);

export const Menu = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Ico>
);

export const Upload = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 16V4M7 9l5-5 5 5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </Ico>
);

export const FileDoc = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Ico>
);

export const Shield = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 3 5 6v6c0 4.2 2.9 7.7 7 9 4.1-1.3 7-4.8 7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Ico>
);

export const Graph = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="9" r="2.4" />
    <circle cx="8" cy="18" r="2.4" />
    <path d="M8.3 7.2 15.7 8.4M7 8.4l.8 7.2M9.9 16.9l5.9-5.9" />
  </Ico>
);

export const Layers = (p: IcoProps) => (
  <Ico {...p}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </Ico>
);

export const Clock = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.4 2" />
  </Ico>
);

export const Alert = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 4 2.6 20h18.8z" />
    <path d="M12 10v4M12 17.2v.1" />
  </Ico>
);

export const Target = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="12" cy="12" r=".6" fill="currentColor" />
  </Ico>
);

export const Database = (p: IcoProps) => (
  <Ico {...p}>
    <ellipse cx="12" cy="6" rx="7.5" ry="3" />
    <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
    <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </Ico>
);

export const Scale = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 4v16M7 20h10" />
    <path d="M5 9h14M5 9 2.5 14.5a2.9 2.9 0 0 0 5 0zM19 9l-2.5 5.5a2.9 2.9 0 0 0 5 0z" />
    <path d="M8 6h8" />
  </Ico>
);

export const Lock = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </Ico>
);

export const Eye = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12" />
    <circle cx="12" cy="12" r="2.9" />
  </Ico>
);

export const Bolt = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M13 3 5 13.5h6L11 21l8-10.5h-6z" />
  </Ico>
);

export const Mail = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Ico>
);

/* ---- Filled brand marks -------------------------------------------------- */

function Filled({ size = 16, title, className, style, children }: IcoProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const Github = (p: IcoProps) => (
  <Filled {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.11-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2" />
  </Filled>
);

export const Linkedin = (p: IcoProps) => (
  <Filled {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4z" />
  </Filled>
);

/**
 * BrandMark: The SyncPro "Path S" brand mark.
 * Read as a letter it says SyncPro; read as a diagram it is a finish-to-start activity path.
 */
export const BrandMark = ({ size = 24, className, style }: IcoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    aria-hidden
    focusable="false"
  >
    <g transform="translate(-6.00 -6.00) scale(1.500000)">
      <path
        d="M18.6 5.4H5.4V12H18.6V18.6H5.4"
        fill="none"
        stroke="#F0A83A"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const Wordmark = BrandMark;
