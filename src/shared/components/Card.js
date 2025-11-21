import React from "react";
import styled from "styled-components";
import useMediaQuery from "../hooks/hooks";

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

const isSmall = useMediaQuery("(max-width: 600px)");

  return (
    <CardContainer $small={isSmall}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={isDimmed ? "dimmed" : ""}
    >
      <section>
        <div className="info-box">
          <span>
            <h5>{duration ?? ""}</h5>
            {image && (
              <div>
                <img src={image} alt="test" />
              </div>
            )}
          </span>
          <span>
            <h5>
              {name ?? ""}
              {role ? " - " : ""}
              {role ?? ""}
            </h5>
            <p> {description ?? ""}</p>
            {tecnologies && (
              <div className="tech">
                {tecnologies?.map((tech, idx) => (
                  <span key={idx}>{tech}</span>
                ))}
              </div>
            )}
          </span>
        </div>
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
  padding: 20px;
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
    /* background: #1e293b; */
    background: var(--color-hover-card);
    box-shadow: inset 0 0 0 0 #94a3b8;
  }

  &:hover .tech > span {
    color: var(--color-text-span-hover);
    background: var(--color-span-hover);
  }

  img{
    height: 80px;
    width: 140px;
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

    .info-box {
      display: flex;
      flex-direction: ${(props) => (props.$small ? "column" : "" )};
      gap: ${(props) => (props.$small ? "10px" : "60px")};

      > span:first-child {
        width: 15%;
      }

      > span:nth-of-type(2) {
        gap: 15px;
        display: flex;
        flex-direction: column;
        width: 75%;

        p {
          box-sizing: border-box;
          overflow-wrap: break-word;
        }
      }
    }

    .tech {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 16px;

      span {
        border-radius: 18px;
        padding: 8px 15px;
        /* background: #a7f3d038; */
        /* box-shadow: inset 0 0 0 0 #a7f3d0; */
        background: var(--color-text-span-hover);
        box-shadow: inset 0 0 0 0 #2b2b2b;
        /* color: #5eead4; */
        color: var(--color-span-hover);
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
      }
    }
  }
`;
