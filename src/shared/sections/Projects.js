import React, {useState} from "react";
import styled from "styled-components";
import Card from "../components/Card";

export default function Projects() {

    const [hoverCard, setHoverCard] = useState(null);

  const items = [
    {
      id: 1,
      nome: "Progetto 1",
      descrizione: "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
      
    },
    {
      id: 2,
      nome: "Progetto 2",
      descrizione: "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
      
    },
    {
      id: 3,
      nome: "Progetto 3",
      descrizione: "Compiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoroCompiti del lavoro",
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
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`;
