import { current } from "immer";
import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  SWITCH_TODO_POSITION,
} from "../constants";
import { Todo, TodoActions } from "../types/todo";
import { v4 as uuidv4 } from "uuid";

export function todosReducer(todos: Todo[], action: TodoActions) {
  switch (action.type) {
    case ADD_TODO: {
      return void todos.push({ ...action.payload, id: uuidv4() });
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
      const sourceTodo = todos.find(
        (todo) => todo.id.toString() === sourceTodoID
      );
      const targetTodo = todos.find(
        (todo) => todo.id.toString() === targetTodoID
      );

      if (!sourceTodo) return;
      if (!targetTodo) {
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
