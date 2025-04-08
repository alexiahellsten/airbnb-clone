import Database from "better-sqlite3";

const listingImagesDb = new Database("./db/listing-images.db", {
     fileMustExist: true,
     verbose: console.log 
     });

export default listingImagesDb;