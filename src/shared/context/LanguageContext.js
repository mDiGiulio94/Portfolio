import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_LANGUAGE = "it";
const STORAGE_KEY = "portfolio-language";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({ language, defaultLanguage: DEFAULT_LANGUAGE, setLanguage }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};