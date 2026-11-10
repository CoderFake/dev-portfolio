import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../motion/gsapSetup";

export function scrollToTarget(target, options = {}) {
  if (typeof window === "undefined") return;

  if (window.portfolioLenis) {
    window.portfolioLenis.scrollTo(target, options);
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const el =
    typeof target === "string"
      ? target === "#top"
        ? document.documentElement
        : document.querySelector(target)
      : target;

  el?.scrollIntoView({ behavior: "smooth" });
}

export function useLenisScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      anchors: { offset: -76 },
    });

    const onScroll = () => ScrollTrigger.update();
    const onTick = (time) => lenis.raf(time * 1000);

    window.portfolioLenis = lenis;
    lenis.on("scroll", onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      if (window.portfolioLenis === lenis) {
        window.portfolioLenis = undefined;
      }
    };
  }, []);
}
