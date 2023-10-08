import { memo, useContext } from "react";
import Modal from ".";
import { TodosContext } from "@features/todos-v2/contexts/TodosContext";
import { toastError } from "src/lib/react-toastify";

interface ModalProps {
  closeModal: () => void;
  todoID: string;
}

const TaskDetailsModal = memo(({ closeModal, todoID }: ModalProps) => {
  const todos = useContext(TodosContext);
  const todo = todos.find((todo) => todo.id === todoID);

  if (todo == null) {
    toastError("No todo found");
    closeModal();
    return null;
  }

  return (
    <Modal
      closeModal={closeModal}
      header={
        <h2 className="text-2xl font-bold flex items-center gap-x-2">
          <span className="shrink-0">Task #1:</span>
          <input
            className="py-1 px-2 shrink w-full bg-transparent rounded"
            value={todo.value}
            onChange={() => {}}
          />
        </h2>
      }
      content={
        <div>
          <section className="mt-10 uppercase">
            <div>
              <h3 className="text-2xl font-medium">{todo.value}</h3>
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
          <section className="mt-10">
            <h2 className="uppercase text-[#E23703] font-bold text-2xl">
              Danger zone
            </h2>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-medium">Delete this task</span>
              <button className="border-4 border-[#E23703] text-[#E23703] text-xl font-bold rounded py-2 px-4 hover:bg-[#E23703] hover:text-[#050920] transition">
                Delete
              </button>
            </div>
          </section>
        </div>
      }
    />
  );
  // return (
  //   <div className="bg-[#050920]/[.75] z-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
  //     <div className="bg-[#050920] w-[560px] py-10 px-14 shadow-[0_8px_24px_0_rgba(149,157,165,0.2)]">
  //       <header className="border-b flex items-center">
  //         <h2 className="text-2xl font-bold flex items-center gap-x-2">
  //           <span className="shrink-0">Task #1:</span>
  //           <input
  //             className="py-1 px-2 shrink w-full bg-transparent rounded"
  //             value="Design"
  //           />
  //         </h2>
  //         <RiCloseLine
  //           className="text-4xl cursor-pointer"
  //           onClick={closeModal}
  //         />
  //       </header>
  //       <section className="mt-10 uppercase">
  //         <div>
  //           <h3 className="text-2xl font-medium">General</h3>
  //           <div className="mt-4 grid grid-cols-2 gap-6">
  //             <div>
  //               <h4 className="text-xl font-medium">Estimated time</h4>
  //               <span className="text-lg text-[#eee]/[.90]">12:36:12</span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">Log time</h4>
  //               <span className="text-lg text-[#eee]/[.90]">10:23:53</span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">Assignee</h4>
  //               <span className="text-lg text-[#eee]/[.90]">Hai truong</span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">Sessions</h4>
  //               <span className="text-lg text-[#eee]/[.90]">
  //                 <span className="text-[#D05DEE] font-bold cursor-pointer">
  //                   [1]
  //                 </span>
  //                 ,{" "}
  //                 <span className="text-[#D05DEE] font-bold cursor-pointer">
  //                   [2]
  //                 </span>
  //                 ,{" "}
  //                 <span className="text-[#D05DEE] font-bold cursor-pointer">
  //                   [3]
  //                 </span>
  //                 ,{" "}
  //                 <span className="text-[#D05DEE] font-bold cursor-pointer">
  //                   [4]
  //                 </span>
  //               </span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">Created by</h4>
  //               <span className="text-lg text-[#eee]/[.90]">Hai truong</span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">Created at</h4>
  //               <span className="text-lg text-[#eee]/[.90]">
  //                 2023/03/21 12:23:42
  //               </span>
  //             </div>
  //             <div>
  //               <h4 className="text-xl font-medium">STATUS</h4>
  //               <span className="text-lg text-[#eee]/[.90]">ONGOING</span>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       <section className="mt-10">
  //         <h2 className="uppercase text-[#E23703] font-bold text-2xl">
  //           Danger zone
  //         </h2>
  //         <div className="mt-1 flex items-center justify-between">
  //           <span className="text-xl font-medium">Delete this task</span>
  //           <button className="border-4 border-[#E23703] text-[#E23703] text-xl font-bold rounded py-2 px-4 hover:bg-[#E23703] hover:text-[#050920] transition">
  //             Delete
  //           </button>
  //         </div>
  //       </section>
  //     </div>
  //   </div>
  // );
});

TaskDetailsModal.displayName = "TaskDetailsModal";

export default TaskDetailsModal;
