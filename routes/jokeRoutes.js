//
// Name: Kennedy Page
// Date: 11.10.2024
// CSC 372-01

// This file defines the routes for the Joke Book application, linking URL paths to controller functions for handling requests.
//

const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");

router.get("/categories", jokeController.getCategories);
router.get("/joke/:category", jokeController.getJokesByCategory);
router.post("/joke/new", jokeController.addJoke);

module.exports = router;
