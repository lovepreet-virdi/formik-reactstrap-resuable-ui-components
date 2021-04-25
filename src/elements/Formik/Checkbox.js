import React from "react";
import { Label, Input } from "reactstrap";
import { Field } from "formik";


export default function Checkbox({ name = "", label = "", isErrorMsg, isLabelOnLeft = false, className = "", ...customProps }) {
    return (
        <Field
            id={name}
            name={name}
        >
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta
            }) => (
                isLabelOnLeft ? (
                    <div className="pr-2">
                        <Label for={name}>
                            {label}
                        </Label>
                        <Input {...field} {...customProps} className={`${className} form-check-left`} id={name} type="checkbox" checked={field.value} />{' '}
                    </div>) :
                    (
                        <>
                            <Input {...field} {...customProps} className={className} id={name} type="checkbox" checked={field.value} />{' '}
                            <Label for={name}>
                                {label}
                            </Label>
                        </>
                    )

            )
            }
        </Field>


    );
}