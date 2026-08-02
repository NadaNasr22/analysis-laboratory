import { useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    console.log("CURRENT LANGUAGE:", language);

    localStorage.setItem("language", language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => {
      const newLanguage =
        currentLanguage === "en" ? "ar" : "en";

      console.log(
        "CHANGING LANGUAGE:",
        currentLanguage,
        "=>",
        newLanguage
      );

      localStorage.setItem("language", newLanguage);

      return newLanguage;
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

