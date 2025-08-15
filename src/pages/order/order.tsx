import styles from "./order.module.css";
import { FC } from "react";
import { useSelector } from "../../utils/hooks";
import { RingLoader } from "react-spinners";
import OrderDetails from "../../components/order-details";
import { IOrder } from "./types";

const Order: FC<IOrder> = ({ ordersFailed, ordersRequest }) => {
  const { selectedOrder } = useSelector((store) => store.orderDetails);

  return (
    <div>
      {ordersRequest && (
        <div className={styles.wrapper}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      )}
      {ordersFailed && !ordersRequest && (
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Произошла ошибка при получении заказа
          </p>
        </div>
      )}
      {!ordersFailed && !ordersRequest && !selectedOrder && (
        <div className={styles.wrapper}>
          <p className="text text_type_main-large">Заказ не найден</p>
        </div>
      )}
      {!ordersFailed && !ordersRequest && selectedOrder && (
        <section className={styles.order}>
          <OrderDetails orderNumberStyle={{ textAlign: "center" }} />
        </section>
      )}
    </div>
  );
};

export default Order;
