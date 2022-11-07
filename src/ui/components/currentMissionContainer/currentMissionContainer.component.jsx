import "./currentMissionContainer.style.css"
import { DefaultText } from "../../components/index";

export function CurrentMissionContainer({ image, description, duration, experience, money, expansionId }){

    return (
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
        className="current-mission-container__board"
      >
        <DefaultText>{description}</DefaultText>
        <div className="current-mission-container__board-infos">
          <DefaultText>{`Duração: ${duration/1000} segundos`}</DefaultText>
          <DefaultText>{`Experiência: ${experience}`}</DefaultText>
          <DefaultText>{`Dinheiro: ${money}`}</DefaultText>
          <DefaultText>{`ID de Expansão Necessário: ${
            expansionId ? expansionId : "Nenhum"
          }`}</DefaultText>
        </div>
      </div>
  );

}