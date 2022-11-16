import validator from "validator";
import { User } from "../interface/User";
import bcrypt from "bcrypt";

class UserValidation {
  public validationRegistre(user: User) {
    if (!user.fullName && !user.address && !user.email && !user.password) {
      throw Error("Complete the required fields *");
    }
    if (!user.fullName) {
      throw new Error("Name is required");
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
      throw Error("Name have to contain no numbers");
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
    if (user.password.length < 6) {
      throw new Error("Password is too short");
    }
    if (user.password.toLowerCase() === "password") {
      throw new Error("'Password' won't work as a password");
    }
  }

  public async verifyMatchPassword(pass: string, passResponse: string) {
    const match = await bcrypt.compare(pass, passResponse);
    console.log(" match: ", match);
    if (!match) {
      throw new Error("Something went Wrong");
    }
  }
}

export const userValidation = new UserValidation();
