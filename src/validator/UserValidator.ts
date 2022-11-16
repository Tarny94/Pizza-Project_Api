import validator from "validator";
import { User } from "../interface/User";

class UserValidation {
  public validationRegistre(user: User) {
    if (!user) {
      throw Error("Complet the require fields");
    }
    if (!user.fullName) {
      throw new Error("Full name is required");
    }
    if (!user.address) {
      throw Error("Address is required");
    }
    if (!user.email) {
      throw Error("Email is required");
    }
    if (!user.password) {
      throw Error("Password is required");
    }

    this.checkRequireUserRegistre(user);
  }

  public validationLogin(user: User) {
    if (!user.email) {
      throw Error("Email is required");
    }
    if (!user.password) {
      throw Error("Password is required");
    }
    this.verifyEmail(user);
    this.verifyPassword(user);
  }

  public checkRequireUserRegistre(user: User) {
    this.verifyEmail(user);
    this.verifyFullName(user);
    this.verifyPassword(user);
    this.verifyPhone(user);
  }

  public verifyFullName(user: User) {
    if (/\d/.test(JSON.stringify(user.fullName))) {
      throw Error("Full name have to contain no numbers");
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
      throw new Error("Password is too short");
    }
  }

  public verifyMatchPassword(pass: String, passResponse: String) {
    if (pass !== passResponse) {
      throw new Error("Something went Wrong");
    }
  }
}

export const userValidation = new UserValidation();
