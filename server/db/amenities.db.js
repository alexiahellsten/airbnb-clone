import Database from "better-sqlite3";

const amenitiesDb = new Database("./db/amenities.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default amenitiesDb;