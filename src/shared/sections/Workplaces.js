import React, {useState} from "react";
import styled from "styled-components";
import Card from "../components/Card";

export default function Workplaces() {

    const [hoverCard, setHoverCard] = useState(null);

  const items = [
    {
      id: 1,
      nome: "Azienda 1",
      ruolo: "Ruolo 1",
      durata: "2 anni",
      descrizione: "Compiti del lavoro",
      tecnologie: ["React", "Node.js", "Firebase"],
    },
    {
      id: 2,
      nome: "Azienda 2",
      ruolo: "Ruolo 1",
      durata: "2 anni",
      descrizione: "Compiti del lavoro",
      tecnologie: ["React", "Node.js", "Firebase"],
    },
    {
      id: 3,
      nome: "Azienda 3",
      ruolo: "Ruolo 1",
      durata: "2 anni",
      descrizione: "Compiti del lavoro",
      tecnologie: ["React", "Node.js", "Firebase"],
    },
  ];

  return (
    <Container>
      {items.map((i, idx) => (
        <Card 
        id={idx}
        name={i.nome}
        role={i.ruolo}
        duration={i.durata}
        description={i.descrizione}
        tecnologies={i.tecnologie}
        items={items} 
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
