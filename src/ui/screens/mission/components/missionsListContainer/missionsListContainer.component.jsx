import "./missionsListContainer.style.css"

export function MissionsListContainer({ children }) {

  return (
    <div className="missions-list-container__board">
      {children}
    </div>
  );
  
}
