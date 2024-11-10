const express = require("express");
const path = require("path");
const sqlite = require("better-sqlite3");
const db = require("../database/database");
const jokeRoutes = require("../routes/jokeRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/jokebook", jokeRoutes);

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Default route for serverless function
module.exports = app;
