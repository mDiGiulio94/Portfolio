import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { GetExperiences } from "../../API/Experience";
import useMediaQuery from "../hooks/hooks";


export default function Workplaces() {
  const [hoverCard, setHoverCard] = useState(null);

  const [experiences, setExperiences] = useState([]);
    const isHoverSupported = useMediaQuery("(hover: hover)");


  const fetchExperienes = async () => {
    const res = await GetExperiences();
    setExperiences(res);
  };

  useEffect(() => {
    fetchExperienes();
  }, []);
  

  return (
    <Container>
      {experiences.map((i, idx) => (
        <Card
          id={idx}
          name={i.workplace}
          role={i.role}
          workplace={i.workplace}
          duration={i.date}
          description={i.description}
          tecnologies={i.tecnologies}
          items={experiences}
         isDimmed={
            isHoverSupported && hoverCard !== null && hoverCard !== idx
          }
          onMouseEnter={
            isHoverSupported ? () => setHoverCard(idx) : undefined
          }
          onMouseLeave={
            isHoverSupported ? () => setHoverCard(null) : undefined
          }
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
