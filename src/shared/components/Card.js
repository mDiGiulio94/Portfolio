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
  onMouseEnter,
  onMouseLeave,
  isDimmed,
}) {
  return (
    <CardContainer
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={isDimmed ? "dimmed" : ""}
    >
      <section>
        <div>
          {name ?? ""}
          {role ?? ""}
          {duration ?? ""}
          {description ?? ""}
        </div>
        {tecnologies && (
          <div className="tech">
            {tecnologies?.map((tech, idx) => (
              <span key={idx}>{tech}</span>
            ))}
          </div>
        )}
      </section>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: calc(100% - 23px);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  max-height: 250px;
  height: fit-content;
  justify-content: center;
  opacity: 1;

  &.dimmed {
    opacity: 0.3;
  }

  &:hover {
    background: #1e293b;
    box-shadow: inset 0 0 0 0 #94a3b8;
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
    width: 100%;
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
        padding: 8px 15px;
        background: #a7f3d038;
        box-shadow: inset 0 0 0 0 #a7f3d0;
        color: #5eead4;
      }
    }
  }
`;
