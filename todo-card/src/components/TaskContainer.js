import React, { Component } from "react"
import TaskCard from "./TaskCard";
import {connect} from 'react-redux';
import {getVisibleTodos} from "../reducers/todo";
import { fetchTodos } from "../actions/todoActions";


class TaskContainer extends Component {
  componentDidMount(){
    this.props.fetchTodos();
  }
  render(){
    return (
      <div>
        {
          this.props.todos.map((todo)=> {
            return (
              <TaskCard key={todo.id} type={this.props.type} {...todo}/>
            )
          })
        }
        
      </div> 
    )
  
  }  
}



export default connect(
  (state, ownProps) => ({ todos: getVisibleTodos(state.todos.todos, ownProps.type) }),
  { fetchTodos }
)(TaskContainer)
