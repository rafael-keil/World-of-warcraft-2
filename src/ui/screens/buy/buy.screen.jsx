import { useEffect, useState } from "react";
import { useGlobalCharacter } from "../../../context";
import { useWowApi } from "../../../hooks";
import { Shop } from "../../components/shop/shop.component";
import "./buy.style.css";
import background from "../../assets/tavernBackground.jpg";
import { BackButton, CharacterBusyBlock, Cheat } from "../../components";

export function Buy() {
  const [items, setItems] = useState([]);
  const [expansions, setExpansions] = useState([]);
  const [character, setCharacter] = useState({});
  const [characterId] = useGlobalCharacter();
  const wowApi = useWowApi();

  useEffect(() => {
    async function getApi() {
      const shopItems = await wowApi.getShop();
      setItems(shopItems);

      const newCharacter = await wowApi.getCharacterWithId(characterId);
      setCharacter(newCharacter);

      const newUser = await wowApi.getUser();
      setExpansions(newUser.expansions);
    }

    getApi();
  }, []);

  useEffect(() => {
    if (items.length) {
      const newItems = items.map((item) => {
        const disableMoney = character.money < item.price;
        const disableItem = character.items.some(
          (itemInv) => itemInv.id === item.id
        );
        const disableExpansion =
          item.expansionId && item.type !== "EXPANSAO"
            ? !expansions.includes(item.expansionId)
            : false;

        return {
          ...item,
          disable: [disableMoney, disableItem, disableExpansion],
        };
      });

      setItems(newItems);
    }
  }, [character]);

  async function handleClick(itemId) {
    try {
      await wowApi.buyItem(itemId, characterId);

      const item = items.find((itemFind) => itemId === itemFind.id);
      if (item.type === "EXPANSAO") {
        const user = await wowApi.getUser();
        setExpansions(user.expansions);
      }

      const newCharacter = await wowApi.getCharacterWithId(characterId);
      setCharacter(newCharacter);
    } catch {}
  }

  return (
    <div className="buy" style={{ backgroundImage: `url(${background})` }}>
      <BackButton menu={true} selection={true} logout={true} />

      <div>
        {!!character.busy ? <CharacterBusyBlock actionInfo={"comprar"} /> : ""}
      </div>

      <Shop
        buy={true}
        items={items}
        handleClick={handleClick}
        character={character}
      />
      <Cheat />
    </div>
  );
}
