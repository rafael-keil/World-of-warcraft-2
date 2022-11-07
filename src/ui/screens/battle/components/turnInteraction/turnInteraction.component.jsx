import "./turnInteraction.style.css";
import { DefaultText } from "../../../../components";

export function TurnIteration({ log, turn }) {
  if (log.isFinish) {
    return (
      <div className="turn_interaction">
        <p className="turn_interaction__damage">
          <DefaultText>
            {log.result === "draw"
              ? "A batalha foi tão longa que os participantes optaram pela paz!"
              : log.result
              ? "Você ganhou!"
              : "Você perdeu!"}
          </DefaultText>
        </p>
      </div>
    );
  } else {
    return (
      <div className="turn_interaction">
        <p className="turn_interaction__round">
          <DefaultText>{turn + 1}º turno</DefaultText>
        </p>
        <p className="turn_interaction__damage">
          <DefaultText>
            {log.character.name} deu {Math.max(0, log.damage)} de dano
          </DefaultText>
        </p>
      </div>
    );
  }
}
