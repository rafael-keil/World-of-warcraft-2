import { useEffect, useState } from "react";
import { PATH } from "../../../constants";
import { useGlobalCharacter } from "../../../context";
import { useWowApi } from "../../../hooks";
import {
  BackButton,
  CharacterDetails,
  CharacterList,
  DefaultButton,
} from "../../components";
import { useHistory } from "react-router";
import "./selection.style.css";

export function Selection() {
  const [globalCharacterId, setGlobalCharacter] = useGlobalCharacter();
  const [characterList, setCharacterList] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const wowApi = useWowApi();
  const { push } = useHistory();

  useEffect(() => {
    async function getUserCharacterList() {
      try {
        const characterListResponse = await wowApi.getUserCharacterList();
        setCharacterList(characterListResponse);
      } catch (error) {
        console.log(error);
      }
    }
    setGlobalCharacter("");
    getUserCharacterList();
  }, []);

  useEffect(() => {
    function getSelectedCharacter() {
      const newSelection = characterList.find(
        (character) => character.id === globalCharacterId
      );
      setSelectedCharacter(newSelection);
    }
    getSelectedCharacter();
  }, [globalCharacterId, characterList]);

  function handleRedirectCreate() {
    push(PATH["CREATE-CHARACTER"]);
  }

  function handleRedirectMenu() {
    push(PATH.MENU);
  }

  async function handleDeleteCharacter() {
    if (
      !!selectedCharacter &&
      window.confirm("Tem certeza que deseja deletar este personagem?")
    ) {
      try {
        await wowApi.deleteUserCharacter(selectedCharacter.id);
        setCharacterList(
          characterList.filter(
            (character) => character.id !== selectedCharacter.id
          )
        );
        setGlobalCharacter("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleSelection(characterId) {
    setGlobalCharacter(characterId);
  }

  return (
    <div className="selection__content">
      <BackButton logout={true} />
      <header className="selection__title"></header>
      <div className="selection__details-list">
        <CharacterDetails selectedCharacter={selectedCharacter} big={true} />
        <ul className="selection__list">
          <p className="selection__list_title">Lista de Personagens</p>
          {characterList.map((character) => {
            return (
              <CharacterList
                key={character.id}
                character={character}
                onClick={handleSelection}
              />
            );
          })}
        </ul>
      </div>
      <footer className="selection__footer">
        <DefaultButton
          handleClick={handleDeleteCharacter}
          text="Deletar Personagem"
        />
        <DefaultButton
          handleClick={handleRedirectCreate}
          text="Criar Personagem"
        />
        <DefaultButton
          handleClick={handleRedirectMenu}
          text="Selecionar Personagem"
        />
      </footer>
    </div>
  );
}
