import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { CachePersistor } from "apollo-cache-persist";
import { PersistedData, PersistentStorage } from "apollo-cache-persist/types";

import BASE_URL from "util/secrets";

const myLink = new HttpLink({
  uri: BASE_URL,
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000"
  }
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

const persistor = new CachePersistor({
  cache: new InMemoryCache(),
  storage: window.localStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >
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

export { persistor };
