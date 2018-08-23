import {LOAD_TODOS, ADD_TODO, REPLACE_TODO, REMOVE_TODO} from '../constants'
const SHOW_MESSAGE = 'SHOW_MESSAGE';

export default (state = '', action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return action.payload;
    case LOAD_TODOS:
    case ADD_TODO:
    case REPLACE_TODO:
    case REMOVE_TODO:
      return '';
    default:
      return state;
  }
}