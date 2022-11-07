import { useMemo } from "react";
import { useHttp } from "../_base/use-http";
import { useGlobalUser } from "../../../context";

export function useWowApi() {
  const [user] = useGlobalUser();

  const httpInstance = useHttp("https://wow-crescer-api.herokuapp.com", {
    authorization: user.token,
  });

  async function login(username, password) {
    const response = await httpInstance.post("/auth/login", {
      username,
      password,
    });

    return response;
  }

  async function getRaces() {
    const response = await httpInstance.get("/races");

    return response;
  }

  async function singup(username, password, confirmPassword) {
    const response = await httpInstance.post("/auth/register", {
      username,
      password,
      confirmPassword,
    });

    return response;
  }

  async function getUserCharacterList() {
    const response = await httpInstance.get("/user/me/characters");

    return response;
  }

  async function deleteUserCharacter(characterId) {
    const response = await httpInstance.post(
      `/user/me/characters/${characterId}/delete`
    );

    return response;
  }

  async function createUserCharacter(characterObj) {
    const response = await httpInstance.post(
      "/user/create-character",
      characterObj
    );

    return response;
  }

  async function getCharacterWithId(id) {
    const response = await httpInstance.get(`/user/me/characters/${id}`);

    return response;
  }

  async function getMissions() {
    const response = await httpInstance.get("/quests");

    return response;
  }

  async function getMissionWithId(missionId) {
    const response = await httpInstance.get(`/quests/${missionId}`);

    return response;
  }

  async function getAllCharacters() {
    const response = await httpInstance.get("/characters");

    return response;
  }

  async function startMission(missionId, characterId) {
    const response = await httpInstance.post(`/quests/${missionId}/start`, {
      characterId: characterId,
    });

    return response;
  }

  async function getShop() {
    const response = await httpInstance.get("/shop");

    return response;
  }

  async function getUser() {
    const response = await httpInstance.get("/user/me");

    return response;
  }

  async function getBattleResults(userCharacterId, opponentObj) {
    const response = await httpInstance.post(
      `/user/me/characters/${userCharacterId}/battle`,
      opponentObj
    );

    return response;
  }

  async function buyItem(itemId, character) {
    const response = await httpInstance.post(`/shop/${itemId}/buy`, {
      characterId: character,
    });

    return response;
  }

  async function finishMission(characterId) {
    const response = await httpInstance.post("/quests/finish", {
      characterId: characterId,
    });

    return response;
  }

  async function sellItem(itemId, character) {
    const response = await httpInstance.post(`/shop/${itemId}/sell`, {
      characterId: character,
    });

    return response;
  }

  async function cheat(cheatCode, characterId) {
    const response = await httpInstance.post("/cheat", {
      code: cheatCode,
      characterId: characterId,
    });

    return response;
  }

  return useMemo(
    () => ({
      login,
      getRaces,
      getUserCharacterList,
      deleteUserCharacter,
      createUserCharacter,
      singup,
      getMissions,
      getCharacterWithId,
      startMission,
      getMissionWithId,
      finishMission,
      getAllCharacters,
      getBattleResults,
      getShop,
      buyItem,
      sellItem,
      getUser,
      cheat,
    }),
    [user]
  );
}
