import { useHistory, useLocation } from "react-router";
import background from "../../assets/bg-loading.jpg";
import "./loading.style.css";
import { DefaultText } from "../../components";

export function Loading() {
  const { push } = useHistory();
  const { state } = useLocation();

  setTimeout(() => {
    push(state);
  }, 3000);

  return (
    <div className="loading" style={{ backgroundImage: `url(${background})` }}>
      <p>
        <DefaultText>Carregando...</DefaultText>
      </p>
    </div>
  );
}
