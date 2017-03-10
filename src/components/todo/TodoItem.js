import React from 'react'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  return (
    <li>
      <input type="checkbox" onChange={handleToggle} checked={props.isCompleted} /> {props.name}
    </li>
  )
}

TodoItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  isCompleted: React.PropTypes.bool
}
