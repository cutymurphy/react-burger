import { FC, useEffect } from "react";
import styles from "./orders-history.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import { RingLoader } from "react-spinners";
import Orders from "../../components/orders";
import {
  handleWSConnectionClosed,
  handleWSConnectionStart,
} from "../../services/actions/webSocket";
import { WS_BASE_URL } from "../../utils/api";

const OrdersHistory: FC = () => {
  const dispatch = useDispatch();
  const { orders, ordersFailed, ordersRequest } = useSelector(
    (store) => store.orders
  );
  const { accessToken } = useSelector((store) => store.user);

  useEffect(() => {
    const url = `${WS_BASE_URL}/orders?token=${accessToken}`;
    if (!orders.length) {
      dispatch(handleWSConnectionStart(url));
    }

    return () => {
      dispatch(handleWSConnectionClosed(url));
    };
  }, [accessToken, dispatch, orders.length]);

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
