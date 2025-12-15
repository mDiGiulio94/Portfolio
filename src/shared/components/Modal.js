import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import ContattiForm from "../form/ContattiForm";


export default function Modal({ onClose }) {
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <section className="body">
          <ContattiForm onClose={onClose}/>
        </section>
      </ModalContainer>
    </Overlay>,
    document.body
  );
}


//anche se overlay viene dichiarato come div come un container comunque è un elemento di styled, Container non accetta l'evento on click allo stesso modo di overlay quando si cerca di sviluppare una modale
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  color: var(--color-text);
  padding: 50px 80px;
  border-radius: 16px;
  position: relative;
  overflow: auto;

  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

   
  }
`;

