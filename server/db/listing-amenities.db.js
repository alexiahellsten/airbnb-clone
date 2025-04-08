import Database from "better-sqlite3";

const listingAmenitiesDb = new Database("./db/listing-amenities.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default listingAmenitiesDb;