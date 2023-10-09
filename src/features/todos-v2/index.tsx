import { memo, useContext, useMemo } from "react";
import { TodosContext } from "./contexts/TodosContext";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const Todos = memo(() => {
  const todos = useContext(TodosContext);

  const incompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.check),
    [todos]
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.check),
    [todos]
  );

  return (
    <>
      <AddTodo />
      {/* <div> */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold">
          Your Todo ({incompletedTodos.length}/
          {incompletedTodos.length + completedTodos.length})
        </h1>
        <div className="mt-4">
          <TodoList todos={incompletedTodos} />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold">
          Completed ({completedTodos.length}/
          {incompletedTodos.length + completedTodos.length})
        </h1>
        <ul className="mt-4">
          <TodoList todos={completedTodos} />
        </ul>
      </div>
      {/* </div> */}
    </>
  );
});

Todos.displayName = "Todos";

export default Todos;
