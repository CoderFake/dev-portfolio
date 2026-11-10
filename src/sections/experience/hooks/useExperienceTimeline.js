import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

export function useExperienceTimeline(sectionRef, language, itemCount) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const titleChars = gsap.utils.toArray(".experience-title-char", section);
      const entries = gsap.utils.toArray(".experience-entry", section);
      const archiveCards = gsap.utils.toArray("[data-experience-archive-card]", section);
      const finaleEl = section.querySelector(".experience-finale");
      const firstIntro = section.querySelector(".experience-first-intro");

      if (entries.length === 0) return;

      const charScatter = {
        x: (idx) => Math.sin(1.1 * idx) * (isMobile ? 6 : 11),
        y: (idx) => (idx % 2 ? -1 : 1) * (isMobile ? 20 : 36),
        rotationX: (idx) => (idx % 2 ? -55 : 55),
        opacity: 0.08,
      };

      if (isMobile) {
        gsap.set(entries, { autoAlpha: 0, xPercent: 18, scale: 0.95 });
        gsap.set(entries[0], { autoAlpha: 1, xPercent: 0, scale: 1 });
        gsap.set(archiveCards, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          transformOrigin: "50% 50%",
        });
        archiveCards.forEach((card, idx) => gsap.set(card, { zIndex: idx + 1 }));

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${112 * entries.length}%`,
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 5,
          },
        });

        tl.to(
          titleChars,
          { y: -16, opacity: 0, duration: 0.45, stagger: 0.008 },
          1.25
        ).to(firstIntro, { y: -25, opacity: 0, duration: 0.4 }, 1.6);

        entries.forEach((entryEl, idx) => {
          const at = 2.35 * idx;
          const visual = entryEl.querySelector(".experience-visual");
          const cardScale = 0.27 + 0.05 * idx;

          if (idx > 0) {
            tl.fromTo(
              entryEl,
              { autoAlpha: 0, xPercent: 18, scale: 0.95 },
              { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.58 },
              at
            )
              .fromTo(
                entryEl.querySelector(".experience-visual-frame"),
                { y: 28, scale: 0.88, opacity: 0.55 },
                { y: 0, scale: 1, opacity: 1, duration: 0.68 },
                at + 0.08
              )
              .fromTo(
                gsap.utils.toArray(".experience-company-char", entryEl),
                charScatter,
                {
                  x: 0,
                  y: 0,
                  rotationX: 0,
                  opacity: 1,
                  duration: 0.42,
                  stagger: 0.012,
                },
                at + 0.14
              )
              .fromTo(
                entryEl.querySelectorAll(
                  ".experience-role, .experience-project, .experience-points li"
                ),
                { y: 12, opacity: 0.4 },
                { y: 0, opacity: 1, duration: 0.45, stagger: 0.035 },
                at + 0.28
              );
          }

          tl.fromTo(entryEl, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1.65 }, at);

          if (archiveCards[idx]) {
            tl.fromTo(
              archiveCards[idx],
              { autoAlpha: 0, scale: 0.88 },
              { autoAlpha: 1, scale: 0.88, duration: 0.1 },
              at + 1.78
            )
              .to(visual, { opacity: 0, duration: 0.13 }, at + 1.78)
              .to(
                archiveCards[idx],
                {
                  x: (idx - (entries.length - 1) / 2) * 72,
                  y: () =>
                    section.clientHeight -
                    archiveCards[idx].offsetTop -
                    (archiveCards[idx].offsetHeight * (1 + cardScale)) / 2 -
                    28,
                  scale: cardScale,
                  rotation: -7 + 4.5 * idx,
                  duration: 0.62,
                },
                at + 1.84
              );
          }

          if (idx < entries.length - 1) {
            tl.to(entryEl, { autoAlpha: 0, xPercent: -17, scale: 1.03, duration: 0.48 }, at + 2.02);
          }
        });

        tl.to(entries[entries.length - 1], { opacity: 1, duration: 0.8 }, 2.35 * entries.length - 0.55)
          .to(archiveCards, { opacity: 1, duration: 0.45 }, 2.35 * entries.length + 0.15)
          .set(archiveCards, { opacity: 1 }, 2.35 * entries.length + 1.25);
      } else {
        gsap.set(titleChars, { x: 0, y: 0, rotationX: 0, opacity: 1 });
        gsap.set(entries, { autoAlpha: 0, xPercent: 25, scale: 0.95, rotationY: 8 });
        gsap.set(entries[0], { autoAlpha: 1, xPercent: 0, scale: 1, rotationY: 0 });
        gsap.set(archiveCards, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          transformOrigin: "50% 50%",
        });
        if (finaleEl) gsap.set(finaleEl, { autoAlpha: 0 });
        archiveCards.forEach((card, idx) => gsap.set(card, { zIndex: idx + 1 }));

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(135 * entries.length, 420)}%`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 5,
          },
        });

        tl.to(
          titleChars,
          {
            x: (idx) => 18 * Math.sin(1.1 * idx),
            y: (idx) => (idx % 2 ? -1 : 1) * 26,
            rotationX: (idx) => (idx % 2 ? -35 : 35),
            opacity: 0,
            duration: 0.45,
            stagger: 0.008,
          },
          1.5
        ).to(firstIntro, { y: -28, opacity: 0, duration: 0.4 }, 1.86);

        const centerIdx = (entries.length - 1) / 2;

        entries.forEach((entryEl, idx) => {
          const at = 2.5 * idx;
          const companyChars = gsap.utils.toArray(".experience-company-char", entryEl);
          const visual = entryEl.querySelector(".experience-visual");
          const visualFrame = entryEl.querySelector(".experience-visual-frame");
          const artLayers = gsap.utils.toArray(".experience-art-layer", entryEl);

          if (idx > 0) {
            tl.fromTo(
              entryEl,
              { autoAlpha: 0, xPercent: 25, scale: 0.95, rotationY: 8 },
              { autoAlpha: 1, xPercent: 0, scale: 1, rotationY: 0, duration: 0.68 },
              at
            );
          }

          tl.fromTo(entryEl, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1.8 }, at);

          if (idx > 0) {
            tl.fromTo(
              visualFrame,
              { y: 48, rotationY: -14, rotationX: 8, scale: 0.87, opacity: 0.45 },
              { y: 0, rotationY: 0, rotationX: 0, scale: 1, opacity: 1, duration: 0.8 },
              at + 0.12
            )
              .fromTo(
                artLayers,
                { x: (layerIdx) => (layerIdx % 2 ? 25 : -25), y: 16, opacity: 0.4 },
                { x: 0, y: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
                at + 0.3
              )
              .fromTo(
                entryEl.querySelector(".experience-date"),
                { y: 18, opacity: 0.35 },
                { y: 0, opacity: 1, duration: 0.45 },
                at + 0.12
              )
              .fromTo(
                companyChars,
                charScatter,
                {
                  x: 0,
                  y: 0,
                  rotationX: 0,
                  opacity: 1,
                  duration: 0.45,
                  stagger: 0.018,
                },
                at + 0.17
              )
              .fromTo(
                entryEl.querySelectorAll(
                  ".experience-role, .experience-project, .experience-points li"
                ),
                { y: 13, opacity: 0.3 },
                { y: 0, opacity: 1, duration: 0.43, stagger: 0.06 },
                at + 0.54
              )
              .fromTo(
                entryEl.querySelector(".experience-arrow"),
                { y: -12, rotation: -30, opacity: 0.3 },
                { y: 0, rotation: 0, opacity: 1, duration: 0.4 },
                at + 0.6
              );
          }

          if (archiveCards[idx]) {
            tl.fromTo(archiveCards[idx], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, at + 2.03)
              .to(visual, { opacity: 0, duration: 0.12 }, at + 2.03)
              .to(
                archiveCards[idx],
                {
                  x: (idx - centerIdx) * 82 - 24,
                  y: () => Math.min(0.28 * window.innerHeight, 240),
                  scale: 0.48,
                  rotation: -10 + 9 * idx,
                  duration: 0.76,
                },
                at + 2.1
              )
              .to(
                entryEl,
                { autoAlpha: 0, xPercent: -20, scale: 1.04, rotationY: -5, duration: 0.6 },
                at + 2.22
              );
          }
        });

        const finaleAt = 2.5 * entries.length - 0.1;
        if (finaleEl) {
          tl.fromTo(
            finaleEl,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            finaleAt
          )
            .fromTo(
              section.querySelector(".experience-finale-line"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6 },
              finaleAt + 0.15
            )
            .fromTo(
              finaleEl.querySelector("p"),
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55 },
              finaleAt + 0.17
            )
            .fromTo(
              gsap.utils.toArray(".experience-finale-company", finaleEl),
              { y: 34, rotationX: -32, opacity: 0 },
              {
                y: 0,
                rotationX: 0,
                opacity: 1,
                stagger: 0.11,
                duration: 0.65,
              },
              finaleAt + 0.33
            )
            .to(finaleEl, { opacity: 1, duration: 0.9 }, finaleAt + 1.1);
        }
      }
    });

    return () => mm.revert();
  }, [sectionRef, language, itemCount]);
}
