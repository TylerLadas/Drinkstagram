const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const drinkSchema = new Schema({
  ingredients: [
    {
      type: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  // saved drink id from theCocktailDB
  drinkId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = drinkSchema;