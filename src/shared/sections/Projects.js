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
          name={i.name}
          description={i.description}
          items={progetti}
          tecnologies={i.tecnologies}
          isDimmed={hoverCard !== null && hoverCard !== idx}
          onMouseEnter={() => setHoverCard(idx)}
          onMouseLeave={() => setHoverCard(null)}
        />
      ))}
      {progetti.length > 0 && (
        <Navigator onClick={() => navigate("/projects")}>
          Archivio progetti
        </Navigator>
      )}
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
  cursor: pointer;
  width: fit-content;
  border: 1px solid var(--color-border);
  padding: 10px 20px;
  border-radius: 15px;
  transition: ease-in-out 0.2s;

    &:hover {
    background: var(--color-text-span-hover);
    color: var(--color-span-hover);
  }
`;
