import React from "react";
import styled from "styled-components";
import it from "../utils/it.json";

import linkedin from "../images/icons/linkedin.svg";
import github from "../images/icons/github.svg";
export default function Welcome({ onNavigate = () => {}, activeSection }) {
  const Images = [
    { img: linkedin, link: "", alt: "LinkedIn" },
    { img: github, link: "", alt: "github" },
  ];

  const handleKeyDown = (event, sectionId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNavigate(sectionId);
    }
  };

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
                  href={imageItem.link}
                  rel="noopener noreferrer"
                >
                  <img src={imageItem.img} alt={imageItem.alt} loading="lazy" />
                </a>
              ))}
            </ExternalLinks>
            <InternalLinks>
              <ul>
                {navigationItems.map((navItem) => (
                  <li key={navItem.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onNavigate(navItem.id)}
                      onKeyDown={(event) => handleKeyDown(event, navItem.id)}
                      data-active={activeSection === navItem.id}
                    >
                      <span>{navItem.label}</span>
                    </div>
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
      cursor:pointer;
      list-style: none;
      margin: 0 5px;
      font-weight: 400;
      div {
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

  div:before {
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

  div:after {
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

  div:hover,
  div[data-active="true"] {
    background: var(--color-text);
    color: var(--color-background);
  }

  div:hover:before,
  div[data-active="true"]:before,
  div:hover:after,
  div[data-active="true"]:after {
    background: var(--color-hover-card);
  }
`;