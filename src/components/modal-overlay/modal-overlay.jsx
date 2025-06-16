import styles from "./modal-overlay.module.css";

function ModalOverlay({ children, onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
}

export default ModalOverlay;
