import { useEffect, useState } from "react";

const THEMES = ["noir", "newsprint"];

/**
 * useTheme — two B&W themes: "noir" (black bg / white details, default)
 * and "newsprint" (white bg / black details). Persists to localStorage.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("pf-theme");
      return saved === "newsprint" ? "newsprint" : "noir";
    } catch {
      return "noir";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-noir", "theme-newsprint", "theme-retro", "theme-dark", "theme-light", "theme-neon");
    root.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem("pf-theme", theme);
    } catch {
      /* private mode */
    }
  }, [theme]);

  return { theme, setTheme };
}
