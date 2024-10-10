const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://jacqlynmcquade:<db_password>@bookworm.ohw3w.mongodb.net/?retryWrites=true&w=majority&appName=BookWorm"
);

module.exports = mongoose.connection;
