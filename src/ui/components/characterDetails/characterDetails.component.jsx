import { DefaultText } from "..";
import "./characterDetails.style.css";

export function CharacterDetails({ selectedCharacter, big, mirrorData, hideGeneral, hideCombat, hideItems }) {
  const bigClass = big ? "big__class" : "";
  const mirrorClass = mirrorData ? "mirror__data" : "";
  const hideGeneralClass = hideGeneral ? "hide__general" : "";
  const hideCombatClass = hideCombat ? "hide__combat" : "";
  const hideItemsClass = hideItems ? "hide__items" : "";
  

  function isBusy() {
    return !!selectedCharacter.busy ? "Ocupado" : "Disponível";
  }
  
  return !selectedCharacter ? (
    <div className={`${bigClass}`}></div>
  ) : (
    <div className={`character__details_content ${bigClass} ${mirrorClass}`}>
      <div className="character__details_info">
        <div className="character__details_info_main">
          <DefaultText>{`${selectedCharacter.name}`}</DefaultText>
          <p className="character__details_info_stats">
            {`Level: ${selectedCharacter.level}`}
          </p>
          <p className="character__details_info_stats">
            {`${selectedCharacter.race.name} | ${selectedCharacter.faction}`}
          </p>
        </div>
        <div className={`character__details_info_general ${hideGeneralClass}`}>
          <DefaultText>Informações Gerais</DefaultText>
          <p className="character__details_info_stats">
            {`Experiência atual: ${selectedCharacter.experience}`}
          </p>
          <p className="character__details_info_stats">
            {`Experiência p/ próximo nível: ${selectedCharacter.experienceToNextLevel}`}
          </p>
          <p className="character__details_info_stats">
            {`Dinheiro: $${selectedCharacter.money}`}
          </p>
          <p className="character__details_info_stats">
            {`Situação: ${isBusy()}`}
          </p>
        </div>
        <div className={`character__details_info_combat ${hideCombatClass}`}>
          <DefaultText>Informações De Combate</DefaultText>
          <p className="character__details_info_stats">
            {`Abates: ${selectedCharacter.kills}`}
          </p>
          <p className="character__details_info_stats">
            {`Mortes: ${selectedCharacter.deaths}`}
          </p>
          <p className="character__details_info_stats">
            {`Dano: ${selectedCharacter.totalDamage}`}
          </p>
          <p className="character__details_info_stats">
            {`Resiliência: ${selectedCharacter.totalVigor}`}
          </p>
          <p className="character__details_info_stats">
            {`Vida: ${selectedCharacter.totalLife}`}
          </p>
        </div>
        <div className={`character__details_info_equipments ${hideItemsClass}`}>
          <DefaultText>Equipamentos</DefaultText>
          {!selectedCharacter.items.length ? (
            <p className="character__details_info_stats">{`Personagem não possui equipamentos`}</p>
          ) : (
            selectedCharacter.items.map((item) => (
              <p className="character__details_info_stats" key={item.id}>{`• ${item.name}`}</p>
            ))
          )}
        </div>
      </div>
      <img
        className="character__details_image"
        src={selectedCharacter.race.image}
        alt={selectedCharacter.name}
      />
    </div>
  );
}

CharacterDetails.defaultProps = {
  mirror: false,
  big: false,
  hideGeneral: false,
  hideCombat: false,
  hideItems: false,
}