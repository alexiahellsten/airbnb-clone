import Database from "better-sqlite3";

const db = new Database("./db/listings.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default db;