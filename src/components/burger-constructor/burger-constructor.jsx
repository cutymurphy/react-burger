import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
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
import { useDrop } from "react-dnd";
import { addIngredient, CHANGE_BUN } from "../../services/actions/builder";
import { INCREASE_INGREDIENT_COUNT } from "../../services/actions/ingredients";
import IngredientDraggable from "../ingredient-draggable";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { selectedIngredients, mainBun } = useSelector(
    (store) => store.builder
  );
  const selectedIngredient = useSelector(
    (store) => store.ingredient.selectedIngredient
  );
  const { order, orderFailed } = useSelector((store) => store.order);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      item.type === "bun" ? changeBun(item.id) : addNewIngredient(item.id);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const isCreateOrderDisabled = !mainBun || !selectedIngredients.length;

  const totalIngredientsCost = useMemo(() => {
    if (!mainBun) return 0;
    return (
      selectedIngredients.reduce((sum, item) => sum + item.price, 0) +
      mainBun.price * 2
    );
  }, [selectedIngredients, mainBun]);

  const addNewIngredient = (ingredientId) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    if (ingredient) {
      dispatch(addIngredient(ingredient));
      dispatch({ type: INCREASE_INGREDIENT_COUNT, ingredientId });
    }
  };

  const changeBun = (ingredientId) => {
    const newBun = ingredients.find((item) => item._id === ingredientId);
    if (
      (!mainBun && newBun) ||
      (mainBun && newBun && mainBun._id !== newBun._id)
    ) {
      dispatch({ type: CHANGE_BUN, bun: newBun });
    }
  };

  const onIngredientClick = (ingredient) => {
    dispatch({ type: SELECT_INGREDIENT, ingredient });
  };

  const onIngredientClose = () => {
    dispatch({ type: UNSELECT_INGREDIENT });
  };

  const createOrder = () => {
    const ingredientIds = [
      mainBun._id,
      ...selectedIngredients.map((item) => item._id),
      mainBun._id,
    ];

    dispatch(postOrder(ingredientIds));
  };

  const onOrderModalClose = () => {
    dispatch({ type: CLOSE_ORDER });
  };

  return (
    <section className={`${styles.constructor} mt-25 pb-10 pl-4 pr-2`}>
      <article
        className={`${styles.constructor__container} mb-10`}
        ref={dropTarget}
      >
        {mainBun || selectedIngredients.length > 0 ? (
          <>
            {mainBun && (
              <div onClick={() => onIngredientClick(mainBun)} className="pr-2">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${mainBun.name} (верх)`}
                  price={mainBun.price}
                  thumbnail={mainBun.image_mobile}
                  extraClass={`${styles.constructor__element} ${styles.constructor__element_locked} ml-8`}
                />
              </div>
            )}
            <ul className={`${styles.constructor__list} pr-2`}>
              {selectedIngredients.map((ingredient, index) => (
                <IngredientDraggable
                  key={ingredient.uniqueId}
                  ingredient={ingredient}
                  index={index}
                />
              ))}
            </ul>
            {mainBun && (
              <div onClick={() => onIngredientClick(mainBun)} className="pr-2">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${mainBun.name} (низ)`}
                  price={mainBun.price}
                  thumbnail={mainBun.image_mobile}
                  extraClass={`${styles.constructor__element} ${styles.constructor__element_locked} ml-8`}
                />
              </div>
            )}
          </>
        ) : (
          <div
            className={`${styles.constructor__empty} ${
              isHover && styles.constructor__empty_hover
            }`}
          >
            <p className="text text_type_main-default text_color_inactive">
              Перенесите сюда булку и ингредиенты для создания заказа
            </p>
          </div>
        )}
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
          disabled={isCreateOrderDisabled}
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
