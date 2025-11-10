import React from "react";
import styled from "styled-components";
import Welcome from "../shared/sections/Welcome.js";
import Presentazione from "../shared/sections/Presentation.js";

export default function Home() {
  return (
    <Container>
      <ContainerLeft>
        <Welcome />
      </ContainerLeft>

      <ContainerRight>
        <Presentazione />
      </ContainerRight>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  gap: 16px
`;

const ContainerLeft = styled.div`
  border: 1px solid #fff;
  width: 50%;
  top: 0;
  position: sticky;
`;

const ContainerRight = styled.div`
  border: 1px solid #fff;
  width: 50%;
  overflow-y: auto;
`;
