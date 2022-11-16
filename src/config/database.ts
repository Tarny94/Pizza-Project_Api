import { DATA_SOURCES } from "./vars.config";
import mysql from "mysql";

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

export const execute = async (query: string, values: string[]) => {
  return new Promise((resolve: any, reject: any) => {
    connection.query(query, values, function (error: any, result: any) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
