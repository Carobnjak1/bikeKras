import React from "react";

function useFormValidation(initialState, authenticate) {
  const [values, setValues] = React.useState(initialState);
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      authenticate();
      setSubmitting(false);
    }
  }, [isSubmitting]);

  function handleChange(event) {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFile(event) {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.files[0],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
  }

  return { handleChange, handleSubmit, handleFile, isSubmitting, values };
}

export default useFormValidation;
