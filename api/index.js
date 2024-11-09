const express = require("express");
const path = require("path");
const sqlite = require("better-sqlite3");
const db = require("./database/database");
const jokeRoutes = require("./routes/jokeRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/jokebook", jokeRoutes);

// Default route for serverless function
module.exports = app;