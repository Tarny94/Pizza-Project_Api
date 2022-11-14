import { userModel } from "../view/User";
import { userRepository } from "../repository/user";
import { userValidation } from "../model/validation";

export class Service {
  public static checkRegistreService(user: any) {
    try {
      userValidation.validationFields(user);
      userModel.checkRequireUserRegistre(user);
      userRepository.addUser(user);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
