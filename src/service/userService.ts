const validator = require("validator");

class UserService {
  public verifyUserRegistre(user: any) {
    this.verifyFields(user);
    this.verifyEmail(user.email);
    this.verifyFirstName(user.firstName);
    this.verifyFirstName(user.lastName);
    this.verifyPassword(user.password);
    this.verifyPhone(user.phone);
  }

  public verifyFields(user: any) {
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
  private verifyPhone(phone: String) {
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

export const userService = new UserService();
