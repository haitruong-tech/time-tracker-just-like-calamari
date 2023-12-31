import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  SWITCH_TODO_POSITION,
} from "../constants";
import { type Todo, type TodoActions } from "../types/todo";
import { v4 as uuidv4 } from "uuid";

export function todosReducer(
  todos: Todo[],
  action: TodoActions
): undefined | Todo[] {
  switch (action.type) {
    case ADD_TODO: {
      todos.push({ ...action.payload, id: uuidv4() });
      return;
    }
    case CHECK_TODO: {
      const todo = todos.find((todo) => todo.id === action.payload.todoID);
      if (todo == null) return;
      todo.check = !todo.check;
      if (todo.check) {
        todo.doneInSessionID = action.payload.timers.at(-1)?.id;
        todo.revertInSessionID = "";
      } else {
        todo.revertInSessionID = action.payload.timers.at(-1)?.id;
        todo.doneInSessionID = "";
      }
      return;
    }
    case DELETE_TODO: {
      return todos.filter((todo) => todo.id !== action.payload);
    }
    case SWITCH_TODO_POSITION: {
      const { sourceTodoID, targetTodoID } = action.payload;
      const sourceTodo = todos.find(
        (todo) => todo.id.toString() === sourceTodoID
      );
      const targetTodo = todos.find(
        (todo) => todo.id.toString() === targetTodoID
      );

      if (sourceTodo == null) return;
      if (targetTodo == null) {
        if (targetTodoID === "Done:") sourceTodo.check = true;
        else if (targetTodoID === "Todos:") sourceTodo.check = true;
        return;
      }

      sourceTodo.check = targetTodo.check;
      const sourceTodoIndex = todos.indexOf(sourceTodo);
      const targetTodoIndex = todos.indexOf(targetTodo);
      todos.splice(sourceTodoIndex, 1);
      todos.splice(targetTodoIndex, 0, sourceTodo);
    }
  }
}
