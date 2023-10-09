import { memo, useCallback, useContext, useRef } from "react";
import { FillCheckboxIcon, UnfillCheckboxIcon } from "src/assets/icons";
import { type Todo } from "../types/todo";
import { ModalActionsContext, ModalType } from "src/contexts/modal";
import { TodosActionsContext } from "../contexts/TodosContext";
import { TimeTrackerContext } from "@features/time-tracker-v2/contexts/TimeTrackerContext";
import { DragNDropActionsContext } from "src/contexts/dragndrop";

interface TodoItemProps {
  todo: Todo;
  timerID: string;
}

const TodoItem = memo(({ todo, timerID }: TodoItemProps) => {
  const { openModal } = useContext(ModalActionsContext);
  const { handleCheckTodo, handleSwitchPosition } =
    useContext(TodosActionsContext);
  const { dragStartHandler, dragOverHandler, dropHandler } = useContext(
    DragNDropActionsContext
  );

  const handleCheckBoxIconClicked = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleCheckTodo(todo.id, timerID);
    },
    [todo.id, timerID]
  );

  const sourceID = useRef<string | null>(null);

  return (
    <li
      key={todo.id}
      id={todo.id}
      className="border-2 py-2 px-4 flex justify-between items-center first:rounded-tl first:rounded-tr last:rounded-bl last:rounded-br cursor-pointer hover:bg-[#eee]/[0.25]"
      onClick={() => {
        openModal({ todoID: todo.id, type: ModalType.TaskDetails });
      }}
      draggable
      ref={() => (sourceID.current = todo.id)}
      onDragStart={(e) => {
        dragStartHandler(e, todo.id);
      }}
      onDragOver={(e) => {
        dragOverHandler(
          e,
          todo.id,
          (sourceItemID, setSourceItemID, setTargetItemID) => {
            handleSwitchPosition(sourceItemID, todo.id);
          }
        );
      }}
      onDrop={(e) => {
        dropHandler(e, todo.id, (sourceItemID) => {
          handleSwitchPosition(sourceItemID, todo.id);
        });
      }}
    >
      <span className="font-medium text-xl pointer-events-none">
        {todo.value}
      </span>
      {todo.check && (
        <FillCheckboxIcon
          className="cursor-pointer hover:fill-[#eee]/[0.75] fill-[#eee] transition"
          onClick={handleCheckBoxIconClicked}
        />
      )}
      {!todo.check && (
        <UnfillCheckboxIcon
          className="cursor-pointer fill-transparent hover:fill-[#eee]/[.2] transition"
          onClick={handleCheckBoxIconClicked}
        />
      )}
    </li>
  );
});

TodoItem.displayName = "TodoItem";

const TodoItemWrapper = memo((props: Omit<TodoItemProps, "timerID">) => {
  const timerID = useContext(TimeTrackerContext).timers.at(-1)?.id ?? "";
  return <TodoItem timerID={timerID} {...props} />;
});

TodoItemWrapper.displayName = "TodoItemWrapper";

export default TodoItemWrapper;
