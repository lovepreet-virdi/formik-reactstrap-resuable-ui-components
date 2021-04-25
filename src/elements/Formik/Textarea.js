import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Label from "./Label";

export default function Textarea({ label, name, isErrorMsg, ...rest }) {
  return (
    <>
      <Label label={label} name={name} {...rest} />
      <Field
        className="form-control"
        as="textarea"
        id={name}
        name={name}
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}
