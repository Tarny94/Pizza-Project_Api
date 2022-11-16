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
      console.log(err);
      throw new Error(err.code);
    }
  }

  public async checkUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      return await execute("SELECT * FROM users WHERE email=?", [user.email]);
    } catch (err: any) {
      throw new Error(err.code);
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
