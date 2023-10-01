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

  const handleSwithPosition = (sourceTodoID, targetTodoID) => {
    const sourceTodo = todos.find(
      (todo) => todo.id.toString() === sourceTodoID
    );
    const sourceTodoIndex = todos.findIndex(
      (todo) => todo.id.toString() === sourceTodoID
    );
    const targetTodo = todos.find(
      (todo) => todo.id.toString() === targetTodoID
    );
    const targetTodoIndex = todos.findIndex(
      (todo) => todo.id.toString() === targetTodoID
    );

    if (!sourceTodo) return;
    if (!targetTodo) {
      if (targetTodoID === "Done:") sourceTodo.check = true;
      else sourceTodo.check = true;
      const newTodos = [...todos];
      persistTodos(newTodos);
      return;
    }

    const newTodos = [...todos];
    sourceTodo.check = targetTodo.check;
    newTodos.splice(sourceTodoIndex, 1);
    newTodos.splice(targetTodoIndex, 0, sourceTodo);
    persistTodos(newTodos);
  };

  return {
    todos,
    handleAddTodo,
    handleCheckTodo,
    handleDeleteTodo,
    handleSwithPosition,
  };
};

export default useTodos;
