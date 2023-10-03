import { useState } from "react";
import Tabs from "../components/Tabs";
import { TAB_IDS } from "../data/constants";
import TimeTracker from "../components/TimeTracker";
import Modal from "../components/Modal";
import Todos from "../features/todos";
import TodosProvider from "../features/todos/context/TodosContext";
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
      <div className="bg-white w-96 p-4 rounded-sm">
        <div>
          <h1 className="text-xl font-medium">
            Time tracker just like Calamari
          </h1>
          <TodosProvider>
            <AddTodo />
          </TodosProvider>
          <hr className="my-2" />
        </div>
        <Tabs
          initialTab={TAB_IDS.TODOS}
          tabs={{
            [TAB_IDS.TODOS]: {
              name: "Todos",
              component: (
                <TodosProvider>
                  <Todos onOpenModal={onOpenModal} />
                </TodosProvider>
              ),
            },
            [TAB_IDS.TIME_TRACKER]: {
              name: "Time Tracker",
              component: <TimeTracker />,
            },
          }}
        />
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
