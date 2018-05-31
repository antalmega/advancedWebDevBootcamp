import React from 'react';

const Todo = ({task, completed, removeTodo, onToggle}) => (
  <li>
    <span
      style={{
        textDecoration: completed ? "line-through" : "none"
      }}
      onClick= {onToggle}
    >
      {task}
    </span>
    <button onClick={removeTodo}>X</button>
  </li>
)

export default Todo;