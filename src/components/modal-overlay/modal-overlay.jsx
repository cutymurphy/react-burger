import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
