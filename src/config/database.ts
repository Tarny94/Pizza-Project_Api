import { DATA_SOURCES } from "./vars.config";
import mysql from "mysql";
import { rejects } from "assert";
import { resolve } from "path";

const dataConnect = DATA_SOURCES.mySqlDataSource;

let connection: any;

export const init = async () => {
  try {
    connection = await mysql.createConnection(dataConnect);
    await connection.connect();
    console.log("Connected to the MySQL server.");
  } catch (err: any) {
    throw new Error("Something went wrong");
  }
};

export const execute = async (query: String, user: String[]) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(query, user, function (error: any, result: any) {
      console.log("EEEE", error, result);
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
