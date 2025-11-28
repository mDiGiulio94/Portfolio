import React, { useEffect, useState } from "react";
import styled from "styled-components";


const ArrowUpIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5v14" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

/** Hook: mostra il FAB quando hai scrollato oltre `threshold` */
export function usePageHalfVisible(threshold = 0.5) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const progress = max > 0 ? doc.scrollTop / max : 0; // 0..1
        const nextVisible = progress >= threshold;

        setVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
        ticking = false;
      });
    };

    onScroll(); // inizializza stato alla mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}

export default function ScrollTop() {
  const visible = usePageHalfVisible(0.5);

  const handleScrollTop = () => {
    if (!visible) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      type="button"
      aria-label="Torna all'inizio"
      $visible={visible}
      onClick={handleScrollTop}
    >
       <ArrowUpIcon aria-hidden="true" focusable="false" />
    </Fab>
  );
}

/* ===== styled-components ===== */

const Fab = styled.button`
  position: fixed;            
  bottom: 20px;              
  right:20px;
  z-index: 9998;             

  width: 48px;               
  height: 48px;

  svg {
    width: 30px;
    height: 30px;
  }

  background:var(--color-scroll-top);        
  color: var(--color-text);                
  padding: 10px;
  font-size: xx-large;

  display: flex;              
  align-items: center;
  justify-content: center;

  border: 0;
  box-shadow: 0px 0px 2px 0px var(--color-border);

  opacity: ${(p) => (p.$visible ? 1 : 0)};             
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
   transition: opacity 300ms ease;                    
  cursor: ${(p) => (p.$visible ? "pointer" : "default")};

  &:focus-visible {
    outline: 2px solid var(--color-focus-outline);
    outline-offset: 2px;
  }
`;

