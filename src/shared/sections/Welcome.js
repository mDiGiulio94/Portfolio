import React from "react";
import styled from "styled-components";
import it from "../utils/it.json";

import linkedin from "../images/icons/linkedin.svg";
import github from "../images/icons/github.svg";
export default function Welcome() {
  const Images = [
    { img: linkedin, link: "", alt: "LinkedIn" },
    { img: github, link: "", alt: "github" },
  ];
  return (
    <Container>
      {it.welcome.map((item, idx) => (
        <section key={idx} className="welcome-section">
          <h1>{item.benvenuto}</h1>
          <h2>{item.nome}</h2>
          <h3>{item.specializzazione}</h3>
          <p>{item.descrizione}</p>
        </section>
      ))}
      <ExternalLinks>
        {Images.map((imageItem, idx) => (
          <a
            key={idx}
            target="_blank"
            href={imageItem.link}
            rel="noopener noreferrer"
          >
            <img src={imageItem.img} alt={imageItem.alt} loading="lazy" />
          </a>
        ))}
      </ExternalLinks>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .welcome-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const ExternalLinks = styled.section`
  display: flex;
  width: fit-content;
  gap: 10px;

  img {
    width: 28px;
    filter: brightness(0.8);
    transition: ease-in-out 0.3s;

    &:hover {
      filter: brightness(1);
    }
  }
`;
