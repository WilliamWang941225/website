import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "website-theme";

function getInitialTheme(): Theme {
  const appliedTheme = document.documentElement.dataset.theme;

  if (appliedTheme === "light" || appliedTheme === "dark") {
    return appliedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === "dark";
  const nextTheme: Theme = isDark ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // The selected theme still works when browser storage is unavailable.
    }
  }, [theme]);

  return (
    <div className="theme-toggle-wrapper">
      <button
        type="button"
        className="theme-toggle"
        aria-label={`Switch to ${nextTheme} theme`}
        aria-pressed={isDark}
        title={`Switch to ${nextTheme} theme`}
        onClick={() => setTheme(nextTheme)}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {isDark ? "☀" : "◐"}
        </span>
        <span className="theme-toggle-label">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      </button>
    </div>
  );
}
