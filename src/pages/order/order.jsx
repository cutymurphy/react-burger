import { useParams } from "react-router-dom";
import styles from "./order.module.css";

function Order() {
  const { number } = useParams();

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-default">Заказ {number}: ...</p>
    </div>
  );
}

export default Order;
