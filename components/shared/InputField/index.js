import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const InputField = (props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error}
      helperText={meta.touched || meta.error ? meta.error : ""}
      fullWidth
      multiline
      disabled={props.disabled}
      variant={props.variant}
      color="secondary"
    />
  );
};

export default InputField;
