import "./raceList.style.css";

export function RaceList({ race, onClick }) {
  return (
    <button className="race__list" onClick={() => onClick(race)}>
      <div className="race__info">
        <p className="race__info-name">{race.name}</p>
        <p className="race__info-type">{race.type}</p>
        <p className="race__info-base__status">
          {`Vida: ${race.baseLife}, Resiliência: ${race.baseVigor}, Dano: ${race.baseDamage}`}
        </p>
      </div>
    </button>
  );
}
