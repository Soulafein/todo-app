import React from 'react'

export const TodoItem = (props) => (
  <li>
    <input type="checkbox" defaultChecked={props.isCompleted} /> {props.name}
  </li>)

TodoItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  isCompleted: React.PropTypes.bool
}
