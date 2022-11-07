import { DefaultText } from "..";
import "./characterList.style.css";

export function CharacterList({ character, onClick, battleMode }) {
  const isBusy = character.busy ? "Ocupado" : "Disponível";
  const isBattleClass = battleMode ? "" : "hide_battle";

  return (
    <li>
      <button className="character__list" onClick={() => onClick(character.id)}>
        <DefaultText>{character.name}</DefaultText>
        <span className="character__level-race">
          <p className="character__level">{`Level ${character.level}`}</p>
          <p className="character__race">{character.race.name}</p>
        </span>
        <p className={`${"character__busy" || isBattleClass}`}>{isBusy}</p>
        <span className={`${isBattleClass}`}>
          <p className="character__kills">{`Kills: ${character.kills}`}</p>
          <p className="character__deaths">{`Deaths: ${character.deaths}`}</p>
        </span>
      </button>
    </li>
  );
}

CharacterList.defaultProps = {
  battleMode: false,
};
