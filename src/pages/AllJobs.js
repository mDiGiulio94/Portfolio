import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../shared/components/Table";
import { GetProgetti } from "../API/ProjectApi";
import useMediaQuery from "../shared/hooks/hooks";
import { useNavigate } from "react-router-dom";

export default function AllJobs() {
  const isNormal = useMediaQuery("(max-width: 1200px)");
  const isSmall = useMediaQuery("(max-width: 992px)");
  const isVerySmall = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [progetti, setProgetti] = useState([]);

  const handleVisible = () => {
    const timeout = window.requestAnimationFrame(() => setVisible(true));

    return () => window.cancelAnimationFrame(timeout);
  };

  const fetchProjects = async () => {
    const res = await GetProgetti();
    setProgetti(res);
  };

  useEffect(() => {
    handleVisible();
    fetchProjects();
  }, []);

  // tutte le colonne di base
  const baseColumns = [
    {
      label: <h5>Anno</h5>,
      width: "10%",
      accessor: (progetti) => (
        <p className="specialP">{progetti.date ?? "-"}</p>
      ),
    },
    {
      label: <h5>Progetto</h5>,
      width: "15%",
      accessor: (progetti) => <p>{progetti.name ?? "-"}</p>,
    },
    {
      label: <h5>Azienda</h5>,
      width: "15%",
      accessor: (progetti) => (
        <p className="specialP">{progetti.workplace ?? "-"}</p>
      ),
    },
    {
      label: <h5>Link</h5>,
      width: "15%",
      accessor: (progetti) => <p>{progetti.link ?? "-"}</p>,
    },
    {
      label: <h5>Tecnologie</h5>,
      width: "45%",
      accessor: (progetti) =>
        progetti.tecnologies ? (
          <TechContainer>
            {progetti.tecnologies.map((tech) => ( 
              <span key={tech.trim()}>{tech.trim()}</span>
            ))}
          </TechContainer>
        ) : (
          "-"
        ),
    },
  ];

  // filtro le colonne in base alla larghezza
  const columns = baseColumns.filter((col, index) => {
    // index: 0=Anno, 1=Progetto, 2=Azienda, 3=Link, 4=Tecnologie

    // viewport molto piccolo: tengo solo Anno + Progetto
    if (isVerySmall && index >= 2) return false;

    // viewport piccolo: tolgo Link + Tecnologie
    if (isSmall && index >= 3) return false;

    // viewport "normal" (solo più stretto di 1200): tolgo solo Tecnologie
    if (isNormal && index === 4) return false;

    return true;
  });

  return (
    <Container $visible={visible} $small={isNormal}>
      <div className="presentation">
        <span  onClick={() => navigate("/")}>🡠 Home</span>
        <h1>Tutti i progetti</h1>
      </div>
      <Table columns={columns} items={progetti} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-left: ${(props) => (props.$small ? "0" : "5rem")};
  padding-right: ${(props) => (props.$small ? "0" : "5.7rem")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
  transition: opacity 2s ease, transform 2s ease;

  .presentation {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;

    span {
      width: fit-content;
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const TechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    box-shadow: inset 0 0 0 0 #a7f3d0;
    background: var(--color-text-span-hover);
    color: var(--color-span-hover);
    font-weight: 400;
  }
`;
