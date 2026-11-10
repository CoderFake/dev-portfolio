import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { scrollToTarget } from "../../common/scroll/useLenisScroll";
import { AgiNeuralCoreCanvas } from "../../common/webgl/AgiNeuralCoreCanvas";
import { useHeroTimeline } from "./hooks/useHeroTimeline";

function renderVortexChars(text, keyPrefix) {
  return Array.from(text || "").map((char, idx) =>
    char === " " ? (
      <span key={`${keyPrefix}-sp-${idx}`} className="hero-vortex-space" aria-hidden="true">
        &nbsp;
      </span>
    ) : (
      <span
        key={`${keyPrefix}-ch-${idx}`}
        className="hero-vortex-char"
        data-vortex-char
        aria-hidden="true"
      >
        {char}
      </span>
    )
  );
}

export function HeroSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { hero, meta } = data;

  const [pulseCount, setPulseCount] = useState(0);

  useHeroTimeline(sectionRef, language);

  const handleScrollDown = (event) => {
    if (!hero.scrollTarget?.startsWith("#")) return;
    event.preventDefault();
    const targetEl = document.querySelector(hero.scrollTarget);
    if (!targetEl) return;
    const anchorEl = targetEl.parentElement?.classList.contains("pin-spacer")
      ? targetEl.parentElement
      : targetEl;
    scrollToTarget(anchorEl, { offset: 0, duration: 1.15 });
  };

  const mediaSrc = hero.modelSrc || hero.videoSrc || "";
  const isGlbModel = /\.(glb|gltf)(\?.*)?$/i.test(mediaSrc);
  const isStaticImage = /\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i.test(mediaSrc);

  return (
    <section
      ref={sectionRef}
      className="hero hero--webgl"
      id="top"
      data-scroll-hero
      onClick={() => setPulseCount((c) => c + 1)}
    >
      <div className="hero-grid" aria-hidden="true" />

      {/* Full-Screen 3D CGI Engineer Video + Three.js 3D AGI Core Stage */}
      <div className="hero-visual">
        <div
          className="hero-video-frame hero-video-frame--studio"
          data-hero-video-frame
        >
          {isGlbModel ? (
            <model-viewer
              src={mediaSrc}
              alt={hero.videoAriaLabel}
              auto-rotate
              camera-controls
              disable-zoom
              interaction-prompt="none"
              style={{ width: "100%", height: "100%", background: "transparent" }}
            />
          ) : isStaticImage ? (
            <img
              className="hero-video"
              src={mediaSrc}
              alt={hero.videoAriaLabel}
              loading="eager"
            />
          ) : (
            <video
              key={mediaSrc}
              className="hero-video"
              data-hero-video
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label={hero.videoAriaLabel}
            >
              <source src={mediaSrc} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Studio Dark-Wall & Cyber Edge Lighting Scrim (GPU-safe single layer) */}
        <div className="hero-studio-scrim" aria-hidden="true" />

        {/* Real-time Three.js 3D AGI Gyroscopic Telemetry Halo & Neural Constellation */}
        <AgiNeuralCoreCanvas mode="agi-core" pulseTrigger={pulseCount} />
      </div>

      <div className="hero-content">
        <div className="hero-left-stage">
          <p className="hero-kicker" data-hero-intro-fade>
            <span className="status-dot" aria-hidden="true" />
            <span>{hero.kicker}</span>
          </p>

          <h1 className="hero-title" aria-label={`${hero.titleLineOne} ${hero.titleLineTwo}`}>
            <span className="hero-speed-lines" aria-hidden="true">
              <span className="hero-speed-streak hero-speed-streak--1" data-hero-speed-streak />
              <span className="hero-speed-streak hero-speed-streak--2" data-hero-speed-streak />
              <span className="hero-speed-streak hero-speed-streak--3" data-hero-speed-streak />
            </span>
            <span className="hero-title-line hero-title-line--one">
              {renderVortexChars(hero.titleLineOne, "l1")}
            </span>
            <span className="hero-title-line hero-title-line--two">
              <span className="hero-title-main">
                {renderVortexChars(hero.titleLineTwo, "l2")}
              </span>
              {hero.showPeriod ? (
                <span className="period hero-vortex-char" data-vortex-char aria-hidden="true">
                  .
                </span>
              ) : null}
            </span>
          </h1>

          <div className="hero-bottom" data-hero-intro-fade>
            <div className="hero-bio-card">
              <p>{hero.bio}</p>
              {meta.cvUrl && hero.cvLabel ? (
                <a
                  className="cv-link"
                  href={meta.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{hero.cvLabel}</span>
                  <ArrowUpRight size={12} />
                </a>
              ) : null}
            </div>

            <a
              className="round-link"
              href={hero.scrollTarget}
              onClick={handleScrollDown}
              aria-label={hero.scrollButtonAria}
            >
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-index">
        <span>{hero.indexLeft}</span>
        <span>{hero.scrollHint}</span>
      </div>
    </section>
  );
}
