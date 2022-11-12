import * as mysql from 'mysql2';

class Server  {
  public readonly  connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "muiamati",
      database: "pizza_shop",
    });

    this.connection.connect(function(err: any) {
      if (err) {
        return console.error('error: ' + err.message);
      }    
      console.log('Connected to the MySQL server.');
    });
  }
}


 class UserRepository {

  readAll() {
    console.log("called");
    const server = new Server();
    server.connection.query("SELECT * FROM users", function(error, result, fields) {
      if (error) {
        return console.error("error", error.message);
      }
    
      console.log(result);
    });
  } 

  addUser(user: any) {
    console.log(user);
    const server = new Server();
    server.connection.query(`INSERT INTO users(first_name,last_name,email,phone,password) VALUES(?,?,?,?,?)`, [user.firstName,user.lastName,user.email,user.phone,user.password], function(error, result, fields) {
      if (error) {
        return console.error("error", error.message);
      }
    
      console.log("Added: "+result);
    
    });
  }
}

export const userC = new UserRepository();





// const mysql = require("mysql");
// const Config = require("./config");

// console.log(Config.getConfig);

// const connection = mysql.createConnection(Config.getConfig);

// connection.connect(function (err : any) {
//   if (err) {
//     return console.error("error", err.message);
//   }
//   console.log("Connected to the MySQL server.");
// });

// connection.query("SELECT * FROM users", async (error : Error, result : any, field : any) => {
//   if(error) {
//     return console.error("error", error.message);
//   }
//   console.log(result);
// })
// connection.end();





// export const UR = new UserRepository();