import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useWowApi } from "../../../hooks";
import { RaceList } from "./components";
import { BackButton, DefaultButton, Input } from "../../components";
import flagHorde from "../../assets/flag-horde.png";
import flagAlliance from "../../assets/flag-alliance.png";
import "./createCharacter.style.css";

export function CreateCharacter() {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState({ id: 1 });
  const [characterName, setCharacterName] = useState("");
  const [selectedFaction, setSelectedFaction] = useState("Aliança");
  const [error, setError] = useState("");
  const wowApi = useWowApi();
  const { push } = useHistory();

  useEffect(() => {
    async function getRaces() {
      try {
        const racesResponse = await wowApi.getRaces();
        setRaces(racesResponse);
      } catch (errorCatch) {
        setError(errorCatch.response.data.message);
      }
    }
    getRaces();
  }, []);

  function handleSelectRace(raceId) {
    setSelectedRace(raceId);
  }

  function handleSelectFaction(event) {
    const newSelectedFaction = event.target.value;
    setSelectedFaction(newSelectedFaction);
  }

  async function handleCharacterCreation() {
    try {
      const newCharacter = {
        name: characterName,
        raceId: selectedRace.id,
        faction: selectedFaction,
      };
      await wowApi.createUserCharacter(newCharacter);
      push("/");
    } catch (errorCatch) {
      setError(errorCatch.response.data.message);
    }
  }

  return (
    <div className="create__content">
      <BackButton selection={true} logout={true} />
      <header className="create__header"></header>
      <div className="create__faction-image__name-race">
        <ul className="create__race">
          {races.map((race) => (
            <li key={race.id}>
              <RaceList race={race} onClick={handleSelectRace} />
            </li>
          ))}
        </ul>
        <div className="create__image_name">
          {!!selectedRace ? (
            <img
              src={selectedRace.image}
              alt={selectedRace.name}
              className="create__image"
            />
          ) : (
            ""
          )}
          <Input
            value={characterName}
            onChange={setCharacterName}
            name="characterName"
            type="text"
            placeholder="Nome do Personagem"
          />
        </div>
        <div className="create__faction">
          <button className="faction__alliance">
            <input
              type="radio"
              name="faction"
              value="Aliança"
              onChange={handleSelectFaction}
            />
            <img src={flagAlliance} alt="Aliança" />
          </button>
          <button className="faction__horde">
            <input
              type="radio"
              name="faction"
              value="Horda"
              onChange={handleSelectFaction}
            />
            <img src={flagHorde} alt="Horda" />
          </button>
        </div>
      </div>
      <footer className="create__footer">
        {!!error && <p className="create__character__error">{error}</p>}
        <DefaultButton
          handleClick={handleCharacterCreation}
          text="Confirmar Personagem"
        />
      </footer>
    </div>
  );
}
