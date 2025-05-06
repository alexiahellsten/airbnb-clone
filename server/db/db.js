import Database from 'better-sqlite3';

const db = new Database('./db/airbnb.db', {
  fileMustExist: false,
  verbose: console.log,
});

export default db;
