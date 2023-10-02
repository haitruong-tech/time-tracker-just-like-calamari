import { useRef } from "react";
import {
  RiArrowGoBackFill,
  RiCheckboxCircleFill,
  RiDeleteBin7Fill,
} from "react-icons/ri";

function TodoList({ title, todos, onTodoCheck, onTodoDelete, disableCheck }) {
  const sourceTodo = useRef();

  const dragStartHandler = (e, todoID) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", todoID);
    sourceTodo.current = e.target;
  };

  return (
    <ul
      id={title}
      aria-label={title}
      className="before:content-[attr(aria-label)] before:text-lg before:font-medium before:mt-4 before:mb-2 before:block"
    >
      {todos.length === 0 && <p className="text-sm text-gray-400">No item to show</p>}
      {todos.map((todo) => (
        <li
          id={todo.id}
          key={todo.id}
          className="flex items-center justify-between cursor-pointer hover:bg-gray-200 duration-100"
          onDragStart={(e) => dragStartHandler(e, todo.id)}
          draggable
        >
          <span>{todo.value}</span>
          <div className="flex gap-x-2 items-center">
            {!disableCheck && (
              <RiCheckboxCircleFill
                className="text-green-600 cursor-pointer font-bold text-xl"
                onClick={() => onTodoCheck(todo)}
              />
            )}
            {disableCheck && (
              <RiArrowGoBackFill
                className="text-green-600 cursor-pointer font-bold text-xl"
                onClick={() => onTodoCheck(todo)}
              />
            )}
            <RiDeleteBin7Fill
              className="text-red-600 cursor-pointer text-xl"
              onClick={() => onTodoDelete(todo)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
