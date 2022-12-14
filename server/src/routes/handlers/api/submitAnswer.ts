import { Request, Response } from "express";
import { UserDataObject } from "../../../types";
import { cache } from "../../../../index";

export const submitAnswer = (req: Request, res: Response): void => {
  if (req.body.round && req.body.answer && req.body.uuid) {
    const oldData: UserDataObject | undefined = cache.get(req.body.uuid);
    if (oldData) {
      const correct = req.body.round.correctAnswer === req.body.answer;
      const newData = {
        ...oldData,
        score: correct ? oldData.score + 1 : oldData.score,
        round: oldData.round + 1,
      };
      cache.set(req.body.uuid, newData);
      res.send({
        score: newData.score,
        nextRound: newData.round,
        correctAnswer: req.body.round.correctAnswer,
        correct,
      });
    }
  } else {
    res.status(400).send({
      message: "Either the round, answer, or uuid were not supplied",
    });
  }
};
