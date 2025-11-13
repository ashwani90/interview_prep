import { useReducer, useEffect, useMemo } from "react";

// Action types
const ADD = "ADD";
const TOGGLE = "TOGGLE";
const DELETE = "DELETE";
const SET_FILTER = "SET_FILTER";

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case DELETE:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// Custom hook
export function useTodos() {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    // Load from localStorage on first run
    const stored = localStorage.getItem("todos_state");
    return stored
      ? JSON.parse(stored)
      : { todos: [], filter: "all" };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("todos_state", JSON.stringify(state));
  }, [state]);

  const filteredTodos = useMemo(() => {
    if (state.filter === "active") {
      return state.todos.filter((t) => !t.completed);
    }
    if (state.filter === "completed") {
      return state.todos.filter((t) => t.completed);
    }
    return state.todos;
  }, [state.todos, state.filter]);

  return {
    todos: state.todos,
    filter: state.filter,
    filteredTodos,
    addTodo: (text) => dispatch({ type: ADD, payload: text }),
    toggleTodo: (id) => dispatch({ type: TOGGLE, payload: id }),
    deleteTodo: (id) => dispatch({ type: DELETE, payload: id }),
    setFilter: (filter) => dispatch({ type: SET_FILTER, payload: filter }),
  };
}
