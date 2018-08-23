import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todo';
import messageReducer from './reducers/message';
import { createLogger } from 'redux-logger'

const logger = createLogger();

const reducer = combineReducers({
  todos: todoReducer,
  message: messageReducer
})

const middlewares = [thunk, logger]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));