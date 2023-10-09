import { useEffect, createContext } from "react";
import { LOCAL_STORAGE } from "../../../data/constants";
import { todosReducer } from "../reducers/todoReducer";
import { TODO_ACTIONS } from "../constants";
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
  handleSwitchPosition: () => {},
  editTodo: () => {},
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
    dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: todo });
  };

  const handleCheckTodo = (todoID: string, timerID: string): void => {
    dispatch({ type: TODO_ACTIONS.CHECK_TODO, payload: { todoID, timerID } });
  };

  const handleDeleteTodo = (todoID: string): void => {
    dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: todoID });
  };

  const handleSwithPosition = (
    sourceTodoID: string,
    targetTodoID: string
  ): void => {
    dispatch({
      type: TODO_ACTIONS.SWITCH_TODO_POSITION,
      payload: { sourceTodoID, targetTodoID },
    });
  };

  const editTodo = (todoID: string, value: string): void => {
    dispatch({ type: TODO_ACTIONS.EDIT_TODO, payload: { todoID, value } });
  };

  return (
    <TodosContext.Provider value={todos}>
      <TodosActionsContext.Provider
        value={{
          handleAddTodo,
          handleCheckTodo,
          handleDeleteTodo,
          handleSwitchPosition: handleSwithPosition,
          editTodo,
        }}
      >
        {children}
      </TodosActionsContext.Provider>
    </TodosContext.Provider>
  );
}

export default TodosProvider;
