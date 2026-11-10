import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

const DESKTOP_SCALES = [1.48, 1.58, 1.66, 1.52, 1.6];
const MOBILE_SCALES = [1.08, 1.13, 1.18, 1.1, 1.14];
const DOC_ROTATIONS = [-1.1, 0.9, -0.7, 1, -0.9];

export function useCredentialsTimeline(sectionRef, language, certCount) {
  useEffect(() => {
    const stage = sectionRef.current;
    if (!stage) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return;
      const isMobile = Boolean(context.conditions.mobile);

      const world = stage.querySelector("[data-credentials-world]");
      const viewport = stage.querySelector(".credentials-viewport");
      const docs = gsap.utils.toArray("[data-credential-doc]", stage);
      const records = gsap.utils.toArray("[data-credential-record]", stage);
      const inspections = docs
        .map((doc) => doc.querySelector(".credential-inspection"))
        .filter(Boolean);
      const catalog = stage.querySelector(".credential-catalog");
      const education = stage.querySelector(".credentials-education");
      const overviewLabel = stage.querySelector(".credentials-overview-label");
      const introSpan = stage.querySelector(".credentials-intro h2 span");

      if (!world || !viewport || docs.length === 0 || docs.length !== records.length) return;

      const scales = isMobile ? MOBILE_SCALES : DESKTOP_SCALES;

      const computeFocusPose = (idx) => {
        const doc = docs[idx];
        const scale = scales[idx % scales.length];
        const rot = DOC_ROTATIONS[idx % DOC_ROTATIONS.length];
        return {
          x: -(doc.offsetLeft + doc.offsetWidth / 2 - world.offsetWidth / 2) * scale,
          y: -(doc.offsetTop + doc.offsetHeight / 2 - world.offsetHeight / 2) * scale,
          scale,
          rotation: rot,
          rotationX: idx % 2 ? 0.7 : -0.7,
        };
      };

      const computeOverviewScale = () =>
        Math.min(
          (viewport.clientWidth / world.offsetWidth) * (isMobile ? 0.94 : 0.9),
          (viewport.clientHeight / world.offsetHeight) * (isMobile ? 0.9 : 0.84)
        );

      gsap.set(world, { ...computeFocusPose(0), transformOrigin: "50% 50%" });
      gsap.set(docs, { opacity: (idx) => (idx === 0 ? 1 : 0.44) });
      gsap.set(inspections, { opacity: (idx) => (idx === 0 ? 1 : 0) });
      gsap.set(records, {
        visibility: (idx) => (idx === 0 ? "visible" : "hidden"),
        clipPath: (idx) => (idx === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"),
      });
      if (overviewLabel) gsap.set(overviewLabel, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: isMobile ? "+=500%" : "+=620%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      docs.slice(1).forEach((_, sliceIdx) => {
        const idx = sliceIdx + 1;
        const at = 1.08 * idx;

        tl.to(
          world,
          {
            x: () => computeFocusPose(idx).x,
            y: () => computeFocusPose(idx).y,
            scale: scales[idx % scales.length],
            rotation: DOC_ROTATIONS[idx % DOC_ROTATIONS.length],
            rotationX: idx % 2 ? 0.7 : -0.7,
            duration: 1.08,
          },
          at
        )
          .to(docs, { opacity: (dIdx) => (dIdx === idx ? 1 : 0.44), duration: 0.46 }, at + 0.34)
          .to(inspections, { opacity: (dIdx) => (dIdx === idx ? 1 : 0), duration: 0.35 }, at + 0.34)
          .to(
            records[idx - 1],
            { clipPath: "inset(0% 0% 100% 0%)", y: -8, duration: 0.28 },
            at + 0.27
          )
          .set(records[idx - 1], { visibility: "hidden" }, at + 0.55)
          .set(
            records[idx],
            { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)", y: 8 },
            at + 0.3
          )
          .to(records[idx], { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.34 }, at + 0.36);
      });

      const lastIdx = docs.length - 1;
      const zoomOutAt = 5.65;

      tl.to(
        world,
        { x: 0, y: 0, scale: computeOverviewScale, rotation: 0, rotationX: 0, duration: 0.98 },
        zoomOutAt
      )
        .to(docs, { opacity: 1, duration: 0.65 }, zoomOutAt + 0.12)
        .to(inspections, { opacity: 0, duration: 0.26 }, zoomOutAt)
        .to(
          records[lastIdx],
          { clipPath: "inset(0% 0% 100% 0%)", y: -8, duration: 0.3 },
          zoomOutAt + 0.18
        )
        .set(records[lastIdx], { visibility: "hidden" }, zoomOutAt + 0.48)
        .to(overviewLabel, { opacity: 1, duration: 0.36 }, 6.23);

      if (education) tl.to(education, { opacity: 1, duration: 0.5 }, 6.2);
      if (catalog) tl.to(catalog, { visibility: "hidden", duration: 0 }, 6.17);
      if (introSpan) tl.to(introSpan, { x: isMobile ? 5 : 14, duration: 5.9 }, 0.2);

      tl.to(
        world,
        { x: isMobile ? -12 : -35, scale: () => 0.94 * computeOverviewScale(), duration: 0.55 },
        7.4
      );
    });

    return () => mm.revert();
  }, [sectionRef, language, certCount]);
}
