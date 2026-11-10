import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

export function useStatementTimeline(sectionRef, language) {
  useEffect(() => {
    const stage = sectionRef.current;
    if (!stage) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const wordBuild = stage.querySelector(".kinetic-word--build");
      const wordDesign = stage.querySelector(".kinetic-word--design");
      const wordCode = stage.querySelector(".kinetic-word--code");
      const wordWith = stage.querySelector(".kinetic-word--with");
      const wordShip = stage.querySelector(".kinetic-word--ship");
      const shipChars = gsap.utils.toArray(".kinetic-char", stage);

      const aiAura = stage.querySelector("[data-ai-aura]");
      const aiRays = stage.querySelector("[data-ai-rays]");
      const aiRingInner = stage.querySelector("[data-ai-ring-inner]");
      const aiRingOuter = stage.querySelector("[data-ai-ring-outer]");
      const aiCore = stage.querySelector("[data-ai-core]");

      gsap.set([wordBuild, wordDesign, wordCode, wordWith, wordShip], {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });
      gsap.set(wordBuild, { z: -520, scale: 0.45, rotationX: 72, opacity: 0 });
      gsap.set(wordDesign, {
        y: isMobile ? 100 : 170,
        z: -360,
        scale: 0.62,
        rotationX: 78,
        opacity: 0,
      });
      gsap.set(wordCode, {
        x: isMobile ? 70 : 180,
        z: -400,
        scale: 0.6,
        rotationY: -54,
        opacity: 0,
      });
      gsap.set(wordWith, {
        y: isMobile ? -90 : -150,
        z: -380,
        scale: 0.58,
        rotationX: -68,
        opacity: 0,
      });
      gsap.set(wordShip, { z: -340, scale: 0.55, opacity: 0 });

      if (aiAura) {
        gsap.set(aiAura, { opacity: 0, scale: 0.35 });
      }
      if (aiRays) {
        gsap.set(aiRays, { rotation: -45, scale: 0.6 });
      }
      if (aiRingInner) {
        gsap.set(aiRingInner, { rotation: 0, scale: 0.5 });
      }
      if (aiRingOuter) {
        gsap.set(aiRingOuter, { rotation: 0, scale: 0.4, opacity: 0 });
      }
      if (aiCore) {
        gsap.set(aiCore, { scale: 0.4, opacity: 0 });
      }

      shipChars.forEach((charEl, idx) => {
        const offsetIndex = idx - (shipChars.length - 1) * 0.5;
        gsap.set(charEl, {
          x: offsetIndex * (isMobile ? 55 : 140),
          y: idx % 2 === 0 ? -90 : 90,
          z: idx % 2 === 0 ? -300 : 160,
          rotationX: idx % 2 === 0 ? 60 : -60,
          opacity: 0,
        });
      });

      const totalDuration = 5.85;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: isMobile ? "+=540%" : "+=500%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 6,
        },
      });

      // 1) BUILD
      tl.to(wordBuild, { z: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.85 }, 0)
        .to(
          wordBuild,
          { xPercent: -145, z: 200, scale: 1.45, rotationY: -18, opacity: 0, duration: 0.86 },
          0.88
        )
        // 2) SCALABLE (overlapping handoff with BUILD)
        .to(wordDesign, { y: 0, z: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.82 }, 0.86)
        .to(
          wordDesign,
          { z: -420, scale: 1.65, rotationX: -58, opacity: 0, duration: 0.82 },
          1.76
        )
        // 3) SYSTEMS (overlapping handoff with SCALABLE)
        .to(wordCode, { x: 0, z: 0, scale: 1, rotationY: 0, opacity: 1, duration: 0.82 }, 1.75)
        .to(
          wordCode,
          { xPercent: 45, z: 220, scale: 1.55, rotationY: 25, opacity: 0, duration: 0.83 },
          2.62
        )
        // 4) WITH (overlapping handoff with SYSTEMS)
        .to(wordWith, { y: 0, z: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.8 }, 2.6)
        .to(
          wordWith,
          { yPercent: -135, z: 240, scale: 1.5, rotationX: 48, opacity: 0, duration: 0.82 },
          3.44
        )
        // 5) AI + Radiant Halo Ignition ("chữ AI cuối là hào quang")
        .to(wordShip, { z: 0, scale: 1.08, opacity: 1, duration: 0.82 }, 3.48)
        .to(
          shipChars,
          { x: 0, y: 0, z: 0, rotationX: 0, opacity: 1, duration: 0.78, stagger: 0.08 },
          3.52
        );

      // Ignite the Radiant Halo / Aura behind "AI" as the letters lock together
      if (aiAura) {
        tl.to(aiAura, { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" }, 3.68);
      }
      if (aiCore) {
        tl.to(aiCore, { opacity: 1, scale: 1.15, duration: 0.7, ease: "power2.out" }, 3.72);
      }
      if (aiRingInner) {
        tl.to(aiRingInner, { scale: 1.08, rotation: 140, duration: 1.1 }, 3.68);
      }
      if (aiRingOuter) {
        tl.to(
          aiRingOuter,
          { opacity: 0.92, scale: 1.24, rotation: -120, duration: 1.1 },
          3.74
        );
      }
      if (aiRays) {
        tl.to(aiRays, { rotation: 95, scale: 1.28, duration: 1.25 }, 3.68);
      }

      // Climax: AI Radiant Light Expansion ("phóng sáng hào quang")
      tl.to(
        wordShip,
        {
          z: 620,
          scale: isMobile ? 4.2 : 5.8,
          opacity: 0.14,
          duration: 1.1,
        },
        4.75
      );
      if (aiAura) {
        tl.to(
          aiAura,
          {
            scale: isMobile ? 2.4 : 3.2,
            opacity: 0,
            duration: 1.05,
          },
          4.78
        );
      }

      tl.fromTo(
        stage.querySelector(".type-track--first"),
        { xPercent: 6 },
        { xPercent: -53, duration: totalDuration },
        0
      )
        .fromTo(
          stage.querySelector(".type-track--second"),
          { xPercent: -47 },
          { xPercent: 12, duration: totalDuration },
          0
        )
        .to(
          stage.querySelector(".statement-orbit"),
          { scale: 1.55, rotation: 105, opacity: 0.32, duration: totalDuration },
          0
        )
        .to(stage.querySelector(".statement-top"), { y: 0, opacity: 0.72, duration: totalDuration }, 0)
        .to(
          stage.querySelector(".statement-bottom"),
          { y: 22, opacity: 0.72, duration: totalDuration },
          0
        );
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
