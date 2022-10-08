import { Request, Response } from "express";
import { UserDataObject } from "../../../types";
import { cache } from "../../../../index";

export const getCurrentRound = (req: Request, res: Response) => {
  if (req.query.uuid) {
    const userData: UserDataObject = cache.get(req.query.uuid as string);
    if (userData) {
      const round = userData.rounds[userData.round];
      res.send(round ?? {});
    } else {
      res.send({});
    }
  } else {
    res.send({});
  }
};
