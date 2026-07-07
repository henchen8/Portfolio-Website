"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rubik's solve video. Preserves the original behavior — autoplays once fully
 * in view, muted by default (unmuted when arriving from the featured tile),
 * click toggles play/pause, replay overlay on end — but with a guarded play()
 * and no synced timer (video plays at natural rate / natural solve time).
 */
export function VideoDemo({
  src,
  label = "LIVE DEMONSTRATION",
  startUnmuted = false,
}: {
  src: string;
  label?: string;
  startUnmuted?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hovering = useRef(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Unmute when arriving from the home featured tile (?from=tile) — replaces
    // the old sessionStorage `navigatedFromTile` flag.
    const fromTile =
      new URLSearchParams(window.location.search).get("from") === "tile";
    video.muted = !(startUnmuted || fromTile);

    let played = false;
    let playTimer: number;
    const tryPlay = () => {
      if (played) return;
      played = true;
      playTimer = window.setTimeout(() => {
        video.play().catch(() => {
          // Autoplay blocked (e.g. unmuted) — fall back to muted playback.
          video.muted = true;
          video.play().catch(() => {});
        });
      }, 250);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
            tryPlay();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.9 }
    );
    observer.observe(video);

    return () => {
      window.clearTimeout(playTimer);
      observer.disconnect();
    };
  }, [startUnmuted]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    setShowReplay(false);
    video.play().catch(() => {});
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video || showReplay) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="shinkei-video-container">
      <div
        className="shinkei-video-wrapper"
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => {
          hovering.current = false;
          if (videoRef.current?.ended) setShowReplay(true);
        }}
      >
        <video
          ref={videoRef}
          className="shinkei-video"
          playsInline
          controls={!showReplay}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          onClick={toggle}
          onContextMenu={(e) => e.preventDefault()}
          onEnded={() => {
            if (!hovering.current) setShowReplay(true);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {showReplay && (
          <button
            type="button"
            className="shinkei-replay-overlay"
            onClick={handleReplay}
            aria-label="Replay video"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            <span>Replay</span>
          </button>
        )}
      </div>
      <div className="shinkei-video-caption">
        <span className="shinkei-label">{label}</span>
      </div>
    </div>
  );
}
