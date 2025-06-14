import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

function BurgerIngredient({ ingredient }) {
  return (
    <article className={styles.ingredient}>
      <img
        alt={ingredient.name}
        src={ingredient.image}
        className="pl-4 pr-4 mb-2"
      />
      <div className={`${styles.ingredient__price} mb-2`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <section className={styles.ingredient__name}>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </section>
      {!!ingredient.__v && (
        <Counter
          count={ingredient.__v}
          size="default"
          extraClass={styles.ingredient__counter}
        />
      )}
    </article>
  );
}

export default BurgerIngredient;
