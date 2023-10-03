import { useContext } from "react";
import TodoList from "./components/TodoList";
import { TodosActionsContext, TodosContext } from "./context/TodosContext";

function Todos({ onOpenModal }) {
  const todos = useContext(TodosContext);
  const {
    handleCheckTodo,
    handleDeleteTodo,
    handleSwithPosition,
  } = useContext(TodosActionsContext);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        const sourceTodoID = e.dataTransfer.getData("text/plain");
        const targetTodoID = e.target?.parentNode?.id;
        handleSwithPosition(sourceTodoID, targetTodoID ?? e.target.id);
      }}
    >
      <TodoList
        title="Todos:"
        todos={todos.filter((todo) => !todo.check)}
        onTodoCheck={(todo) => handleCheckTodo(todo.id)}
        onTodoDelete={(todo) => handleDeleteTodo(todo.id)}
        openModal={onOpenModal}
      />
      <TodoList
        title="Done:"
        todos={todos.filter((todo) => todo.check)}
        onTodoCheck={(todo) => handleCheckTodo(todo.id)}
        onTodoDelete={(todo) => handleDeleteTodo(todo.id)}
        disableCheck
        openModal={onOpenModal}
      />
    </div>
  );
}

export default Todos;