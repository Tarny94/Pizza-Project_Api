import { User } from "../interface/User";
import { userRepository } from "../repository/UserRepository";
import { userValidation } from "../validator/UserValidator";
import bcrypt from "bcrypt";

export class UserService {
  public static async registre(data: any) {
    try {
      const user = data.body;
      user.password = await bcrypt.hash(user.password, 8);
      userValidation.validationRegistre(user);
      return await userRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async login(data: any) {
    try {
      const user = data.body;

      userValidation.validationLogin(user);
      const userResponse: any = await userRepository.checkUser(user);
      await userValidation.verifyMatchPassword(
        user.password,
        userResponse[0].password
      );
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
