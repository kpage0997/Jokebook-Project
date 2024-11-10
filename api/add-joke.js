// api/add-joke.js
const jokeModel = require('../models/jokeModel');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
      return res.status(400).json({ error: 'Category, setup, and delivery are required' });
    }

    try {
      const categoryId = jokeModel.addCategory(category);
      const jokeId = jokeModel.addJoke(categoryId, setup, delivery);
      return res.json({ id: jokeId, category, setup, delivery });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add joke' });
    }
  }
};