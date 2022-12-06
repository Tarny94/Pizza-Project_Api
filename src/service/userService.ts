import { User } from "../interface/User";
import { UserRepository } from "../repository/UserRepository";
import { UserValidation, userValidation } from "../validator/UserValidator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DATA_KEYS } from "../config/vars.config";
import express, { Express, Request, Response } from "express";
import { AdminAuth } from "../middleware/AdminAuth";

export class UserService {
  public static async registre(data: any) {
    try {
      const user = data.body;
      userValidation.validationRegistre(user);
      user.password = await bcrypt.hash(user.password, 8);
      return await UserRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async login(data: any) {
    try {
      const user = data.body;
      const private_key: any = DATA_KEYS.myDataKeys.privateKey;

      await userValidation.validationLogin(user);
      const userResponse: any = await UserRepository.checkUser(user);

      const isMatch: any = await userValidation.verifyMatchPassword(
        user.password,
        userResponse[0].password
      );
      user.password = await bcrypt.hash(user.password, 8);
      if (isMatch) {
        const token = jwt.sign(
          {
            _id: userResponse[0].user_id?.toString(),
            named: userResponse[0].name,
          },
          private_key
        );

        return {
          user: {
            _id: userResponse[0].user_id,
            name: userResponse[0].name,
            token: token,
          },
        };
      } else {
        throw new Error("Inccorect credentials");
      }
    } catch (error: any) {
      throw new Error("Inccorect credentials");
    }
  }

  public static async loginAdminPage(data: Request) {
    try {
      const token: string = data.body.token;
      if (!token) {
        throw new Error("Invalid action");
      }
      const user: any = AdminAuth(token);
      if (!user) {
        throw new Error("Invalid token");
      }
      const validAdmin: any = await UserRepository.getAdminId(user._id);
      if (validAdmin[0].user_id.toString() !== user._id) {
        throw new Error("Invalid user");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async loginAdmin(data: Request) {
    try {
      const user: any = data.body;
      if (!user) {
        throw new Error("Invalid token");
      }

      const validPassword: any = await UserRepository.getAdminPassword(user.id);

      await userValidation.verifyMatchPassword(
        user.code,
        validPassword[0].password
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

