import { memo, useContext, useLayoutEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import { type Todo } from "../types/todo";
import { TimeTrackerContext } from "@features/time-tracker-v2/contexts/TimeTrackerContext";
import { DragNDropContext } from "src/contexts/dragndrop";

interface TodoListProps {
  todos: Todo[];
}

type ItemRef = Record<string, HTMLElement>;
type PosRef = Record<string, number | null>;

const TodoList = memo(({ todos }: TodoListProps) => {
  const itemsRefs = useRef<ItemRef>({});
  const prevPos = useRef<PosRef>({});

  const { sourceItemID } = useContext(DragNDropContext);
  const timerID = useContext(TimeTrackerContext).timers.at(-1)?.id ?? "";

  useLayoutEffect(() => {
    Object.entries(itemsRefs.current).forEach(([key, el]) => {
      if (el == null || sourceItemID === "") return;

      // 👇 Get difference in position to calculate an offset for transition
      const { top } = el.getBoundingClientRect();
      if (prevPos.current[key] == null) prevPos.current[key] = top;
      let diffTop = Math.floor((prevPos.current[key] as number) - top);
      if (sourceItemID === el.id) {
        diffTop = el.offsetHeight * Math.sign(diffTop);
      }

      prevPos.current[key] = top;
      el.style.transform = `translateY(${diffTop}px)`;
      el.style.transition = "transform 0s";

      // 👇 First frame renders offset positions, second the transition ends
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el == null) return;
          el.style.transform = `translateY(0px)`;
          el.style.transition = "transform 100ms ease-out";
        });
      });
    });
  }, [todos.map((todo) => todo.id).join(", ")]);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          timerID={timerID}
          ref={(e) => {
            if (e == null) return;
            itemsRefs.current[todo.id] = e;
          }}
        />
      ))}
    </ul>
  );
});

TodoList.displayName = "TodoList";

export default TodoList;
