import React from "react";
import { mount, shallow } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { AllFilmsDocument } from "type/Graphql.type";

import Swapi from "./Swapi";

const request = {
  query: AllFilmsDocument,
  context: {
    clientName: "swapiLink"
  }
};

const result = {
  data: {
    result: "marklar"
  }
};

const mock = [{ request, result }];

describe("Swapi", () => {
  it("should be defined", () => {
    const wrapper = shallow(
      <MockedProvider mocks={mock}>
        <Swapi />
      </MockedProvider>
    );

    expect(wrapper).toBeDefined();
  });

  it("should render loading", () => {
    const wrapper = mount(
      <MockedProvider mocks={[{ request }]}>
        <Swapi />
      </MockedProvider>
    );

    expect(wrapper.children().children()).toContainReact(<h1>Loading...</h1>);
  });
});
