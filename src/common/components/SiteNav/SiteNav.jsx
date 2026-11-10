import { Menu, Sparkles, X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../theme/ThemeContext";
import { useSiteNavController } from "./useSiteNavController";

export function SiteNav() {
  const { language, setLanguage, data } = useLanguage();
  const { themePreset, cycleTheme } = useTheme();
  const { meta, navbar } = data;
  const {
    mobileMenuOpen,
    isScrolled,
    isDark,
    activeHash,
    handleNavigate,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSiteNavController();

  const normalizedNavHash =
    activeHash === "#statement"
      ? "#projects"
      : activeHash === "#proof"
        ? "#skills"
        : activeHash;

  const surfaceClass = isScrolled
    ? isDark
      ? "border-b border-white/10 bg-[#050814]/82 backdrop-blur-xl"
      : "border-b border-black/10 bg-white/80 backdrop-blur-xl"
    : "bg-transparent";

  const themeLabel = language === "vi" ? themePreset.labelVi : themePreset.labelEn;

  return (
    <header
      data-nav-theme={isDark ? "dark" : "light"}
      className={`site-nav fixed inset-x-0 top-0 z-50 w-full px-5 py-4 transition-colors duration-300 ease-out sm:px-8 ${surfaceClass}`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="#top"
          onClick={(e) => handleNavigate(e, "#top")}
          className={`group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight ${
            isDark ? "text-white" : "text-[#070b19]"
          }`}
          aria-label={navbar.homeAria}
        >
          <img
            src={meta.logoSrc}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-[9px] ring-1 ring-white/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
          />
          <span className={`tracking-tight ${isDark ? "text-white" : "text-[#070b19]"}`}>
            {meta.brandName}
            <span className="site-brand-dot">{meta.brandDot}</span>
          </span>
        </a>

        <div className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {navbar.links.map((item) => {
            const isExternal = item.href.startsWith("http");
            const isActive = !isExternal && normalizedNavHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavigate(e, item.href)}
                aria-current={isActive ? "location" : undefined}
                className={`text-[10px] font-semibold tracking-wider uppercase transition ${
                  isActive
                    ? "!text-[var(--accent-primary)]"
                    : isDark
                      ? "text-white/75 hover:!text-[var(--accent-primary)]"
                      : "text-[#3a435e] hover:!text-[var(--accent-solid)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Interactive CGI / WebGL Theme Switcher */}
          <button
            type="button"
            onClick={cycleTheme}
            title={
              language === "vi"
                ? "Đổi chủ đề màu WebGL / AGI"
                : "Switch WebGL / AGI Color Theme"
            }
            className={`theme-switcher-pill cursor-pointer inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase transition ${
              isDark
                ? "border-white/20 bg-white/5 text-white hover:border-[var(--accent-primary)] hover:bg-white/10"
                : "border-black/15 bg-black/5 text-[#070b19] hover:border-[var(--accent-solid)]"
            }`}
          >
            <span
              className="size-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${themePreset.swatch}, ${themePreset.swatchSecondary})`,
                boxShadow: `0 0 8px ${themePreset.swatch}`,
              }}
            />
            <span className="hidden sm:inline">{themeLabel}</span>
            <Sparkles size={10} className="opacity-80" />
          </button>

          <div
            className={`flex items-center rounded-full border p-0.5 text-[10px] font-bold ${
              isDark ? "border-white/25 bg-white/5" : "border-black/15 bg-black/5"
            }`}
            aria-label={navbar.languageAria}
          >
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition ${
                language === "vi"
                  ? "site-lang-active rounded-full"
                  : isDark
                    ? "text-white/65 hover:text-white"
                    : "text-[#4a5578] hover:text-[#070b19]"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition ${
                language === "en"
                  ? "site-lang-active rounded-full"
                  : isDark
                    ? "text-white/65 hover:text-white"
                    : "text-[#4a5578] hover:text-[#070b19]"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={navbar.contactHref}
            className="site-cta-pill hidden rounded-full px-4 py-2 text-[10px] font-bold tracking-wider uppercase transition sm:block"
          >
            {navbar.contactCta}
          </a>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className={`grid size-9 place-items-center transition lg:hidden ${
              isDark ? "text-white" : "text-[#070b19]"
            }`}
            aria-label={navbar.toggleMenuAria}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-white/15 bg-[#070b19]/95 p-4 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
          {navbar.links.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  handleNavigate(e, item.href);
                  if (!e.defaultPrevented) closeMobileMenu();
                }}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-[var(--accent-primary)]"
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
