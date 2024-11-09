//
// Name: Kennedy Page
// Date: 11.10.2024
// CSC 372-01

// This file sets up the Express server for the Joke Book application, configures middleware, and defines routes for handling requests related to jokes and categories.
//

const express = require("express");
const path = require("path");
const sqlite = require("better-sqlite3");
const db = require("./Jokebook/database/database");
const jokeRoutes = require("./Jokebook/routes/jokeRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/jokebook", jokeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
