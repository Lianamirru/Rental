import "./modal.css";
import { ReactNode } from "react";
import { useTheme } from "../../../context/ThemeContext";

type Props = {
  active: boolean;
  setActive: (active: boolean) => void;
  children: ReactNode;
};
const Modal = ({ active, setActive, children }: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className={active ? "my_modal active" : "my_modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        id={theme}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
