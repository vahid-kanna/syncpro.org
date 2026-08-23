import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TiltCard({ children, className = "", style = {} }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6; // max -6deg to +6deg
    const rotY = ((x - centerX) / centerX) * 6;  // max -6deg to +6deg

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`spotlight-card ${className}`}
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        ...style,
      }}
    >
      {/* Dynamic Cursor Spotlight Radial Mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(217, 119, 87, 0.12), transparent 70%)`,
          opacity: spotlight.opacity,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}
