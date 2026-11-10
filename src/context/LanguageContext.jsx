import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import viLocale from "../locales/vi.json";
import enLocale from "../locales/en.json";

const LOCALES = {
  vi: viLocale,
  en: enLocale,
};

const STORAGE_KEY = "dev-portfolio-language";

const LanguageContext = createContext({
  language: "vi",
  data: viLocale,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children, defaultLanguage = "vi" }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "vi" || saved === "en" ? saved : defaultLanguage;
  });

  const setLanguage = useCallback((nextLang) => {
    if (nextLang !== "vi" && nextLang !== "en") return;
    setLanguageState(nextLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === "vi" ? "en" : "vi";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const data = LOCALES[language] ?? viLocale;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = data.meta?.lang || language;
    if (data.meta?.title) {
      document.title = data.meta.title;
    }
  }, [language, data]);

  const value = useMemo(
    () => ({
      language,
      data,
      setLanguage,
      toggleLanguage,
    }),
    [language, data, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
