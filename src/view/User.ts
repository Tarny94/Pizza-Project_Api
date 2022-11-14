import validator from "validator";

class User {
  public checkRequireUserRegistre(user: any) {
    this.verifyEmail(user.email);
    this.verifyFirstName(user.firstName);
    this.verifyFirstName(user.lastName);
    this.verifyPassword(user.password);
    this.verifyPhone(user.phone);
  }

  private verifyFirstName(firstName: String) {
    if (/\d/.test("firstName")) {
      throw Error("First name have to contain no numbers");
    } else if (firstName.length < 3) {
      throw Error("First name it's too short");
    }
  }
  private verifyEmail(email: any) {
    if (!validator.isEmail(email)) {
      throw Error("Wrong Email");
    }
  }
  private verifyPhone(phone: string) {
    if (
      phone.length > 0 &&
      !validator.isNumeric(phone, { no_symbols: false })
    ) {
      throw Error("Wrong phone number");
    }
  }

  private verifyPassword(password: String) {
    // if(validator.isStrongPassword(password, {minLength: 6})){
    //     throw Error("Password it's too short")
    //  }
    if (password.length < 6) {
      throw Error("Password it's too short");
    }
  }
}
export const userModel = new User();
