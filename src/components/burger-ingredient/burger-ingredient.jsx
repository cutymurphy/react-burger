import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { IngredientType } from "../../utils/types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function BurgerIngredient({ ingredient, onClick }) {
  const [, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id, type: ingredient.type },
  });

  const mainBunId = useSelector((store) => store.builder.mainBunId);
  const count = ingredient._id === mainBunId ? 2 : ingredient.__v;

  return (
    <article className={styles.ingredient} onClick={onClick}>
      <img
        alt={ingredient.name}
        src={ingredient.image}
        className="pl-4 pr-4 mb-2"
        ref={ingredientRef}
      />
      <div className={`${styles.ingredient__price} mb-2`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <section className={styles.ingredient__name}>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </section>
      {count > 0 && (
        <Counter
          count={count}
          size="default"
          extraClass={styles.ingredient__counter}
        />
      )}
    </article>
  );
}

BurgerIngredient.propTypes = {
  ingredient: IngredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
