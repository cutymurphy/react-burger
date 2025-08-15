import { FC, useEffect } from "react";
import styles from "./order-details.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import OrderStatus from "../order-status";
import { RingLoader } from "react-spinners";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/ingredients";
import { IOrderDetails } from "./types";

const OrderDetails: FC<IOrderDetails> = ({ orderNumberStyle }) => {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((store) => store.orderDetails);
  const {
    ingredients: allIngredients,
    ingredientsRequest,
    ingredientsFailed,
  } = useSelector((store) => store.ingredients);

  useEffect(() => {
    if (!allIngredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, allIngredients.length]);

  if (!selectedOrder) return null;

  const { number, name, status, ingredients, createdAt, updatedAt } =
    selectedOrder;

  const needIngredients = ingredients.map((item) =>
    allIngredients.find((i) => i._id === item)
  );

  const uniqueIngredients = needIngredients.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj?._id === item?._id)
  );

  const totalPrice = needIngredients.reduce(
    (sum, item) => sum + (item?.price || 0),
    0
  );

  return (
    <div className={styles.order}>
      <div style={orderNumberStyle}>
        <p className="text text_type_digits-default mb-10">#{number}</p>
      </div>
      <p className="text text_type_main-medium mb-3">{name}</p>
      <div className="mb-15">
        <OrderStatus status={status} />
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      {ingredientsRequest && (
        <div className={styles.order__info}>
          <RingLoader color="var(--dark-grey)" loading />
        </div>
      )}
      {!ingredientsRequest && ingredientsFailed && (
        <div className={styles.order__info}>
          <p className="text text_type_main-default text_color_inactive">
            Произошла ошибка
          </p>
        </div>
      )}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length > 0 && (
        <div className={styles.order__filling}>
          <div
            className={`${styles.order__filling__ingredients} mb-10 ${
              uniqueIngredients.length > 4 && "pr-6"
            }`}
          >
            {uniqueIngredients.map((item, index) => {
              const ingredientCount = needIngredients.filter(
                (i) => i?._id === item?._id
              ).length;

              return (
                <div key={index} className={styles.order__filling__ingredient}>
                  <div
                    className={`${styles.order__filling__ingredient_block} mr-4`}
                  >
                    <div
                      className={`${styles.order__filling__bg_gradient} mr-4`}
                    >
                      <div className={styles.order__filling__bg}>
                        <img
                          className={styles.order__filling__img}
                          src={item?.image_large}
                          alt={item?.name}
                        />
                      </div>
                    </div>
                    <p className="text text_type_main-default">{item?.name}</p>
                  </div>
                  <div className={styles.order__filling__price}>
                    <p className="text text_type_digits-default mr-2">
                      {ingredientCount} x {item?.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.order__filling__summary}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(updatedAt || createdAt)} />
            </p>
            <div className={styles.order__filling__summary__price}>
              <p className="text text_type_digits-default mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
