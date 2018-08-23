import React from "react";
import { mount } from "enzyme";
import { Message } from "./Messages";


const setupWithProps = () => {
  const props = {
    message: "Hello"
  }
  const enzymeWrapper = mount(<Message {...props} />)

  return {
    props,
    enzymeWrapper
  }
};

const setupWithoutProps = () => {
  const props = {
    messages: undefined
  }
  const enzymeWrapper = mount(<Message {...props} />)

  return {
    props,
    enzymeWrapper
  }
};

describe("Messages component", () => {
  it("renders with props", () => {
    const { enzymeWrapper } = setupWithProps()
    expect(enzymeWrapper.find("span").text()).toEqual("Hello");
  });
  it("renders null without props", () => {
    const { enzymeWrapper } = setupWithoutProps()
    expect(enzymeWrapper.html()).toEqual(null);
  });

})