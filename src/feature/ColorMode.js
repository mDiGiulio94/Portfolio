import React from "react";
import styled from "styled-components";

const STORAGE_KEY = "portfolio-color-mode";
const isBrowser = typeof window !== "undefined";

/**
 * Determina il tema iniziale seguendo questo ordine:
 * 1. preferenza salvata in localStorage
 * 2. preferenza del sistema operativo
 * 3. fallback al tema scuro
 */
const getInitialMode = () => {
  if (!isBrowser) {
    return "dark";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  if (window.matchMedia?.("(prefers-color-scheme: light)")?.matches) {
    return "light";
  }

  return "dark";
};

export default function ColorMode() {
  // Stato principale che contiene il tema attivo ("light" o "dark").
  const [mode, setMode] = React.useState(getInitialMode);

  React.useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = mode;
    root.style.colorScheme = mode;

    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // Alterna tra i due temi e aggiorna lo stato.
  const toggleMode = React.useCallback(() => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
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
  box-shadow: 0 10px 30px var(--color-toggle-shadow, rgba(15, 23, 42, 0.18));
  z-index: 1000;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 14px 34px var(--color-toggle-shadow-hover, rgba(15, 23, 42, 0.26));
  }

  &:focus-visible {
    outline: 3px solid rgba(94, 234, 212, 0.6);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
`;
