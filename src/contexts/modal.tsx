import { createContext, memo, useContext, useEffect, useState } from "react";
import TaskDetailsModal from "src/components/Modal/task-details";

export enum ModalType {
  TaskDetails,
}

interface TaskDetailsModalPayload {
  type: ModalType.TaskDetails;
  todoID: string;
}

interface Modal {
  open: boolean;
  payload: TaskDetailsModalPayload;
}

interface ModalActions {
  openModal: (payload: TaskDetailsModalPayload) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<Modal>({
  open: false,
  payload: { type: ModalType.TaskDetails, todoID: "" },
});

export const ModalActionsContext = createContext<ModalActions>({
  closeModal: () => {},
  openModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContainer = memo(() => {
  const { open, payload } = useContext(ModalContext);
  const { closeModal } = useContext(ModalActionsContext);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!open) return null;
  switch (payload.type) {
    case ModalType.TaskDetails:
      return (
        <TaskDetailsModal closeModal={closeModal} todoID={payload.todoID} />
      );
  }
});

ModalContainer.displayName = "ModalContainer";

const ModalProvider = memo(({ children }: ModalProviderProps) => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<TaskDetailsModalPayload>({
    todoID: "",
    type: ModalType.TaskDetails,
  });

  const openModal = (payload: any): void => {
    setOpen(true);
    setPayload(payload);
  };

  const closeModal = (): void => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, payload }}>
      <ModalActionsContext.Provider value={{ openModal, closeModal }}>
        {children}
      </ModalActionsContext.Provider>
    </ModalContext.Provider>
  );
});

ModalProvider.displayName = "ModalProvider";

export default ModalProvider;
