import { Input, Label } from 'reactstrap'
import "./SelectField.scss";
export default function SelectField({ isBorderLessSelect = false, label = null, name = "", className = "", options = [], id = "exampleSelect", ...props }) {
    return (
        <>
            {label && <Label for={id}>{label}</Label>}
            <Input  {...props} type="select" className={`select-field ${isBorderLessSelect ? "borderless-select" : ""} ${className}`} name={name} id={id}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.label}</option>
                })}
            </Input>
        </>
    )
}
