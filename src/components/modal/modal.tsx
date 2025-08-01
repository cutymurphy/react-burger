import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { IModal } from "./types";

const modalRoot = document.getElementById("modals-root") as HTMLElement;

const Modal: FC<IModal> = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.modal__header} mt-10 ml-10 mr-10`}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <CloseIcon
            type="primary"
            className={styles.modal__close_icon}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
