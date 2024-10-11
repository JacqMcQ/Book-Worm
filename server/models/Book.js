const { Schema } = require("mongoose");

// This is a subdocument schema; it won't become its own model but will be used as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // Saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
    index: true, // Optional: index for faster querying
  },
  image: {
    type: String,
    default: "", // Optional: default to empty string if no image provided
  },
  link: {
    type: String,
    default: "", // Optional: default to empty string if no link provided
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
