import React from "react";
import styled from "styled-components";

const STORAGE_KEY = "portfolio-color-mode";

const isBrowser = typeof window !== "undefined";

const getInitialMode = () => {
  if (!isBrowser) {
    return "dark";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return "dark";
};

const useIsomorphicLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect;

export default function ColorMode() {
  const [mode, setMode] = React.useState(getInitialMode);
  const [hasManualPreference, setHasManualPreference] = React.useState(() => {
    if (!isBrowser) {
      return false;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark";
  });

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  React.useEffect(() => {
    if (!isBrowser || !hasManualPreference) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, hasManualPreference]);

  React.useEffect(() => {
    if (!isBrowser || hasManualPreference) {
      return undefined;
    }

    if (typeof window.matchMedia !== "function") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      setMode(event.matches ? "dark" : "light");
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    if (typeof media.addListener === "function") {
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    }

    return undefined;
  }, [hasManualPreference]);

  const toggleMode = React.useCallback(() => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
    setHasManualPreference(true);
  }, []);

  const nextLabel = mode === "dark" ? "chiara" : "scura";

  return (
    <ToggleButton
      type="button"
      onClick={toggleMode}
      aria-pressed={mode === "light"}
      aria-label={`Attiva la modalità ${nextLabel}`}
      title={`Passa alla modalità ${nextLabel}`}
    >
      <span aria-hidden="true">{mode === "dark" ? "☀️" : "🌙"}</span>
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid var(--color-border, #ccc);
  background-color: var(--color-toggle-bg, rgba(15, 23, 42, 0.75));
  color: var(--color-toggle-text, inherit);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 30px var(--color-toggle-shadow, #0f172a2e);
  z-index: 1000;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 14px 34px var(--color-toggle-shadow-hover, #0f172a42);
  }

  &:focus-visible {
    outline: 3px solid #5eead499;
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
`;