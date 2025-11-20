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
  position: relative;
  cursor: pointer;
  padding: 0 15px;
  width: fit-content;
  height: 60px;
  text-decoration: none;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: var(--color-text);
  transition: ease-in-out 0.3s;
  box-shadow: -9px 9px 10px var(--color-shadow);

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 8px;
    background: #b1b1b1;
    top: 3px;
    left: -8px;
    transform: rotate(0deg) skewY(-45deg);
    background: var(--color-text);
    transition: ease-in-out 0.3s;
  }

  &:after {
    content: "";
    position: absolute;
    height: 6px;
    width: 100%;
    background: #b1b1b1;
    bottom: -7px;
    left: -5px;
    transform: rotate(0deg) skewX(-45deg);
    background: var(--color-text);
    transition: ease-in-out 0.3s;
  }

  &:hover {
    background: var(--color-text-span-hover);
    color: var(--color-span-hover);

    &::before {
      background-color: var(--color-hover-card);
    }

    &::after {
      background-color: var(--color-hover-card);
    }
  }
`;
