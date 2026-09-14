"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { markAppReady, markSceneReady } from "@/lib/appReady";

/**
 * How long the hero fluid sim gets to run behind the loading screen before
 * it's revealed. Also clears the fluid library's own hardcoded ~500ms delay
 * before it starts responding to hover (it binds `mousemove` in a
 * `setTimeout(500)`), so keep this at 500+ or hover does nothing right as
 * the screen lifts. 0 = sim starts exactly when the screen fully disappears.
 */
const FLUID_LEAD_MS = 600;

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
    let sceneTimer: number;

    const finish = () => {
      const elapsed = performance.now() - start;
      sceneTimer = window.setTimeout(
        markSceneReady,
        Math.max(0, minMs - FLUID_LEAD_MS - elapsed)
      );
      timer = window.setTimeout(() => {
        setDone(true);
        markAppReady();
      }, Math.max(0, minMs - elapsed));
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(sceneTimer);
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
