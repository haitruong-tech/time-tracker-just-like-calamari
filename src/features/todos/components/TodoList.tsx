import { useRef } from "react";
import {
  RiArrowGoBackFill,
  RiCheckboxCircleFill,
  RiDeleteBin7Fill,
} from "react-icons/ri";
import { Todo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: Todo[];
  onTodoCheck: (todo: Todo) => void;
  onTodoDelete: (todo: Todo) => void;
  disableCheck?: boolean;
  openModal: (todo: Todo) => void;
}

function TodoList({
  title,
  todos,
  onTodoCheck,
  onTodoDelete,
  disableCheck,
  openModal,
}: TodoListProps) {
  const sourceTodo = useRef();

  const dragStartHandler = (e, todoID) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", todoID);
    sourceTodo.current = e.target;
  };

  const handleCheckTodo = (e, todo) => {
    e.stopPropagation();
    onTodoCheck(todo);
  };

  const handleDeleteTodo = (e, todo) => {
    e.stopPropagation();
    onTodoDelete(todo);
  };

  return (
    <ul
      id={title}
      aria-label={title}
      className="before:content-[attr(aria-label)] before:text-lg before:font-medium before:mt-4 before:mb-2 before:block"
    >
      {todos.length === 0 && (
        <p className="text-sm text-gray-400">No item to show</p>
      )}
      {todos.map((todo) => (
        <li
          id={todo.id}
          key={todo.id}
          className="flex items-center justify-between cursor-pointer hover:bg-gray-200 duration-100"
          onDragStart={(e) => dragStartHandler(e, todo.id)}
          onClick={() => openModal(todo)}
          draggable
        >
          <span>{todo.value}</span>
          <div className="flex gap-x-2 items-center">
            {!disableCheck && (
              <RiCheckboxCircleFill
                className="text-green-600 cursor-pointer font-bold text-xl"
                onClick={(e) => handleCheckTodo(e, todo)}
              />
            )}
            {disableCheck && (
              <RiArrowGoBackFill
                className="text-green-600 cursor-pointer font-bold text-xl"
                onClick={(e) => handleCheckTodo(e, todo)}
              />
            )}
            <RiDeleteBin7Fill
              className="text-red-600 cursor-pointer text-xl"
              onClick={(e) => handleDeleteTodo(e, todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
