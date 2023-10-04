import { useEffect, createContext } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";
import { todosReducer } from "../reducers/todoReducer";
import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  SWITCH_TODO_POSITION,
} from "../constants";
import { useImmerReducer } from "use-immer";

const { TODOS } = LOCAL_STORAGE;

export const TodosContext = createContext(null);
export const TodosActionsContext = createContext(null);

function TodosProvider({ children }) {
  const [todos, dispatch] = useImmerReducer(
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

export default TodosProvider;
