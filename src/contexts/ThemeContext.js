import { createContext, useEffect, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const getInitialTheme = (_) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme");
      if (typeof storedPrefs === "string") {
        return storedPrefs;
      }

      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }

    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  // const [isDarkMode, setDarkMode] = useState(getInitialTheme);
  // const handleAppThemeChange = useCallback(() => {
  //   setDarkMode(!isDarkMode);
  // }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeConsumer = ThemeContext.Consumer;

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
