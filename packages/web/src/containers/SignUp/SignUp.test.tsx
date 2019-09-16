import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { mount, shallow } from "enzyme";

import Container, { Container as CC } from "./SignUp";
import {
  RegisterUserDocument,
  RegisterUserMutationVariables
} from "type/Graphql.type";

const variables: RegisterUserMutationVariables = {
  email: "marklar@mail.com",
  username: "marklar",
  password: "Foobar#1",
  passwordConfirm: "Foobar#1"
};

const request = {
  query: RegisterUserDocument,
  variables
};

const result = {
  data: {
    email: "foobar@marklar.com"
  }
};

const mocks = [{ request, result }];

describe("SignUp", () => {
  it("should be defined", () => {
    const wrapper = shallow(
      <MockedProvider>
        <Container />
      </MockedProvider>
    );

    const instance = wrapper.find(Container);

    expect(instance).toBeDefined();
  });

  it("should call register", async done => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Container />
      </MockedProvider>
    );

    const instance = wrapper.find(CC).instance() as CC;

    const spy = jest.spyOn(instance, "handleSubmit");

    wrapper.update();
    instance.forceUpdate();

    wrapper.find("input[name='email']").simulate("change", {
      target: { name: "email", value: variables.email }
    });

    wrapper.find("input[name='username']").simulate("change", {
      target: { name: "username", value: variables.username }
    });

    wrapper.find("input[name='password']").simulate("change", {
      target: { name: "password", value: variables.password }
    });

    wrapper.find("input[name='passwordConfirm']").simulate("change", {
      target: { name: "passwordConfirm", value: variables.passwordConfirm }
    });

    await wrapper.find("button[type='submit']").simulate("click");

    await wrapper.find("form").simulate("submit");

    window.setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 0);
  });
});
