const validator = require("validator");

class UserValidation {
  public validationFields(user: any) {
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
}

export const userValidation = new UserValidation();
