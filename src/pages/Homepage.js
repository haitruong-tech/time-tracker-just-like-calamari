import { useState } from "react";
import Tabs from "../components/Tabs";
import { TAB_IDS } from "../data/constants";
import TimeTracker from "../features/time-tracker";
import Modal from "../components/Modal";
import Todos from "../features/todos";
import TodosProvider from "../features/todos/contexts/TodosContext";
import AddTodo from "../features/todos/components/AddTodo";

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");

  const onOpenModal = (todo) => {
    setModalOpen(true);
    setModalHeader(todo.value);
  };

  return (
    <div className="flex w-full min-h-screen bg-slate-800 justify-center py-10 overflow-auto">
      <div className="bg-white h-min w-96 p-4 rounded-sm">
        <TodosProvider>
          <div>
            <h1 className="text-xl font-medium">
              Time tracker just like Calamari
            </h1>

            <AddTodo />
            <hr className="my-2" />
          </div>
          <Tabs
            initialTab={TAB_IDS.TODOS}
            tabs={{
              [TAB_IDS.TODOS]: {
                name: "Todos",
                component: <Todos onOpenModal={onOpenModal} />,
              },
              [TAB_IDS.TIME_TRACKER]: {
                name: "Time Tracker",
                component: <TimeTracker />,
              },
            }}
          />
        </TodosProvider>
      </div>
      {modalOpen && (
        <Modal
          header={modalHeader}
          closeModal={() => setModalOpen(false)}
          footer={
            <div className="flex">
              <button
                className="rounded ml-auto mr-2 px-4 py-2 bg-red-500"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="rounded px-4 py-2 bg-cyan-600">Save</button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default HomePage;
