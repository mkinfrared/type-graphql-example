/* istanbul ignore file */

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV
} from "@util/secrets";
import path from "path";
import { createConnection } from "typeorm";

export default async () => {
  if (NODE_ENV === "production") {
    return await createConnection({
      name: "default",
      type: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: false,
      logging: false,
      dropSchema: false,
      entities: [path.resolve(__dirname, "entity/**/*.js")],
      migrations: [path.resolve(__dirname, "migration/**/*.js")],
      subscribers: [path.resolve(__dirname, "subscriber/**/*.js")]
    });
  }

  if (NODE_ENV === "test") {
    return await createConnection({
      name: "default",
      type: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: "test",
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [path.resolve(__dirname, "entity/**/*.ts")],
      migrations: [path.resolve(__dirname, "migration/**/*.ts")],
      subscribers: [path.resolve(__dirname, "subscriber/**/*.ts")]
    });
  }

  return await createConnection();
};
