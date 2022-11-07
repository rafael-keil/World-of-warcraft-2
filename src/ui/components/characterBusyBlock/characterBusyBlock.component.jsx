import { useHistory } from "react-router";
import { DefaultButton } from "..";
import { PATH } from "../../../constants";
import "./characterBusyBlock.style.css"

export function CharacterBusyBlock({ actionInfo }) {
  const { push } = useHistory();

  function handleReturnToMenu() {
    push(PATH.MENU);
  }

  return (
    <div className="character__busy__wall">
      <div className="character__busy_alert">
        <p className="character__busy_text">{`Seu personagem está ocupado e incapaz de ${actionInfo} no momento.`}</p>
        <DefaultButton
          text={"Retornar ao Menu"}
          handleClick={handleReturnToMenu}
        />
      </div>
    </div>
  );
}
