import React, { useState } from 'react';
import { useUndoRedo } from '../../hooks/useUndoRedo';
import { createAddItemAction, createRemoveItemAction, createUpdateItemAction } from '../../utils/actionFactory';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const { state: todos, executeAction, undo, redo, canUndo, canRedo } = useUndoRedo([]);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };
    
    executeAction(createAddItemAction(newTodo));
    setNewTodoText('');
  };

  const toggleTodo = (todo) => {
    executeAction(createUpdateItemAction(
      todo.id,
      { completed: !todo.completed },
      { completed: todo.completed }
    ));
  };

  const removeTodo = (todo) => {
    executeAction(createRemoveItemAction(todo));
  };

  return (
    <div className="todo-app">
      <h1>Todo List with Undo/Redo</h1>
      
      <div className="controls">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
        
        <div className="undo-redo">
          <button onClick={undo} disabled={!canUndo}>
            Undo (Ctrl+Z)
          </button>
          <button onClick={redo} disabled={!canRedo}>
            Redo (Ctrl+Y)
          </button>
        </div>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;