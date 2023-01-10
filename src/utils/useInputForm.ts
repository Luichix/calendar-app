import React, { useState } from 'react'

/* ------------------------------- interfaces ------------------------------- */

export interface FormValues {
  [key: string]: any
}

export interface InputForm {
  id: string
  label: string
  value: string
  name: string
  placeholder: string
  type: InputType
  options?: Record<string, string>[]
}

type InputType = 'text' | 'textarea' | 'select' | 'date' | 'time'

type NewInput = Pick<InputForm, 'name' | 'placeholder' | 'label' | 'type'>

interface Form {
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

interface UseInputForm extends Form {
  inputs: InputForm[]
  addInputs: (newInput: NewInput) => void
}

/* ------------------------------ initial state ----------------------------- */

const initialStateInputs: InputForm[] = [
  {
    id: '1',
    label: 'Input 1',
    value: '',
    name: 'input-1',
    placeholder: 'Ingresa tu nombre',
    type: 'text',
  },
  {
    id: '2',
    value: '',
    label: 'Input 2',
    name: 'input-2',
    placeholder: 'Ingresa tu correo electrónico',
    type: 'text',
  },
]

/* ---------------------------------- hook ---------------------------------- */

/**
 * hook useInputForm
 * this receives an object with inputs, manage their state and return values into callback
 */

export function useInputForm(
  callback: (values: FormValues) => void,
  initialState: InputForm[] = initialStateInputs
): UseInputForm {
  /* ---------------------------------- state --------------------------------- */

  const [inputs, setInputs] = useState<InputForm[]>(initialState)

  /* ------------------------------- add inputs ------------------------------- */

  function addInputs(newInput: NewInput) {
    const nuevosInputs = [...inputs]
    nuevosInputs.push({
      id: (inputs.length + 1).toString(),
      value: '',
      ...newInput,
    })
    setInputs(nuevosInputs)
  }

  /* ---------------------------- get inputs values --------------------------- */

  function getValues(inputs: InputForm[]): FormValues {
    const values: FormValues = {}
    inputs.forEach((input) => {
      values[input.name] = input.value
    })
    return values
  }

  /* ------------------------------ handle change ----------------------------- */

  function handleChange(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    event.persist()
    const newInputs = [...inputs]
    newInputs[index].value = event.target.value
    setInputs(newInputs)
  }

  /* ------------------------------ handle submit ----------------------------- */

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = getValues(inputs)
    callback(values)
  }

  return {
    inputs,
    addInputs,
    handleChange,
    handleSubmit,
  }
}
