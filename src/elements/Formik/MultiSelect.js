import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Label from "./Label";
// import LookupMultiDropDown from "Components/Elements/Graphs/LookupMultiDropDown";
import { Dropdown } from "semantic-ui-react";

export default function MultiSelect({ label, name, options, ...rest }) {
  let multiSelectOptions = options.map(option => {
    return {
      key: option.value,
      text: option.value,
      value: option.key,
    };
  });

  return (
    <>
      <Label label={label} name={name} />
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          const onChange = (e, { value }) => {
            setFieldValue(name, value);
          };
          return (
            <Dropdown
              className="form-control"
              fluid
              multiple
              selection
              options={multiSelectOptions}
              id={name}
              {...field}
              {...rest}
              // selected={value}
              onChange={onChange}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}
