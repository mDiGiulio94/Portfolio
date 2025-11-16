import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { GetProgetti } from "../../API/ProjectApi";

export default function Projects() {
  const navigate = useNavigate();

  const [hoverCard, setHoverCard] = useState(null);
  const [progetti, setProgetti] = useState([]);

  const fetcProjects = async () => {
    const res = await GetProgetti();
    setProgetti(res);
  };

  useEffect(() => {
    fetcProjects();
  }, []);

  return (
    <Container>

      
      {progetti.map((i, idx) => (
        <Card
          key={idx}
          id={idx}
          name={i.nome}
          description={i.descrizione}
          items={progetti}
          tecnologies={i.tecnologie}
          isDimmed={hoverCard !== null && hoverCard !== idx}
          onMouseEnter={() => setHoverCard(idx)}
          onMouseLeave={() => setHoverCard(null)}
        />
      ))}

      <Navigator onClick={() => navigate("/projects")}>
        Vai all'archivio di tutti i progetti
      </Navigator>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Navigator = styled.h5`
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
`;
