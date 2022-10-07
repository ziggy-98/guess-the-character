import { Request, Response } from "express";
import { UserDataObject } from "../../../types";
import { cache } from "../../../index";

export const submitAnswer = (req: Request, res: Response): void => {
  if (req.body.round && req.body.answer && req.body.uuid) {
    let oldData: UserDataObject | undefined = cache.get(req.body.uuid);
    if (oldData) {
      let correct = req.body.round.correctAnswer === req.body.answer;
      let newData = {
        ...oldData,
        score: correct ? oldData.score + 1 : oldData.score,
      };
      cache.set(req.body.uuid, newData);
      res.send({
        userData: newData,
        correct: correct,
      });
    }
  } else {
    res.redirect("/error");
  }
};
