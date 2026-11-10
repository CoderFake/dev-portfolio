import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PORTFOLIO_MEDIA_QUERIES = {
  desktop: "(min-width: 1000px)",
  tablet: "(min-width: 701px) and (max-width: 999px)",
  mobile: "(max-width: 700px)",
  motion: "(prefers-reduced-motion: no-preference)",
};

export { gsap, ScrollTrigger };
