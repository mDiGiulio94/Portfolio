import React, { useEffect, useState } from "react";
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

  const handleVisible = () => {
    const timeout = window.requestAnimationFrame(() => setIsRightVisible(true));

    return () => window.cancelAnimationFrame(timeout);
  };

  useEffect(() => {
    handleVisible();
  }, []);

  return (
    <Container $small={isSmall} $visible={isRightVisible}>
      <ContainerLeft $small={isSmall}>
        <Welcome />
      </ContainerLeft>

      <ContainerRight $small={isSmall} >
        <Presentazione />
        <Workplaces />
        <Projects />
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
