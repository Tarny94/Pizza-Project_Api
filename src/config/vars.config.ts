export const DATA_SOURCES = {
  mySqlDataSource: {
    host: process.env.MY_SQL_DB_HOST,
    user: process.env.MY_SQL_DB_USER,
    password: process.env.MY_SQL_DB_PASSWORD,
    database: process.env.MY_SQL_DB_DATABASE,
  },
};

console.log(process.env.MY_SQL_DB_HOST);