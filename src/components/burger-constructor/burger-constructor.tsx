import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderInfo from "../order-info";
import Modal from "../modal";
import { closeOrder, postOrder } from "../../services/actions/order";
import { FC, useMemo, useRef } from "react";
import { useDrop } from "react-dnd";
import { addIngredient, changeBun } from "../../services/actions/builder";
import { increaseIngredientCount } from "../../services/actions/ingredients";
import IngredientDraggable from "../ingredient-draggable";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TIngredient } from "../../utils/types";
import { TDragItem } from "./types";
import { ERoutes } from "../../utils/routes";
import { selectIngredient } from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "../../utils/hooks";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { selectedIngredients, mainBun } = useSelector(
    (store) => store.builder
  );
  const { order, orderFailed } = useSelector((store) => store.order);
  const accessToken = useSelector((store) => store.user.accessToken);
  const refreshToken = localStorage.getItem("refreshToken");

  const [{ isHover }, dropTarget] = useDrop<
    TDragItem,
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    drop(item: TDragItem) {
      item.type === "bun"
        ? handleChangeBun(item.id)
        : addNewIngredient(item.id);
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
      dispatch(increaseIngredientCount(ingredientId));
    }
  };

  const handleChangeBun = (ingredientId: string) => {
    const newBun = ingredients.find(
      (item: TIngredient) => item._id === ingredientId
    );
    if (
      (!mainBun && newBun) ||
      (mainBun && newBun && mainBun._id !== newBun._id)
    ) {
      dispatch(changeBun(newBun));
    }
  };

  const onIngredientClick = (ingredient: TIngredient) => {
    dispatch(selectIngredient(ingredient));
    navigate(`${ERoutes.ingredients}/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const createOrder = () => {
    if (refreshToken && mainBun) {
      const ingredientIds = [
        mainBun._id,
        ...selectedIngredients.map((item: TIngredient) => item._id),
        mainBun._id,
      ];

      dispatch(postOrder(ingredientIds, accessToken));
    } else {
      navigate(ERoutes.login);
    }
  };

  const onOrderModalClose = () => {
    dispatch(closeOrder());
  };

  dropTarget(targetRef);

  return (
    <section className={`${styles.constructor} mt-25 pb-10 pl-4 pr-2`}>
      <article
        className={`${styles.constructor__container} mb-10`}
        ref={targetRef}
        data-testid="constructor"
      >
        {mainBun || selectedIngredients.length > 0 ? (
          <>
            {mainBun && (
              <div
                onClick={() => onIngredientClick(mainBun)}
                className="pr-2"
                data-testid="constructor-bun-top"
              >
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
                        data-testid="constructor-item"
                      />
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </ul>
            {mainBun && (
              <div
                onClick={() => onIngredientClick(mainBun)}
                className="pr-2"
                data-testid="constructor-bun-bottom"
              >
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
          <OrderInfo onTickClick={onOrderModalClose} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
