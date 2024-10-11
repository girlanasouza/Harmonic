import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.uid) return next();
  if ("uid" in req.cookies) return next();
  else res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};
