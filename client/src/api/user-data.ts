import { UserGameResponse } from "server";

export const UserDataApi = {
  startGame: (uuid: string = undefined): Promise<UserGameResponse | Error> => {
    return new Promise((resolve, reject) => {
      fetch("/api/start-game", {
        method: "POST",
        body: JSON.stringify({ uuid: uuid }),
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  submitAnswer: () => {},
  resetGame: () => {},
  getCurrentScore: () => {},
  getCurrentRound: () => {},
};
