import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm} from './components/todo/TodoForm'
import {TodoList} from './components/todo/TodoList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [
        {id: 1, name: 'Start running twice a week', isCompleted: false},
        {id: 2, name: 'Start hiking at least once a month', isCompleted: false},
        {id: 3, name: 'Ride on bike 400km per month', isCompleted: false},
        {id: 4, name: 'Read a book every week', isCompleted: false}
      ],
      currentTodo: ''
    }
    this.updateCurrentTodo = this.updateCurrentTodo.bind(this)
  }

  updateCurrentTodo(e) {
    this.setState({
      currentTodo: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo App</h2>
        </div>
        <div className="Todo-App">
          <TodoForm updateCurrentTodo={this.updateCurrentTodo} currentTodo={this.state.currentTodo} />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}

export default App;
