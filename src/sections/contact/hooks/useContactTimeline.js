import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";
import {
  CONTACT_DARK_CLIP,
  prepareContactSignalPath,
} from "../../../common/morph/handoffBridge";
import { scrollToTarget } from "../../../common/scroll/useLenisScroll";

export function useContactTimeline(sectionRef, language) {
  useEffect(() => {
    const stage = sectionRef.current;
    if (!stage) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return undefined;
      const isMobile = Boolean(context.conditions.mobile);

      const darkField = stage.querySelector("[data-contact-dark]");
      const signalSvg = stage.querySelector("[data-contact-signal]");
      const signalPath = stage.querySelector("[data-contact-signal-path]");
      const lines = gsap.utils.toArray("[data-contact-line]", stage);
      const glyphGroups = lines.map((line) => gsap.utils.toArray("[data-contact-glyph]", line));
      const handoffRule = stage.querySelector("[data-contact-handoff-rule]");
      const activateItems = gsap.utils.toArray("[data-contact-activate]", stage);
      const footer = stage.querySelector("[data-contact-footer]");
      const backBtn = stage.querySelector("[data-contact-back]");
      const headline = stage.querySelector(".contact-headline");
      const topRow = stage.querySelector("[data-contact-top]");

      if (
        !darkField ||
        !signalSvg ||
        !signalPath ||
        lines.length < 4 ||
        !handoffRule ||
        !footer ||
        !headline
      ) {
        return undefined;
      }

      // Cross-session handoff signal continuation from #services
      prepareContactSignalPath(stage, signalSvg, signalPath);

      glyphGroups.forEach((glyphs, lineIdx) => {
        gsap.set(glyphs, {
          x: (gIdx) => -(isMobile ? 90 : 210) - gIdx * (isMobile ? 7 : 13),
          y: (gIdx) => Math.sin(0.72 * gIdx + 0.8 * lineIdx) * (isMobile ? 42 : 82) + 26,
          z: -130,
          rotation: (gIdx) => 32 * Math.sin(0.72 * gIdx + lineIdx),
          rotationY: (gIdx) => 42 * Math.cos(0.72 * gIdx + lineIdx),
          skewX: -12,
          scale: 0.62,
          opacity: 0,
          transformOrigin: "50% 70%",
        });
      });

      let interactiveReady = false;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: isMobile ? "+=180%" : "+=210%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 0,
          onUpdate: (self) => {
            interactiveReady = self.progress >= 0.82;
            stage.dataset.darkReady = self.progress >= 0.13 ? "true" : "false";
          },
        },
      });

      tl.to(darkField, { clipPath: CONTACT_DARK_CLIP.expanded, duration: 1.8 }, 0)
        .to(signalPath, { strokeDashoffset: 0, duration: 8.8 }, 0.3)
        .to(topRow, { clipPath: "inset(0 0% 0 0)", duration: 0.35 }, 1.3)
        .to(handoffRule, { scaleX: 1, duration: 0.68 }, 8.15);

      glyphGroups.forEach((glyphs, lineIdx) => {
        const at = [1.75, 3.35, 4.95, 6.55][lineIdx] ?? 1.75 + 1.6 * lineIdx;
        tl.to(
          glyphs,
          {
            x: (gIdx) => Math.sin(0.72 * gIdx + 0.8 * lineIdx) * (isMobile ? 10 : 22),
            y: (gIdx) => -Math.cos(0.72 * gIdx + 0.8 * lineIdx) * (isMobile ? 16 : 30),
            z: 26,
            rotation: (gIdx) => -9 * Math.sin(0.72 * gIdx + lineIdx),
            rotationY: (gIdx) => -12 * Math.cos(0.72 * gIdx + lineIdx),
            skewX: 4,
            scale: 1.12,
            opacity: 1,
            ease: "power3.out",
            duration: 0.78,
            stagger: 0.075,
          },
          at
        ).to(
          glyphs,
          {
            x: 0,
            y: 0,
            z: 0,
            rotation: 0,
            rotationY: 0,
            skewX: 0,
            scale: 1,
            ease: "sine.inOut",
            duration: 0.54,
            stagger: 0.075,
          },
          at + 0.78
        );
      });

      activateItems.forEach((itemEl, idx) => {
        tl.to(
          itemEl.querySelectorAll("svg, span"),
          { clipPath: "inset(0 0% 0 0)", duration: 0.34 },
          8.32 + 0.16 * idx
        );
      });

      tl.to(footer, { clipPath: "inset(0 0% 0 0)", duration: 0.32 }, 8.92)
        .to(headline, { y: -5, duration: 0.28 }, 9.72)
        .to(backBtn, { color: "#f0eee5", duration: 0.28 }, 9.72);

      const handlePointerMove = (event) => {
        if (!interactiveReady || isMobile) return;
        lines.forEach((lineEl, idx) => {
          const rect = lineEl.getBoundingClientRect();
          const dx = Math.max(-4, Math.min(4, (event.clientX - (rect.left + rect.width / 2)) / 110));
          const dy = Math.max(-2, Math.min(2, (event.clientY - (rect.top + rect.height / 2)) / 180));
          gsap.to(lineEl, {
            x: dx * (idx % 2 ? -1 : 1),
            y: dy,
            duration: 0.26,
            overwrite: true,
          });
        });
      };

      const handlePointerLeave = () => {
        gsap.to(lines, { x: 0, y: 0, duration: 0.3, overwrite: true });
      };

      const handleBackToTop = (event) => {
        event.preventDefault();
        scrollToTarget(0, { duration: 1.25 });
      };

      if (!isMobile) {
        stage.addEventListener("pointermove", handlePointerMove);
        stage.addEventListener("pointerleave", handlePointerLeave);
      }
      backBtn?.addEventListener("click", handleBackToTop);

      return () => {
        delete stage.dataset.darkReady;
        stage.removeEventListener("pointermove", handlePointerMove);
        stage.removeEventListener("pointerleave", handlePointerLeave);
        backBtn?.removeEventListener("click", handleBackToTop);
        gsap.killTweensOf(lines);
      };
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
