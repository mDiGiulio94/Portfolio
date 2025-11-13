import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  const [hoverCard, setHoverCard] = useState(null);

  const items = [
    {
      id: 1,
      nome: "Progetto 1",
      descrizione:
        "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
    },
    {
      id: 2,
      nome: "Progetto 2",
      descrizione:
        "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
    },
    {
      id: 3,
      nome: "Progetto 3",
      descrizione:
        "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
      tecnologie: ["React", "Node.js", "Firebase"],
    },
  ];

  return (
    <Container>
      {items.map((i, idx) => (
        <Card
          id={idx}
          name={i.nome}
          description={i.descrizione}
          items={items}
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
