import Database from "better-sqlite3";

const usersDb = new Database("./db/users.db", {
  fileMustExist: true,
  verbose: console.log
});

export default usersDb;
