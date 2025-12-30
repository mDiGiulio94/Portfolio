import React from "react";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Container role="group" aria-label="Language selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          data-active={language === lang.code}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;

  button {
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--color-border, #ccc);
    background: var(--color-hover-card, #f3f3f3);
    color: var(--color-text, #000);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  button[data-active="true"] {
    background: var(--color-text, #000);
    color: var(--color-background, #fff);
  }
`;
