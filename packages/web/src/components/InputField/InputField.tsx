import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { FieldProps } from "formik";

const InputField: React.FC<FieldProps<any> & TextFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const { errors, touched } = form;

  const error = !!errors[field.name] && !!touched[field.name];
  const helperText = touched[field.name] && errors[field.name];

  return (
    <TextField {...field} {...props} error={error} helperText={helperText} />
  );
};

export default InputField;
