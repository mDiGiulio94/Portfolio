import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Welcome from "../shared/sections/Welcome.js";
import Presentazione from "../shared/sections/Presentation.js";
import Workplaces from "../shared/sections/Workplaces.js";
import Projects from "../shared/sections/Projects.js";
import useMediaQuery from "../shared/hooks/hooks.js";

export default function Home() {
  const isSmall = useMediaQuery("(max-width: 600px)");
  const aboutRef = useRef();
  const workRef = useRef();
  const projectRef = useRef();

  const [active, setActive] = useState("about");
  // passare questa logica e css anche al componente della table, vedi se utilizzare tutti fare un contrext nel caso
  const [isRightVisible, setIsRightVisible] = useState(false);

  const handleVisible = () => {
    const timeout = window.requestAnimationFrame(() => setIsRightVisible(true));

    return () => window.cancelAnimationFrame(timeout);
  };

  const handleNavigation = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [aboutRef.current, workRef.current, projectRef.current];
    sections.filter(Boolean).forEach((section) => observer.observe(section));

    return () => {
      sections
        .filter(Boolean)
        .forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  };

  const handleNavigate = (sectionId) => {
    const refs = {
      about: aboutRef,
      work: workRef,
      projects: projectRef,
    };

    const targetRef = refs[sectionId];
    targetRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    handleVisible();
    handleNavigation();
  }, []);

  return (
    <Container $small={isSmall} $visible={isRightVisible}>
      <ContainerLeft $small={isSmall}>
        <Welcome onNavigation={handleNavigate} active={active} />
      </ContainerLeft>

      <ContainerRight $small={isSmall}>
        <Section id="about" ref={aboutRef}>
          <Presentazione />
        </Section>
        <Section id="workplace" ref={workRef}>
          <Workplaces />
        </Section>
        <Section id="project" ref={projectRef}>
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
