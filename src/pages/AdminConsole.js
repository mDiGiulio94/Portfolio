import React, { useState, useEffect } from "react";
import styled from "styled-components";
import it from "../shared/utils/it.json";
import ProjectForm from "../shared/form/ProjectForm";
import ExperienceForm from "../shared/form/ExperienceForm";

export default function AdminConsole() {
  const [projectM, setProjectM] = useState(true);
  const [experienceM, setExperienceM] = useState(false);

  const [visible, setVisible] = useState(false);

//   aggiungi altre condizioni per evitare che premendo sullo stesso input non cambi il booleano
  const handleManagerOption = () => {
    setProjectM((prev) => !prev);
    setExperienceM((prev) => !prev);
  };

  const handleVisible = () => {
    const timeout = window.requestAnimationFrame(() => setVisible(true));

    return () => window.cancelAnimationFrame(timeout);
  };
  useEffect(() => {
    handleVisible();
  }, []);

  return (
    <Container $visible={visible}>
      {it["admin-panel"].map((item) => (
        <>
          <h1>{item.titolo}</h1>
          <div className="service-panel">
            <p onClick={handleManagerOption}>{item.progetti}</p>
            <p onClick={handleManagerOption}>{item.esperienze}</p>
          </div>
          <ServiceContainer>
            {projectM ? <ProjectForm /> : <ExperienceForm />}
          </ServiceContainer>
        </>
      ))}
    </Container>
  );
}

const Container = styled.section`
  color: var(--color-text);
  margin: auto;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
  transition: opacity 2s ease, transform 2s ease;

  .service-panel {
    display: flex;
    gap: 30px;
    align-items: center;

    p {
      border: 1px solid var(--color-border);
      padding: 10px 20px;
      border-radius: 15px;
      cursor: pointer;
      transition: ease-in-out 0.2s;

      &:hover {
        background: var(--color-text-span-hover);
        color: var(--color-span-hover);
      }
    }
  }
`;

const ServiceContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 20px;
  border: 1px solid var(--color-border);
  width: 100%;
  border-radius: 10px;
`;
