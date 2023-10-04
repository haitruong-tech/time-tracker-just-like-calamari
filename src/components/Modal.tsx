import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  content?: React.ReactNode;
  footer?: React.ReactNode;
  header: React.ReactNode;
  closeModal: () => void;
}

function Modal({
  content,
  footer,
  header,
  closeModal,
}: ModalProps): JSX.Element {
  return (
    <div className="bg-black/80 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-gray-300 w-96">
        <header className="p-4 bg-gray-400/20 border-b flex items-center justify-between">
          <h2 className="text-xl font-medium">{header}</h2>
          <RiCloseLine
            className="text-2xl cursor-pointer"
            onClick={closeModal}
          />
        </header>
        {Boolean(content) && <div className="p-4 border-b">{content}</div>}
        {Boolean(footer) && <footer className="p-4">{footer}</footer>}
      </div>
    </div>
  );
}

export default Modal;
