import { FC, useEffect } from "react";
import { IOrders } from "./types";
import styles from "./orders.module.css";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getIngredients } from "../../services/actions/ingredients";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RingLoader } from "react-spinners";

const Orders: FC<IOrders> = ({ orders }) => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={`${styles.wrapper} mr-2`}>
      {orders.map(
        ({
          _id,
          ingredients: orderIngredients,
          status,
          number,
          name,
          createdAt,
          updatedAt,
        }) => {
          const needIngredients = orderIngredients.map((item) =>
            ingredients.find((i) => i._id === item)
          );
          const uniqueIngredients = needIngredients.filter(
            (item, index, self) =>
              index === self.findIndex((obj) => obj?._id === item?._id)
          );
          const firstIngredients = uniqueIngredients.slice(0, 6);
          const secondIngredients = uniqueIngredients.slice(6);
          const totalPrice = needIngredients.reduce(
            (sum, item) => sum + (item?.price || 0),
            0
          );

          return (
            <div key={_id} className={`${styles.card} p-6`}>
              <div className={`${styles.card__header} mb-6`}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(updatedAt || createdAt)} />
                </p>
              </div>
              <p className="text text_type_main-medium mb-6">{name}</p>
              {ingredientsRequest && (
                <div className={styles.card__info}>
                  <RingLoader color="var(--dark-grey)" loading />
                </div>
              )}
              {!ingredientsRequest && ingredientsFailed && (
                <div className={styles.card__info}>
                  <p className="text text_type_main-default text_color_inactive">
                    Произошла ошибка
                  </p>
                </div>
              )}
              {!ingredientsRequest &&
                !ingredientsFailed &&
                ingredients.length > 0 && (
                  <div className={styles.card__filling}>
                    <div className={styles.card__filling__ingredients}>
                      {firstIngredients.map((item, index) => {
                        const lastElementCount =
                          index === firstIngredients.length - 1 &&
                          secondIngredients.length > 0;

                        return (
                          <div
                            key={item?._id}
                            className={styles.card__filling__bg_gradient}
                            style={{ zIndex: firstIngredients.length - index }}
                          >
                            <div className={styles.card__filling__bg}>
                              <img
                                className={`${styles.card__filling__img} ${
                                  lastElementCount &&
                                  styles.card__filling__img_dark
                                }`}
                                src={item?.image_large}
                                alt={item?.name}
                              />
                              {lastElementCount && (
                                <p
                                  className={`text text_type_main-default ${styles.card__filling__count}`}
                                >
                                  +{secondIngredients.length}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.card__price}>
                      <p className="text text_type_digits-default mr-2">
                        {totalPrice}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default Orders;
