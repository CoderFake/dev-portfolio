import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "../../motion/gsapSetup";
import { evaluateNavSurfaceState } from "../../morph/handoffBridge";
import { scrollToTarget } from "../../scroll/useLenisScroll";

const SECTION_IDS = [
  "top",
  "about",
  "projects",
  "statement",
  "experience",
  "skills",
  "proof",
  "certificates",
  "services",
  "contact",
];

// Capture initial URL hash before any scroll listener runs
const INITIAL_URL_HASH =
  typeof window !== "undefined" ? window.location.hash : "";

function resolveSectionAnchor(sectionId) {
  if (!sectionId || sectionId === "top") return document.documentElement;
  const targetEl = document.getElementById(sectionId);
  if (!targetEl) return null;
  return targetEl.parentElement?.classList.contains("pin-spacer")
    ? targetEl.parentElement
    : targetEl;
}

function detectActiveSectionId() {
  if (typeof window === "undefined") return "top";
  if (window.scrollY < 80) return "top";

  const probeY = window.innerHeight * 0.38;
  let matchedId = "top";

  for (let i = 0; i < SECTION_IDS.length; i += 1) {
    const id = SECTION_IDS[i];
    const el = document.getElementById(id);
    if (!el) continue;
    const boxEl = el.parentElement?.classList.contains("pin-spacer")
      ? el.parentElement
      : el;
    const rect = boxEl.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      matchedId = id;
      break;
    }
    if (rect.top <= probeY) {
      matchedId = id;
    }
  }

  return matchedId;
}

export function useSiteNavController() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeHash, setActiveHash] = useState(INITIAL_URL_HASH || "#top");

  useEffect(() => {
    let rafId = 0;
    let prevScrolled = false;
    let prevDark = false;
    let prevActiveHash = INITIAL_URL_HASH || "#top";
    let isRestoringInitialHash = Boolean(
      INITIAL_URL_HASH && INITIAL_URL_HASH !== "#" && INITIAL_URL_HASH !== "#top"
    );

    if (isRestoringInitialHash && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const syncNavAndHash = () => {
      rafId = 0;
      const next = evaluateNavSurfaceState(42);
      if (next.isScrolled !== prevScrolled) {
        prevScrolled = next.isScrolled;
        setIsScrolled(next.isScrolled);
      }
      if (next.isDark !== prevDark) {
        prevDark = next.isDark;
        setIsDark(next.isDark);
      }

      if (isRestoringInitialHash) return;

      const currentSectionId = detectActiveSectionId();
      const nextHash = `#${currentSectionId}`;

      if (nextHash !== prevActiveHash) {
        prevActiveHash = nextHash;
        setActiveHash(nextHash);
      }

      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", nextHash);
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(syncNavAndHash);
      }
    };

    const jumpToHashImmediate = (hashStr) => {
      if (!hashStr || !hashStr.startsWith("#")) return;
      const sectionId = hashStr.slice(1);
      if (!sectionId || sectionId === "top") {
        if (window.portfolioLenis) {
          window.portfolioLenis.scrollTo(0, { immediate: true, force: true });
        } else {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.update();
        return;
      }

      const anchorEl = resolveSectionAnchor(sectionId);
      if (!anchorEl) return;

      const targetTop = Math.max(
        0,
        anchorEl.getBoundingClientRect().top + window.scrollY
      );

      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(targetTop, {
          immediate: true,
          force: true,
        });
      } else {
        window.scrollTo(0, targetTop);
      }
      ScrollTrigger.update();
    };

    // Restore initial URL fragment AFTER GSAP ScrollTrigger pin-spacers are created
    let restoreTimer1 = 0;
    let restoreTimer2 = 0;

    if (isRestoringInitialHash) {
      restoreTimer1 = window.setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        jumpToHashImmediate(INITIAL_URL_HASH);
      }, 60);

      restoreTimer2 = window.setTimeout(() => {
        ScrollTrigger.refresh();
        jumpToHashImmediate(INITIAL_URL_HASH);
        prevActiveHash = INITIAL_URL_HASH;
        setActiveHash(INITIAL_URL_HASH);
        window.history.replaceState(null, "", INITIAL_URL_HASH);
        isRestoringInitialHash = false;
        syncNavAndHash();
      }, 240);
    } else {
      syncNavAndHash();
    }

    const handleHashChange = () => {
      if (isRestoringInitialHash) return;
      const hash = window.location.hash;
      if (!hash) return;
      jumpToHashImmediate(hash);
      setActiveHash(hash);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (restoreTimer1) window.clearTimeout(restoreTimer1);
      if (restoreTimer2) window.clearTimeout(restoreTimer2);
    };
  }, []);

  const handleNavigate = useCallback((event, href) => {
    if (!href?.startsWith("#")) return;
    event.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#top") {
      window.history.replaceState(null, "", "#top");
      setActiveHash("#top");
      scrollToTarget(0, { duration: 1.2 });
      return;
    }

    const sectionId = href.slice(1);
    const anchorEl = resolveSectionAnchor(sectionId);
    if (!anchorEl) return;

    window.history.replaceState(null, "", href);
    setActiveHash(href);
    scrollToTarget(anchorEl, { offset: 0, duration: 1.1 });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return {
    mobileMenuOpen,
    isScrolled,
    isDark,
    activeHash,
    handleNavigate,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
