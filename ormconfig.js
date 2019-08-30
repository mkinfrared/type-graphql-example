const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;

module.exports = {
  name: "default",
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  dropSchema: true,
  entities: ["src/db/entity/**/*.ts"],
  migrations: ["src/db/migration/**/*.ts"],
  subscribers: ["src/db/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/db/entity",
    migrationsDir: "src/db/migration",
    subscribersDir: "src/db/subscriber"
  }
};
