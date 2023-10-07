import { useContext, useState } from "react";
import { TodosActionsContext } from "../contexts/TodosContext";

import { SendIcon } from "src/assets/icons";

function AddTodo(): JSX.Element {
  const [input, setInput] = useState("");
  const { handleAddTodo } = useContext(TodosActionsContext);

  const handleTodoInputSubmit = (): void => {
    if (input === "") {
      alert("Todo must not be empty!");
      return;
    }
    handleAddTodo({ value: input, check: false });
    setInput("");
  };

  return (
    <div className="relative">
      <input
        className="w-full py-2 px-4 rounded bg-transparent border-2 pr-10 font-medium text-xl"
        placeholder="Add your todo here..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && handleTodoInputSubmit();
        }}
      />
      <SendIcon
        className="text-[#B4B5BA] absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#eee] transition cursor-pointer"
        onClick={handleTodoInputSubmit}
      />
    </div>
  );
}

export default AddTodo;
