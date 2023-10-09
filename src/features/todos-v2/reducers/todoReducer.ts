import { TODO_ACTIONS } from "../constants";
import { type Todo, type TodoActions } from "../types/todo";
import { v4 as uuidv4 } from "uuid";

export function todosReducer(
  todos: Todo[],
  action: TodoActions
): undefined | Todo[] {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO: {
      todos.unshift({ ...action.payload, id: uuidv4() });
      return;
    }
    case TODO_ACTIONS.CHECK_TODO: {
      const todo = todos.find((todo) => todo.id === action.payload.todoID);
      if (todo == null || action.payload.timerID === "") return;
      todo.check = !todo.check;
      if (todo.check) {
        todo.doneInSessionID = action.payload.timerID;
        todo.revertInSessionID = "";
      } else {
        todo.revertInSessionID = action.payload.timerID;
        todo.doneInSessionID = "";
      }
      return;
    }
    case TODO_ACTIONS.DELETE_TODO: {
      return todos.filter((todo) => todo.id !== action.payload);
    }
    case TODO_ACTIONS.SWITCH_TODO_POSITION: {
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
      return;
    }
    case TODO_ACTIONS.EDIT_TODO: {
      const todo = todos.find((todo) => todo.id === action.payload.todoID);
      if (todo == null) return;
      todo.value = action.payload.value;
    }
  }
}
