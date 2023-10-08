import { memo } from "react";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  content?: React.ReactNode;
  footer?: React.ReactNode;
  header: React.ReactNode;
  closeModal: () => void;
}

const Modal = memo(({ content, footer, header, closeModal }: ModalProps) => {
  return (
    <div className="bg-[#050920]/[.75] z-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-[#050920] w-[560px] py-10 px-14 shadow-[0_8px_24px_0_rgba(149,157,165,0.2)]">
        <header className="border-b flex items-center">
          {header}
          <RiCloseLine
            className="text-4xl cursor-pointer"
            onClick={closeModal}
          />
        </header>
        {content}
        {footer}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
