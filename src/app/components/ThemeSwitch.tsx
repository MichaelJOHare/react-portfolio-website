"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeToggle from "@/assets/icons/theme-toggle.svg";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="text-2xl w-full h-full"
      onClick={() =>
        setTheme(
          theme === "dark" || resolvedTheme === "dark" ? "light" : "dark"
        )
      }
    >
      <ThemeToggle className="w-full h-full pb-0.5" />
    </button>
  );
};
