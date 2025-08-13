import { FC, useEffect } from "react";
import styles from "./orders-history.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getOrders } from "../../services/actions/orders";
import { RingLoader } from "react-spinners";
import Orders from "../../components/orders";

const OrdersHistory: FC = () => {
  const dispatch = useDispatch();
  const { orders, ordersFailed, ordersRequest } = useSelector(
    (store) => store.orders
  );
  const { accessToken } = useSelector((store) => store.user);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrders(accessToken));
    }
  }, [accessToken, orders.length, dispatch]);

  return (
    <div className={styles.wrapper}>
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
        <Orders orders={orders} />
      )}
    </div>
  );
};

export default OrdersHistory;
