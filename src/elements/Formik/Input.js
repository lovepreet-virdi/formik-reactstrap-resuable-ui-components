import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Label from "./Label";

export default function Input({ specialLabelContent = "", label, isErrorMsg, isRequired = false, name, ...rest }) {
  return (
    <>
      <Label label={label} name={name} specialLabelContent={specialLabelContent} isRequired={isRequired} />
      <Field  className="form-control" id={name} name={name} {...rest}/>
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}
