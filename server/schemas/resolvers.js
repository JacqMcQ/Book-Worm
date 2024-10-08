const resolvers = {
  Query: {
    getBooks: async (parent, { searchTerm }) => {
      // Fetch data from Google Books API
    },
  },
  Mutation: {
    saveBook: async (parent, { book }, context) => {
      // Save book to MongoDB if authenticated
    },
    removeBook: async (parent, { bookId }, context) => {
      // Remove book from MongoDB if authenticated
    },
  },
};
