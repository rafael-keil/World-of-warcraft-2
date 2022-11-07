import "./missionButton.style.css";

export function MissionButton({
  id,
  description,
  duration,
  expansionId,
  userExpansions,
  onClick,
}) {
  function formatTime() {
    const seconds = duration / 1000;

    if (seconds > 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return `${hours}hr ${minutes}min `;
    } else if (seconds > 59) {
      return `${(seconds / 60).toFixed(1)} min`;
    } else {
      return `${seconds} seg`;
    }
  }

  function checkExpansion() {
    if(expansionId){
      const haveExpansion = userExpansions.some(expansion => expansion === expansionId)
      return (!haveExpansion)
    } else {
      return false
    }
  }

  function handleClickMission() {
    onClick(id);
  }

  return (
    <button disabled={checkExpansion()} onClick={handleClickMission} className="mission-button__container">
      <p className="mission-button__container-left">{formatTime()}</p>
      <p className="mission-button__container-right">{`${description}`}</p>
    </button>
  );
}
