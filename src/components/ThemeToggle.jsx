// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "cda_theme"; // "light" | "dark" | "system"

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={
        "inline-flex items-center gap-2 rounded-xl border border-beige px-3 py-2 bg-surface text-ink hover:opacity-90 " +
        className
      }
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -20, opacity: 0, y: -4 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ duration: .25 }}
        className="inline-block"
      >
        {isDark ? (
          /* moon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
          </svg>
        ) : (
          /* sun */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        )}
      </motion.span>
      <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
