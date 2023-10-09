import { type TODO_ACTIONS } from "../constants";

interface Todo {
  check: boolean;
  value: string;
  id: string;
  doneInSessionID?: string;
  revertInSessionID?: string;
}

export interface ITodoActionsContext {
  handleAddTodo: (todo: AddTodoActionPayload) => void;
  handleCheckTodo: (todoID: string, timerID: string) => void;
  handleDeleteTodo: (todoID: string) => void;
  handleSwithPosition: (sourceTodoID: string, targetTodoID: string) => void;
  editTodo: (todoID: string, value: string) => void;
}

export interface AddTodoActionPayload {
  value: string;
  check: boolean;
}

interface AddTodoAction {
  type: TODO_ACTIONS.ADD_TODO;
  payload: AddTodoActionPayload;
}

interface CheckTodoActionPayload {
  todoID: string;
  timerID: string;
}

interface CheckTodoAction {
  type: TODO_ACTIONS.CHECK_TODO;
  payload: CheckTodoActionPayload;
}

interface DeleteTodoAction {
  type: TODO_ACTIONS.DELETE_TODO;
  payload: string;
}

interface SwitchTodoActionPayload {
  sourceTodoID: string;
  targetTodoID: string;
}

interface SwitchTodoAction {
  type: TODO_ACTIONS.SWITCH_TODO_POSITION;
  payload: SwitchTodoActionPayload;
}

interface EditTodoActionPayload {
  todoID: string;
  value: string;
}

interface EditTodoAction {
  type: TODO_ACTIONS.EDIT_TODO;
  payload: EditTodoActionPayload;
}

export type TodoActions =
  | AddTodoAction
  | CheckTodoAction
  | DeleteTodoAction
  | SwitchTodoAction
  | EditTodoAction;
