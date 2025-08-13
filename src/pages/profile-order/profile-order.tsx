import { useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  selectOrder,
  unselectOrder,
} from "../../services/actions/order-details";
import Order from "../order";
import { getOrders } from "../../services/actions/orders";

const ProfileOrder: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, ordersRequest, ordersFailed } = useSelector(
    (store) => store.orders
  );
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrders(accessToken));
    }
  }, [accessToken, dispatch, orders.length]);

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

export default ProfileOrder;
