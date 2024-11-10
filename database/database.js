//database.js


//Connect to sqlite databse
const sqlite = require("better-sqlite3");

const path = require('path');
const dbPath = path.join(__dirname, 'jokebook.db'); // Absolute path to the database
const db = new sqlite(dbPath, { verbose: console.log, readonly: false });

//Create categories and jokes tables
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS jokes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      setup TEXT NOT NULL,
      delivery TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `
).run();

module.exports = db;
