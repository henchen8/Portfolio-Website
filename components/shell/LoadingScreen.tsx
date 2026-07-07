"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/**
 * Intro loading screen — kept from the original site but rebuilt cleanly:
 * one component, CSS keyframes, honors prefers-reduced-motion, and hides on a
 * real signal (window `load`) with a short minimum so it never flashes.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Lock scroll while the intro is visible.
    document.body.style.overflow = "hidden";

    // Start the animation on the next frame so it plays after first paint.
    const raf = requestAnimationFrame(() => setReady(true));

    const minMs = reduce ? 200 : 1400;
    const start = performance.now();
    let timer: number;

    const finish = () => {
      const elapsed = performance.now() - start;
      timer = window.setTimeout(
        () => setDone(true),
        Math.max(0, minMs - elapsed)
      );
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`loading-screen${ready ? " animation-ready" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="loading-content">
        <div className="loading-logo-container">
          <Logo size={96} />
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}
