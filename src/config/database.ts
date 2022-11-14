import { response } from "express";
import { DATA_SOURCES } from "./vars.config";

const dataConnect = DATA_SOURCES.mySqlDataSource;
const mysql = require("mysql");

let connection: any = "";

export const init = async () => {
  try {
    connection = await mysql.createConnection(dataConnect);
    await connection.connect(function (err: any) {
      if (err) {
        return console.error("error", err.message);
      }
      console.log("Connected to the MySQL server.");
    });
  } catch (err: any) {
    throw new Error("Err: ", err);
  }
};

export const execute = async (query: String, user: String[]) => {
  try {
    await connection.query(query, user, function (error: any, response: any) {
      if (error) {
        throw Error("Error:", error.message);
      }
      console.log(response);
    });
  } catch (err: any) {
    throw new Error("Err:", err);
  }
};
