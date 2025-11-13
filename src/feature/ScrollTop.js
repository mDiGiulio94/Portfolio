import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
      ⮝
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

  background: #2b2b2b;        
  color: #ffd369;                
  padding: 10px;
  font-size: xx-large;

  display: flex;              
  align-items: center;
  justify-content: center;

  border: 0;
  box-shadow: 0px 0px 2px 0px rgba(255, 255, 255, 0.5);

  opacity: ${(p) => (p.$visible ? 1 : 0)};             
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
  transition: opacity 300ms ease;                     
  cursor: ${(p) => (p.$visible ? "pointer" : "default")};

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;
