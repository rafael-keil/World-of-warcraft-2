import "./input.style.css";

export function Input({ onChange, ...props }) {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <input
      className="input"
      onChange={handleChange}
      {...props}
      autoComplete="off"
    />
  );
}
