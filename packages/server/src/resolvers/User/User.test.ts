import { User } from "@db/entity/User";
import { client } from "@test/heplers";
import { registerMutation } from "@test/heplers";

const email = "marklar@gmail.com";
const username = "marklar";
const password = "foobar";

describe("User resolver", () => {
  it("should create user in database and return true", async () => {
    const response = await client.request(
      registerMutation(email, password, username)
    );

    expect(response.register).toBe(true);

    const user = await User.findOne({ where: { email } });

    expect(user).toBeDefined();
    expect(user!.email).toBe(email);
    expect(user!.username).toBe(username);
    expect(user!.password).toBe(password);
  });

  it("should return false when email was already used", async () => {
    await client.request(registerMutation(email, password, username));

    const response = await client.request(
      registerMutation(email, password, username)
    );

    expect(response.register).toBe(false);
  });
});
