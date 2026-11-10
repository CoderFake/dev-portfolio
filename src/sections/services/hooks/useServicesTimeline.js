import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";
import { prepareServicesHandoffPaths } from "../../../common/morph/handoffBridge";

export function useServicesTimeline(sectionRef, language) {
  useEffect(() => {
    const stage = sectionRef.current;
    if (!stage) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const lanes = gsap.utils.toArray("[data-service-lane]", stage);
      const headingFirst = stage.querySelector(".service-heading-first");
      const headingSecond = stage.querySelector(".service-heading-second");
      const firstChars = gsap.utils.toArray(".service-heading-first .service-heading-char", stage);
      const secondChars = gsap.utils.toArray(
        ".service-heading-second .service-heading-char",
        stage
      );
      const eyebrow = stage.querySelector(".section-heading .eyebrow");
      const introP = stage.querySelector("[data-service-intro]");
      const spine = stage.querySelector("[data-service-spine]");
      const spineDots = gsap.utils.toArray(".service-spine i", stage);
      const handoffSvg = stage.querySelector("[data-service-handoff]");
      const handoffPaths = gsap.utils.toArray("[data-service-handoff-path]", stage);

      if (lanes.length < 3 || !spine) return;

      // Cross-session handoff geometry into #contact
      prepareServicesHandoffPaths(stage, lanes, handoffSvg, handoffPaths);

      const laneTitles = lanes.map((el) => el.querySelector("h3")).filter(Boolean);
      const artifactFrames = lanes
        .map((el) => el.querySelector(".service-artifact-frame"))
        .filter(Boolean);
      const artifactBlocks = gsap.utils.toArray(".service-artifact-block", stage);
      const artifactLines = gsap.utils.toArray(".service-artifact-line", stage);

      gsap.set(eyebrow, { autoAlpha: 0, y: -18, letterSpacing: ".35em" });
      gsap.set(headingFirst, { autoAlpha: 0 });
      gsap.set(headingSecond, { autoAlpha: 0 });
      gsap.set(firstChars, {
        autoAlpha: 0,
        x: (idx) => -50 - 7 * idx,
        y: (idx) => 42 * Math.sin(0.8 * idx),
        rotationY: -65,
        rotationZ: -12,
        scale: 0.62,
      });
      gsap.set(secondChars, {
        autoAlpha: 0,
        x: (idx) => 55 + 6 * idx,
        y: (idx) => 46 * Math.cos(0.8 * idx),
        rotationY: 65,
        rotationZ: 11,
        scale: 0.62,
      });
      gsap.set(introP, { autoAlpha: 0, y: 22, clipPath: "inset(100% 0 0 0)" });

      lanes.forEach((laneEl) => {
        gsap.set(laneEl.querySelector(".service-lane-index"), { autoAlpha: 0, y: 14 });
        gsap.set(laneEl.querySelector("h3"), {
          autoAlpha: 0,
          x: -48,
          y: 16,
          skewX: -9,
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.set(laneEl.querySelector("p"), {
          autoAlpha: 0,
          x: 30,
          y: 15,
          clipPath: "inset(0 0 100% 0)",
        });
        gsap.set(laneEl.querySelectorAll(".service-lane-word"), {
          autoAlpha: 0,
          y: 32,
          rotationX: -70,
        });
        gsap.set(laneEl.querySelectorAll(".service-description-word"), {
          autoAlpha: 0,
          y: 12,
        });
        gsap.set(laneEl.querySelector(".service-artifact-frame"), {
          autoAlpha: 0,
          scale: 0.84,
          y: 18,
          transformOrigin: "center center",
        });
      });

      gsap.set(artifactLines, {
        strokeDasharray: (_, target) => target.getTotalLength(),
        strokeDashoffset: (_, target) => target.getTotalLength(),
      });
      gsap.set(artifactBlocks, { opacity: 0, scale: 0.65, transformOrigin: "50% 50%" });
      gsap.set(spine, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(spineDots, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: isMobile ? "+=220%" : "+=260%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      tl.to(
        eyebrow,
        { autoAlpha: 1, y: 0, letterSpacing: ".14em", duration: 0.35, ease: "power2.out" },
        0.1
      )
        .to(headingFirst, { autoAlpha: 1, duration: 0.08 }, 0.28)
        .to(
          firstChars,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: "back.out(1.8)",
          },
          0.3
        )
        .to(headingSecond, { autoAlpha: 1, duration: 0.08 }, 0.78)
        .to(
          secondChars,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: "back.out(1.8)",
          },
          0.8
        )
        .to(
          introP,
          { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.56, ease: "power2.out" },
          1
        );

      lanes.forEach((laneEl, idx) => {
        const at = 1.5 + 1.95 * idx;
        const h3 = laneEl.querySelector("h3");
        const p = laneEl.querySelector("p");
        const route = laneEl.querySelector(".service-route");
        const routeLine = laneEl.querySelector("[data-service-route-line]");
        const signal = laneEl.querySelector("[data-service-signal]");
        const nodes = gsap.utils.toArray("[data-service-node]", laneEl);
        const lines = gsap.utils.toArray(".service-artifact-line", laneEl);
        const blocks = gsap.utils.toArray(".service-artifact-block", laneEl);
        const frame = laneEl.querySelector(".service-artifact-frame");
        const indexSpan = laneEl.querySelector(".service-lane-index");
        const laneWords = gsap.utils.toArray(".service-lane-word", laneEl);
        const descWords = gsap.utils.toArray(".service-description-word", laneEl);

        if (idx > 0) {
          tl.to(lanes[idx - 1].querySelector("h3"), { color: "#94a3c8", x: 0, duration: 0.35 }, at);
        }

        tl.to(indexSpan, { autoAlpha: 1, y: 0, duration: 0.25, ease: "back.out(2)" }, at)
          .to(
            h3,
            {
              autoAlpha: 1,
              color: "#f5f7ff",
              x: isMobile ? 2 : 8,
              y: 0,
              skewX: 0,
              clipPath: "inset(0 0% 0 0)",
              letterSpacing: "-.06em",
              duration: 0.28,
              ease: "power3.out",
            },
            at + 0.08
          )
          .to(
            laneWords,
            {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration: 0.52,
              stagger: 0.08,
              ease: "back.out(2)",
            },
            at + 0.14
          )
          .to(
            p,
            {
              autoAlpha: 1,
              color: "#b8c4e0",
              x: 0,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.26,
              ease: "power2.out",
            },
            at + 0.35
          )
          .to(
            descWords,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              stagger: 0.022,
              ease: "power2.out",
            },
            at + 0.41
          )
          .to(frame, { autoAlpha: 1, scale: 1, y: 0, duration: 0.52, ease: "back.out(1.5)" }, at + 0.43)
          .to(routeLine, { scaleX: 1, duration: 1.02 }, at + 0.12)
          .fromTo(
            signal,
            { opacity: 0, x: 0 },
            {
              opacity: 1,
              x: () => Math.max(0, (route?.clientWidth ?? 0) - 7),
              duration: 1.02,
            },
            at + 0.12
          )
          .to(
            nodes,
            { borderColor: "#00f0ff", backgroundColor: "#00f0ff", duration: 0.18, stagger: 0.23 },
            at + 0.2
          )
          .to(
            lines,
            {
              strokeDashoffset: 0,
              duration: isMobile ? 0.72 : 0.88,
              stagger: isMobile ? 0.04 : 0.07,
            },
            at + 0.32
          )
          .to(blocks, { scale: 1, opacity: 0.8, duration: 0.32, stagger: 0.1 }, at + 0.72)
          .to(frame, { borderColor: "#536f9e8a", duration: 0.32 }, at + 0.78)
          .to(signal, { opacity: 0, duration: 0.18 }, at + 1.27);

        if (introP) {
          tl.to(introP, { color: ["#b8c4e0", "#cbd5f0", "#e2e8f8"][idx], duration: 0.45 }, at);
        }

        if (idx === 1) {
          tl.to(headingFirst, { color: "#dce6fa", duration: 0.55 }, at).to(
            headingSecond,
            { color: "#94a3c8", duration: 0.55 },
            at
          );
        }
        if (idx === 2) {
          tl.to(headingSecond, { color: "#f5f7ff", duration: 0.55 }, at);
        }
      });

      tl.to(laneTitles, { color: "#f5f7ff", x: 0, duration: 0.54 }, 7.45)
        .to(artifactFrames, { borderColor: "#536f9e8a", duration: 0.54 }, 7.45)
        .to(artifactBlocks, { opacity: 0.88, duration: 0.54 }, 7.45)
        .to(headingFirst, { color: "#f5f7ff", duration: 0.54 }, 7.45)
        .to(spine, { scaleY: 1, duration: 0.74 }, 7.5)
        .to(spineDots, { opacity: 1, duration: 0.14, stagger: 0.22 }, 7.63)
        .to(spine, { scaleY: 1.13, duration: 0.4 }, 9.6)
        .to(handoffPaths.slice(0, 3), { strokeDashoffset: 0, duration: 0.88, stagger: 0.12 }, 9.54)
        .to(handoffPaths[3], { strokeDashoffset: 0, duration: 0.38 }, 10.35);
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
