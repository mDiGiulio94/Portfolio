import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ProjectPost } from "../../API/ProjectApi";

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      workplace: "",
      date: "",
      description: "",
      tecnologies: [],
    },
  });

  const onReset = () => {
    reset();
  };

  const onSubmit = async (data) => {
  await  ProjectPost(data);
    onReset();
  };

  return (
    <>
      <Form noValidate>
        <div className="col">
          <label htmlFor="name">Nome</label>
          <input
            placeholder=" "
            id="name"
            {...register("name", {
              required: "Il nome è obbligatorio",
            })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div className="col">
          <label htmlFor="date">Anno</label>
          <input
            id="date"
            placeholder=" "
            {...register("date", {
              required: "La data è obbligatoria",
            })}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        </div>

        <div className="col">
          <label htmlFor="workplace">Azienda</label>
          <input
            placeholder=" "
            id="workplace"
            {...register("workplace", {
              required: "L'azienda è obbligatoria",
            })}
          />
          {errors.workplace && (
            <p style={{ color: "red" }}>{errors.workplace.message}</p>
          )}
        </div>
        <div className="col">
          <label htmlFor="tecnologies">Tecnologie</label>
          <input
            placeholder=" "
            id="tecnologies"
            {...register("tecnologies", {
              required: "Le tecnologie sono obbligatorie",
              setValueAs: (value) => {
                if (typeof value !== "string") return [];
                return value
                  .split(",")
                  .map((v) => v.trim())
                  .filter(Boolean);
              },
            })}
          />
          {errors.tecnologies && (
            <p style={{ color: "red" }}>{errors.tecnologies.message}</p>
          )}
        </div>
        <div className="col span-5">
          <label htmlFor="description">Descrizione</label>
          <textarea
            placeholder=" "
            id="description"
            {...register("description", {
              required: "La descrizione è obbligatoria",
            })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
      </Form>
      <ContainerBtn>
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Invio..." : "Pubblica"}
        </Button>
        <Button onClick={onReset}>Annula</Button>
      </ContainerBtn>
    </>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: ${({ $small }) =>
    $small ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))"};
  gap: 15px;

  .span-5 {
    grid-column: ${({ $small }) => ($small ? "span 2" : "span 4")};
  }
`;

const ContainerBtn = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
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
`;
