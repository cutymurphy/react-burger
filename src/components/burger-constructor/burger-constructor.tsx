import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";
import { CLOSE_ORDER, postOrder } from "../../services/actions/order";
import { FC, useMemo, useRef } from "react";
import { useDrop } from "react-dnd";
import { addIngredient, CHANGE_BUN } from "../../services/actions/builder";
import { INCREASE_INGREDIENT_COUNT } from "../../services/actions/ingredients";
import IngredientDraggable from "../ingredient-draggable";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TIngredient } from "../../utils/types";
import { Dispatch } from "redux";
import { TDragItem } from "./types";

const BurgerConstructor: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector(
    (store: any) => store.ingredients.ingredients
  );
  const { selectedIngredients, mainBun } = useSelector(
    (store: any) => store.builder
  );
  const { order, orderFailed } = useSelector((store: any) => store.order);
  const accessToken = useSelector((store: any) => store.user.accessToken);
  const refreshToken = localStorage.getItem("refreshToken");

  const [{ isHover }, dropTarget] = useDrop<
    TDragItem,
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    drop(item: TDragItem) {
      item.type === "bun" ? changeBun(item.id) : addNewIngredient(item.id);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const targetRef = useRef<HTMLElement>(null);

  const isCreateOrderDisabled = !mainBun || !selectedIngredients.length;

  const totalIngredientsCost = useMemo<number>(() => {
    const mainBunsCost = mainBun ? mainBun.price * 2 : 0;
    return (
      selectedIngredients.reduce(
        (sum: number, item: TIngredient) => sum + item.price,
        0
      ) + mainBunsCost
    );
  }, [selectedIngredients, mainBun]);

  const addNewIngredient = (ingredientId: string) => {
    const ingredient = ingredients.find(
      (item: TIngredient) => item._id === ingredientId
    );
    if (ingredient) {
      dispatch(addIngredient(ingredient));
      dispatch({ type: INCREASE_INGREDIENT_COUNT, ingredientId });
    }
  };

  const changeBun = (ingredientId: string) => {
    const newBun = ingredients.find(
      (item: TIngredient) => item._id === ingredientId
    );
    if (
      (!mainBun && newBun) ||
      (mainBun && newBun && mainBun._id !== newBun._id)
    ) {
      dispatch({ type: CHANGE_BUN, bun: newBun });
    }
  };

  const onIngredientClick = (ingredient: TIngredient) => {
    dispatch({ type: SELECT_INGREDIENT, ingredient });
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const createOrder = () => {
    if (refreshToken) {
      const ingredientIds = [
        mainBun._id,
        ...selectedIngredients.map((item: TIngredient) => item._id),
        mainBun._id,
      ];

      dispatch(postOrder(ingredientIds, accessToken));
    } else {
      navigate("/login");
    }
  };

  const onOrderModalClose = () => {
    dispatch({ type: CLOSE_ORDER });
  };

  dropTarget(targetRef);

  return (
    <section className={`${styles.constructor} mt-25 pb-10 pl-4 pr-2`}>
      <article
        className={`${styles.constructor__container} mb-10`}
        ref={targetRef}
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
              <TransitionGroup component={null}>
                {selectedIngredients.map(
                  (ingredient: TIngredient, index: number) => (
                    <CSSTransition
                      key={ingredient.uniqueId}
                      timeout={300}
                      classNames={{
                        enter: styles.fadeEnter,
                        enterActive: styles.fadeEnterActive,
                        exit: styles.fadeExit,
                        exitActive: styles.fadeExitActive,
                      }}
                    >
                      <IngredientDraggable
                        ingredient={ingredient}
                        index={index}
                      />
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
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
      {order.number !== null && !orderFailed && (
        <Modal onClose={onOrderModalClose}>
          <OrderDetails onTickClick={onOrderModalClose} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
