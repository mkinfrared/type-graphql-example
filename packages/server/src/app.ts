import getSchema from "@util/getSchema";
// import { redis } from "@util/redis";
import {
  // FRONTEND_HOST,
  NODE_ENV,
  REDIS_HOST,
  SERVER_ADDRESS,
  SERVER_PORT,
  SESSION_SECRET
} from "@util/secrets";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";

export const startServer = async () => {
  const RedisStore = connectRedis(session);
  const apolloServer = new ApolloServer({
    schema: await getSchema()
  });

  const app = express();

  app.use(
    cors({
      origin: "*",
      credentials: true
    })
  );

  app.use(bodyParser.json());

  app.use(
    session({
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      },
      store: new RedisStore({
        host: REDIS_HOST
      })
    })
  );

  apolloServer.applyMiddleware({ app });

  const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
    console.log(
      `Documentation is available at ${SERVER_ADDRESS}:${SERVER_PORT}/graphql`
    );
  });

  return server;
};
