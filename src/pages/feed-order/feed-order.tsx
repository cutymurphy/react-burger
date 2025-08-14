import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  selectOrder,
  unselectOrder,
} from "../../services/actions/order-details";
import Order from "../order";
import {
  handleWSConnectionClosed,
  handleWSConnectionStart,
} from "../../services/actions/webSocket";
import { WS_BASE_URL } from "../../utils/api";
import { getOrderById } from "../../utils/order";
import { getAllOrdersError } from "../../services/actions/allOrders";

const FeedOrder: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, ordersRequest, ordersFailed } = useSelector(
    (store) => store.allOrders
  );

  useEffect(() => {
    const url = `${WS_BASE_URL}/orders/all`;
    if (!orders.length) {
      dispatch(handleWSConnectionStart(url));
    }

    return () => {
      dispatch(handleWSConnectionClosed(url));
    };
  }, [dispatch, orders.length]);

  useEffect(() => {
    const needOrder = orders.find((order) => order._id === id);
    if (needOrder) {
      dispatch(selectOrder(needOrder));
    } else {
      getOrderById(id || "").then((data) => {
        if (data.success && data.orders[0]) {
          dispatch(selectOrder(data.orders[0]));
        } else {
          getAllOrdersError();
        }
      });
    }
  }, [dispatch, id, orders]);

  useEffect(() => {
    return () => {
      dispatch(unselectOrder());
    };
  }, [dispatch]);

  return <Order ordersFailed={ordersFailed} ordersRequest={ordersRequest} />;
};

export default FeedOrder;
