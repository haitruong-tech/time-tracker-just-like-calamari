import { createContext, memo, useState } from "react";

interface Drag {
  sourceItemID: string;
  targetItemID: string;
}

interface DragActions {
  dragStartHandler: (e: React.DragEvent<HTMLElement>, sourceID: string) => void;
  dragOverHandler: (
    e: React.DragEvent<HTMLElement>,
    targetID: string,
    callback: (...args: any[]) => void
  ) => void;
  dropHandler: (
    e: React.DragEvent<HTMLElement>,
    targetID: string,
    callback: (...args: any[]) => void
  ) => void;
}

export const DragNDropContext = createContext<Drag>({
  sourceItemID: "",
  targetItemID: "",
});

export const DragNDropActionsContext = createContext<DragActions>({
  dragOverHandler: () => {},
  dragStartHandler: () => {},
  dropHandler: () => {},
});

interface DragNDropProviderProps {
  children: React.ReactNode;
}

const DragNDropProvider = memo(({ children }: DragNDropProviderProps) => {
  const [sourceItemID, setSourceItemID] = useState("");
  const [targetItemID, setTargetItemID] = useState("");

  const dragStartHandler = (
    e: React.DragEvent<HTMLElement>,
    sourceID: string
  ): void => {
    setSourceItemID(sourceID);
  };

  const dragOverHandler = (
    e: React.DragEvent<HTMLElement>,
    targetID: string,
    callback: (...args: any[]) => void
  ): void => {
    e.preventDefault();
    callback(sourceItemID, setSourceItemID, setTargetItemID);
  };

  const dropHandler = (
    e: React.DragEvent<HTMLElement>,
    targetID: string,
    callback: (...args: any[]) => void
  ): void => {
    callback(sourceItemID, setSourceItemID, setTargetItemID);
  };

  return (
    <DragNDropContext.Provider value={{ sourceItemID, targetItemID }}>
      <DragNDropActionsContext.Provider
        value={{ dragStartHandler, dragOverHandler, dropHandler }}
      >
        {children}
      </DragNDropActionsContext.Provider>
    </DragNDropContext.Provider>
  );
});

DragNDropProvider.displayName = "DragNDropProvider";

export default DragNDropProvider;
