import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm} from './components/todo/TodoForm'
import {TodoList} from './components/todo/TodoList'
import {Footer} from './components/todo/Footer'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService'

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id, e) => {
    e.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
    deleteTodo(id)
      .then(() => this.showTempMessage('Todo deleted'))
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo updated'))
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
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 5000)
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
          {this.state.message && <span className="success-message">{this.state.message}</span>}
          <TodoForm updateCurrentTodo={this.updateCurrentTodo} currentTodo={this.state.currentTodo} submitCurrentTodo={submitHandler}/>
          <TodoList handleToggle={this.handleToggle} handleRemove={this.handleRemove} todos={displayTodos}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
