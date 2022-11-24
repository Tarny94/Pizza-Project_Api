import { User } from "../interface/User";
import { userRepository } from "../repository/UserRepository";
import { userValidation } from "../validator/UserValidator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DATA_KEYS } from "../config/vars.config";

export class UserService {
  public static async registre(data: any) {
    try {
      const user = data.body;
      userValidation.validationRegistre(user);
      user.password = await bcrypt.hash(user.password, 8);
      return await userRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async login(data: any) {
    try {
      const user = data.body;
      const private_key: any = DATA_KEYS.myDataKeys.privateKey;
      await userValidation.validationLogin(user);

      const userResponse: any = await userRepository.checkUser(user);

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
          private_key,
          { expiresIn: "40 seconds" }
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
}

