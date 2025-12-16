import React, { useState } from "react";
import styled from "styled-components";
import it from "../utils/it.json";
import Modal from "../components/Modal";

export default function Presentation() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        {it.presentazione.map((item, idx) => (
          <section key={idx} className="presentation-section">
            <p>{item.infoPersonali}</p>
            <p>{item.occupazionePresente}</p>
            <p>{item.spareTime}</p>
          </section>
        ))}
        <Navigator onClick={toggleModal}>Contatta</Navigator>
      </Container>
      {showModal && <Modal onClose={toggleModal} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .presentation-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }
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
  left: 28px;

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
