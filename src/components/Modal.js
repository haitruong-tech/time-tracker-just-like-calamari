import { RiCloseLine } from "react-icons/ri";

function Modal({ content, footer, header, closeModal }) {
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
        {content && <div className="p-4 border-b">{content}</div>}
        {footer && <footer className="p-4">{footer}</footer>}
      </div>
    </div>
  );
}

export default Modal;
