import { NextFunction, Request, Response } from "express";

export interface Error {
  [key: string]: string[];
}

export interface ServerContext {
  request: RequestWithUser;
  response: Response;
}

export interface RequestWithUser extends Request {
  userID?: string;
}

export type ExpressMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => any;
