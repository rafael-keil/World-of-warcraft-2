import { DefaultText } from "../../..";
import "./checkbox.style.css";

export function Checkbox({ checked, handleCheckbox, title, field }) {
  function handleChange(event) {
    handleCheckbox(event);
  }

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        onChange={handleChange}
        name={field}
        checked={checked}
      />
      <label htmlFor={field}>
        <p className="checkbox__label">
          <DefaultText>{title}</DefaultText>
        </p>
      </label>
    </div>
  );
}
