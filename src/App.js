import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm} from './components/todo/TodoForm'
import {TodoList} from './components/todo/TodoList'
import {Footer} from './components/todo/Footer'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'

class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Start running twice a week', isCompleted: false},
      {id: 2, name: 'Start hiking at least once a month', isCompleted: false},
      {id: 3, name: 'Ride on bike 400km per month', isCompleted: false},
      {id: 4, name: 'Read a book every week', isCompleted: false}
    ],
    currentTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  handleRemove = (id, e) => {
    e.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
  }

  submitCurrentTodo = (e) => {
    e.preventDefault()
    const newId = generateId()
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isCompleted: false
    }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (e) => {
    e.preventDefault()
    this.setState({
      errorMessage: 'Please enter todo name'
    })
  }

  updateCurrentTodo = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.submitCurrentTodo : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo App</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error-message">{this.state.errorMessage}</span>}
          <TodoForm updateCurrentTodo={this.updateCurrentTodo} currentTodo={this.state.currentTodo} submitCurrentTodo={submitHandler}/>
          <TodoList handleToggle={this.handleToggle} handleRemove={this.handleRemove} todos={displayTodos}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
