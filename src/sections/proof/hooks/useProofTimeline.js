import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

export function useProofTimeline(sectionRef, language) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const items = gsap.utils.toArray(".proof-item", section);
      const bars = gsap.utils.toArray(".proof-chart-bar", section);
      const chart = section.querySelector(".proof-chart");
      const cursor = section.querySelector(".proof-chart-cursor");
      const eyebrow = section.querySelector(":scope > .eyebrow");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=115%" : "+=145%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 3,
        },
      });

      if (eyebrow) {
        tl.fromTo(eyebrow, { x: -28, opacity: 0.3 }, { x: 0, opacity: 1, duration: 0.4 }, 0);
      }

      items.forEach((itemEl, idx) => {
        const strongEl = itemEl.querySelector("strong");
        const labelEl = itemEl.querySelector("p");
        if (!strongEl) return;

        const targetVal = Number.parseInt(strongEl.dataset.proofValue ?? "0", 10);
        const suffix = strongEl.dataset.proofSuffix ?? "+";
        const counterObj = { value: 0 };
        const at = 0.32 + 0.48 * idx;

        tl.fromTo(
          itemEl,
          { y: 54, opacity: 0.18, rotationX: -13 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.5 },
          at
        )
          .fromTo(
            strongEl,
            { y: 74, scale: 0.3, rotationX: -65, opacity: 0 },
            {
              y: -26,
              scale: 1.3,
              rotationX: 0,
              opacity: 1,
              ease: "back.out(2.2)",
              duration: 0.45,
            },
            at + 0.08
          )
          .to(
            strongEl,
            { y: 0, scale: 1, ease: "elastic.out(1,0.42)", duration: 0.6 },
            at + 0.53
          )
          .to(
            counterObj,
            {
              value: targetVal,
              ease: "power2.out",
              duration: 0.58,
              onUpdate: () => {
                strongEl.textContent = `${Math.round(counterObj.value)}${suffix}`;
              },
            },
            at + 0.1
          );

        if (bars[idx]) {
          tl.to(bars[idx], { scaleY: 1, duration: 0.72, ease: "back.out(1.7)" }, at + 0.12);
        }

        if (cursor && chart) {
          tl.to(
            cursor,
            {
              x: () => (chart.clientWidth * (idx + 0.5)) / items.length,
              opacity: 0.8,
              duration: 0.56,
              ease: "power2.inOut",
            },
            at + 0.1
          );
        }

        if (labelEl) {
          tl.fromTo(
            labelEl,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35 },
            at + 0.44
          );
        }
      });

      if (cursor) {
        tl.to(cursor, { opacity: 0, duration: 0.4 }, 3.15);
      }
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
