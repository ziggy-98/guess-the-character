import { Request, Response } from "express";
import { UserDataObject } from "../../../types";
import { cache } from "../../../../index";

export const getCurrentScore = (req: Request, res: Response): void => {
  if (req.query.uuid) {
    const userData: UserDataObject | undefined = cache.get(
      req.query.uuid as string
    );
    const score = userData ? userData.score : 0;
    res.send(score.toString());
  } else {
    res.redirect("/error");
  }
};
