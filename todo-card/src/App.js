import React, { Component } from 'react';
import './App.css';
import TodoTabs from './components/TodoTabs';
import Appbar from './components/Appbar';
import { CssBaseline } from '../node_modules/@material-ui/core';
import Messages from './components/Messages';


class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <Appbar/>
        <Messages/>
        <TodoTabs />
      </div>
    );
  }
}


export default App;
