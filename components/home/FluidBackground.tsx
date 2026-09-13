"use client";

import { useEffect, useRef } from "react";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    import("webgl-fluid").then(({ default: WebGLFluid }) => {
      if (cancelled) return;
      WebGLFluid(canvas, {
        TRIGGER: "hover",
        IMMEDIATE: true,
        AUTO: false,
        DENSITY_DISSIPATION: 0.98,
        VELOCITY_DISSIPATION: 0.4,
        SPLAT_RADIUS: 0.45,
        // This renderer derives on-screen opacity from the splat color's own
        // brightness (alpha = max(r,g,b)), so a dark color is nearly
        // invisible against a light page — a saturated, bright color is
        // what actually reads as a stark mark. Matches --accent.
        SPLAT_COLOR: { r: 0, g: 0.48, b: 1 },
        COLORFUL: false,
        SHADING: false,
        BACK_COLOR: { r: 250, g: 250, b: 248 },
        TRANSPARENT: false,
        BLOOM: false,
        SUNRAYS: false,
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-fluid-canvas" aria-hidden="true" />;
}
