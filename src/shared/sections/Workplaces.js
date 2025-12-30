import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { GetExperiences } from "../../API/Experience";
import useMediaQuery from "../hooks/hooks";
import { useLanguage } from "../context/LanguageContext";


export default function Workplaces() {
  const [hoverCard, setHoverCard] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const { language, defaultLanguage } = useLanguage();
    const isHoverSupported = useMediaQuery("(hover: hover)");


  const fetchExperienes = async () => {
    const res = await GetExperiences({ language, defaultLanguage });
    setExperiences(res);
  };

  useEffect(() => {
    fetchExperienes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, defaultLanguage]);
  

  return (
    <Container>
      {experiences.map((i, idx) => (
        <Card
          key={idx}
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
