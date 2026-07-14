"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {

  const [position, setPosition] = useState({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {

      window.removeEventListener("mousemove", handleMouseMove);

    };

  }, []);

  return (

    <div
      className="pointer-events-none fixed inset-0 -z-40 transition-[background] duration-300 ease-out"
      style={{
        background: `
          radial-gradient(
            500px circle at ${position.x}px ${position.y}px,
            rgba(37,99,235,0.06),
            transparent 65%
          ),
          radial-gradient(
            180px circle at ${position.x}px ${position.y}px,
            rgba(96,165,250,0.12),
            transparent 75%
          )
        `,
      }}
    />

  );
}