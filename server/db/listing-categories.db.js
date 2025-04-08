import Database from "better-sqlite3";

const listingCategoriesDb = new Database("./db/listing-categories.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default listingCategoriesDb;