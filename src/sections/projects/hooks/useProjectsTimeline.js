import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";
import { computeProjectCardPose } from "../logic/projectStackMath";

export function useProjectsTimeline(sectionRef, language, itemCount) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      // Part 1: Work Intro 3D word reveal
      const workIntro = section.querySelector("[data-work-intro]");
      if (workIntro) {
        const eyebrow = workIntro.querySelector(".eyebrow");
        const firstLineWords = gsap.utils.toArray(
          ".work-intro-line--first .work-intro-word",
          workIntro
        );
        const secondLineWords = gsap.utils.toArray(
          ".work-intro-line--second .work-intro-word",
          workIntro
        );
        const descWords = gsap.utils.toArray(".work-intro-description-word", workIntro);

        gsap.set(eyebrow, { x: isMobile ? -20 : -42, opacity: 0 });
        gsap.set(firstLineWords, {
          x: isMobile ? -18 : -44,
          y: isMobile ? 30 : 68,
          rotationX: -68,
          skewX: -7,
          opacity: 0,
          transformPerspective: 900,
        });
        gsap.set(secondLineWords, {
          x: isMobile ? 24 : 58,
          y: isMobile ? 28 : 62,
          rotationX: 62,
          skewX: 6,
          opacity: 0,
          transformPerspective: 900,
        });
        gsap.set(descWords, { x: -14, y: 18, opacity: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: workIntro,
              start: "top top",
              end: isMobile ? "+=135%" : "+=155%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 8,
            },
          })
          .to(eyebrow, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.08)
          .to(
            firstLineWords,
            {
              x: 0,
              y: 0,
              rotationX: 0,
              skewX: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.13,
              ease: "power3.out",
            },
            0.28
          )
          .to(
            secondLineWords,
            {
              x: 0,
              y: 0,
              rotationX: 0,
              skewX: 0,
              opacity: 1,
              duration: 0.67,
              stagger: 0.11,
              ease: "power3.out",
            },
            1.02
          )
          .to(
            descWords,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.035,
              ease: "power2.out",
            },
            1.6
          )
          .to({}, { duration: 0.9 }, 2.55);
      }

      // Part 2: 3D Project Stack Stage
      const projectStage = section.querySelector("[data-project-stage]");
      const projectStack = section.querySelector("[data-project-stack]");

      if (projectStage && projectStack) {
        const cards = gsap.utils.toArray("[data-project-card]", projectStack);
        const metas = gsap.utils.toArray("[data-project-meta]", projectStage);
        const counterEl = projectStage.querySelector("[data-project-counter]");
        const count = cards.length;
        const typeIntro = projectStage.querySelector(".project-type-intro");
        const typeLineFirst = projectStage.querySelector(".project-type-line--first");
        const typeLineSecond = projectStage.querySelector(".project-type-line--second");
        const typeChars = gsap.utils.toArray(".project-type-char", projectStage);
        const backNames = gsap.utils.toArray(".project-name-back", projectStage);
        const fanHeading = projectStage.querySelector(".project-fan-heading");

        cards.forEach((card, idx) => {
          gsap.set(card, computeProjectCardPose(0, idx, count, isMobile));
          const poster = card.querySelector(".project-poster");
          if (poster) {
            gsap.set(poster, {
              transformOrigin: "50% 50%",
              scale: idx === 0 ? 1 : 0.98,
            });
          }
        });

        metas.forEach((metaEl) => gsap.set(metaEl, { autoAlpha: 0, y: 24 }));
        gsap.set(projectStack, {
          opacity: 0,
          scale: isMobile ? 0.88 : 0.77,
          y: isMobile ? 42 : 85,
          transformOrigin: "50% 50%",
        });
        if (fanHeading) gsap.set(fanHeading, { autoAlpha: 0, y: -20 });

        typeChars.forEach((charEl, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          gsap.set(charEl, {
            x: dir * (isMobile ? 12 : 22),
            y: dir * (isMobile ? 34 : 60),
            z: idx % 3 === 0 ? (isMobile ? -90 : -150) : isMobile ? 50 : 80,
            rotationX: dir * (isMobile ? 30 : 38),
            rotationY: dir * (isMobile ? 7 : 10),
            opacity: 0.68,
          });
        });

        gsap.set(backNames, {
          xPercent: -18,
          z: -280,
          scale: 0.7,
          opacity: 0,
        });

        const stackTl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            if (!counterEl) return;
            const currentIdx = Math.min(
              count - 1,
              Math.max(0, Math.round(stackTl.time() - 2.8))
            );
            counterEl.textContent = `${String(currentIdx + 1).padStart(2, "0")} / ${String(
              count
            ).padStart(2, "0")}`;
          },
          scrollTrigger: {
            trigger: projectStage,
            start: "top top",
            end: () => `+=${Math.max((count + 2) * (isMobile ? 62 : 54), 330)}%`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 7,
          },
        });

        stackTl
          .to(
            typeChars,
            {
              x: 0,
              y: 0,
              z: 0,
              rotationX: 0,
              rotationY: 0,
              opacity: 1,
              duration: 1.2,
              stagger: { each: 0.045, from: "center" },
            },
            0
          )
          .to(
            typeLineFirst,
            {
              xPercent: -105,
              z: isMobile ? 90 : 175,
              scale: 1.25,
              letterSpacing: "0.04em",
              opacity: 0,
              duration: 1.05,
            },
            1.22
          )
          .to(
            typeLineSecond,
            {
              xPercent: 100,
              z: isMobile ? 210 : 480,
              scale: isMobile ? 3.2 : 5.2,
              letterSpacing: "0.08em",
              opacity: 0,
              duration: 1.18,
            },
            1.22
          )
          .to(typeIntro, { opacity: 0, duration: 0.24 }, 2.26)
          .to(projectStack, { opacity: 1, scale: 1, y: 0, duration: 0.92 }, 1.65)
          .to(metas[0], { autoAlpha: 1, y: 0, duration: 0.65 }, 1.95)
          .to(fanHeading, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.9)
          .to(
            backNames[0],
            {
              xPercent: -50,
              z: -90,
              scale: 1,
              opacity: 0.1,
              duration: 0.8,
            },
            1.9
          );

        for (let step = 1; step < count; step += 1) {
          const at = 2.8 + step - 1;
          cards.forEach((card, cardIdx) => {
            stackTl.to(
              card,
              {
                ...computeProjectCardPose(step, cardIdx, count, isMobile),
                duration: 1,
              },
              at
            );
            const poster = card.querySelector(".project-poster");
            if (poster) {
              stackTl.to(poster, { scale: cardIdx === step ? 1 : 0.98, duration: 1 }, at);
            }
          });

          stackTl
            .to(metas[step - 1], { autoAlpha: 0, y: -22, duration: 0.4 }, at)
            .fromTo(
              metas[step],
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.55 },
              at + 0.35
            )
            .to(
              backNames[step - 1],
              {
                xPercent: -86,
                z: 260,
                scale: 1.45,
                opacity: 0,
                duration: 0.85,
              },
              at
            )
            .fromTo(
              backNames[step],
              { xPercent: -18, z: -280, scale: 0.7, opacity: 0 },
              {
                xPercent: -50,
                z: -90,
                scale: 1,
                opacity: 0.1,
                duration: 0.92,
              },
              at + 0.07
            );
        }
      }
    });

    return () => mm.revert();
  }, [sectionRef, language, itemCount]);
}
