import React from "react";
import styled from "styled-components";
import Table from "../shared/components/Table";

export default function AllJobs() {
  const progetti = [
    {
      id: 1,
      anno: "2023",
      progetto: "Portfolio",
      azienda: "Personale",
      tecnologie: "React, Styled Components",
      link: "www.mioprogilo.com",
    },
    {
      id: 2,
      anno: "2022",
      progetto: "E-commerce",
      azienda: "Azienda X",
      tecnologie: "Vue, Node.js, MongoDB",
      link: "www.ecommerce.com",
    },
  ];

  // rivedi i width quando popolato
  const columns = [
    {
      label: "Anno",
      width: "10%",
      accessor: (progetti) => progetti.anno ?? "-",
    },
    {
      label: "Progetto",
      width: "15%",
      accessor: (progetti) => progetti.progetto ?? "-",
    },
    {
      label: "Azienda",
      width: "15%",
      accessor: (progetti) => progetti.azienda ?? "-",
    },
    {
      label: "Link",
      width: "15%",
      accessor: (progetti) => progetti.link ?? "-",
    },
    {
      label: "Tecnologie",
      width: "45%",
      accessor: (progetti) => progetti.tecnologie ?? "-",
    },
  ];

  return <Table columns={columns} items={progetti} />;
}
