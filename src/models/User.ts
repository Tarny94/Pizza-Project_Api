const validator = require("validator")



class User {


  public  verifyUser(user : any) {
    this.verifyEmail(user.email)
    this.verifyFirstName(user.firstName)
    this.verifyFirstName(user.lastName)
    this.verifyPassword(user.password)
    this.verifyPhone(user.phone)
  }

  public  verifyFirstName(firstName: String) {
      if(/\d/.test("firstName")) {
        throw Error("First name have to contain no numbers")
      } else if(firstName.length < 3) {
        throw Error("First name it's too short")
      }
  }
  public  verifyEmail(email: any) {

     if(!validator.isEmail(email)) {
      throw Error("Wrong Email")
     }
  }
  public  verifyPhone(phone:  String) {
      if((phone.length> 0 )  && (!validator.isNumeric(phone, {no_symbols: false}))){
        throw Error("Wrong phone number")
      }
  }

  public  verifyPassword(password : String) {
      // if(validator.isStrongPassword(password, {minLength: 6})){
      //     throw Error("Password it's too short")
      //  }
      if(password.length < 6) {
        throw Error("Password it's too short")
      }
    }
}

export const Verify = new User()