import "./defaultText.style.css";

export function DefaultText({ children }) {
  return <span className="defaultText">{children}</span>;
}

DefaultText.defaultProps = {
  children: "",
};
