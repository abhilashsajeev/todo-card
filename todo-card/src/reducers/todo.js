
import { LOAD_TODOS, REMOVE_TODO, REPLACE_TODO,ADD_TODO } from '../constants';

const initState = {
  todos: []
};



export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'todo':
      return todos.filter(t => t.status === "todo");
    case 'inprogress':
      return todos.filter(t => t.status === "inprogress");
    case 'complete':
      return todos.filter(t => t.status === "complete");
    default:
      return todos;
  }
}

export default (state = initState, action) => {
  const types = action.type
  switch (types) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload)
      };
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      }
    case REPLACE_TODO:
    return {
      ...state,
      todos: state.todos.map(t => t.id === action.payload.id ? action.payload : t)
    }
    default: return state;
  }

}