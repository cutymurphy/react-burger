import { useParams } from "react-router-dom";
import styles from "./order.module.css";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getAllOrders } from "../../services/actions/allOrders";
import {
  selectOrder,
  unselectOrder,
} from "../../services/actions/order-details";
import { RingLoader } from "react-spinners";
import OrderDetails from "../../components/order-details";

const Order: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, ordersRequest, ordersFailed } = useSelector(
    (store) => store.allOrders
  );
  const { selectedOrder } = useSelector((store) => store.orderDetails);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getAllOrders());
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    const needOrder = orders.find((order) => order._id === id);
    if (needOrder) {
      dispatch(selectOrder(needOrder));
    }
  }, [dispatch, id, orders]);

  useEffect(() => {
    return () => {
      dispatch(unselectOrder());
    };
  }, [dispatch]);

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
