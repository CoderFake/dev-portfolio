import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

const CAPABILITY_OFFSETS = [
  { x: -42, y: 24, rotation: -4, skewX: 3 },
  { x: 13, y: 37, rotation: 3.3, skewX: -2 },
  { x: -9, y: -28, rotation: -2.7, skewX: 2 },
  { x: 39, y: 15, rotation: 3.7, skewX: -2.5 },
  { x: 26, y: -34, rotation: -3.5, skewX: 2.5 },
];

export function useAboutTimeline(sectionRef, language) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const headingEl = section.querySelector(".intro-copy h2");
      const headingLines = gsap.utils.toArray(".intro-heading-line", section);
      const headingWords = gsap.utils.toArray(".intro-heading-word", section);
      const paragraphs = gsap.utils.toArray(".intro-detail p", section);
      const capabilityLine = section.querySelector(".capability-line");
      const capabilityItems = gsap.utils.toArray(".capability-line > span", section);

      const lineInitial = [
        {
          x: isMobile ? -18 : -48,
          y: -27,
          z: -60,
          rotation: -3.2,
          skewX: 3,
          scale: 0.95,
          opacity: 0.55,
        },
        {
          x: isMobile ? 17 : 42,
          y: 35,
          z: -95,
          rotation: 2.8,
          skewX: -2.4,
          scale: 0.92,
          opacity: 0.42,
        },
      ];

      const lineMid = [
        {
          x: isMobile ? 7 : 18,
          y: 11,
          z: 20,
          rotation: 1.3,
          skewX: -1.2,
          scale: 1.012,
          opacity: 0.86,
        },
        {
          x: isMobile ? -8 : -16,
          y: -11,
          z: 24,
          rotation: -1.1,
          skewX: 1.1,
          scale: 1.02,
          opacity: 0.83,
        },
      ];

      gsap.set(headingLines, { transformPerspective: 900 });
      headingLines.forEach((el, idx) => {
        gsap.set(el, lineInitial[idx % lineInitial.length]);
      });

      headingWords.forEach((el, idx) => {
        gsap.set(el, {
          x: idx % 2 ? 5 : -6,
          y: idx % 3 ? 3 : -5,
          rotation: idx % 2 ? 0.7 : -0.8,
        });
      });

      const paragraphWordGroups = paragraphs.map((p) =>
        gsap.utils.toArray(".scroll-word", p)
      );

      paragraphWordGroups.flat().forEach((el, idx) => {
        gsap.set(el, {
          opacity: 0.18,
          x: idx % 2 ? 5 : -5,
          y: idx % 3 ? 8 : 11,
          skewX: idx % 2 ? 1.2 : -1.2,
        });
      });

      capabilityItems.forEach((el, idx) => {
        const preset = CAPABILITY_OFFSETS[idx % CAPABILITY_OFFSETS.length];
        gsap.set(el, {
          ...preset,
          opacity: 0.25,
          scale: 0.94,
        });
      });

      if (capabilityLine) {
        gsap.set(capabilityLine, { "--line-progress": 0 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=180%" : "+=210%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 9,
        },
      });

      headingLines.forEach((el, idx) => {
        tl.to(el, { ...lineMid[idx % lineMid.length], duration: 0.23 }, 0.03 + 0.025 * idx).to(
          el,
          { x: 0, y: 0, z: 0, rotation: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.22 },
          0.27 + 0.025 * idx
        );
      });

      headingWords.forEach((el, idx) => {
        tl.to(el, { x: 0, y: 0, rotation: 0, duration: 0.22 }, 0.3 + 0.018 * idx);
      });

      paragraphWordGroups.forEach((words, pIdx) => {
        words.forEach((wordEl, wIdx) => {
          const at = 0.39 + 0.055 * pIdx + wIdx * (0.22 / Math.max(words.length - 1, 1));
          tl.to(wordEl, { x: 0, y: 0, skewX: 0, opacity: 1, duration: 0.095 }, at);
        });
      });

      if (capabilityLine) {
        tl.to(capabilityLine, { "--line-progress": 1, duration: 0.25 }, 0.56);
      }

      capabilityItems.forEach((el, idx) => {
        const at = 0.57 + 0.045 * idx;
        tl.to(
          el,
          {
            x: idx % 2 ? -7 : 8,
            y: idx % 2 ? -5 : 6,
            rotation: idx % 2 ? -1.2 : 1.4,
            skewX: idx % 2 ? 0.8 : -0.8,
            scale: 1.015,
            opacity: 0.85,
            duration: 0.13,
          },
          at
        ).to(
          el,
          { x: 0, y: 0, rotation: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.14 },
          at + 0.13
        );
      });

      tl.to(section.querySelector(".intro-label"), { y: -24, opacity: 0.76, duration: 0.55 }, 0.18);

      if (headingEl) {
        tl.to(
          headingEl,
          { y: -7, scale: 1.012, transformOrigin: "50% 50%", duration: 0.07 },
          0.93
        );
      }
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
