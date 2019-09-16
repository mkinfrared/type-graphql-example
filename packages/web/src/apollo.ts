import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from "apollo-boost";

import { BASE_URL } from "util/secrets";

const myLink = new HttpLink({
  uri: BASE_URL,
  credentials: "same-origin"
});

const swapiLink = new HttpLink({
  uri: "https://swapi.graph.cool/",
  // fetchOptions: {
  //   mode: "no-cors"
  // },
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000"
  }
});

const client = new ApolloClient({
  link: ApolloLink.split(
    op => op.getContext().clientName === "swapiLink",
    swapiLink,
    myLink
  ),
  cache: new InMemoryCache()
});

export default client;
