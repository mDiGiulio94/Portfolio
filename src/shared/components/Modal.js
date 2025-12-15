import React from "react";
import styled from "styled-components";
import X from "../images/icons/Xchiusura.svg";
import ContattiForm from "../form/ContattiForm";


export default function Modal({
  onClose,

}) {

  return (
    <>
     <Overlay onClick={onClose}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <section className="head">
              <img onClick={onClose} loading="lazy" src={X} alt="" />
            </section>
            <section className="body">
                <ContattiForm />
            </section>
          </ModalContainer>
        </Overlay>
    </>
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
  background: white;
  padding: 70px 80px;
  border-radius: 8px;
  position: relative;
  max-height: calc(655px - 160px);
  width: calc(450px - 140px);
  overflow: auto;

  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */

  .head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 20px;
    right: 30px;

    img {
      cursor: pointer;
      border: none;
      filter: invert(1);
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

   
  }
`;

