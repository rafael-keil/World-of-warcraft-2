import "./busy.style.css";
import { useEffect, useState } from "react";
import { useGlobalCharacter } from "../../../context";
import {
  DefaultButton,
  CurrentMissionContainer,
  DefaultText,
  BackButton,
  Cheat,
} from "../../components/index";
import { useWowApi } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { PATH } from "../../../constants";

const DEFAULT_PAGE = 0;
const FINISH_PAGE = 1;

export function BusyScreen() {
  const [globalCharacter] = useGlobalCharacter();
  const [currentMission, setCurrentMission] = useState({});
  const [localPage, setLocalPage] = useState(DEFAULT_PAGE);
  const wowApi = useWowApi();
  const { push } = useHistory();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    async function getApiInformation() {
      try {
        const receivedCharacter = await wowApi.getCharacterWithId(
          globalCharacter
        );

        if (!receivedCharacter.busy) {
          push(PATH.MENU);
        } else {
          const missionId = receivedCharacter.questInProgress.id;
          const receivedMission = await wowApi.getMissionWithId(missionId);
          const receivedFinishAt = receivedCharacter.questInProgress.finishAt;

          setTimer(Math.floor((receivedFinishAt - Date.now()) / 1000));
          setCurrentMission(receivedMission);
        }
      } catch {}
    }

    getApiInformation();
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      clearInterval(tick);
    }, 1000);
  }, [timer]);

  async function handleFinishtMission() {
    try {
      await wowApi.finishMission(globalCharacter);
      setLocalPage(FINISH_PAGE);
    } catch {}
  }

  function checkTimer() {
    if (timer > 0) {
      return <DefaultText>Faltam {timer} seg</DefaultText>;
    }
  }

  function checkLocalPage() {
    if (localPage === FINISH_PAGE) {
      return (
        <div className="busy__finish">
          <h1 className="busy__title">Parabéns!</h1>
          <h2 className="busy__title">Você completou a missão.</h2>
        </div>
      );
    } else {
      return (
        <div className="busy__progress">
          <h1 className="busy__title">Você está em missão!</h1>
          <CurrentMissionContainer
            image={currentMission.image}
            description={currentMission.description}
            duration={currentMission.duration}
            experience={currentMission.experience}
            money={currentMission.money}
            expansionId={currentMission.expansionId}
          />
          <div className="busy__progress">{checkTimer()}</div>
          <DefaultButton
            text={"Encerrar Missão"}
            handleClick={handleFinishtMission}
          />
        </div>
      );
    }
  }

  return (
    <div className="busy__container">
      <BackButton menu={true} selection={true} logout={true} />

      <div>{checkLocalPage()}</div>

      <Cheat />
    </div>
  );
}
