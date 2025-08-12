import { FC, useEffect } from "react";
import { RingLoader } from "react-spinners";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getAllOrders } from "../../services/actions/allOrders";
import Orders from "../../components/orders";
import OrdersStatistics from "../../components/orders-statistics";

const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, ordersFailed, ordersRequest } = useSelector(
    (store) => store.allOrders
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(getAllOrders());
    }
  }, [dispatch, orders.length]);

  return (
    <div>
      {ordersRequest && (
        <div className={styles.state}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      )}
      {ordersFailed && !ordersRequest && (
        <div className={styles.state}>
          <p className="text text_type_main-default text_color_inactive">
            Произошла ошибка при получении заказов
          </p>
        </div>
      )}
      {!ordersFailed && !ordersRequest && !orders.length && (
        <div className={styles.state}>
          <p className="text text_type_main-default text_color_inactive">
            Заказов нет...
          </p>
        </div>
      )}
      {!ordersFailed && !ordersRequest && orders.length > 0 && (
        <main className={styles.main}>
          <p className="text text_type_main-large mb-5 mt-10 ml-2">
            Лента заказов
          </p>
          <div className={`${styles.main__sections} pb-10`}>
            <section className={`${styles.main__section} mr-15`}>
              <Orders orders={orders} />
            </section>
            <section className={styles.main__section}>
              <OrdersStatistics />
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default Feed;
