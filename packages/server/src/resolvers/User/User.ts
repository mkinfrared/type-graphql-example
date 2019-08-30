import { User } from "@db/entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class UserResolver {
  @Query(returns => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(returns => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    try {
      const user = User.create({ email, username, password });
      await user.save();

      return true;
    } catch (e) {
      // console.error(e);
      return false;
    }
  }
}

export default UserResolver;
