import React from "react";
import styled from "styled-components";
import it from "../utils/it.json"; // Assumiamo che it.json contenga i dati

import linkedin from "../images/icons/linkedin.svg";
import github from "../images/icons/github.svg";

export default function Welcome({ onNavigate = () => {}, activeSection }) {
  // Aggiunti URL d'esempio (dovrai aggiornarli con i tuoi link reali)
  const Images = [
    { img: linkedin, link: "https://www.linkedin.com/in/tuo-profilo", alt: "LinkedIn" },
    { img: github, link: "https://github.com/tuo-profilo", alt: "GitHub" },
  ];

  // Rimosso handleKeyDown: il tag <a> gestisce l'interazione da tastiera (Enter/Space)
  // nativamente quando ha un href.

  return (
    <Container>
      {it.welcome.map((item, idx) => {
        const navigationItems = [
          { id: "about", label: item.about },
          { id: "work", label: item.workplace },
          { id: "projects", label: item.progetti },
        ];

        return (
          <React.Fragment key={`welcome-${idx}`}>
            <section className="welcome-section">
              <h1>{item.benvenuto}</h1>
              <h3>
                {item.nome}, {item.specializzazione}
              </h3>
              <p>{item.descrizione}</p>
            </section>
            <ExternalLinks>
              {Images.map((imageItem, imageIdx) => (
                <a
                  key={`welcome-link-${imageIdx}`}
                  target="_blank"
                  href={imageItem.link} // Assicurati che l'URL sia valido
                  rel="noopener noreferrer"
                  aria-label={`Link esterno a ${imageItem.alt}`} // Accessibilità
                >
                  <img src={imageItem.img} alt={imageItem.alt} loading="lazy" />
                </a>
              ))}
            </ExternalLinks>
            <InternalLinks>
              <ul>
                {navigationItems.map((navItem) => (
                  <li key={navItem.id}>
                    <a
                      href={`#${navItem.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(navItem.id);
                      }}
                      data-active={activeSection === navItem.id}
                    >
                      <span>{navItem.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </InternalLinks>
          </React.Fragment>
        );
      })}
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

const InternalLinks = styled.section`
  ul {
    display: flex;
    gap: 60px;
    padding: 0;
    li {
      cursor: pointer;
      list-style: none;
      margin: 0 5px;
      font-weight: 400;

      /* Selettore modificato: da div a a */
      a {
        position: relative;
        padding-left: 5px;
        width: 135px;
        height: 60px;
        text-decoration: none;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        text-align: left;
        transform: rotate(-30deg) skew(25deg) translate(0, 0);
        box-shadow: -20px 20px 10px var(--color-shadow);
        color: var(--color-text);
        transition: ease-in-out 0.3s;
      }
    }
  }

  a:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 20px;
    background: #b1b1b1;
    top: 10px;
    left: -20px;
    transform: rotate(0deg) skewY(-45deg);
    background: var(--color-text);
    transition: ease-in-out 0.3s;
  }

  a:after {
    content: "";
    position: absolute;
    height: 20px;
    width: 100%;
    background: #b1b1b1;
    bottom: -20px;
    left: -10px;
    transform: rotate(0deg) skewX(-45deg);
    background: var(--color-text);
    transition: ease-in-out 0.3s;
  }

  a:hover,
  a[data-active="true"] {
    background: var(--color-text);
    color: var(--color-background);
  }

  a:hover:before,
  a[data-active="true"]:before,
  a:hover:after,
  a[data-active="true"]:after {
    background: var(--color-hover-card);
  }
`;