import Database from "better-sqlite3";

const listingsDb = new Database("./db/listings.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default listingsDb;