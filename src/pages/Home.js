import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Welcome from "../shared/sections/Welcome.js";
import Presentazione from "../shared/sections/Presentation.js";
import Workplaces from "../shared/sections/Workplaces.js";
import Projects from "../shared/sections/Projects.js";
import useMediaQuery from "../shared/hooks/hooks.js";

export default function Home() {
  const isSmall = useMediaQuery("(max-width: 600px)");

  // Lo stato è impostato su true dopo il primo render per avviare la transizione CSS.
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    // 1. Inizializza l'animazione dopo il mount.
    setIsContentVisible(true);

    // 2. Imposta l'Intersection Observer.
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
        if (intersectingEntries.length === 0) return;

        // Seleziona la sezione con la maggiore porzione visibile per evitare che l'ultimo
        // entry processato sovrascriva lo stato quando più sezioni sono contemporaneamente visibili.
        const mostVisibleEntry = intersectingEntries.reduce((maxEntry, currentEntry) =>
          currentEntry.intersectionRatio > maxEntry.intersectionRatio ? currentEntry : maxEntry
        );

        setActiveSection(mostVisibleEntry.target.id);
      },
      // Imposta una soglia inferiore per aggiornare più velocemente la sezione attiva.
      { threshold: 0.3 }
    );

    // 3. Osserva le sezioni e filtra i ref nulli.
    const sectionRefs = [aboutRef.current, workRef.current, projectsRef.current].filter(Boolean);
    sectionRefs.forEach((section) => observer.observe(section));

    // 4. Cleanup: Disconnette l'observer (invece di unobserve su ogni elemento).
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavigate = (sectionId) => {
    const refs = {
      about: aboutRef,
      work: workRef,
      projects: projectsRef,
    };

    const targetRef = refs[sectionId];
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
  transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
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