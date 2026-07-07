"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import fitboxLogo from "@/assets/fitbox/logo.png";

/**
 * Dummy FitBox app mockup — shows only the app's splash/loading screen and its
 * landing page (per the plan, the full interactive simulator was cut). Fully
 * self-contained inline styles so it needs no global CSS.
 */
export function PhoneMockup() {
  const [phase, setPhase] = useState<"splash" | "landing">("splash");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setPhase("landing");
      return;
    }
    const t = window.setTimeout(() => setPhase("landing"), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: 280,
        height: 570,
        borderRadius: 44,
        background: "#0d0d0f",
        padding: 12,
        boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
        position: "relative",
        flex: "0 0 auto",
      }}
      aria-label="FitBox app mockup"
      role="img"
    >
      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          position: "relative",
          background: phase === "splash" ? "#111114" : "#f6f6f2",
          transition: "background 0.5s ease",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 92,
            height: 26,
            background: "#000",
            borderRadius: 16,
            zIndex: 5,
          }}
        />

        {/* Splash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            opacity: phase === "splash" ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        >
          <Image
            src={fitboxLogo}
            alt="FitBox"
            width={120}
            height={120}
            style={{
              width: 120,
              height: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <div
            style={{
              width: 120,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                background: "#fff",
                borderRadius: 4,
                transformOrigin: "left",
                animation: "fitboxBar 1.5s ease forwards",
              }}
            />
          </div>
        </div>

        {/* Landing */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "56px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: phase === "landing" ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
            color: "#16161a",
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "#8a8a80" }}>Good morning</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Henry</div>
          </div>

          <div
            style={{
              background: "#16161a",
              color: "#fff",
              borderRadius: 18,
              padding: "18px 18px 20px",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>Today&apos;s workout</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
              Full Body · 24 min
            </div>
            <div
              style={{
                marginTop: 14,
                background: "#fff",
                color: "#16161a",
                borderRadius: 999,
                textAlign: "center",
                padding: "9px 0",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Start Workout
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {[
              { k: "Streak", v: "12d" },
              { k: "Calories", v: "480" },
            ].map((s) => (
              <div
                key={s.k}
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: 16,
                  padding: "14px 16px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ fontSize: 11, color: "#8a8a80" }}>{s.k}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "14px 16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
              This week
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 44,
              }}
            >
              {[40, 65, 30, 80, 55, 70, 48].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 3 ? "#16161a" : "#d8d8cf",
                    borderRadius: 3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 54,
            background: "#fff",
            borderTop: "1px solid #ececE4",
            display: phase === "landing" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: 18,
          }}
        >
          <span>🏠</span>
          <span style={{ opacity: 0.4 }}>📊</span>
          <span style={{ opacity: 0.4 }}>👥</span>
          <span style={{ opacity: 0.4 }}>⚙️</span>
        </div>
      </div>

      <style>{`@keyframes fitboxBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}
