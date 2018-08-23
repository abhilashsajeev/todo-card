import { getTodos, createTodo, updateTodo, removeTodo } from '../lib/jsonService';
import { LOAD_TODOS, REMOVE_TODO, REPLACE_TODO, ADD_TODO, SHOW_MESSAGE } from "../constants";

export const showMessage = (val) => ({ type: SHOW_MESSAGE, payload: val });

export const loadTodos = (todos) => {
  return {
    type: LOAD_TODOS,
    payload: todos
  }
};

export const removeTodos = (id) => {
  return {
    type: REMOVE_TODO,
    payload: id
  }
}

export const replaceTodo = (id) => {
  return {
    type: REPLACE_TODO,
    payload: id
  }
}

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo
  }
}

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage("Fetching Todos"))
    return getTodos()
      .then(todos => dispatch(loadTodos(todos)))
      .catch(showMessage("Failed"))

  }
};

export const changeTodoStatus = (id, status = "inprogress") => {
  return (dispatch, getState) => {
    dispatch(showMessage("Updating Todos"));
    console.log(getState());
    const { todos } = getState().todos;
    const todo = todos.find(t => t.id === id);
    const changed = { ...todo, status };
    return updateTodo(changed)
      .then(res => dispatch(replaceTodo(res)))
      .catch(showMessage("Update failed"));
  }
}

export const removeTodoItem = (id) => {
  return (dispatch) => {
    dispatch(showMessage("Removing Todos"));
    return removeTodo(id)
      .then(dispatch(removeTodos(id)))
      .catch(showMessage("Failed"))
  }
}

export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showMessage("Saving Todos"));
    return createTodo(name)
      .then(todo => dispatch(addTodo(todo)))
      .catch(showMessage("Failed"));
  }
}