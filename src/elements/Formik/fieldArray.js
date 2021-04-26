import React from 'react'
import { FieldArray, Field } from "formik";
import "./styles.scss";
import plusIcon from "../../assets/svgs/plus.svg";
import minusIcon from "../../assets/svgs/minus.svg";
const FieldArrayComponent = ({ arrayName = "", fieldPrefix = "", buttonLabel = "", data, ...props }) => {
    return (
        <FieldArray
            name={arrayName}
            render={arrayHelpers => (
                data && data.length > 0 ? (
                    data.map((item, index) => (
                        <div className="d-flex align-items-center mb-3" key={index}>

                            <Field className="form-control" name={`${fieldPrefix}.${index}`} />

                            <button
                                type="button"
                                className="field-array-btn mr-2"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                                <img src={minusIcon} alt="remove" />
                            </button>
                            <button
                                type="button"
                                className="field-array-btn"
                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                            >
                                <img src={plusIcon} alt="add" />
                            </button>

                        </div>
                    ))
                ) : (
                    <>
                        <button type="button" className="field-array-btn ml-0" onClick={() => arrayHelpers.push("1")}>
                            {/* show this when user has removed all friends from the list */}
                            <img src={plusIcon} alt="add" />
                        </button>
                        <p className="field-array-btn-text">{buttonLabel}</p>
                    </>

                )


            )}
        />
    )
};
export default FieldArrayComponent;
