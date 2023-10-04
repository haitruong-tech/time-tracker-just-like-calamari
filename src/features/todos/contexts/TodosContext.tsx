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
import {
  type Todo,
  type ITodoActionsContext,
  type AddTodoActionPayload,
} from "../types/todo";

const { TODOS } = LOCAL_STORAGE;

export const TodosContext = createContext<Todo[]>([]);
export const TodosActionsContext = createContext<ITodoActionsContext>({
  handleAddTodo: () => {},
  handleCheckTodo: () => {},
  handleDeleteTodo: () => {},
  handleSwithPosition: () => {},
});

interface TodosProviderProps {
  children: React.ReactNode;
}

function TodosProvider({ children }: TodosProviderProps): JSX.Element {
  const [todos, dispatch] = useImmerReducer(
    todosReducer,
    JSON.parse(localStorage.getItem(TODOS) ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE.TODOS, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: AddTodoActionPayload): void => {
    dispatch({ type: ADD_TODO, payload: todo });
  };

  const handleCheckTodo = (todoID: string): void => {
    dispatch({ type: CHECK_TODO, payload: todoID });
  };

  const handleDeleteTodo = (todoID: string): void => {
    dispatch({ type: DELETE_TODO, payload: todoID });
  };

  const handleSwithPosition = (
    sourceTodoID: string,
    targetTodoID: string
  ): void => {
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
