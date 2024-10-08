import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

// Set up the Apollo Client
const client = new ApolloClient({
  uri: "/graphql", // endpoint for server
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("id_token")
      ? `Bearer ${localStorage.getItem("id_token")}`
      : "",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
