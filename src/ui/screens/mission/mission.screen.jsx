import "./mission.style.css";
import { useEffect, useState } from "react";
import { useGlobalCharacter } from "../../../context";
import { MissionButton, MissionsListContainer } from "./components/index";
import {
  DefaultButton,
  DefaultText,
  CurrentMissionContainer,
  BackButton,
  Cheat,
} from "../../components/index";
import { useWowApi } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { PATH } from "../../../constants";

const AVAILABLE_MISSIONS_CARD = 0;
const ABOUT_MISSION_CARD = 1;

export function MissionScreen() {
  const [globalCharacter] = useGlobalCharacter();
  const [userExpansions, setUserExpansions] = useState([]);
  const [currentMission, setCurrentMission] = useState({});
  const [character, setCharacter] = useState(null);
  const [localPage, setLocalPage] = useState(AVAILABLE_MISSIONS_CARD);
  const [availableMissions, setAvailableMissions] = useState([]);
  const wowApi = useWowApi();
  const { push } = useHistory();

  useEffect(() => {
    async function getApiInformation() {
      try {
        const receivedCharacter = await wowApi.getCharacterWithId(
          globalCharacter
        );
        const isBusy = receivedCharacter.busy;
        setCharacter(receivedCharacter);

        if (isBusy) {
          push(PATH.BUSY);
        } else {
          const missions = await wowApi.getMissions();
          setAvailableMissions(missions);
          const user = await wowApi.getUser();
          setUserExpansions(user.expansions);
        }
      } catch {}
    }

    getApiInformation();
  }, []);

  function handleAboutMission(idMission) {
    const missionInfo = availableMissions.find(
      (mission) => mission.id === idMission
    );
    setCurrentMission(missionInfo);
    setLocalPage(ABOUT_MISSION_CARD);
  }

  async function handleStartMission(missionId) {
    try {
      await wowApi.startMission(missionId, globalCharacter);

      push(PATH.BUSY);
    } catch {}
  }

  function handleBackToLocalPage() {
    setLocalPage(AVAILABLE_MISSIONS_CARD);
  }

  function checkLocalPage() {
    if (localPage === ABOUT_MISSION_CARD && currentMission !== null) {
      return (
        <>
          <CurrentMissionContainer
            image={currentMission.image}
            description={currentMission.description}
            duration={currentMission.duration}
            experience={currentMission.experience}
            money={currentMission.money}
            expansionId={currentMission.expansionId}
          />
          <div className="mission__container-screen-about-options">
            <DefaultButton
              text={"Voltar"}
              handleClick={handleBackToLocalPage}
            />
            <DefaultButton
              text={"Iniciar Missão"}
              handleClick={() => handleStartMission(currentMission.id)}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <DefaultText>Missões Disponíveis</DefaultText>
          <MissionsListContainer>
            {availableMissions
              ? availableMissions.map((mission) => (
                  <MissionButton
                    key={mission.id}
                    id={mission.id}
                    description={mission.description}
                    duration={mission.duration}
                    expansionId={mission.expansionId}
                    userExpansions={userExpansions}
                    onClick={handleAboutMission}
                  />
                ))
              : null}
          </MissionsListContainer>
        </>
      );
    }
  }

  function characterInfo() {
    if (character) {
      return (
        <div className="mission__container-character">
          <DefaultText>{character.name}</DefaultText>
          <img
            className="mission__container-character-image"
            src={character.race.image}
            alt="Personagem selecionado para escolher uma missão."
          />
        </div>
      );
    }
  }

  return (
    <>
      <BackButton menu={true} selection={true} logout={true} />
      <main className="mission__background">
        <div className="mission__container">
          <div>{characterInfo()}</div>
          <div className="mission__container-screen">{checkLocalPage()}</div>
        </div>
      </main>
      <Cheat />
    </>
  );
}
