"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSpring, animated } from "@react-spring/web";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" || resolvedTheme === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  const properties = {
    dark: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0,
    },
    light: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1,
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");
  const { r, transform, cx, cy, opacity } =
    properties[isDark ? "dark" : "light"];

  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-full w-19 justify-center rounded transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-600">
      <button
        className="flex h-full w-full justify-center"
        aria-label="Toggle Dark Mode"
        onClick={toggleTheme}
      >
        <animated.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          onClick={toggleTheme}
          className={"mt-1.5 size-7"}
          style={{
            ...svgContainerProps,
          }}
        >
          <mask id="myMask2">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <animated.circle
              r="9"
              fill="black"
              cx={maskedCircleProps.cx}
              cy={maskedCircleProps.cy}
            />
          </mask>

          <animated.circle
            fill="currentColor"
            mask="url(#myMask2)"
            cx="12"
            cy="12"
            r={centerCircleProps.r}
          />
          <animated.g stroke="currentColor" style={linesProps}>
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </animated.g>
        </animated.svg>
      </button>
    </div>
  );
};
