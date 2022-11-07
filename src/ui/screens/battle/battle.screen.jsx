import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TurnIteration } from "./components";
import background from "../../assets/bg-pvp.jpg";
import "./battle.style.css";
import { BackButton, Cheat } from "../../components";

export function Battle() {
  const [battleResults, setBattleResults] = useState(null);
  const [battleLogList, setBattleLogList] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [rounds, setRounds] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const newReport = location.state;

    setBattleResults(newReport.results);
    setCharacters(newReport.characters);
  }, [location]);

  useEffect(() => {
    const battleLogListResponse = battleResults?.battleLogs;
    setBattleLogList(battleLogListResponse);
  }, [battleResults]);

  useEffect(() => {
    if (battleResults?.draw) {
      setTimeout(() => {
        const newRounds = [
          {
            isFinish: true,
            result: "draw",
          },
        ];
        setRounds(newRounds);
      }, 1000);
    }
    if (roundIndex < battleLogList?.length) {
      setTimeout(() => {
        const newRounds = [...rounds, battleLogList[roundIndex]];
        setRoundIndex(roundIndex + 1);
        setRounds(newRounds);
      }, 1000);
    }
    if (roundIndex === battleLogList?.length) {
      setTimeout(() => {
        const roundFinish = {
          isFinish: true,
          result: battleResults.winner,
        };
        const newRounds = [...rounds, roundFinish];
        setRoundIndex(roundIndex + 1);
        setRounds(newRounds);
      }, 1000);
    }
  }, [battleLogList, rounds]);

  return (
    <div
      className="battle__content"
      style={{ backgroundImage: `url(${background})` }}
    >
      <BackButton menu={true} selection={true} logout={true} />
      <img
        className="battle__image"
        src={!!characters ? characters[0].race.image : ""}
        alt=""
      />
      <div className="battle__log">
        {!!rounds
          ? rounds.map((round, index) => {
              return <TurnIteration key={index} log={round} turn={index} />;
            })
          : null}
      </div>
      <img
        className="battle__image"
        src={!!characters ? characters[1].race.image : ""}
        alt=""
      />
      <Cheat />
    </div>
  );
}
