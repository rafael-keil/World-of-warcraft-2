import { PATH } from "../../../constants/path.constant";
import "./menu.style.css";
import {
  BackButton,
  DefaultButton,
  DefaultText,
  Cheat,
} from "../../components";
import { useHistory } from "react-router";
import iconBattle from "../../assets/iconBattle.png";
import iconMission from "../../assets/iconMission.png";
import iconShop from "../../assets/iconShop.png";
import background from "../../assets/bg-menu.jpeg";

export function Menu() {
  const { push } = useHistory();

  function handleRedirect(path) {
    push({
      pathname: PATH.LOADING,
      state: path,
    });
  }

  return (
    <div className="menu" style={{ backgroundImage: `url(${background})` }}>
      <BackButton selection={true} logout={true} />

      <div className="menu__item">
        <DefaultButton
          handleClick={() => handleRedirect(PATH.PVP)}
          text="Batalhar"
        />
        <img className="menu__img" src={iconBattle} alt="icone batalha" />
        <p>
          <DefaultText>
            Batalhe contra outros jogadores, mostre sua força e descubra quem é
            o mais forte.
          </DefaultText>
        </p>
      </div>

      <div className="menu__item">
        <DefaultButton
          handleClick={() => handleRedirect(PATH.MISSION)}
          text="Missão"
        />
        <img className="menu__img" src={iconMission} alt="icone missão" />
        <p>
          <DefaultText>
            Escolha uma missão e inicie sua jornada em um mundo sombrio atrás de
            recompensas.
          </DefaultText>
        </p>
      </div>

      <div className="menu__item">
        <DefaultButton
          handleClick={() => handleRedirect(PATH.BUY)}
          text="Loja"
        />
        <img className="menu__img" src={iconShop} alt="icone loja" />
        <p>
          <DefaultText>
            Compre e venda itens para se tornar o mais poderoso entre os
            guerreiros.
          </DefaultText>
        </p>
      </div>
      <Cheat />
    </div>
  );
}
