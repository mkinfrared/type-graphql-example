import http from "http";

import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectRedis from "connect-redis";
import { CorsOptions } from "cors";
import express from "express";
import session from "express-session";

import { ServerContext } from "@type/Server.type";
import validateTokens from "@middleware/validateTokens";
import formatError from "@util/formatError";
import {
  NODE_ENV,
  REDIS_HOST,
  SERVER_ADDRESS,
  SERVER_PORT,
  SESSION_SECRET
} from "@util/secrets";
import getSchema from "@util/getSchema";

const startServer = async () => {
  const RedisStore = connectRedis(session);
  const apolloServer = new ApolloServer({
    schema: await getSchema(),
    formatError,
    context: (context): ServerContext => ({
      request: context.req,
      response: context.res
    })
  });

  const app = express();

  const cors: CorsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:4000"]
  };

  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     credentials: true
  //   })
  // );

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

  app.use(cookieParser());
  app.use(validateTokens);

  const httpServer = http.createServer(app);
  apolloServer.applyMiddleware({ app, cors });
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
    console.log(
      `Documentation is available at ${SERVER_ADDRESS}:${SERVER_PORT}${apolloServer.graphqlPath}`
    );
  });

  return httpServer;
};

export default startServer;
