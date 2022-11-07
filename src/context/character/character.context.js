import createGlobalState from "react-create-global-state";

const CHARACTER_KEY = "character";

const storageCharacter = localStorage.getItem(CHARACTER_KEY);
const initialCharacter = storageCharacter ? storageCharacter : "";

const [_useGlobalCharacter, GlobalCharacterProvider] =
  createGlobalState(initialCharacter);

const useGlobalCharacter = () => {
  const [globalCharacter, _setGlobalCharacter] = _useGlobalCharacter();

  const setGlobalCharacter = (newGlobalCharacter) => {
    _setGlobalCharacter(newGlobalCharacter);
    localStorage.setItem(CHARACTER_KEY, newGlobalCharacter);
  };

  return [globalCharacter, setGlobalCharacter];
};

export { useGlobalCharacter, GlobalCharacterProvider };
