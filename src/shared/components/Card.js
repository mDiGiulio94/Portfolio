import React from "react";
import styled from "styled-components";

export default function Card({
  titleCard,
  items,
  onClick,
  image,
  alt,
  name,
  role,
  duration,
  description,
  tecnologies,
}) {
  return (
    <CardContainer onClick={onClick}>
      <section>
        <div>
          {name}
          {role}
          {duration}
          {description}
        </div>
        <div className="tech">
          {tecnologies.map((tech, idx) => (
            <span key={idx}>{tech}</span>
          ))}
        </div>
      </section>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  padding: 1.75rem;
  border-radius: 22px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow: hidden;
  isolation: isolate;
  z-index: 0;

  &:hover {
    opacity: 1;
    background: linear-gradient(
        140deg,
        #0f172ad9 0%,
        #0f172a99 45%,
        #1e293b8c 100%
      ),
      #0f172abf;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
  }
  h2 {
    font-size: 30px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  section {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 30px;
    font-weight: 500;
    flex-direction: column;

    .tech {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 16px;

      span {
        border-radius: 18px;
        padding: 5px 10px;
        background: linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%);
      }
    }
  }
`;
