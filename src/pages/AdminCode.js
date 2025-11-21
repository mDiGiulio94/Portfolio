import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function AdminCode() {
  const navigate = useNavigate();

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
      d7: "",
      d8: "",
      d9: "",
      d10: "",
    },
  });

  const onSubmit = async (data) => {
    // concateniamo i caratteri
    const enteredCode =
      (data.d1 || "") +
      (data.d2 || "") +
      (data.d3 || "") +
      (data.d4 || "") +
      (data.d5 || "") +
      (data.d6 || "") +
      (data.d7 || "") +
      (data.d8 || "") +
      (data.d9 || "") +
      (data.d10 || "");

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
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <InputContainer>
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d1", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d2", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d3", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d4", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d5", { required: true, maxLength: 1 })}
          />
          <input
            maxLength={1}
            inputMode="numeric"
            {...register("d6", { required: true, maxLength: 1 })}
          />
           <input
            maxLength={1}
            inputMode="numeric"
            {...register("d7", { required: true, maxLength: 1 })}
          />
           <input
            maxLength={1}
            inputMode="numeric"
            {...register("d8", { required: true, maxLength: 1 })}
          />
           <input
            maxLength={1}
            inputMode="numeric"
            {...register("d9", { required: true, maxLength: 1, })}
          />
           <input
            maxLength={1}
            inputMode="numeric"
            {...register("d10", { required: true, maxLength: 1 })}
          />
        </InputContainer>

        <ContainerBtn>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Invio..." : "Conferma"}
          </Button>
        </ContainerBtn>
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
  max-width: 700px;
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
