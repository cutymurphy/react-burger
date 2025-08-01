import { FC } from "react";
import styles from "./modal-overlay.module.css";
import { IModalOverlay } from "./types";

const ModalOverlay: FC<IModalOverlay> = ({ children, onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
