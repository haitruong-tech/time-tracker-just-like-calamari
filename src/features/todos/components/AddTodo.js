import { useContext, useState } from "react";
import { TodosActionsContext } from "../context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { RiEdit2Fill } from "react-icons/ri";

function AddTodo() {
  const [input, setInput] = useState("");
  const { handleAddTodo } = useContext(TodosActionsContext);

  const handleTodoInputSubmit = () => {
    if (!input) {
      alert("Todo must not be empty!");
      return;
    }
    handleAddTodo({ id: uuidv4(), value: input, check: false });
    setInput("");
  };

  return (
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
  );
}

export default AddTodo;
