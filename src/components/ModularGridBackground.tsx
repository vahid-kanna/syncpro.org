import { useEffect, useState } from "react";

export function ModularGridBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, col: 0, row: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const blockSize = 60; // 60px grid block
      const col = Math.floor(e.clientX / blockSize);
      const row = Math.floor(e.clientY / blockSize);
      setMousePos({
        x: e.clientX,
        y: e.clientY,
        col,
        row,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="modular-grid-background"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Ambient Panoramic Skyscraper Spire Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "85vh",
          overflow: "hidden",
          opacity: 0.35,
        }}
      >
        <img
          src="/hero-panoramic-spire.jpg"
          alt="Megaproject Panoramic Spire at Night"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "contrast(1.15) brightness(0.75)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(8,9,12,0.2) 0%, rgba(8,9,12,0.98) 100%)",
          }}
        />
      </div>

      {/* Mathematical CAD Blueprint Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Major 5-block structural grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.065) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.065) 1px, transparent 1px)
          `,
          backgroundSize: "300px 300px",
        }}
      />

      {/* Radial vignette mask for depth & text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 15%, rgba(8, 9, 12, 0.3) 0%, rgba(8, 9, 12, 0.98) 80%)",
        }}
      />

      {/* Live Interactive Cursor Drafting HUD */}
      <div
        className="desktop-nav"
        style={{
          position: "fixed",
          bottom: 16,
          right: 20,
          padding: "6px 14px",
          background: "rgba(16, 19, 26, 0.9)",
          border: "1px solid var(--line)",
          backdropFilter: "blur(12px)",
          borderRadius: "var(--r-full)",
          fontFamily: "var(--mono)",
          fontSize: "11px",
          color: "var(--text-3)",
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 100,
          pointerEvents: "auto",
        }}
      >
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }} />
        <span>Coord: [X: {mousePos.x}, Y: {mousePos.y}]</span>
        <span style={{ color: "var(--accent)" }}>Grid: [Col {mousePos.col.toString().padStart(2, '0')}, Row {mousePos.row.toString().padStart(2, '0')}]</span>
        <span className="desktop-nav" style={{ color: "var(--text-4)" }}>CRS: EPSG:4326 · WGS84</span>
      </div>
    </div>
  );
}
