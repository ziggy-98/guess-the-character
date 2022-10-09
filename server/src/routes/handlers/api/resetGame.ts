import { Request, Response } from "express";
import { createUserGameData } from "../../helpers";
import { cache } from "../../../../index";
import { UserData } from "../../../types";

export const resetGame = (req: Request, res: Response): void => {
  if (req.body.uuid) {
    createUserGameData(req.body.uuid)
      .then((userDataRes) => {
        if (userDataRes.hasOwnProperty(req.body.uuid as string)) {
          cache.set(req.body.uuid, (userDataRes as UserData)[req.body.uuid]);
        }
        res.send(userDataRes);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
