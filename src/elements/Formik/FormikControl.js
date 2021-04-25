import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import MultiSelect from "./MultiSelect";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker"

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "multiselect":
      return <MultiSelect {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return <Input {...rest} />;
  }
}

export default FormikControl;
