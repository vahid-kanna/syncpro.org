import React, { useRef, useState, useCallback, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  spotlightColor?: string;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  spotlightColor = "rgba(240, 168, 58, 0.12)",
  style,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("");
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -maxTilt;
      const rotY = ((x - centerX) / centerX) * maxTilt;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTransform(
          `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
        );
        setSpotlight({ x, y, opacity: 1 });
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      setSpotlight((s) => ({ ...s, opacity: 0 }));
    });
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card card-tilt ${className}`}
      style={{
        transform,
        transition: transform ? "transform 0.14s cubic-bezier(0.2, 0, 0.2, 1)" : "transform 0.4s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="card-spotlight-layer"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 65%)`,
          opacity: spotlight.opacity,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* 1px Specular Border Gradient following the cursor */}
      <div
        className="card-border-glow"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1px",
          background: `radial-gradient(280px circle at ${spotlight.x}px ${spotlight.y}px, rgba(240, 168, 58, 0.45), transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: spotlight.opacity,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );
}

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.25, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-box ${className}`}
      style={{
        display: "inline-flex",
        transform: `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`,
        transition:
          pos.x === 0 && pos.y === 0
            ? "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)"
            : "transform 0.08s ease-out",
      }}
    >
      {children}
    </div>
  );
}
