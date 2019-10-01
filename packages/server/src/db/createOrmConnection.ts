/* istanbul ignore file */

import path from "path";

import { createConnection } from "typeorm";

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV
} from "@util/secrets";

export default async () => {
  if (NODE_ENV === "production") {
    const connection = await createConnection({
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

    return connection;
  }

  if (NODE_ENV === "test") {
    const connection = await createConnection({
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

    return connection;
  }

  const connection = await createConnection();

  return connection;
};
