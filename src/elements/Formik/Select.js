import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Label from "./Label";
import "./styles.scss";
export default function Select({ label, name, options = [], isRequired = false, isHavingCount = false, isErrorMsg = true, ...rest }) {

  return (
    <>
      <Label isRequired={isRequired} label={label} name={name} />
      <Field
        {...rest}
        as="select"
        className="form-control single-select"
        id={name}
        name={name}

      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              { option.key}
            </option>
          );
        })}
      </Field>
      { isErrorMsg && <ErrorMessage component={TextError} name={name} />}
    </>
  );
}
