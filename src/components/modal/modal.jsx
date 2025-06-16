import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals-root");

function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return null;

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
}

export default Modal;
