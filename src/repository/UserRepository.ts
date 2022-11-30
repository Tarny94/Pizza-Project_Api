import { execute } from "../config/database";

export class UserRepository {
  public static async addUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      return await execute(
        "INSERT INTO users(name,address,email,phone,password) VALUES(?,?,?,?,?)",
        [user.fullName, user.address, user.email, user.phone, user.password]
      );
    } catch (err: any) {
      console.log("err: ", err.code);
      if (err.code === "ER_DUP_ENTRY") {
        throw new Error("Email is already used");
      }
      if (err.code === "ER_DATA_TOO_LONG") {
        throw new Error("Data is too long");
      }
      throw new Error("Something went wrong");
    }
  }

  public static async checkUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      return await execute("SELECT * FROM users WHERE email=?", [user.email]);
    } catch (err: any) {
      throw new Error("Something went wrong");
    }
  }
}

