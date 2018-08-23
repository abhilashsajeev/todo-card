import React from "react";
import { AddTodoDialog } from "./AddTodoDialog";
import { mount } from "enzyme";


const mockSaveFunction = ()=>{}
const setup = () => {
  const props = {
    open: true,
    handleClose: jest.fn(),
    saveTodo: jest.fn()
  }
  const enzymeWrapper = mount(<AddTodoDialog {...props} />)
  return {
    props,
    enzymeWrapper
  }
};

describe("AddTodoDialog component", () => {
  it("render properly", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Dialog')).toBeDefined()
  });

  it("saves the todo value", ()=> {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setState({
      value: "Hello"
    })

    const submitButton = enzymeWrapper.find('Button')
      .findWhere(x => x.type()==="button" && x.text()==="Save todo");
    submitButton.simulate("click");
    expect(props.saveTodo.mock.calls.length).toBe(1);
  });
  
})