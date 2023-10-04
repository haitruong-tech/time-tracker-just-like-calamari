import { v4 as uuidv4 } from "uuid";
import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  SWITCH_TODO_POSITION,
} from "../constants";

interface Todo {
  check: boolean;
  value: string;
  id: string;
}

interface AddTodoActionPayload {
  value: string;
  check: boolean;
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: AddTodoActionPayload;
}

interface CheckTodoAction {
  type: typeof CHECK_TODO;
  payload: string;
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

interface SwitchTodoActionPayload {
  sourceTodoID: string
  targetTodoID: string
}

interface SwitchTodoAction {
  type: typeof SWITCH_TODO_POSITION;
  payload: SwitchTodoActionPayload;
}

export type TodoActions = AddTodoAction | CheckTodoAction | DeleteTodoAction | SwitchTodoAction;
