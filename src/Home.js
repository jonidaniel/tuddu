import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList.js";
// import DraggableList from "./DraggableList.js";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // Gets todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Stores todos into local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Handles the toggling of todo checkboxes
  function toggleTodo(id) {
    // Spread syntax
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  // Handles the adding of todos
  function handleAdd() {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      // Spread syntax
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  // Handles the removing of todos
  function handleRemove() {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    todoNameRef.current.value = null;
  }

  // Handles the renaming of todos
  function handleRename() {
    const name = todoNameRef.current.value;
    if (name === "") return;
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.completed) {
        todo.name = name;
        todo.completed = !todo.completed;
      }
    });
    setTodos(newTodos);
    todoNameRef.current.value = null;
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      {/* <DraggableList todos={todos} /> */}
      <br />
      <input ref={todoNameRef} type="text" />
      <br />
      <button onClick={handleAdd}>Add</button>
      <br />
      <button onClick={handleRemove}>Remove</button>
      <br />
      <button onClick={handleRename}>Rename</button>
      <br />
      <div id="todos-left">
        {todos.filter((todo) => !todo.completed).length} todos left
      </div>
    </div>
  );
}
