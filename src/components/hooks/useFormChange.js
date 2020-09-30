import { useState } from 'react';

export default function () {
  const [formState, setFormState] = useState({});

  function handleChange({ name, value }) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [name]: value
    }));
  }

  return {
    formState,
    handleChange
  };
}
