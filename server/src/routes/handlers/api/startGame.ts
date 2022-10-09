import { Request, Response } from "express";
import { cache } from "../../../../index";
import { createUserGameData } from "../../helpers";
import crypto from "crypto";
import { UserData, UserDataObject } from "server";

export const startGame = async (req: Request, res: Response): Promise<void> => {
  return new Promise(async () => {
    let uuid = "";
    let round = 0;
    if (req.body.uuid) {
      uuid = req.body.uuid;
      const userData: UserDataObject = cache.get(req.body.uuid);
      if (userData) {
        round = userData.round;
      } else {
        const userDataResponse = await createUserGameData(req.body.uuid);
        if (!userDataResponse.message) {
          round = (userDataResponse as UserData)[req.body.uuid].round;
        } else {
          res.status(500).send(userDataResponse as Error);
        }
      }
    } else {
      uuid = crypto.randomUUID();
      const userDataResponse = await createUserGameData(uuid);
      if (!userDataResponse.message) {
        round = (userDataResponse as UserData)[uuid].round;
      } else {
        res.status(500).send(userDataResponse as Error);
      }
    }
    res.set("Content-Type", "application/json").status(200).send({
      uuid: uuid,
      round: round,
    });
  });
};
