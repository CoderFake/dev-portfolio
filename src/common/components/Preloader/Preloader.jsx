import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const DURATION_MS = 2000;
const EXPAND_MS = 820;

export function Preloader({ onComplete }) {
  const { data } = useLanguage();
  const meta = data?.meta || {};
  const [progress, setProgress] = useState(0);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let doneTimer = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(1, Math.max(0, elapsed / DURATION_MS));
      const eased =
        0.4 * raw +
        0.6 * (raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2);
      const pct = raw >= 1 ? 100 : Math.min(100, Math.round(eased * 100));

      setProgress(pct);

      if (raw < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setExpanding(true);
        doneTimer = window.setTimeout(() => {
          onComplete?.();
        }, EXPAND_MS);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - progress / 100);
  const auraCharge = Math.max(0, (progress - 60) / 40);

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        background:
          "radial-gradient(circle at 50% 48%, rgba(0, 240, 255, 0.16) 0%, rgba(139, 92, 246, 0.14) 34%, #04060e 74%)",
        color: "#f2f6ff",
        userSelect: "none",
        overflow: "hidden",
        opacity: expanding ? 0 : 1,
        pointerEvents: expanding ? "none" : "auto",
        transition: "opacity 0.78s cubic-bezier(0.22, 1, 0.36, 1) 0.06s",
      }}
    >
      {/* Subtle Cyber Blueprint Grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.35,
          backgroundImage:
            "linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* AI Radiant Halo / Aura (Same architecture as .kinetic-ai-aura in StatementSection) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(340px, 46vw, 660px)",
          height: "clamp(340px, 46vw, 660px)",
          pointerEvents: "none",
          display: "grid",
          placeItems: "center",
          opacity: expanding ? 1 : 0.25 + auraCharge * 0.75,
          transform: expanding
            ? "scale(3.4)"
            : `scale(${0.55 + auraCharge * 0.45})`,
          transition: expanding
            ? "transform 0.82s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.78s ease-out"
            : "transform 0.12s ease-out, opacity 0.12s ease-out",
        }}
      >
        <span
          className="kinetic-ai-rays"
          style={{
            transform: expanding
              ? "rotate(115deg) scale(1.35)"
              : `rotate(${progress * 0.9}deg)`,
            transition: expanding
              ? "transform 0.82s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        />
        <span
          className="kinetic-ai-halo-ring kinetic-ai-halo-ring--outer"
          style={{
            transform: expanding
              ? "rotate(-120deg) scale(1.26)"
              : `rotate(${-progress * 0.7}deg)`,
            transition: expanding
              ? "transform 0.82s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        />
        <span className="kinetic-ai-halo-ring kinetic-ai-halo-ring--inner" />
        <span className="kinetic-ai-halo-core" />
      </div>

      {/* Brand Identity Pill */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 16px",
          borderRadius: "999px",
          background: "rgba(9, 13, 30, 0.85)",
          border: "1px solid rgba(0, 240, 255, 0.28)",
          fontFamily: "monospace",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#f2f6ff",
          opacity: expanding ? 0 : 1,
          transform: expanding ? "translateY(-24px) scale(0.9)" : "none",
          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "999px",
            background: "var(--accent-primary, #00f0ff)",
            boxShadow: "0 0 12px var(--accent-primary, #00f0ff)",
          }}
        />
        <span>
          {meta.brandName || "HOANGDIEU"}
          <span style={{ color: "var(--accent-primary, #00f0ff)" }}>
            {meta.brandDot || "."}
          </span>
        </span>
      </div>

      {/* Circular AGI Core Dial + 000% Counter (Expands like AI word at 2s) */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "152px",
          height: "152px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: expanding ? "scale(5.4)" : "scale(1)",
          filter: expanding
            ? "drop-shadow(0 0 48px var(--accent-primary, #00f0ff)) brightness(1.4)"
            : "none",
          transition: expanding
            ? "transform 0.82s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease-out"
            : "none",
        }}
      >
        <svg
          width="152"
          height="152"
          viewBox="0 0 152 152"
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient
              id="devPreloaderGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--accent-primary, #00f0ff)" />
              <stop offset="100%" stopColor="var(--accent-secondary, #8b5cf6)" />
            </linearGradient>
          </defs>
          <circle
            cx="76"
            cy="76"
            r="70"
            fill="none"
            stroke="rgba(0, 240, 255, 0.16)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="76"
            cy="76"
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 200, 0.16)"
            strokeWidth="3.5"
          />
          <circle
            cx="76"
            cy="76"
            r={radius}
            fill="none"
            stroke="url(#devPreloaderGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
              background:
                "linear-gradient(135deg, #ffffff 0%, var(--accent-primary, #00f0ff) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Linear Progress Track (0% -> 100%) */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(290px, 78vw)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          opacity: expanding ? 0 : 1,
          transform: expanding ? "translateY(24px) scale(0.9)" : "none",
          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "6px",
            borderRadius: "999px",
            background: "rgba(148, 163, 200, 0.16)",
            overflow: "hidden",
            padding: "1px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, var(--accent-primary, #00f0ff), var(--accent-secondary, #8b5cf6))",
              boxShadow: "0 0 14px rgba(0, 240, 255, 0.55)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#94a3c8",
          }}
        >
          <span>SYSTEM LOADING</span>
          <span
            style={{
              color: "var(--accent-primary, #00f0ff)",
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {progress}% / 100%
          </span>
        </div>
      </div>
    </div>
  );
}
export default Preloader;
