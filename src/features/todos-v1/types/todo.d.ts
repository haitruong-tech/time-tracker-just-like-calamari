import { type Timer } from "../../time-tracker-v1/types/timer";
import {
  type ADD_TODO,
  type CHECK_TODO,
  type DELETE_TODO,
  type SWITCH_TODO_POSITION,
} from "../constants";

interface Todo {
  check: boolean;
  value: string;
  id: string;
  doneInSessionID?: string;
  revertInSessionID?: string;
}

export interface ITodoActionsContext {
  handleAddTodo: (todo: AddTodoActionPayload) => void;
  handleCheckTodo: (todo: string) => void;
  handleDeleteTodo: (todo: string) => void;
  handleSwithPosition: (sourceTodoID: string, targetTodoID: string) => void;
}

export interface AddTodoActionPayload {
  value: string;
  check: boolean;
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: AddTodoActionPayload;
}

interface CheckTodoActionPayload {
  todoID: string;
  timers: Timer[];
}

interface CheckTodoAction {
  type: typeof CHECK_TODO;
  payload: CheckTodoActionPayload;
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

interface SwitchTodoActionPayload {
  sourceTodoID: string;
  targetTodoID: string;
}

interface SwitchTodoAction {
  type: typeof SWITCH_TODO_POSITION;
  payload: SwitchTodoActionPayload;
}

export type TodoActions =
  | AddTodoAction
  | CheckTodoAction
  | DeleteTodoAction
  | SwitchTodoAction;
