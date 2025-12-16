import React, { useState } from "react";
import styled from "styled-components";
//import Json
import text from "../utils/it.json";
//import Api
import sendMail from "../../API/SendEmail";

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
          <form key={index} className="formContact" onSubmit={onSubmit}>
            <section className="title">
              <span>{item.title}</span>
              <XIcon width={24} height={24} aria-hidden="true" focusable="false" onClick={onClose}/>
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
  color: var(--color-text);

  .title {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    justify-content: space-between;

    span {
      font-size: 30px;
      font-weight: 500;
      color: var(--color-text);
    }
    img {
      cursor: pointer;
      border: none;
      filter: brightness(0) invert(1);
    }
  }

  .formContact {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width: 650px;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);

    .row {
      display: flex;
      justify-content: space-between;
      .col {
        width: 45%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
          color: var(--color-text);
          font-size: 15px;
          font-weight: 300;
          background: transparent;
          transform: translateY(-40px) !important;
          padding: 0;
          margin-left: -10px;
        }

        input {
          border: 1px solid var(--color-border);
          outline: none;
          background: var(--color-hover-card);
          color: var(--color-text);
          height: 15px;
          font-size: 16px;
          padding: 10px 14px;
          border-radius: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }
        input:focus {
          border-color: var(--color-text);
          box-shadow: 0 0 0 2px rgba(255, 211, 105, 0.25);
        }
        input:hover {
          border-color: var(--color-text);
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
          color: var(--color-text);
          font-size: 15px;
          font-weight: 300;
          background: transparent;
          transform: translateY(-40px) !important;
          padding: 0;
          margin-left: -10px;
        }

        input[type="email"] {
          border: 1px solid var(--color-border);
          outline: none;
          background: var(--color-hover-card);
          color: var(--color-text);
          height: 15px;
          font-size: 16px;
          padding: 10px 14px;
          border-radius: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;

          &:focus {
            border-color: var(--color-text);
            box-shadow: 0 0 0 2px rgba(255, 211, 105, 0.25);
          }

          &:hover {
            border-color: var(--color-text);
          }
        }
        input[type="email"].invalid {
          border: 1px solid #ff6b6b;
          box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.15);
        }

        textarea {
          border: 1px solid var(--color-border);
          outline: none;
          resize: none;
          background: var(--color-hover-card);
          color: var(--color-text);
          height: 120px;
          font-size: 16px;
          padding: 12px 14px;
          border-radius: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }

        textarea:focus {
          border-color: var(--color-text);
          box-shadow: 0 0 0 2px rgba(255, 211, 105, 0.25);
        }
        textarea:hover {
          border-color: var(--color-text);
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
      padding: 14px 20px;
      margin-top: 15px;
      background-color: var(--color-text);
      color: var(--color-span-hover);
      border: 1px solid var(--color-text) !important;
      font-size: 15px;
      width: 100%;
      max-width: 300px;
      height: 100%;
      min-height: 56px;
      transition: ease-in-out 0.3s;
      font-family: "Montserrat", sans-serif;
      border-radius: 12px;
      letter-spacing: 1px;
      font-weight: 600;
    }

    button:hover {
      color: var(--color-text);
      background-color: transparent;
      box-shadow: 0 0 0 2px rgba(255, 211, 105, 0.35);
    }
  }
`;

const XIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    cursor="pointer"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6l-12 12" />
  </svg>
);
