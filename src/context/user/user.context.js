import createGlobalState from "react-create-global-state";

const USER_KEY = "user";

const storageUser = localStorage.getItem(USER_KEY);
const initialUser = storageUser ? JSON.parse(storageUser) : {};

const [_useGlobalUser, GlobalUserProvider] = createGlobalState(initialUser);

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser();

  const setGlobalUser = (newGlobalUser) => {
    _setGlobalUser(newGlobalUser);
    localStorage.setItem(USER_KEY, JSON.stringify(newGlobalUser));
  };

  return [globalUser, setGlobalUser];
};

export { useGlobalUser, GlobalUserProvider };
