import React, { useState } from "react";
import styled from "styled-components";
//import Json
import text from "../utils/it.json";
//import Api
import sendMail from "../../API/SendEmail";
import X from "../images/icons/Xchiusura.svg";

export default function ContattiForm({ onClose }) {
  //Campi del form
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    messaggio: "",
  });
  //Campi touched
  const [touched, setTouched] = useState({
    email: false,
  });

  //Gestione touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //Gestione del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.reportValidity()) {
      return;
    }
    sendMail(formData);
    setTouched(false);
    setTimeout(() => {
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        messaggio: "",
      });
    }, 500);
  };
  return (
    <>
      <FormContatti>
        {text.itemForm.map((item, index) => (
          <>
            <form className="formContact" onSubmit={onSubmit}>
              <section key={index} className="title">
                <span>{item.title}</span>
                <img onClick={onClose} loading="lazy" src={X} alt="" />
              </section>
              <div className="row">
                <div className="col">
                  <label>{item.firstName}</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                <div className="col">
                  <label>{item.lastName}</label>
                  <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="secondRow">
                <div className="col">
                  <label>{item.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    className={
                      touched.email &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "invalid"
                        : ""
                    }
                  />
                </div>
                <div className="col">
                  <label>{item.message}</label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="btn-container">
                <button type="submit">INVIA</button>
              </div>
            </form>
          </>
        ))}
      </FormContatti>
    </>
  );
}

const FormContatti = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    justify-content: space-between;

    span {
      font-size: 30px;
      font-weight: 500;
      color: #2e4942;
    }
    img {
      cursor: pointer;
      border: none;
      filter: invert(1);
    }
  }

  .formContact {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width: 650px;

    .row {
      display: flex;
      justify-content: space-between;
      .col {
        width: 45%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
          color: #b87e58;
          font-size: 15px;
          font-weight: 300;
        }

        input {
          border: none;
          border-bottom: 1px solid #000000;
          outline: none;
          background: transparent;
          height: 23px;
          font-size: 16px;
          padding: 3px 3px 4px 0;
        }
        input:focus {
          border-bottom: 2px solid #000000;
          padding-bottom: 3px;
        }
        input:hover {
          border-bottom: 2px solid #000000;
          padding-bottom: 3px;
        }
      }
    }

    .secondRow {
      display: flex;
      gap: 50px;
      flex-direction: column;
      .col {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        label {
          color: #b87e58;
          font-size: 15px;
          font-weight: 300;
        }

        input[type="email"] {
          border: none;
          border-bottom: 1px solid #000000;
          outline: none;
          background: transparent;
          height: 23px;
          font-size: 16px;
          padding: 3px 3px 4px 0;

          &:focus {
            border-bottom: 2px solid #000000;
            padding-bottom: 3px;
          }

          &:hover {
            border-bottom: 2px solid #000000;
            padding-bottom: 3px;
          }
        }
        input[type="email"].invalid {
          border-bottom: 2px solid red;
          padding-bottom: 3px;
        }

        textarea {
          border: none;
          border-bottom: 1px solid #000000;
          outline: none;
          resize: none;
          background: transparent;
          height: 50px;
          font-size: 16px;
          padding: 3px 3px 4px 0;
        }

        textarea:focus {
          border-bottom: 2px solid #000000;
          padding-bottom: 3px;
        }
        textarea:hover {
          border-bottom: 2px solid #000000;
          padding-bottom: 3px;
        }
      }
    }
  }

  .btn-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0 !important;

    button {
      padding: 10px 20px;
      margin-top: 15px;
      background-color: transparent;
      color: #b87e58;
      border: 1px solid #b87e58 !important;
      font-size: 15px;
      width: 100%;
      max-width: 300px;
      height: 100%;
      min-height: 60px;
      transition: ease-in-out 0.4s;
      font-family: "Montserrat", sans-serif;
    }

    button:hover {
      color: #ffffff;
      background-color: #b87e58;
    }
  }
`;
