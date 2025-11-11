import React from "react";
import styled from "styled-components";
import Table from "../shared/components/Table";

export default function AllJobs(){
    
    const columns = [
  {
    label: "Nome",
    width: "25%",
    accessor: (utente) => utente.nomeUtente ?? "-",
  },
  {
    label: "Cognome",
    width: "25%",
    accessor: (utente) => utente.cognomeUtente ?? "-",
  },
  {
    label: "Email",
    width: "25%",
    accessor: (utente) => utente.email ?? "-",
  },
  {
    label: "Task",
    width: "25%",
    accessor: (utente) => utente.task ?? "-",
  },
];
    
    return(
        <Table 
        columns={columns}
        />
    )
}