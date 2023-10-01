import { useState } from "react";
import { LOCAL_STORAGE } from "../constants";

const { TODOS } = LOCAL_STORAGE;

const getTodosFromStorage = () =>
  JSON.parse(localStorage.getItem(TODOS) ?? "[]");
const setTodosToStorage = (todos) =>
  localStorage.setItem(LOCAL_STORAGE.TODOS, JSON.stringify(todos));

const useTodos = () => {
  const [todos, setTodos] = useState(getTodosFromStorage());

  const persistTodos = (todos) => {
    setTodos(todos);
    setTodosToStorage(todos);
  };

  const handleAddTodo = (todo) => {
    todo.check = false;
    persistTodos([...todos, todo]);
  };

  const handleCheckTodo = (todoID) => {
    persistTodos(
      todos.map((todo) =>
        todo.id !== todoID ? todo : { ...todo, check: !todo.check }
      )
    );
  };

  const handleDeleteTodo = (todoID) => {
    persistTodos(todos.filter((todo) => todo.id !== todoID));
  };

  return { todos, handleAddTodo, handleCheckTodo, handleDeleteTodo };
};

export default useTodos;
