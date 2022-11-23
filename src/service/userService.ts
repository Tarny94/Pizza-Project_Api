import { User } from "../interface/User";
import { userRepository } from "../repository/UserRepository";
import { userValidation } from "../validator/UserValidator";

export class UserService {
  public static async registre(data: any) {
    try {
      const user = data.body;
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
      userValidation.verifyMatchPassword(
        user.password,
        userResponse[0].password
      );
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

