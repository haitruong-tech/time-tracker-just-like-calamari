import { useEffect, createContext, useReducer } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";

const { TODOS } = LOCAL_STORAGE;

const ADD_TODO = "todos/add_todo";
const CHECK_TODO = "todos/check_todo";
const DELETE_TODO = "todos/delete_todo";
const SWITCH_TODO_POSITION = "todos/switch_todo_position";

function todosReducer(todos, action) {
  switch (action.type) {
    case ADD_TODO: {
      action.payload.check = false;
      return [...todos, action.payload];
    }
    case CHECK_TODO: {
      return todos.map((todo) =>
        todo.id !== action.payload ? todo : { ...todo, check: !todo.check }
      );
    }
    case DELETE_TODO: {
      return todos.filter((todo) => todo.id !== action.payload);
    }
    case SWITCH_TODO_POSITION: {
      const { sourceTodoID, targetTodoID } = action.payload;

      const sourceTodoIndex = todos.findIndex(
        (todo) => todo.id.toString() === sourceTodoID
      );
      const sourceTodo = todos[sourceTodoIndex];
      const targetTodoIndex = todos.findIndex(
        (todo) => todo.id.toString() === targetTodoID
      );
      const targetTodo = todos[targetTodoIndex];

      if (!sourceTodo) return;
      if (!targetTodo) {
        if (targetTodoID === "Done:") sourceTodo.check = true;
        else if (targetTodoID === "Todos:") sourceTodo.check = true;
        else return;

        const newTodos = [...todos];
        return newTodos;
      }

      const newTodos = [...todos];
      sourceTodo.check = targetTodo.check;
      newTodos.splice(sourceTodoIndex, 1);
      newTodos.splice(targetTodoIndex, 0, sourceTodo);
      return newTodos;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const TodosContext = createContext(null);
export const TodosActionsContext = createContext(null);

function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem(TODOS) ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE.TODOS, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo) => {
    dispatch({ type: ADD_TODO, payload: todo });
  };

  const handleCheckTodo = (todoID) => {
    dispatch({ type: CHECK_TODO, payload: todoID });
  };

  const handleDeleteTodo = (todoID) => {
    dispatch({ type: DELETE_TODO, payload: todoID });
  };

  const handleSwithPosition = (sourceTodoID, targetTodoID) => {
    dispatch({
      type: SWITCH_TODO_POSITION,
      payload: { sourceTodoID, targetTodoID },
    });
  };

  return (
    <TodosContext.Provider value={todos}>
      <TodosActionsContext.Provider
        value={{
          handleAddTodo,
          handleCheckTodo,
          handleDeleteTodo,
          handleSwithPosition,
        }}
      >
        {children}
      </TodosActionsContext.Provider>
    </TodosContext.Provider>
  );
}

export default TodosProvider
