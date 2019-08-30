import User from "@resolvers/User";
import { buildSchema } from "type-graphql";

export default async () => {
  const schema = await buildSchema({
    resolvers: [User]
  });

  return schema;
};
