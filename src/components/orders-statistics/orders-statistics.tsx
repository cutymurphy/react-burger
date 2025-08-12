import { FC } from "react";
import styles from "./orders-statistics.module.css";
import { useSelector } from "../../utils/hooks";

const OrdersStatistics: FC = () => {
  const { orders, total, totalToday } = useSelector((store) => store.allOrders);
  const doneOrders = orders
    .filter((order) => order.status === "done")
    .slice(0, 20);
  const inWorkOrders = orders
    .filter((order) => order.status !== "done")
    .slice(0, 20);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.lists} mb-15`}>
        <div className={styles.list}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={styles.numbers}>
            {doneOrders.map((order) => (
              <p
                key={order._id}
                className={`text text_type_digits-default ${styles.number__success}`}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.list}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles.numbers}>
            {inWorkOrders.map((order) => (
              <p key={order._id} className="text text_type_digits-default">
                {order.number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`text text_type_digits-large mb-15 ${styles.count}`}>
        {total}
      </p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`text text_type_digits-large ${styles.count}`}>
        {totalToday}
      </p>
    </div>
  );
};

export default OrdersStatistics;
