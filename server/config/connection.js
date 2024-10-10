import mongoose from "mongoose";
//  MongoDB URI from the environment variable 
const dbURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jacqlynmcquade:<db_password>@bookworm.ohw3w.mongodb.net/?retryWrites=true&w=majority&appName=BookWorm";

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the connection
export default mongoose.connection;
