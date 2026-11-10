import { useEffect } from "react";
import { gsap, PORTFOLIO_MEDIA_QUERIES } from "../../../common/motion/gsapSetup";

export function useHeroTimeline(sectionRef, language) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add(PORTFOLIO_MEDIA_QUERIES, (context) => {
      if (!context.conditions?.motion) return undefined;
      const isMobile = Boolean(context.conditions.mobile);

      const q = gsap.utils.selector(section);
      const speedChars = q("[data-vortex-char]");
      const speedStreaks = q("[data-hero-speed-streak]");
      const introEls = q("[data-hero-intro-fade]");

      // Set initial hidden state:
      // 1) Full Name characters primed off-screen left with high-velocity forward skew & horizontal stretch
      gsap.set(speedChars, {
        opacity: 0,
        x: (i) => -380 - i * 28,
        y: 0,
        skewX: -32,
        scaleX: 1.9,
        scaleY: 0.76,
        transformOrigin: "0% 50%",
      });

      gsap.set(speedStreaks, {
        opacity: 0,
        xPercent: -115,
        scaleX: 0.35,
        transformOrigin: "0% 50%",
      });

      // 2) Intro text (kicker + bio + CV) hidden for clean fade-in at middle-left after Full Name
      gsap.set(introEls, {
        opacity: 0,
        y: 14,
      });

      // Run high-speed rush right from the beginning ("chạy ngay từ đầu"):
      const revealTl = gsap.timeline({ delay: 0.1 });

      // Razor-sharp horizontal speed streaks shooting across from left to right
      if (speedStreaks.length) {
        revealTl.to(
          speedStreaks,
          {
            keyframes: [
              {
                opacity: 0.95,
                xPercent: -10,
                scaleX: 1.35,
                duration: 0.24,
                ease: "power3.in",
              },
              {
                opacity: 0,
                xPercent: 115,
                scaleX: 0.2,
                duration: 0.34,
                ease: "power2.out",
              },
            ],
            stagger: 0.055,
          },
          0
        );
      }

      // Step 1: Full Name ("HOANG VAN DIEU.") shoots in at supersonic speed from the left
      // with forward aerodynamic skew (-32deg -> +5deg brake -> 0deg lock)
      revealTl.to(
        speedChars,
        {
          keyframes: [
            {
              x: 10,
              opacity: 1,
              skewX: 7,
              scaleX: 0.92,
              scaleY: 1.04,
              duration: 0.34,
              ease: "power4.out",
            },
            {
              x: 0,
              skewX: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.22,
              ease: "back.out(2.2)",
            },
          ],
          stagger: 0.024,
        },
        0.02
      );

      // Step 2: Intro text fades in at middle-left AFTER Full Name finishes locking in
      revealTl.to(
        introEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.12,
          ease: "power2.out",
        },
        ">-0.04"
      );

      // Scroll-scrub parallax when scrolling down past Hero
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
            invalidateOnRefresh: true,
            refreshPriority: 10,
          },
        })
        .to(
          q(".hero-title-line--one"),
          { xPercent: isMobile ? -3 : -7, yPercent: isMobile ? -6 : -12, ease: "none" },
          0
        )
        .to(
          q(".hero-title-line--two"),
          { xPercent: isMobile ? 3 : 8, yPercent: isMobile ? 5 : 9, ease: "none" },
          0
        )
        .to(
          q(".hero-content"),
          { y: isMobile ? -12 : -32, ease: "none" },
          0.16
        )
        .to(q(".hero-grid"), { yPercent: 4, opacity: 0.18, ease: "none" }, 0.2)
        .to(q(".hero-index"), { y: -10, opacity: 0.62, ease: "none" }, 0.25);

      return () => {
        revealTl.kill();
      };
    });

    return () => mm.revert();
  }, [sectionRef, language]);
}
