import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";
import { Request, Response, NextFunction } from "express";
import { DATA_KEYS } from "../config/vars.config";

export const Auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const privateKey: any = DATA_KEYS.myDataKeys.privateKey;
    const token = req.headers["authorization"].replace("Bearer ", "");

    const user: any = await jwt.verify(token && token, privateKey);

    if (!token) {
      throw new Error("Invalid token");
    }

    if (!user) {
      throw new Error("Invalid token");
    }
    req.params.id = user._id;

    next();
  } catch (e: any) {
    res.status(401).send({ error: "Please authenticate..." });
  }
};
