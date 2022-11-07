import { useState } from "react";
import "./login.style.css";
import { useGlobalUser } from "../../../context";
import { useWowApi } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { PATH } from "../../../constants";
import { DefaultButton, DefaultText, Input } from "../../components";
import background from "../../assets/loginBackground.gif";
import logo from "../../assets/wowLogo.png";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorInput, setErrorInput] = useState("");
  const [, setUser] = useGlobalUser();
  const wowApi = useWowApi();
  const { push } = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!username || !password) {
        setErrorInput("Não são aceitos valores vazios");
      } else if (isLogin) {
        const user = await wowApi.login(username, password);

        setUser(user);
        setErrorInput("");
        push(PATH.SELECTION);
      } else {
        await wowApi.singup(username, password, confirmPassword);

        setErrorInput("");
        setUsername("");
        setPassword("");
        setIsLogin((current) => !current);
      }
    } catch (error) {
      setErrorInput(error.response.data.message);
    }
  }

  function handleChangeLayout() {
    setIsLogin((current) => !current);
    setErrorInput("");
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${background})` }}>
      <img className="login__logo" src={logo} alt="logoWow" />

      <form onSubmit={handleSubmit} className="login__form">
        <div>
          <label htmlFor="username">
            <p className="login__label">
              <DefaultText>Usuário: </DefaultText>
            </p>
          </label>

          <Input value={username} onChange={setUsername} name="username" />
        </div>
        <div>
          <label htmlFor="password">
            <p className="login__label">
              <DefaultText>Senha: </DefaultText>
            </p>
          </label>

          <Input
            value={password}
            onChange={setPassword}
            name="password"
            type="password"
          />
        </div>
        {!!isLogin ? null : (
          <div>
            <label htmlFor="confirmPassword">
              <p className="login__label">
                <DefaultText>Confime a senha: </DefaultText>
              </p>
            </label>

            <Input
              value={confirmPassword}
              onChange={setConfirmPassword}
              name="confirmPassword"
              type="password"
            />
          </div>
        )}
        <DefaultText>{!!errorInput && <p>{errorInput}</p>}</DefaultText>

        <DefaultButton text={!!isLogin ? "Login" : "Cadastrar"} />
      </form>
      <div>
        <p className="login__label">
          <DefaultText>
            {!!isLogin ? "Não tem cadastro?" : "Ja tem cadastro?"}
          </DefaultText>
        </p>
        <DefaultButton
          handleClick={handleChangeLayout}
          text={!isLogin ? "Faça Login" : "Cadastre-se"}
        />
      </div>
    </div>
  );
}
