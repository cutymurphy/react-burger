import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientType } from "../../utils/types";

function BurgerConstructor({ ingredients, mainBunId, selectedIngredientsIds }) {
  const mainBun = ingredients.find((item) => item._id === mainBunId);
  const selectedIngredients = selectedIngredientsIds.map((id) =>
    ingredients.find((item) => item._id === id)
  );
  const totalIngredientsCost =
    selectedIngredients.reduce((sum, item) => sum + item.price, 0) +
    mainBun.price * 2;

  return (
    <section className={`${styles.constructor} mt-25 pb-10 pl-4 pr-2`}>
      <article className={`${styles.constructor__container} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${mainBun.name} (верх)`}
          price={mainBun.price}
          thumbnail={mainBun.image_mobile}
          extraClass={`${styles.constructor__element} ml-8`}
        />
        <ul className={`${styles.constructor__list} pr-2`}>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={"ingredient_" + index}
              className={styles.constructor__item}
            >
              <DragIcon type="primary" className={styles.constructor__drag} />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${mainBun.name} (низ)`}
          price={mainBun.price}
          thumbnail={mainBun.image_mobile}
          extraClass={`${styles.constructor__element} ml-8`}
        />
      </article>
      <footer className={styles.constructor__order}>
        <p className="text text_type_digits-medium mr-2">
          {totalIngredientsCost}
        </p>
        <CurrencyIcon
          type="primary"
          className={`${styles.constructor__currency} mr-10`}
        />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  mainBunId: PropTypes.string.isRequired,
  selectedIngredientsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BurgerConstructor;
