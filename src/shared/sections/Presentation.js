import React from "react";
import styled from "styled-components";
import it from "../utils/it.json";

export default function Presentation() {

  return (
    <Container>
      {it.presentazione.map((item, idx) => (
        <section key={idx} className="presentation-section">
          <p>{item.infoPersonali}</p>
           <p>{item.occupazionePresente}</p>
            <p>{item.spareTime}</p>
        </section>
      ))}
    </Container>
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
