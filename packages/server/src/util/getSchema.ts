import { buildSchema } from "type-graphql";

import User from "@resolvers/User";

export default async () => {
  const schema = await buildSchema({
    resolvers: [User]
  });

  return schema;
};
