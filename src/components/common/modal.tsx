import { ReactNode } from "react";

type Props = {
  active: boolean;
  children: ReactNode;
  handleClick: () => void;
};

const Modal = ({ active, handleClick, children }: Props) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={handleClick}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
