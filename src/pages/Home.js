import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Welcome from "../shared/sections/Welcome.js";
import Presentazione from "../shared/sections/Presentation.js";
import Workplaces from "../shared/sections/Workplaces.js";
import Projects from "../shared/sections/Projects.js";
import useMediaQuery from "../shared/hooks/hooks.js";

export default function Home() {
  const isSmall = useMediaQuery("(max-width: 600px)");

  // passare questa logica e css anche al componente della table, vedi se utilizzare tutti fare un contrext nel caso
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const timeout = window.requestAnimationFrame(() => setIsRightVisible(true));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [aboutRef.current, workRef.current, projectsRef.current];
    sections.filter(Boolean).forEach((section) => observer.observe(section));

    return () => {
      window.cancelAnimationFrame(timeout);
      sections.filter(Boolean).forEach((section) => observer.unobserve(section));
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
    targetRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Container $small={isSmall} $visible={isRightVisible}>
      <ContainerLeft $small={isSmall}>
        <Welcome onNavigate={handleNavigate} activeSection={activeSection} />
      </ContainerLeft>

      <ContainerRight $small={isSmall} >
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
  gap: 16px;
  align-items: flex-start;
   opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
  transition: opacity 2s ease, transform 2s ease;

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
  scroll-margin-top: 100px;
`;