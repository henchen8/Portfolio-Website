"use client";

import { useEffect, useRef } from "react";
import { onAppReady } from "@/lib/appReady";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    // Fetch the module immediately (hidden work either way) so it's warm by
    // the time the loading screen lifts, but hold off actually starting the
    // sim — and its opening splash — until then. Otherwise the splash burns
    // its whole visible lifetime decaying behind the loading screen, and if
    // we instead deferred the import too, the fetch+parse would run *after*
    // the loading screen lifts and show up as a visible gap.
    const modulePromise = import("webgl-fluid");

    const unsubscribe = onAppReady(() => {
      modulePromise.then(({ default: WebGLFluid }) => {
        if (cancelled) return;
        WebGLFluid(canvas, {
          TRIGGER: "hover",
          IMMEDIATE: true,
          AUTO: false,
          DENSITY_DISSIPATION: 0.98,
          VELOCITY_DISSIPATION: 0.4,
          SPLAT_RADIUS: 0.45,
          // This renderer derives on-screen opacity from the splat color's
          // own brightness (alpha = max(r,g,b)), so a dark color is nearly
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
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-fluid-canvas" aria-hidden="true" />;
}
