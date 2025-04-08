import Database from "better-sqlite3";

const categoryDb = new Database("./db/category.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default categoryDb;