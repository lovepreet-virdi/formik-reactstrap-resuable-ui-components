import { Field, FieldArray, useField } from "formik";
import "./styles.scss";
import plusIcon from "../../assets/svgs/plus.svg";
import minusIcon from "../../assets/svgs/minus.svg";
import React from "react";
const CustomField = ({ name = "", label = "" }) => {
  const [field] = useField(name);

  let customFieldsArray = field.value;

  const MAX_FIELDS_ALLOWED = 10;
  let isMaxFields = customFieldsArray.length < MAX_FIELDS_ALLOWED;

  return (
    <>
      {customFieldsArray.length > 0 && (
        <p className="field-array-btn-text p-0">{label}</p>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) =>
          customFieldsArray && customFieldsArray.length > 0 ? (
            customFieldsArray.map((_, index) => (
              <div className="d-flex row align-items-center mb-3" key={index}>
                <div className="col">
                  <Field
                    className="form-control"
                    name={`${name}.${index}.fieldName`}
                  />
                </div>
                <div className="col">
                  <Field
                    className="form-control"
                    name={`${name}.${index}.fieldValue`}
                  />
                </div>
                <div className="col-3">
                  <button
                    type="button"
                    className="field-array-btn"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <img src={minusIcon} alt="remove" />
                  </button>
                  {customFieldsArray.length === index + 1 && isMaxFields && (
                    <button
                      type="button"
                      className="field-array-btn ml-2"
                      onClick={() =>
                        arrayHelpers.push({
                          fieldName: "",
                          fieldValue: "",
                          fieldOrder: customFieldsArray.length + 1,
                        })
                      }
                    >
                      <img src={plusIcon} alt="add" />
                    </button>
                  )}
                </div>
              </div>


            ))
          ) : (
            <>
              {isMaxFields && (
                <button
                  type="button"
                  className="field-array-btn ml-0"
                  onClick={() =>
                    arrayHelpers.push({
                      fieldName: "",
                      fieldValue: "",
                      fieldOrder: 1,
                    })
                  }
                >
                  <img src={plusIcon} alt="add" />
                </button>
              )}
              {label && <p onClick={() =>
                arrayHelpers.push({
                  fieldName: "",
                  fieldValue: "",
                  fieldOrder: 1,
                })
              } className="field-array-btn-text">{label}</p>}
            </>
          )
        }
      />
    </>
  );
};

export default CustomField;
