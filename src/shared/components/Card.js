import React from "react";
import styled from "styled-components";


export default function Card({titleCard, items, onClick, image, alt, name, role, duration, description, tecnologies }) {


  return (
    <CardContainer onClick={onClick}>
      <section>
        <h2>{titleCard}:</h2>
        {name}
        {role}
        {duration}
        {description}
       <span className="tech">{tecnologies}</span> 
      </section>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 8px 10px rgba(2, 6, 23, 0.12);
  padding: 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  height: 300px;
  justify-content: center;

  &:hover {
    border-color: #1b3b6f;
  }

  h2 {
    font-size: 30px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  section{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 30px;
    font-weight: 500;

    .tech{
        display: flex;
        align-items: center;
        font-size: 16px;

    }
  }
`;
