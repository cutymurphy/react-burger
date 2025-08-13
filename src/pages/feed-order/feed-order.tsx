import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getAllOrders } from "../../services/actions/allOrders";
import {
  selectOrder,
  unselectOrder,
} from "../../services/actions/order-details";
import Order from "../order";

const FeedOrder: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, ordersRequest, ordersFailed } = useSelector(
    (store) => store.allOrders
  );

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

  return <Order ordersFailed={ordersFailed} ordersRequest={ordersRequest} />;
};

export default FeedOrder;
