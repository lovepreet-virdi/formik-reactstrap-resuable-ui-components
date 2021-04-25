import React from "react";
import "./styles.scss";
export default function Label({ label, name, isRequired = false, specialLabelContent = "", ...props }) {

  return <>{label && <><label className={isRequired ? "required-field" : ""} htmlFor={name}>{label}</label>{specialLabelContent ? <span className="label-special-text">{specialLabelContent}</span> : ''}</>}</>;
}
