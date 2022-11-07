import { useEffect, useState } from "react";
import { useGlobalCharacter } from "../../../context";
import { useWowApi } from "../../../hooks";
import { Shop } from "../../components/shop/shop.component";
import "./sell.style.css";
import background from "../../assets/tavernBackground.jpg";
import { BackButton, CharacterBusyBlock, Cheat } from "../../components";

export function Sell() {
  const [character, setCharacter] = useState({});
  const [characterId] = useGlobalCharacter();
  const wowApi = useWowApi();

  useEffect(() => {
    getApi();
  }, []);

  async function getApi() {
    const newCharacter = await wowApi.getCharacterWithId(characterId);

    setCharacter(newCharacter);
  }

  async function handleClick(itemId) {
    try {
      await wowApi.sellItem(itemId, characterId);
      getApi();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="sell" style={{ backgroundImage: `url(${background})` }}>
      <BackButton menu={true} selection={true} logout={true} />

      <div>
        {!!character.busy ? <CharacterBusyBlock actionInfo={"comprar"} /> : ""}
      </div>

      <Shop
        buy={false}
        items={character.items || []}
        handleClick={handleClick}
        character={character}
      />

      <Cheat />
    </div>
  );
}
