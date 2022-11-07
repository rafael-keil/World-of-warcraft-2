import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PATH } from "../../../constants";
import { useGlobalCharacter } from "../../../context";
import { useWowApi } from "../../../hooks";
import {
  BackButton,
  CharacterBusyBlock,
  CharacterDetails,
  CharacterList,
  Cheat,
  DefaultButton,
  Input,
} from "../../components";
import "./pvp.style.css";

export function Pvp() {
  const [globalCharacter] = useGlobalCharacter();
  const [userCharacter, setUserCharacter] = useState(null);
  const [opponentList, setOpponentList] = useState([]);
  const [opponentSelected, setOpponentSelected] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const wowApi = useWowApi();
  const { push } = useHistory();

  useEffect(() => {
    async function getUserCharacter() {
      try {
        const userCharacterResponse = await wowApi.getCharacterWithId(
          globalCharacter
        );
        setIsBusy(userCharacterResponse.busy);
        setUserCharacter(userCharacterResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getUserCharacter();
  }, []);

  useEffect(() => {
    async function getAllCharacters() {
      try {
        const opponentsResponse = await wowApi.getAllCharacters();
        setOpponentList(opponentsResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCharacters();
  }, []);

  function handleSelectOpponent(opponentId) {
    setOpponentSelected(opponentId);
  }

  async function handleStartPvp() {
    const opObj = {
      opponentId: opponentSelected,
    };
    const resultsResponse = await wowApi.getBattleResults(
      globalCharacter,
      opObj
    );

    const enemy = opponentList.filter(
      (opponent) => opponent.id === opponentSelected
    );

    push({
      pathname: PATH.BATTLE,
      state: {
        results: resultsResponse,
        characters: [userCharacter, ...enemy],
      },
    });
  }

  function sortByLevel(op1, op2) {
    if (levelFilter) {
      return op1 - op2;
    } else {
      return op2 - op1;
    }
  }

  function handleLevelFilter() {
    setLevelFilter((lvlFilter) => !lvlFilter);
  }

  return (
    <>
      <BackButton menu={true} selection={true} logout={true} />

      <div>
        {!!isBusy ? <CharacterBusyBlock actionInfo={"batalhar"} /> : ""}
      </div>
      <div className="pvp__content">
        <header className="pvp__header"></header>
        <div className="pvp__character_details">
          <CharacterDetails
            selectedCharacter={userCharacter}
            big={true}
            mirrorData={true}
            hideGeneral={true}
          />
          <div className="pvp__list__section">
            <div>
              <input
                type="checkbox"
                name="levelFilter"
                id="levelFilter"
                onChange={handleLevelFilter}
                style={{ marginLeft: "10px" }}
              />
              <label htmlFor="levelFilter" style={{ color: "white" }}>
                Ordenar por nível
              </label>
            </div>
            <Input
              value={nameFilter}
              onChange={setNameFilter}
              name="characterName"
              type="text"
              placeholder="Buscar personagem"
            />
            <ul className="pvp__list">
              {opponentList
                .sort((op1, op2) => sortByLevel(op2.level, op1.level))
                .filter((op) => !!op.name)
                .filter((op) =>
                  op.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
                .filter((op) => !op.busy)
                .filter((op) => op.id !== globalCharacter)
                .map((character) => {
                  return (
                    <CharacterList
                      key={character.id}
                      character={character}
                      onClick={handleSelectOpponent}
                      battleMode={true}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
        <footer className="pvp__footer">
          <DefaultButton handleClick={handleStartPvp} text="Batalhar" />
        </footer>
      </div>
      <Cheat />
    </>
  );
}
