import styles from "./order-details.module.css";
import orderCheckImage from "../../images/order-check.png";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IOrderDetails } from "./types";

const OrderDetails: FC<IOrderDetails> = ({ onTickClick }) => {
  const { order } = useSelector((store: any) => store.order);

  return (
    <section className={styles.details}>
      <p
        className={`text text_type_digits-large mb-8 ${styles.details__number}`}
      >
        {order.number}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        alt="фото галочки заказа"
        src={orderCheckImage}
        className={`${styles.details__image} mb-15`}
        onClick={onTickClick}
      />
      <p className="text text_type_main-default mb-2">{order.message}</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        {order.subMessage}
      </p>
    </section>
  );
};

export default OrderDetails;
