const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://jacqlynmcquade:Yi0Y5eKcQK70amKl@bookworm.ohw3w.mongodb.net/?retryWrites=true&w=majority&appName=BookWorm"
);

module.exports = mongoose.connection;
