"use client";

import { useEffect, useRef, useState } from "react";
import { onAppReady } from "@/lib/appReady";

/**
 * Fade/rise a section into view on scroll. Replaces the old per-frame
 * scroll-linked opacity injection with a single IntersectionObserver.
 * Honors prefers-reduced-motion (renders visible immediately).
 *
 * Waits for the intro loading screen to finish before it starts observing —
 * otherwise above-the-fold reveals (e.g. the hero) intersect and finish
 * their fade while still hidden behind the loading overlay, so the "opening"
 * animation never actually plays for the user.
 */
export function Reveal({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !ref.current
    ) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    let observer: IntersectionObserver | null = null;

    const unsubscribe = onAppReady(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      observer.observe(el);
    });

    return () => {
      unsubscribe();
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal${visible ? " reveal-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
