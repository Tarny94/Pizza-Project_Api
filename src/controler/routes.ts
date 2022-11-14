import { execute } from "../config/database";

class UserRepository {
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

  public async addUser(user: any) {
    try {
      if (!user) {
        throw new Error("No user!");
      }
      execute(
        "INSERT INTO users(first_name,last_name,email,phone,password) VALUES(?,?,?,?,?)",
        [user.firstName, user.lastName, user.email, user.phone, user.password]
      );
    } catch (err: any) {
      throw new Error("ErrAdd: ", err);
    }
  }
  public loginUser(user: any) {
    // console.log(user);
    // server.connection.query(
    //   "SELECT * FROM users WHERE email = ?",
    //   [user.email],
    //   function (error, response) {}
    // );
  }
}

export const userRepository = new UserRepository();
