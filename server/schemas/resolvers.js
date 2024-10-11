const User = require("../models/User"); // Adjust the path to your User model
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getBooks: async (parent, { searchTerm }) => {
      // Fetch data from Google Books API
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      // Check if the user exists
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Validate password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Sign the token
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      // Save book to MongoDB if authenticated
    },
    removeBook: async (parent, { bookId }, context) => {
      // Remove book from MongoDB if authenticated
    },
  },
};

module.exports = resolvers;
