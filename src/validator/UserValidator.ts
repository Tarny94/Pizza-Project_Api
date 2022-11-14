import validator from "validator";
import { User } from "../interface/User";

class UserValidation {
  public validationRegistreFields(user: User) {
    if (!user) {
      throw Error("Complet the require fields");
    }
    if (!user.firstName) {
      throw Error("First Name field is required");
    }
    if (!user.lastName) {
      throw Error("Last Name field is required");
    }
    if (!user.email) {
      throw Error("Email field is required");
    }
    if (!user.password) {
      throw Error("Password field is required");
    }

    this.checkRequireUserRegistre(user);
  }

  public checkRequireUserRegistre(user: User) {
    this.verifyEmail(user);
    this.verifyFirstName(user);
    this.verifyFirstName(user);
    this.verifyPassword(user);
    this.verifyPhone(user);
  }

  public verifyFirstName(user: User) {
    if (/\d/.test("firstName")) {
      throw Error("First name have to contain no numbers");
    } else if (user.firstName.length < 3) {
      throw new Error("First name it's too short");
    }
  }
  public verifyEmail(user: User) {
    if (!validator.isEmail(user.email)) {
      throw Error("Wrong Email");
    }
  }
  public verifyPhone(user: User) {
    if (
      user.phone.length > 0 &&
      !validator.isNumeric(user.phone, { no_symbols: false })
    ) {
      throw Error("Wrong phone number");
    }
  }

  public verifyPassword(user: User) {
    // if(validator.isStrongPassword(password, {minLength: 6})){
    //     throw Error("Password it's too short")
    //  }
    if (user.password.length < 6) {
      throw Error("Password it's too short");
    }
  }
}

export const userValidation = new UserValidation();
