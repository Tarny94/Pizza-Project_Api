export const DATA_SOURCES = {
  secret_key: process.env.MY_PRIVATE_KEY,
  mySqlDataSource: {
    host: process.env.MY_SQL_DB_HOST,
    user: process.env.MY_SQL_DB_USER,
    password: process.env.MY_SQL_DB_PASSWORD,
    database: process.env.MY_SQL_DB_DATABASE,
  },
};

export const DATA_KEYS = {
  myDataKeys: {
    privateKey: process.env.MY_PRIVATE_KEY,
    publicKey: process.env.MY_PUBLIC_KEY,
  },
};

export const ADMIN_KEY = process.env.MY_ADMIN_KEY;
