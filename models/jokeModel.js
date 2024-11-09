//
// Name: Kennedy Page
// Date: 11.10.2024
// CSC 372-01

// This file manages interactions with the database, including functions to add and retrieve jokes and categories.
//

// Import the database connection
const db = require("../database/database");

// Function to add a new category to the database
const addCategory = (name) => {
  // Use `INSERT OR IGNORE` to avoid duplication of category names
  const insert = db.prepare(
    `INSERT OR IGNORE INTO categories (name) VALUES (?)`
  );
  insert.run(name);

  // Fetch the category's ID after insertion (or existing ID if it already exists)
  const category = db
    .prepare(`SELECT id FROM categories WHERE name = ?`)
    .get(name);
  return category.id; // Return the category ID
};

// Function to get all categories from the database
const getCategories = () => {
  const stmt = db.prepare(`SELECT name FROM categories`);
  const rows = stmt.all(); // Execute the query to get all rows
  return rows.map((row) => row.name); // Return an array of category names
};

// Function to add a new joke to the database
const addJoke = (categoryId, setup, delivery) => {
  // Insert a new joke with a reference to its category ID
  const stmt = db.prepare(
    `INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)`
  );
  const result = stmt.run(categoryId, setup, delivery);
  return result.lastInsertRowid; // Return the ID of the newly added joke
};

// Function to retrieve jokes by category name
const getJokesByCategory = (category) => {
  const stmt = db.prepare(`
      SELECT setup, delivery FROM jokes
      JOIN categories ON categories.id = jokes.category_id
      WHERE categories.name = ?
    `);
  return stmt.all(category);
};

// Export the functions to be used in other parts of the application
module.exports = {
  addCategory,
  getCategories,
  addJoke,
  getJokesByCategory,
};
