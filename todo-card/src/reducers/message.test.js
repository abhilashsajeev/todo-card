import message from "./message";
import { SHOW_MESSAGE, ADD_TODO } from "../constants"

describe("Message Reducer", () => {
  it("Should return initial state", ()=> {
    expect(message(undefined, {})).toEqual("");
  })
  it("Should return payload value for show message", () => {
    const action = { type:SHOW_MESSAGE, payload: "Hi" };
    expect(message(null, action)).toEqual(action.payload);
  })

  it("Should return empty state message for others", () => {
    const action = { type:ADD_TODO, payload: "Hi" };
    expect(message(null, action)).toEqual("");
  })
})