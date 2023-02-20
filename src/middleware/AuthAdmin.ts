import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";
import { Request, Response, NextFunction } from "express";
import { DATA_KEYS } from "../config/vars.config";

export const AdminAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const privateKey: any = DATA_KEYS.myDataKeys.privateKey;
    const token = await req.header("Authorization").replace("Bearer ", "");
    const user: any = jwt.verify(token, privateKey);

    if (!token) {
      throw new Error("Invalid token");
    }

    if (!user) {
      throw new Error("Invalid token");
    }
    const validAdmin: any = await UserRepository.getAdminId(user._id);
    if (validAdmin[0].user_id.toString() !== user._id) {
      throw new Error("Invalid user");
    }
    next();
  } catch (e: any) {
    res.status(401).send({ error: "Please admin to authenticate." });
  }
};
