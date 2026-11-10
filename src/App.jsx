import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider } from "./common/theme/ThemeContext";
import { useLenisScroll } from "./common/scroll/useLenisScroll";
import { ScrollTrigger } from "./common/motion/gsapSetup";
import { SiteNav } from "./common/components/SiteNav";
import { StarNetworkBackground } from "./common/webgl/StarNetworkBackground";
import { HeroSection } from "./sections/hero";
import { AboutSection } from "./sections/about";
import { ProjectsSection } from "./sections/projects";
import { StatementSection } from "./sections/statement";
import { ExperienceSection } from "./sections/experience";
import { ToolkitSection } from "./sections/toolkit";
import { ProofSection } from "./sections/proof";
import { CredentialsSection } from "./sections/credentials";
import { ServicesSection } from "./sections/services";
import { ContactSection } from "./sections/contact";

function PortfolioShell() {
  const { language, data } = useLanguage();
  useLenisScroll();

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [language]);

  return (
    <ThemeProvider defaultTheme={data?.theme?.defaultPreset || "cyber-agi"}>
      <StarNetworkBackground mode="auto" />
      <SiteNav />
      <main className="portfolio">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <StatementSection />
        <ExperienceSection />
        <ToolkitSection />
        <ProofSection />
        <CredentialsSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider defaultLanguage="vi">
      <PortfolioShell />
    </LanguageProvider>
  );
}
