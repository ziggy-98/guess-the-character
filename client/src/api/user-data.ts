import { Round, UserGameResponse } from "server";

export const UserDataApi = {
  startGame: (uuid: string = undefined): Promise<UserGameResponse | Error> => {
    return new Promise((resolve, reject) => {
      fetch("/api/start-game", {
        method: "POST",
        body: JSON.stringify({ uuid: uuid }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  submitAnswer: () => {},
  resetGame: (uuid: string = undefined): Promise<UserGameResponse | Error> => {
    return new Promise((resolve, reject) => {
      fetch("/api/reset", {
        method: "POST",
        body: JSON.stringify({ uuid: uuid }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getCurrentScore: () => {},
  getCurrentRound: (uuid: string): Promise<Round | Error> => {
    return new Promise((resolve, reject) => {
      fetch(`/api/round?uuid=${uuid ?? ""}`)
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
