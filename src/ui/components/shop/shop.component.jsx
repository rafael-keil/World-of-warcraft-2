import "./shop.style.css";
import { DefaultButton, DefaultText, Input, ItemButton } from "../";
import { PATH } from "../../../constants";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Checkbox } from "./components/checkbox/checkbox.component";
import { Character } from "./components/character/character.component";

export function Shop({ buy, items, handleClick, character }) {
  const [itemsFiltered, setItemsFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [checkbox, setCheckbox] = useState({
    vida: true,
    dano: true,
    vigor: true,
    expansao: true,
  });

  useEffect(() => {
    const newItems1 = items.filter((item) => {
      return (
        (!checkbox.vida ? item.type !== "VIDA" : true) &&
        (!checkbox.dano ? item.type !== "DANO" : true) &&
        (!checkbox.vigor ? item.type !== "VIGOR" : true) &&
        (!checkbox.expansao ? item.type !== "EXPANSAO" : true)
      );
    });

    setItemsFiltered(newItems1);

    if (search !== "" && !"     ".includes(search)) {
      const newItems2 = newItems1.filter((item) => {
        return item.name.toUpperCase().includes(search.toUpperCase());
      });
      setItemsFiltered(newItems2);
    }
  }, [checkbox, search, items]);

  function handleCheckbox(event) {
    const { name } = event.target;

    const newCheckbox = {
      ...checkbox,
      [name]: !checkbox[name],
    };

    setCheckbox(newCheckbox);
  }

  return (
    <div className="shop">
      <div className="shop__options">
        {Object.keys(character).length ? (
          <Character character={character} />
        ) : null}
        <form className="shop__form">
          <Input value={search} onChange={setSearch} name="search" />

          <Checkbox
            checked={checkbox.vida}
            handleCheckbox={handleCheckbox}
            title="Vida"
            field="vida"
          />
          <Checkbox
            checked={checkbox.dano}
            handleCheckbox={handleCheckbox}
            title="Dano"
            field="dano"
          />
          <Checkbox
            checked={checkbox.vigor}
            handleCheckbox={handleCheckbox}
            title="Vigor"
            field="vigor"
          />
          <Checkbox
            checked={checkbox.expansao}
            handleCheckbox={handleCheckbox}
            title="Expansão"
            field="expansao"
          />
        </form>
      </div>
      <div className="shop__buttons">
        <Link to={buy ? PATH.SELL : PATH.BUY}>
          <DefaultButton
            text={buy ? "Mudar para venda" : "Mudar para compra"}
          />
        </Link>
        <div className="shop__items">
          {itemsFiltered ? (
            itemsFiltered.map((item) => {
              return (
                <ItemButton
                  key={item.id}
                  item={item}
                  handleClick={handleClick}
                ></ItemButton>
              );
            })
          ) : (
            <DefaultText>Nenhum item!</DefaultText>
          )}
        </div>
      </div>
    </div>
  );
}
