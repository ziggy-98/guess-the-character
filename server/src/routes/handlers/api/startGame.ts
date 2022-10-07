import { Request, Response } from "express";
import { cache } from "../../../index";
import { createUserGameData } from "../../helpers";

export const startGame = (req: Request, res: Response): void => {
  if (req.body.uuid) {
    let userData = cache.get(req.body.uuid);
    if (userData) {
      res.send(userData);
    } else {
      createUserGameData(req.body.uuid).then((userDataRes) => {
        res
          .set("Content-Type", "application/json")
          .status(200)
          .send(userDataRes);
      });
    }
  } else {
    res.redirect("/error");
  }
};
