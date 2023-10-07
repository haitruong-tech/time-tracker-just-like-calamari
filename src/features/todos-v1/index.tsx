import { useContext } from "react";
import TodoList from "./components/TodoList";
import { TodosActionsContext, TodosContext } from "./contexts/TodosContext";
import { type Todo } from "./types/todo";

interface TodosProps {
  onOpenModal: (todo: Todo) => void;
}

function Todos({ onOpenModal }: TodosProps): JSX.Element {
  const todos = useContext(TodosContext);
  const { handleCheckTodo, handleDeleteTodo, handleSwithPosition } =
    useContext(TodosActionsContext);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        const sourceTodoID = e.dataTransfer.getData("text/plain");
        const targetTodoID = (e.target as HTMLElement)?.parentElement?.id;
        handleSwithPosition(
          sourceTodoID,
          targetTodoID ?? (e.target as HTMLElement).id
        );
      }}
    >
      <TodoList
        title="Todos:"
        todos={todos.filter((todo) => !todo.check)}
        onTodoCheck={(todo) => {
          handleCheckTodo(todo.id);
        }}
        onTodoDelete={(todo) => {
          handleDeleteTodo(todo.id);
        }}
        openModal={onOpenModal}
      />
      <TodoList
        title="Done:"
        todos={todos.filter((todo) => todo.check)}
        onTodoCheck={(todo) => {
          handleCheckTodo(todo.id);
        }}
        onTodoDelete={(todo) => {
          handleDeleteTodo(todo.id);
        }}
        disableCheck
        openModal={onOpenModal}
      />
    </div>
  );
}

export default Todos;
