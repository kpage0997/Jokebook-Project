const express = require("express");
const path = require("path");
const sqlite = require("better-sqlite3");
const db = require("../database/database");
const jokeRoutes = require("../routes/jokeRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  

app.use("/jokebook", jokeRoutes);

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Default route for serverless function
module.exports = app;