import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../shared/components/Table";

export default function AllJobs() {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    const timeout = window.requestAnimationFrame(() => setVisible(true));

    return () => window.cancelAnimationFrame(timeout);
  };

  useEffect(() => {
    handleVisible();
  }, []);

  const progetti = [
    {
      id: 1,
      anno: "2023",
      progetto: "Portfolio",
      azienda: "Personale",
      tecnologie: ["React", "Styled Components"],
      link: "www.mioprogilo.com",
    },
    {
      id: 2,
      anno: "2022",
      progetto: "E-commerce",
      azienda: "Azienda X",
      tecnologie: ["Vue", "Node.js", "MongoDB"],
      link: "www.ecommerce.com",
    },
  ];

  // rivedi i width quando popolato, fa sparire colonne in base alla dimensione schermo
  const columns = [
    {
      label: <h5>Anno</h5>,
      width: "10%",
      accessor: (progetti) => (
        <p className="specialP">{progetti.anno ?? "-"}</p>
      ),
    },
    {
      label: <h5>Progetto</h5>,
      width: "15%",
      accessor: (progetti) => <p>{progetti.progetto ?? "-"}</p>,
    },
    {
      label: <h5>Azienda</h5>,
      width: "15%",
      accessor: (progetti) => (
        <p className="specialP">{progetti.azienda ?? "-"}</p>
      ),
    },
    {
      label: <h5>Link</h5>,
      width: "15%",
      accessor: (progetti) => <p>{progetti.link ?? "-"}</p>,
    },
    {
      label: <h5>Anno</h5>,
      width: "45%",
      accessor: (progetti) =>
        progetti.tecnologie ? (
          <TechContainer>
            {progetti.tecnologie.map((tech) => (
              <span key={tech.trim()}>{tech.trim()}</span>
            ))}
          </TechContainer>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Container $visible={visible}>
      <Table columns={columns} items={progetti} />
    </Container>
  );
}

const Container = styled.div`
  padding-left: 5rem;
  padding-right: 5.7rem;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
  transition: opacity 2s ease, transform 2s ease;
`;

const TechContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;

  span {
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 18px;
    padding: 8px 15px;
    /* background: #a7f3d038; */
    box-shadow: inset 0 0 0 0 #a7f3d0;
    /* color: #5eead4; */
    background: var(--color-text-span-hover);
    color:  var(--color-span-hover);
    font-weight: 400;
  }
`;
