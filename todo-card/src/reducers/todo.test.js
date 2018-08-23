import todoReducer, { getVisibleTodos } from "./todo";
import { ADD_TODO, LOAD_TODOS, REMOVE_TODO, REPLACE_TODO } from "../constants";


describe("Todo Reducer", () => {
  it("Should return initial state", () => {
    const initState = {
      todos: []
    };
    expect(todoReducer(undefined, {})).toEqual(initState)
  });

  it("Should Add new todo item", () => {
    const initState = {
      todos: []
    };

    const todo = {
      name: "HI",
      id: 1,
      status: "todo"
    };

    const nextState = {
      todos: [todo]
    };
    const action = {
      type: ADD_TODO,
      payload: todo
    };
    expect(todoReducer(initState, action)).toEqual(nextState);
  });

  it("Should load all todos to state", () => {
    const initState = {
      todos: []
    };

    const nextState = {
      todos: [{
        name: "HI",
        id: 1,
        status: "todo"
      }, {
        name: "Hello",
        id: 2,
        status: "inprogress"
      }]
    };

    const action = {
      type: LOAD_TODOS,
      payload: nextState.todos
    };

    expect(todoReducer(initState, action)).toEqual(nextState);
  });

  it("Should load Remove given todo from state", () => {
    const initState = {
      todos: [{
        name: "HI",
        id: 1,
        status: "todo"
      }, {
        name: "Hello",
        id: 2,
        status: "inprogress"
      }]
    };

    const nextState = {
      todos: [
        {
          name: "Hello",
          id: 2,
          status: "inprogress"
        }
      ]
    }

    const action = {
      type: REMOVE_TODO,
      payload: 1
    };

    expect(todoReducer(initState, action)).toEqual(nextState);
  });

  it("Should load Replace given todo with new data", () => {
    const initState = {
      todos: [{
        name: "HI",
        id: 1,
        status: "todo"
      }, {
        name: "Hello",
        id: 2,
        status: "inprogress"
      }]
    };

    const nextState = {
      todos: [
        {
          name: "HI",
          id: 1,
          status: "todo"
        },
        {
          name: "Hello",
          id: 2,
          status: "complete"
        }
      ]
    }

    const todo = {
      name: "Hello",
      id: 2,
      status: "complete"
    }

    const action = {
      type: REPLACE_TODO,
      payload: todo
    };

    expect(todoReducer(initState, action)).toEqual(nextState);
  });

});

describe("Todo Reducer Utility functions, ", () => {
  describe("GetVisibileTodos()", () => {
    let todos = [];
    beforeEach(() => {
      todos = [
        {
          name: "HI",
          id: 1,
          status: "todo"
        }, {
          name: "Hello",
          id: 2,
          status: "complete"
        }, {
          name: "Hola",
          id: 3,
          status: "inprogress"
        }
      ]
    })
    it("should return all pending todos", ()=> {
      var expectedState = [
        {
          name: "HI",
          id: 1,
          status: "todo"
        }
      ]
      expect(getVisibleTodos(todos, 'todo')).toEqual(expectedState)
    });

    it("should return all in progress todos", ()=> {
      var expectedState = [
        {
          name: "Hola",
          id: 3,
          status: "inprogress"
        }
      ]
      expect(getVisibleTodos(todos, 'inprogress')).toEqual(expectedState)
    });

    it("should return all in completed todos", ()=> {
      var expectedState = [
        {
          name: "Hello",
          id: 2,
          status: "complete"
        }
      ]
      expect(getVisibleTodos(todos, 'complete')).toEqual(expectedState)
    });
    
  });
})