
import React from "react";
import { useForm } from "react-hook-form"
import styled from "styled-components"

export default function ProjectForm (){

    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({
        defaultValues:{
            name:"",
            workplace:"",
            date:"",
            description:"",
            tecnologies: [],
        }
    })

    const onSubmit = async (data) => {
        console.log("dati inviati", data)
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="col">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          {...register('name', {
            required: 'Il nome è obbligatorio',
          })}
        />
        {errors.name && (
          <p style={{ color: 'red' }}>{errors.name.message}</p>
        )}
      </div>

      <div className="col">
        <label htmlFor="date">Anno</label>
        <input
          id="date"
          {...register('date', {
            required: 'La data è obbligatoria',
          })}
        />
        {errors.date && (
          <p style={{ color: 'red' }}>{errors.date.message}</p>
        )}
      </div>

      <div className="col">
        <label htmlFor="workplace">Azienda</label>
        <input
          id="workplace"
          {...register('workplace', {
            required: 'L\'azienda è obbligatoria',
          })}
        />
        {errors.workplace && (
          <p style={{ color: 'red' }}>{errors.workplace.message}</p>
        )}
      </div>
            <div className="col">
        <label htmlFor="tecnologies">Tecnologie</label>
        <input
          id="tecnologies"
          {...register('tecnologies', {
            required: 'L\'azienda è obbligatoria',
          })}
        />
        {errors.tecnologies && (
          <p style={{ color: 'red' }}>{errors.tecnologies.message}</p>
        )}
      </div>
            <div className="col">
        <label htmlFor="descrioption">Descrizione</label>
        <textarea
          id="descrioption"
          {...register('descrioption', {
            required: 'La descrizione è obbligatoria',
          })}
        />
        {errors.description && (
          <p style={{ color: 'red' }}>{errors.description.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Invio...' : 'Pubblica'}
      </button>
        </Form>
    )
}

const Form = styled.form`

`;