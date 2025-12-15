import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Welcome from "../shared/sections/Welcome.js";
import Presentazione from "../shared/sections/Presentation.js";
import Workplaces from "../shared/sections/Workplaces.js";
import Projects from "../shared/sections/Projects.js";
import useMediaQuery from "../shared/hooks/hooks.js";

export default function Home() {
  const isSmall = useMediaQuery("(max-width: 1200px)");

  // Lo stato è impostato su true dopo il primo render per avviare la transizione CSS.
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);

useEffect(() => {
    setIsContentVisible(true);

    const getSections = () => [aboutRef.current, workRef.current, projectsRef.current].filter(Boolean);

    const updateActiveSection = () => {
      const sections = getSections();
      if (sections.length === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let closestSectionId = null;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isVisible) return;

        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestSectionId = section.id;
        }
      });

      if (closestSectionId) {
        setActiveSection((prev) => (prev === closestSectionId ? prev : closestSectionId));
      }
    };

    // Evita di eseguire updateActiveSection per ogni evento usando requestAnimationFrame.
    let animationFrame = null;
    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const handleNavigate = (sectionId) => {
    const refs = {
      about: aboutRef,
      work: workRef,
      projects: projectsRef,
    };

    const targetRef = refs[sectionId];
    setActiveSection(sectionId);
    // Seleziona l'elemento e naviga
    targetRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container $small={isSmall} $visible={isContentVisible}>
      <ContainerLeft $small={isSmall}>
        <Welcome onNavigate={handleNavigate} activeSection={activeSection} />
      </ContainerLeft>

      <ContainerRight $small={isSmall}>
        <Section id="about" ref={aboutRef}>
          <Presentazione />
        </Section>
        <Section id="work" ref={workRef}>
          <Workplaces />
        </Section>
        <Section id="projects" ref={projectsRef}>
          <Projects />
        </Section>
      </ContainerRight>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$small ? "column" : "row")};
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  gap: ${(props) => (props.$small ? "60px" : "16px")};
  align-items: flex-start;
  /* Utilizza il nuovo stato isContentVisible */
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? "none" : "12px")});
  transition: opacity 2s ease, transform 2s ease;

  /* Rimuovi la barra di scorrimento su tutti i browser */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ContainerLeft = styled.div`
  width: ${(props) => (props.$small ? "100%" : "50%")};
  top: 0;
  position: ${(props) => (props.$small ? "" : "sticky")};
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: ${(props) => (props.$small ? "100%" : "50%")};
`;

const Section = styled.section`
`;