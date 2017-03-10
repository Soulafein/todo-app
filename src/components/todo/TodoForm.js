import React from 'react'

export const TodoForm = (props) => (
  <form onSubmit={props.submitCurrentTodo}>
    <input type="text"
      onChange={props.updateCurrentTodo}
      value={props.currentTodo} />
  </form>)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  updateCurrentTodo: React.PropTypes.func.isRequired,
  submitCurrentTodo: React.PropTypes.func.isRequired
}
