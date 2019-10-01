import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class UserPayload {
  @Field(returns => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  date?: Date;
}

export default UserPayload;
