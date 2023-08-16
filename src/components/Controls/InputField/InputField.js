import React from "react";
import TextField from '@mui/material/TextField';
//Input component
export const InputField = ({
  name,
  label,
  value,
  error,
  handleChange,
  helperText,
  isMultiline,
  isRequired,
  ...props
}) => {

  return (
    <TextField
      className="my-3"
      name={name}
      type="text"
      label={isRequired ? label+"*" : label}
      inputProps={{ maxLength: isMultiline ? 500 : 50 }}
      variant="outlined"
      fullWidth
      value={value}
      error={error}
      helperText={error && helperText}
      onChange={handleChange}
      multiline={isMultiline}
      rows={isMultiline ? 3 : 1}
      {...props}
    />
  );
};
