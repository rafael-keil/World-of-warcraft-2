import { DefaultText } from "..";
import { PATH } from "../../../constants";
import { Link } from "react-router-dom";
import "./defaultButton.style.css";

export function DefaultButton({ text, handleClick }) {
  function handleButton() {
    handleClick();
  }

  return (
    <button className="defaultButton" onClick={handleButton}>
      <DefaultText>{text}</DefaultText>
    </button>
  );
}

export function BackButton({ menu, selection, logout }) {
  function handleClick() {
    localStorage.clear();
  }

  return (
    <div className="back_button">
      {menu ? (
        <div className="menu_button">
          <Link to={PATH.MENU}>
            <DefaultButton text="Voltar ao menu" />
          </Link>
        </div>
      ) : null}
      {selection ? (
        <div className="selection_button">
          <Link to={PATH.SELECTION}>
            <DefaultButton text="Selecão de personagem" />
          </Link>
        </div>
      ) : null}
      {logout ? (
        <div className="logout_button">
          <Link to={PATH.LOGIN}>
            <DefaultButton text="Deslogar" handleClick={handleClick} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

DefaultButton.defaultProps = {
  handleClick: () => null,
};

BackButton.defaultProps = {
  menu: false,
  selection: false,
  logout: false,
};
