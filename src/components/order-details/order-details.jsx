import { orderData } from "../../utils/order";
import Modal from "../modal";
import styles from "./order-details.module.css";
import orderCheckImage from "../../images/order-check.png";

function OrderDetails({ isModalOpen, closeModal }) {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <section className={styles.details}>
        <p
          className={`text text_type_digits-large mb-8 ${styles.details__number}`}
        >
          {orderData.number}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img
          alt="фото галочки заказа"
          src={orderCheckImage}
          className={`${styles.details__image} mb-15`}
          onClick={closeModal}
        />
        <p className="text text_type_main-default mb-2">{orderData.message}</p>
        <p className="text text_type_main-default text_color_inactive mb-30">
          {orderData.subMessage}
        </p>
      </section>
    </Modal>
  );
}

export default OrderDetails;
