import { execute } from "../config/database";

class UserRepository {
  public async addUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      return await execute(
        "INSERT INTO users(name,addres,email,phone,password) VALUES(?,?,?,?,?)",
        [user.fullName, user.addres, user.email, user.phone, user.password]
      );
    } catch (err: any) {
     
      if (err.code === "ER_DUP_ENTRY") {
        throw new Error("Email is already used");
      }
      if (err.code === "ER_DATA_TOO_LONG") {
        throw new Error("Data is too long");
      }
      throw new Error("Something went wrong");
  }
}

  public async checkUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      return await execute("SELECT * FROM users WHERE email=?", [user.email]);
    } catch (err: any) {
      throw new Error("Something went wrong");
    }
    // console.log(user);
    // server.connection.query(
    //   "SELECT * FROM users WHERE email = ?",
    //   [user.email],
    //   function (error, response) {}
    // );
    // public readAll() {
    //   const server = new Server();
    //   server.connection.query(
    //     "SELECT * FROM users",
    //     function (error, result, fields) {
    //       if (error) {
    //         return console.error("error", error.message);
    //       }
    //     }
    //   );
    // }
  }
}

export const userRepository = new UserRepository();
