import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details";
import OrderDetails from "../order-details";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
} from "../../services/actions/ingredient-details";
import { CLOSE_ORDER, postOrder } from "../../services/actions/order";
import { useMemo } from "react";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const selectedIngredients = useSelector(
    (store) => store.builder.selectedIngredients
  );
  const selectedIngredient = useSelector(
    (store) => store.ingredient.selectedIngredient
  );
  const { order, orderFailed } = useSelector((store) => store.order);

  const mainBun = ingredients.length > 0 ? ingredients[0] : null;
  const totalIngredientsCost = useMemo(() => {
    if (!mainBun) return 0;
    return (
      selectedIngredients.reduce((sum, item) => sum + item.price, 0) +
      mainBun.price * 2
    );
  }, [selectedIngredients, mainBun]);

  const onIngredientClick = (ingredient) => {
    dispatch({ type: SELECT_INGREDIENT, ingredient });
  };

  const onIngredientClose = () => {
    dispatch({ type: UNSELECT_INGREDIENT });
  };

  const createOrder = () => {
    if (selectedIngredients.length > 0) {
      dispatch(postOrder(selectedIngredients.map((item) => item._id)));
    } else {
      alert("Сначала выберите ингредиенты для заказа");
    }
  };

  const onOrderModalClose = () => {
    dispatch({ type: CLOSE_ORDER });
  };

  return (
    <section className={`${styles.constructor} mt-25 pb-10 pl-4 pr-2`}>
      <article className={`${styles.constructor__container} mb-10`}>
        <div onClick={() => onIngredientClick(mainBun)}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${mainBun.name} (верх)`}
            price={mainBun.price}
            thumbnail={mainBun.image_mobile}
            extraClass={`${styles.constructor__element} ${styles.constructor__element_locked} ml-8`}
          />
        </div>
        <ul className={`${styles.constructor__list} pr-2`}>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={"ingredient_" + index}
              className={styles.constructor__item}
            >
              <DragIcon type="primary" className={styles.constructor__drag} />
              <div
                onClick={() => onIngredientClick(ingredient)}
                className={styles.constructor__element}
              >
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}
                />
              </div>
            </li>
          ))}
        </ul>
        <div onClick={() => onIngredientClick(mainBun)}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${mainBun.name} (низ)`}
            price={mainBun.price}
            thumbnail={mainBun.image_mobile}
            extraClass={`${styles.constructor__element} ${styles.constructor__element_locked} ml-8`}
          />
        </div>
      </article>
      <footer className={styles.constructor__order}>
        <p className="text text_type_digits-medium mr-2">
          {totalIngredientsCost}
        </p>
        <CurrencyIcon
          type="primary"
          className={`${styles.constructor__currency} mr-10`}
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrder}
        >
          Оформить заказ
        </Button>
      </footer>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={onIngredientClose}>
          <IngredientDetails />
        </Modal>
      )}
      {order.number !== null && !orderFailed && (
        <Modal onClose={onOrderModalClose}>
          <OrderDetails onTickClick={onOrderModalClose} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
