import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function AdminCode() {
  const navigate = useNavigate();
  const SECRET_CODE = process.env.REACT_APP_SECRET_CODE || "";

  if (!SECRET_CODE) {
    console.error("REACT_APP_SECRET_CODE non è definito nelle env");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
      d6: "",
    },
  });

  const onSubmit = async (data) => {
    if (!SECRET_CODE) {
      alert("Configura la variabile REACT_APP_SECRET_CODE nel file .env");
      return;
    }

    // concateniamo i caratteri
    const enteredCode =
      (data.d1 || "") +
      (data.d2 || "") +
      (data.d3 || "") +
      (data.d4 || "") +
      (data.d5 || "") +
      (data.d6 || "");

    // legge il codice segreto dall'env (CRA)
    const SECRET_CODE = process.env.REACT_APP_SECRET_CODE;

    if (!SECRET_CODE) {
      console.error("REACT_APP_SECRET_CODE non è definito nelle env");
      return;
    }

if (enteredCode === SECRET_CODE) {
      // salviamo in localStorage sotto chiave "token"
      localStorage.setItem("token", enteredCode);

      // opzionale: redirect al pannello admin
      navigate("/control-panel");
    } else {
      // qui puoi gestire errore come vuoi
      alert("Codice non valido");
    }

    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d1", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d2", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d3", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d4", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d5", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            disabled={!SECRET_CODE}
            {...register("d6", { required: true, maxLength: 1 })}
          />
        </InputContainer>

        <ContainerBtn>
          <Button type="submit" disabled={isSubmitting || !SECRET_CODE}>
            {isSubmitting ? "Invio..." : "Conferma"}
          </Button>
        </ContainerBtn>

        {!SECRET_CODE ? (
          <MissingEnv>
            Imposta la variabile <code>REACT_APP_SECRET_CODE</code> nel file <code>.env</code>{" "}
            e riavvia l'applicazione per abilitare il form.
          </MissingEnv>
        ) : null}
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  border: 1px solid #ccc;
  height: 150px;
  padding: 20px;
  margin: auto;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: column;

  input {
    width: 50px;
    height: 50px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 24px;
    text-align: center;
    line-height: 50px;
    padding: 0;
    outline: none;
    background: var(--color-background);
    color: var(--color-text);
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const ContainerBtn = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  color: var(--color-text);
  background: var(--color-background);
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: ease-in-out 0.2s;
  cursor: pointer;
  position: relative;
  top: 0;
  font-size: 15px;

  &:hover {
    color: var(--color-background);
    background: var(--color-text);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MissingEnv = styled.p`
  margin: 0;
  font-size: 14px;
  color: #e53935;
  text-align: center;
`;
