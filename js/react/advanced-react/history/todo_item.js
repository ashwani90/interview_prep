import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      <span className="todo-text">{todo.text}</span>
      <button className="remove-btn" onClick={() => onRemove(todo)}>
        ×
      </button>
    </li>
  );
};

export default TodoItem;