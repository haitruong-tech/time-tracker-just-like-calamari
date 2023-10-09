import { memo, useContext, useState } from "react";
import Modal from ".";
import {
  TodosActionsContext,
  TodosContext,
} from "@features/todos-v2/contexts/TodosContext";
import { toastError } from "src/lib/react-toastify";

interface ModalProps {
  closeModal: () => void;
  todoID: string;
}

const TaskDetailsModal = memo(({ closeModal, todoID }: ModalProps) => {
  const todos = useContext(TodosContext);
  const { editTodo, handleDeleteTodo } = useContext(TodosActionsContext);
  const todo = todos.find((todo) => todo.id === todoID);
  const [todoValue, setTodoValue] = useState(todo?.value ?? "");

  if (todo == null) {
    toastError("No todo found");
    closeModal();
    return null;
  }

  return (
    <Modal
      closeModal={closeModal}
      header={
        <h2 className="text-2xl font-bold flex items-center gap-x-2 text-[#eee]">
          <span className="shrink-0">Task #1:</span>
          <input
            className="py-1 px-2 shrink w-full bg-transparent rounded"
            value={todoValue}
            onChange={(e) => {
              setTodoValue(e.target.value);
            }}
            onBlur={() => {
              editTodo(todo.id, todoValue);
            }}
          />
        </h2>
      }
      content={
        <div>
          <section className="mt-10 uppercase text-[#eee]">
            <div>
              <h3 className="text-2xl font-medium">{todoValue}</h3>
              <div className="mt-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium">Estimated time</h4>
                  <span className="text-lg text-[#eee]/[.90]">12:36:12</span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Log time</h4>
                  <span className="text-lg text-[#eee]/[.90]">10:23:53</span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Assignee</h4>
                  <span className="text-lg text-[#eee]/[.90]">Hai truong</span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Sessions</h4>
                  <span className="text-lg text-[#eee]/[.90]">
                    <span className="text-[#D05DEE] font-bold cursor-pointer">
                      [1]
                    </span>
                    ,{" "}
                    <span className="text-[#D05DEE] font-bold cursor-pointer">
                      [2]
                    </span>
                    ,{" "}
                    <span className="text-[#D05DEE] font-bold cursor-pointer">
                      [3]
                    </span>
                    ,{" "}
                    <span className="text-[#D05DEE] font-bold cursor-pointer">
                      [4]
                    </span>
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Created by</h4>
                  <span className="text-lg text-[#eee]/[.90]">Hai truong</span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Created at</h4>
                  <span className="text-lg text-[#eee]/[.90]">
                    2023/03/21 12:23:42
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-medium">STATUS</h4>
                  <span className="text-lg text-[#eee]/[.90]">ONGOING</span>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-10 text-[#eee]">
            <h2 className="uppercase text-[#E23703] font-bold text-2xl">
              Danger zone
            </h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-medium">Delete this task</span>
              <button
                className="border-4 border-[#E23703] text-[#E23703] text-xl font-bold rounded py-2 px-4 hover:bg-[#E23703] hover:text-[#050920] transition"
                onClick={() => {
                  handleDeleteTodo(todo.id);
                  closeModal();
                }}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      }
    />
  );
});

TaskDetailsModal.displayName = "TaskDetailsModal";

export default TaskDetailsModal;
