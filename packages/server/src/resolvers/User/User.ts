import { registerValidation } from "@bookstore/common";
import { PubSubEngine, UserInputError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription
} from "type-graphql";

import { ServerContext } from "@type/Server.type";
import generateTokens from "@util/generateTokens";
import UserPayload from "@resolvers/User/types";
import formatYupErrors from "@util/formatYupErrors";
import User from "@db/entity/User";

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

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({ email, username, password: hashedPassword });
    await user.save();

    return true;
  }

  @Mutation(returns => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() context: ServerContext
  ) {
    const error: any = {};
    error.username = ["Invalid credentials"];

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new UserInputError("Invalid input", error);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UserInputError("Invalid input", error);
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    const [accessToken, refreshToken] = await generateTokens({
      userID: user.id
    });

    context.response.cookie("access-token", accessToken, { httpOnly: true });
    context.response.cookie("refresh-token", refreshToken, { httpOnly: true });

    await pubSub.publish("NEW_LOGIN", payload);

    return user;
  }

  @Query(returns => User, { nullable: true })
  async currentUser(@Ctx() context: ServerContext) {
    const { userID } = context.request;

    if (!userID) {
      return null;
    }

    const user = await User.findOne(userID);

    return user;
  }

  @Subscription({ topics: "NEW_LOGIN" })
  loginEvent(@Root() newLoginPayload: UserPayload): UserPayload {
    return {
      ...newLoginPayload,
      date: new Date()
    };
  }

  @Subscription({ topics: "NEW_LOGIN" })
  logoutEvent(@Root() newLoginPayload: UserPayload): UserPayload {
    return {
      ...newLoginPayload,
      date: new Date()
    };
  }

  @Query(returns => Boolean, { nullable: true })
  async logout(@Ctx() context: ServerContext) {
    context.response.clearCookie("access-token");
    context.response.clearCookie("refresh-token");

    return true;
  }
}

export default UserResolver;
