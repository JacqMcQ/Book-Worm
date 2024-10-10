// Use ES module imports instead of CommonJS
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"; // Ensure you use the correct import for express middleware
import path from "path";
import { authMiddleware } from "./utils/auth.js"; // Add .js extension
import { typeDefs, resolvers } from "./schemas/index.js"; // Add .js extension
import db from "./config/connection.js"; // Add .js extension
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const app = express();

// Connection URI for MongoDB
const dbURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jacqlynmcquade:<db_password>@bookworm.ohw3w.mongodb.net/?retryWrites=true&w=majority&appName=BookWorm";

// Connect to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create a new instance of Apollo Server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
});

// Function to start the Apollo Server
const startApolloServer = async () => {
  await server.start();

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use express middleware for GraphQL
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware, // Ensure that the context is applied here
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

    // Catch-all route to serve index.html for single-page app
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Connect to the database and start the server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer().catch((error) => {
  console.error("Error starting server:", error);
});
