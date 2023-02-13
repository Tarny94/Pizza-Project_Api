import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";
import { Request, Response, NextFunction } from "express";

export const Auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    const user: any = jwt.verify(token, "mytimeisnaw");

    if (!token) {
      throw new Error("Invalid token");
    }

    if (!user) {
      throw new Error("Invalid token");
    }

    next();
  } catch (e: any) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
