import { User } from "../interface/User";
import { userRepository } from "../repository/UserRepository";
import { userValidation } from "../validator/UserValidator";

export class UserService {
  public static async registre(user: User) {
    try {
      userValidation.validationRegistreFields(user);
     return await userRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
