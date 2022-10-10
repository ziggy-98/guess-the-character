import { Round, UserGameResponse, AnswerResponse, RoundResponse } from "server";

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
  submitAnswer: (
    uuid: string,
    round: Round,
    answer: string
  ): Promise<AnswerResponse | Error> => {
    return new Promise((resolve, reject) => {
      fetch("/api/submit-answer", {
        method: "PATCH",
        body: JSON.stringify({
          uuid: uuid,
          round: round,
          answer: answer,
        }),
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
  getCurrentScore: (uuid: string): Promise<number | Error> => {
    return new Promise((resolve, reject) => {
      fetch(`/api/score?uuid=${uuid}`)
        .then((res) => res.text())
        .then((res) => resolve(parseInt(res)))
        .catch((err) => reject(err));
    });
  },
  getCurrentRound: (uuid: string): Promise<RoundResponse | Error> => {
    return new Promise((resolve, reject) => {
      fetch(`/api/round?uuid=${uuid ?? ""}`)
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
