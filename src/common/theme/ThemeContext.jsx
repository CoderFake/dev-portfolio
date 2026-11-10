import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { THEME_ORDER, THEME_PRESETS } from "./themePresets";

const ThemeContext = createContext(null);

export function ThemeProvider({ defaultTheme = "cyber-agi", children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window === "undefined") return defaultTheme;
    const saved = window.localStorage?.getItem("dev-portfolio-theme");
    return saved && THEME_PRESETS[saved] ? saved : defaultTheme;
  });

  const themePreset = THEME_PRESETS[themeId] || THEME_PRESETS["cyber-agi"];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.portfolioTheme = themePreset.id;
    Object.entries(themePreset.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    try {
      window.localStorage?.setItem("dev-portfolio-theme", themePreset.id);
    } catch {
      // Ignore storage errors
    }
  }, [themePreset]);

  const cycleTheme = useCallback(() => {
    setThemeId((prev) => {
      const currentIdx = THEME_ORDER.indexOf(prev);
      const nextIdx = (currentIdx + 1) % THEME_ORDER.length;
      return THEME_ORDER[nextIdx];
    });
  }, []);

  const value = useMemo(
    () => ({
      themeId: themePreset.id,
      themePreset,
      presets: THEME_PRESETS,
      themeOrder: THEME_ORDER,
      setThemeId,
      cycleTheme,
    }),
    [themePreset, cycleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
