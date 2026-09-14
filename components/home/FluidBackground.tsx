"use client";

import { useEffect, useRef } from "react";
import { onSceneReady } from "@/lib/appReady";

// --- Size: how large/coarse each splat and trail reads as ---
const SPLAT_RADIUS = 0.45; // 0-1, footprint of each splat
const SIM_RESOLUTION = 128; // motion grid — lower = chunkier, bigger-looking flow
const DYE_RESOLUTION = 1024; // color/trail grid — visual sharpness, independent of motion scale

// --- Curl: vorticity/swirliness of the flow (library default 30) ---
const CURL = 12;

// --- Color ---
// This renderer derives on-screen opacity from the splat color's own
// brightness (alpha = max(r,g,b)), so a dark, neutral gray is nearly
// invisible against a light page — this near-neutral tone is as close to
// greyscale as it can get while staying visible.
const SPLAT_COLOR = { r: 0.65, g: 0.67, b: 0.72 };
const BACK_COLOR = { r: 250, g: 250, b: 248 };

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    // Fetch the module immediately (hidden work either way) so it's warm by
    // the time the loading screen lifts, but hold off actually starting the
    // sim — and its opening splash — until the scene-ready signal. Otherwise
    // the splash burns its whole visible lifetime decaying behind the
    // loading screen, and if we instead deferred the import too, the
    // fetch+parse would run *after* the loading screen lifts and show up as
    // a visible gap.
    const modulePromise = import("webgl-fluid");

    const unsubscribe = onSceneReady(() => {
      modulePromise.then(({ default: WebGLFluid }) => {
        if (cancelled) return;
        WebGLFluid(canvas, {
          TRIGGER: "hover",
          IMMEDIATE: true,
          AUTO: false,
          DENSITY_DISSIPATION: 0.98,
          VELOCITY_DISSIPATION: 0.4,
          SPLAT_RADIUS,
          SIM_RESOLUTION,
          DYE_RESOLUTION,
          CURL,
          SPLAT_COLOR,
          COLORFUL: false,
          SHADING: false,
          BACK_COLOR,
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
