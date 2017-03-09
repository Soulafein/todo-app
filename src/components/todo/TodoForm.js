import React from 'react'

export const TodoForm = (props) => (
  <form>
    <input type="text"
      onChange={props.updateCurrentTodo}
      value={props.currentTodo} />
  </form>)
