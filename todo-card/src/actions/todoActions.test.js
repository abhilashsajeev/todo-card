import * as actions from "./todoActions";
import * as constants from "../constants";

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const apiUrl = "http://localhost:8080/"

describe("Todo Actions test", () => {
  it("Show message should return payload ", () => {
    let message = "Hello"
    let dispatchObject = actions.showMessage(message)
    expect(dispatchObject.type).toEqual(constants.SHOW_MESSAGE);
    expect(dispatchObject.payload).toEqual(message);
  });

  it("Load Todos should return correct payload ", () => {
    let todos = {
      todos: [{
        id: 1,
        status: 'todo',
        name: "Todo content"
      }]
    }
    let dispatchObject = actions.loadTodos(todos)
    expect(dispatchObject.type).toEqual(constants.LOAD_TODOS);
    expect(
      JSON.stringify(dispatchObject.payload)
    ).toEqual(JSON.stringify(todos));
  });

  it("Remove Todos should return payload ", () => {
    const id = 1
    let dispatchObject = actions.removeTodos(id)
    expect(dispatchObject.type).toEqual(constants.REMOVE_TODO);
    expect(dispatchObject.payload).toEqual(id);
  });

  it("Replace Todos should return payload ", () => {
    const id = 1
    let dispatchObject = actions.replaceTodo(id)
    expect(dispatchObject.type).toEqual(constants.REPLACE_TODO);
    expect(dispatchObject.payload).toEqual(id);
  });

  it("Add Todos should return payload ", () => {
    const todos = {
      todos: [{
        id: 1,
        status: 'todo',
        name: "Todo content"
      }]
    }
    let dispatchObject = actions.addTodo(todos)
    expect(dispatchObject.type).toEqual(constants.ADD_TODO);
    expect(
      JSON.stringify(dispatchObject.payload)
    ).toEqual(JSON.stringify(todos));
  });

});

describe("Todo Action creaters async", () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it("fetchTodo should return correct actions", () => {
    fetchMock
      .getOnce(`${apiUrl}/todos`, {
        body: {
          todos: [{
            id: 1,
            name: "Hi",
            status: "todo"
          }]
        }, headers: { 'content-type': 'application/json' }
      });
    const expectedActions = [
      { type: constants.SHOW_MESSAGE, payload: "Fetching todos" },
      {
        type: constants.LOAD_TODOS, payload: {
          todos: [{
            id: 1,
            name: "Hi",
            status: "todo"
          }]
        }
      }
    ]
    const store = mockStore({ todos: {todos:[] }});
    store.dispatch(actions.fetchTodos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

  })


  it("changeTodoActions should return correct actions", () => {
    const todoObj = {
      id: 1,
      name: "Hi",
      status: "todo"
    };

    const todoObjChanged = {
      id: 1,
      name: "Hi",
      status: "inprogress"
    };
    fetchMock
      .putOnce(`${apiUrl}/todos/1`, {
        body: {
          todos: [todoObj]
        }, headers: { 'content-type': 'application/json' }
      });
    const expectedActions = [
      { type: constants.SHOW_MESSAGE, payload: "Updating Todos" },
      {
        type: constants.REPLACE_TODO, payload: {
          todos: [todoObjChanged]
        }
      }
    ]
    const store = mockStore({ todos: { todos: [todoObj] } });
    store.dispatch(actions.changeTodoStatus(1, "inprogress")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }).catch((err) => {
      console.log("Error in testing", err);
    });
  });

  it("deleteTodoAction should return correct actions", () => {
    const todoObj = {
      id: 1,
      name: "Hi",
      status: "todo"
    };

    fetchMock
      .deleteOnce(`${apiUrl}/todos/1`, {
        body: {
          todos: [todoObj]
        }, headers: { 'content-type': 'application/json' }
      });
    const expectedActions = [
      { type: constants.SHOW_MESSAGE, payload: "Removing Todos" },
      {
        type: constants.REMOVE_TODO, payload: {
          id: 1
        }
      }
    ]
    const store = mockStore({ todos: { todos: [todoObj] } })
    store.dispatch(actions.removeTodoItem(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
  it("saveTodo should return correct actions", () => {
    const todoObj = {
      id: 1,
      name: "Hi",
      status: "todo"
    };

    const todoObjectToAdd = {
      id: 2,
      name: "Hello",
      status: "todo"
    }

    fetchMock
      .postOnce(`${apiUrl}/todos`, {
        body: {
          todos: [todoObjectToAdd]
        }, headers: { 'content-type': 'application/json' }
      });
    const expectedActions = [
      { type: constants.SHOW_MESSAGE, payload: "Saving Todos" },
      {
        type: constants.REMOVE_TODO, payload: {
          todo: todoObjectToAdd
        }
      }
    ]
    const store = mockStore({ todos: { todos: [todoObj] } });
    store.dispatch(actions.saveTodo(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

})