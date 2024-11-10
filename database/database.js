//database.js
const Database = require("better-sqlite3");

const path = require('path');

// Set the path to your SQLite database file
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'database.db');

// Create a database instance
const db = Database(dbPath, { verbose: console.log });

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
