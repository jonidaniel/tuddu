import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleTodoClick}
      />
      <div id="todo-text">{todo.name}</div>
    </label>
  );
}
