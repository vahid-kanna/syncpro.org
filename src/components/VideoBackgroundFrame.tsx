import { useEffect, useRef } from "react";

export function VideoBackgroundFrame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    // Particle nodes representing construction telemetry
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.3 ? "#D49B4B" : "#FF4500", // Solar Brass & Vermilion
    }));

    let scanLineY = 0;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient scan line sweep
      scanLineY = (scanLineY + 0.6) % height;
      const grad = ctx.createLinearGradient(0, scanLineY - 60, 0, scanLineY + 60);
      grad.addColorStop(0, "rgba(255, 69, 0, 0)");
      grad.addColorStop(0.5, "rgba(255, 69, 0, 0.04)");
      grad.addColorStop(1, "rgba(255, 69, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanLineY - 60, width, 120);

      // 2. Draw telemetry particles & connective vector lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby nodes with hairlines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 140) * 0.08;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="video-background-layer"
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
      {/* Ambient Dark Vignette & Architectural Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 20%, rgba(15, 17, 22, 0.4) 0%, rgba(8, 9, 12, 0.95) 80%)",
          zIndex: 1,
        }}
      />

      {/* Kinetic Canvas Motion Layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.65,
          zIndex: 2,
        }}
      />
    </div>
  );
}
