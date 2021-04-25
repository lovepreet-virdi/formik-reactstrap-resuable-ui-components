import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import { useField, useFormikContext } from "formik";
import TextError from "./TextError";
import Label from "./Label";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      <Label label={label} name={name} {...rest} />
      <DateView
        {...field}
        {...props}
        dateFormat="MM/dd/yyyy"
        selected={(field.value  && new Date(field.value)) || null}
        onChange={(val) => {
          if(val){
            setFieldValue(field.name, dayjs(val).format("MM/DD/YYYY"));
          }else{
            setFieldValue(field.name, null);
          }
          
        }}
        className="date-picker-input form-control"
      />
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}

export default DatePicker;
