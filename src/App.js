import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import Tabs from "./components/Tabs";
import { TAB_IDS } from "./constants";
import TimeTracker from "./components/TimeTracker";

function App() {
  const [input, setInput] = useState("");
  const { todos, handleAddTodo, handleCheckTodo, handleDeleteTodo } =
    useTodos();
  const [tabs, setTabs] = useState([
    { id: TAB_IDS.TODOS, value: "Todos", active: true },
    { id: TAB_IDS.TIME_TRACKER, value: "Time Tracker", active: false },
  ]);

  const switchToTab = (tabID) => {
    setTabs(
      tabs.map((tab) =>
        tab.id !== tabID ? { ...tab, active: false } : { ...tab, active: true }
      )
    );
  };

  const handleTodoInputSubmit = () => {
    if (!input) {
      alert("Todo must not be empty!");
      return;
    }
    handleAddTodo({ id: todos.length, value: input, check: false });
    setInput("");
  };

  const onTodoCheck = (todo) => {
    handleCheckTodo(todo.id);
  };

  const onTodoDelete = (todo) => {
    handleDeleteTodo(todo.id);
  };

  const renderTab = () => {
    const activeTabID = tabs.find((tab) => tab.active)?.id;
    switch (activeTabID) {
      case TAB_IDS.TODOS:
        return (
          <>
            <TodoList
              title="Todos:"
              todos={todos.filter((todo) => !todo.check)}
              onTodoCheck={onTodoCheck}
              onTodoDelete={onTodoDelete}
            />
            <TodoList
              title="Done:"
              todos={todos.filter((todo) => todo.check)}
              onTodoCheck={onTodoCheck}
              onTodoDelete={onTodoDelete}
              disableCheck
            />
          </>
        );
      case TAB_IDS.TIME_TRACKER:
        return <TimeTracker />;
      default:
        return;
    }
  };

  return (
    <div className="flex w-full h-screen bg-slate-800 justify-center items-center">
      <div className="bg-white w-96 p-4 rounded-sm">
        <div>
          <h1 className="text-xl font-medium">
            Time tracker just like Calamari
          </h1>
          <div className="flex items-center justify-between gap-2">
            <input
              className="border w-full rounded-sm p-2"
              placeholder='"Eating pancake"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTodoInputSubmit()}
            />
            <RiEdit2Fill
              className="text-slate-800 cursor-pointer font-bold text-xl"
              onClick={handleTodoInputSubmit}
            />
          </div>
          <hr className="my-2" />
        </div>
        <div>
          <Tabs tabs={tabs} handleSwitchTab={switchToTab} />
        </div>
        <div>{renderTab()}</div>
      </div>
    </div>
  );
}

export default App;
