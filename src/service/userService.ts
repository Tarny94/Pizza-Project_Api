import { User } from "../interface/User";
import { userRepository } from "../repository/UserRepository";
import { userValidation } from "../validator/UserValidator";

export class UserService {
  public static async registre(user: User) {
    try {
      userValidation.validationRegistre(user);
      return await userRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async login(user: User) {
    try {
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
