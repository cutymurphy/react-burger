import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal";
import { FC, useEffect } from "react";
import { RingLoader } from "react-spinners";
import styles from "./order-modal.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import OrderDetails from "../order-details";
import {
  selectOrder,
  unselectOrder,
} from "../../services/actions/order-details";

const OrderModal: FC<{ isFeedModal?: boolean }> = ({ isFeedModal = true }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, ordersRequest } = useSelector((store) =>
    isFeedModal ? store.allOrders : store.orders
  );
  const { selectedOrder } = useSelector((store) => store.orderDetails);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(unselectOrder());
  };

  useEffect(() => {
    const needOrder = orders.find((order) => order._id === id);
    if (needOrder) {
      dispatch(selectOrder(needOrder));
    }
  }, [dispatch, id, orders]);

  return (
    <Modal title="Детали заказа" onClose={handleCloseModal}>
      {!selectedOrder || ordersRequest ? (
        <div className={styles.loader}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      ) : (
        <div className={styles.orderWrapper}>
          <OrderDetails />
        </div>
      )}
    </Modal>
  );
};

export default OrderModal;
