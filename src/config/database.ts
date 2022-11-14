import { DATA_SOURCES } from "./vars.config";
import mysql from "mysql";
import { json } from "stream/consumers";

const dataConnect = DATA_SOURCES.mySqlDataSource;

let connection: any;

export const init = async () => {
  try {
    connection = await mysql.createConnection(dataConnect);
    await connection.connect();
    console.log("Connected to the MySQL server.");
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const execute = async (query: String, user: String[]) => {
  try {
    await connection.query(query, user, function (error: any, response: any) {
      if (error) {
        throw new Error(error.message);
      }
      console.log(response);
    });
  } catch (err: any) {
    throw new Error(err.json());
  }
};
