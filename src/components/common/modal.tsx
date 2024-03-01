import { ReactNode } from "react";

type Props = {
  active: boolean;
  setActive: (active: boolean) => void;
  children: ReactNode;
};

const Modal = ({ active, setActive, children }: Props) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
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
