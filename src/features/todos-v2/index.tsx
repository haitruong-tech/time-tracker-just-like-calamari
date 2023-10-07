import { useContext, useMemo } from "react";
import { TodosActionsContext, TodosContext } from "./contexts/TodosContext";

import { UnfillCheckboxIcon, FillCheckboxIcon } from "src/assets/icons";
import AddTodo from "./components/AddTodo";

function Todos(): JSX.Element {
  const todos = useContext(TodosContext);
  const incompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.check),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.check),
    [todos]
  );
  const { handleCheckTodo } = useContext(TodosActionsContext);

  return (
    <>
      <AddTodo />
      <div className="mt-10">
        <h1 className="text-2xl font-bold">
          Your Todo ({incompletedTodos.length}/
          {incompletedTodos.length + completedTodos.length})
        </h1>
        <ul className="mt-4">
          {incompletedTodos.map((todo) => (
            <li
              key={todo.id}
              className="border-2 py-2 px-4 flex justify-between items-center first:rounded-tl first:rounded-tr last:rounded-bl last:rounded-br cursor-pointer hover:bg-[#eee]/[0.25]"
            >
              <span className="font-medium text-xl">{todo.value}</span>
              <UnfillCheckboxIcon
                className="cursor-pointer fill-transparent hover:fill-[#eee]/[.2] transition"
                onClick={() => {
                  handleCheckTodo(todo.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">
          Completed ({completedTodos.length}/
          {incompletedTodos.length + completedTodos.length})
        </h1>
        <ul className="mt-4">
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              className="border-2 py-2 px-4 flex justify-between items-center first:rounded-tl first:rounded-tr last:rounded-bl last:rounded-br cursor-pointer hover:bg-[#eee]/[0.25]"
            >
              <span className="font-medium text-xl line-through text-[#eee]/[.75]">
                {todo.value}
              </span>
              <FillCheckboxIcon className="cursor-pointer hover:fill-[#eee]/[0.75] fill-[#eee] transition" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  // const todos = useContext(TodosContext);
  // const { handleCheckTodo, handleDeleteTodo, handleSwithPosition } =
  //   useContext(TodosActionsContext);

  // return (
  //   <div
  //     onDragOver={(e) => {
  //       e.preventDefault();
  //       e.dataTransfer.dropEffect = "move";
  //     }}
  //     onDrop={(e) => {
  //       e.preventDefault();
  //       const sourceTodoID = e.dataTransfer.getData("text/plain");
  //       const targetTodoID = (e.target as HTMLElement)?.parentElement?.id;
  //       handleSwithPosition(
  //         sourceTodoID,
  //         targetTodoID ?? (e.target as HTMLElement).id
  //       );
  //     }}
  //   >
  //     <TodoList
  //       title="Todos:"
  //       todos={todos.filter((todo) => !todo.check)}
  //       onTodoCheck={(todo) => {
  //         handleCheckTodo(todo.id);
  //       }}
  //       onTodoDelete={(todo) => {
  //         handleDeleteTodo(todo.id);
  //       }}
  //       openModal={onOpenModal}
  //     />
  //     <TodoList
  //       title="Done:"
  //       todos={todos.filter((todo) => todo.check)}
  //       onTodoCheck={(todo) => {
  //         handleCheckTodo(todo.id);
  //       }}
  //       onTodoDelete={(todo) => {
  //         handleDeleteTodo(todo.id);
  //       }}
  //       disableCheck
  //       openModal={onOpenModal}
  //     />
  //   </div>
  // );
}

export default Todos;
