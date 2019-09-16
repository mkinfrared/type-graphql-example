import { registerValidation } from "@bookstore/common";
import formatYupErrors from "@util/formatYupErrors";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserInputError } from "apollo-server-express";

import User from "@db/entity/User";

@Resolver()
class UserResolver {
  @Query(returns => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(returns => User)
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("passwordConfirm") passwordConfirm: string
  ) {
    try {
      await registerValidation.validate(
        { email, username, password, passwordConfirm },
        {
          abortEarly: false
        }
      );
    } catch (e) {
      const error = formatYupErrors(e);
      throw new UserInputError("Invalid input", error);
    }

    const usernameTaken = await User.findOne({ where: { username } });
    const emailTaken = await User.findOne({ where: { email } });

    if (usernameTaken || emailTaken) {
      const error: any = {};

      if (usernameTaken) {
        error.username = ["username is already taken"];
      }

      if (emailTaken) {
        error.email = ["email is already taken"];
      }
      throw new UserInputError("Invalid input", error);
    }

    const user = User.create({ email, username, password });
    await user.save();

    return user;
  }
}

export default UserResolver;
