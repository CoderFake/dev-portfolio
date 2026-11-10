import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

export function useToolkitTimeline(sectionRef, language) {
  useEffect(() => {
    const stage = sectionRef.current;
    if (!stage) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const groups = gsap.utils.toArray("[data-toolkit-group]", stage);
      const groupTexts = gsap.utils.toArray(".toolkit-group p", stage);
      const visuals = gsap.utils.toArray(".skill-visual", stage);
      const titleH2 = stage.querySelector(".toolkit-title h2");
      const titleSpan = stage.querySelector(".toolkit-title h2 span");
      const eyebrow = stage.querySelector(".toolkit-title .eyebrow");
      const titleDesc = stage.querySelector(".toolkit-title p");

      gsap.set(titleH2, { transformPerspective: 1100, transformOrigin: "0 50%" });
      gsap.set(titleSpan, {
        x: isMobile ? 12 : 30,
        y: 10,
        letterSpacing: "0.02em",
        opacity: 0.55,
      });
      gsap.set(groups, { opacity: 0.22 });
      gsap.set(groupTexts, { opacity: 0.38 });
      gsap.set(visuals, { opacity: 0.12, y: 18, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: isMobile ? "+=145%" : "+=165%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 4,
        },
      });

      tl.to(
        titleH2,
        {
          x: isMobile ? -4 : -12,
          y: -4,
          rotationY: 0,
          letterSpacing: "-0.12em",
          duration: 0.65,
        },
        0
      )
        .to(
          titleSpan,
          { x: 0, y: 0, letterSpacing: "-0.1em", opacity: 1, duration: 0.8 },
          0.12
        )
        .fromTo(eyebrow, { x: -20, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.8 }, 0)
        .fromTo(titleDesc, { y: 24, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.8 }, 0.22);

      if (groups[0]) {
        tl.to(groups[0], { opacity: 1, x: 0, y: 0, duration: 0.55 }, 0.5)
          .to(groupTexts[0], { opacity: 1, y: 0, duration: 0.5 }, 0.55)
          .to(visuals[0], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 0.58);
      }

      if (groups[1]) {
        tl.fromTo(
          groups[1],
          { x: isMobile ? 24 : 55, opacity: 0.15 },
          { x: 0, opacity: 1, duration: 0.65 },
          0.88
        )
          .to(groupTexts[1], { opacity: 1, x: 0, duration: 0.5 }, 0.98)
          .to(visuals[1], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.02);
      }

      if (groups[2]) {
        tl.fromTo(
          groups[2],
          { y: 38, opacity: 0.15 },
          { y: 0, opacity: 1, duration: 0.65 },
          1.28
        )
          .to(groupTexts[2], { opacity: 1, y: 0, duration: 0.5 }, 1.38)
          .to(visuals[2], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.42);
      }

      if (groups[3]) {
        tl.fromTo(
          groups[3],
          { x: isMobile ? -24 : -50, opacity: 0.15 },
          { x: 0, opacity: 1, duration: 0.7 },
          1.66
        )
          .to(groupTexts[3], { opacity: 1, y: 0, duration: 0.5 }, 1.76)
          .to(visuals[3], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.8);
      }

      tl.to(titleH2, { y: -14, z: -20, opacity: 0.76, duration: 0.5 }, 2.85).to(
        groups,
        { y: -18, opacity: 0.7, duration: 0.5 },
        2.9
      );
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
