import { useState } from "react";
import { useGlobalCharacter } from "../../../context";
import { useWowApi } from "../../../hooks/api/wow/use-wow-api";
import "./cheat.style.css";

export function Cheat() {
  const [cheat, setCheat] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [characterId] = useGlobalCharacter();
  const wowApi = useWowApi();

  function handleChange(event) {
    setCheat(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await wowApi.cheat(cheat, characterId);
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cheat">
      <form onSubmit={handleSubmit}>
        {isVisible ? (
          <input
            className="cheat__input"
            value={cheat}
            onChange={handleChange}
            name="cheat"
            autoComplete="off"
          />
        ) : null}
      </form>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="cheat__button"
      />
    </div>
  );
}
