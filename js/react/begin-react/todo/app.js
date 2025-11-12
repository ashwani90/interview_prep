import React from "react";
import { useTodos } from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import FilterButtons from "./components/FilterButtons";

export default function App() {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    filteredTodos,
  } = useTodos();

  return (
    <div className="app">
      <h1>React To-Do (useReducer + localStorage)</h1>

      <TodoForm onAdd={addTodo} />

      <FilterButtons currentFilter={filter} onChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
