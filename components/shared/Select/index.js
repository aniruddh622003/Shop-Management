import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

function SelectWrapper({ name, options, sx, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...props,
    select: true,
    variant: "outlined",
    onChange: handleChange,
    error: meta.touched && meta.error,
    helperText: meta.error,
  };

  // if (meta && meta.touched && meta.error) {
  //   configSelect.error = true;
  //   configSelect.helperText = meta.error;
  // }

  return (
    <>
      <TextField {...configSelect} sx={{ ...sx, width: "100%" }}>
        {options?.map((item, pos) => {
          return (
            <MenuItem key={pos} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
}

export default SelectWrapper;
