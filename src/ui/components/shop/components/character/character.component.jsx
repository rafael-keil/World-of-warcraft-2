import { DefaultText } from "../../..";
import "./character.style.css";

export function Character({ character }) {
  return (
    <div
      className="character"
      style={{ backgroundImage: `url(${character.race.image})` }}
    >
      <div className="character__info">
        <p>
          <DefaultText>{character.name}</DefaultText>
        </p>
        <p>
          <DefaultText>{character.race.name}</DefaultText>
        </p>
        <p>
          <DefaultText>level: {character.level}</DefaultText>
        </p>
        <p>
          <DefaultText>Dinheiro: {character.money}</DefaultText>
        </p>
      </div>
    </div>
  );
}
