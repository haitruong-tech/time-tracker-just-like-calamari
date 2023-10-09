import { memo } from "react";
import TodoItem from "./TodoItem";
import { type Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = memo(({ todos }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});

TodoList.displayName = "TodoList";

export default TodoList;
