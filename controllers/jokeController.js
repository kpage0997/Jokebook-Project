//
// Name: Kennedy Page
// Date: 11.10.2024
// CSC 372-01

// This file contains the controller functions for handling requests related to jokes and categories, including fetching and adding data.
//

// Import the jokeModel functions
const jokeModel = require("../models/jokeModel");

// Controller function to get all categories

// http://localhost:3000/jokebook/categories

exports.getCategories = (req, res) => {
  try {
    // Use jokeModel to fetch categories from the database
    const categories = jokeModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

// Controller function to get jokes by category

//http://localhost:3000/jokebook/joke/lameJoke
// http://localhost:3000/jokebook/joke/funnyJoke

exports.getJokesByCategory = (req, res) => {
  const category = req.params.category;
  const limit = req.query.limit;

  try {
    // Retrieve jokes from the specified category
    let jokes = jokeModel.getJokesByCategory(category);

    // If a limit is provided, slice the jokes array

    // http://localhost:3000/joke/funnyJoke?limit=2
    if (limit) {
      jokes = jokes.slice(0, limit);
    }

    // If no jokes found, return a 404 error
    if (jokes.length === 0) {
      return res
        .status(404)
        .json({ error: "Category not found or has no jokes" });
    }

    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve jokes" });
  }
};

// Controller function to add a new joke
// http://localhost:3000/jokebook/joke/new
exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;

  // Check for missing fields
  if (!category || !setup || !delivery) {
    return res
      .status(400)
      .json({ error: "Category, setup, and delivery are required" });
  }

  try {
    // Add or get category in the database and retrieve its ID
    const categoryId = jokeModel.addCategory(category);

    // Add the joke to the database under the specified category
    const jokeId = jokeModel.addJoke(categoryId, setup, delivery);

    res.json({ id: jokeId, category, setup, delivery }); // Include category in the response
  } catch (err) {
    console.error("Error adding joke:", err);
    res.status(500).json({ error: "Failed to add joke" });
  }
};
