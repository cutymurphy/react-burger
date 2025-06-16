import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientType } from "../../utils/types";
import { useState } from "react";
import IngredientDetails from "../ingredient-details";
import OrderDetails from "../order-details";

function BurgerConstructor({ ingredients, mainBunId, selectedIngredientsIds }) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const mainBun = ingredients.find((item) => item._id === mainBunId);
  const selectedIngredients = selectedIngredientsIds.map((id) =>
    ingredients.find((item) => item._id === id)
  );
  const totalIngredientsCost =
    selectedIngredients.reduce((sum, item) => sum + item.price, 0) +
    mainBun.price * 2;

  const onIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const onIngredientClose = () => {
    setSelectedIngredient(null);
  };

  const onOrderModalOpen = () => {
    setIsOrderModalOpen(true);
  };

  const onOrderModalClose = () => {
    setIsOrderModalOpen(false);
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
          onClick={onOrderModalOpen}
        >
          Оформить заказ
        </Button>
      </footer>
      {selectedIngredient && (
        <IngredientDetails
          selectedIngredient={selectedIngredient}
          isModalOpen={!!selectedIngredient}
          closeModal={onIngredientClose}
        />
      )}
      <OrderDetails
        isModalOpen={isOrderModalOpen}
        closeModal={onOrderModalClose}
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  mainBunId: PropTypes.string.isRequired,
  selectedIngredientsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BurgerConstructor;
