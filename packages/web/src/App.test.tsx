import { shallow } from "enzyme";
import React from "react";

import App from "./App";

describe("App", () => {
  it("should be defined", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toBeDefined();
  });
});
