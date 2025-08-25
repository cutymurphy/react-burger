import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { useDrag } from "react-dnd";
import { FC, useRef } from "react";
import { IBurgerIngredient } from "./types";
import { useSelector } from "../../utils/hooks";

const BurgerIngredient: FC<IBurgerIngredient> = ({
  ingredient,
  onClick,
  "data-testid": testId,
}) => {
  const [, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id, type: ingredient.type },
  });
  const imgRef = useRef<HTMLImageElement>(null);

  const mainBun = useSelector((store) => store.builder.mainBun);
  const count = mainBun && ingredient._id === mainBun._id ? 2 : ingredient.__v;

  ingredientRef(imgRef);

  return (
    <article
      className={styles.ingredient}
      onClick={onClick}
      data-testid={testId}
    >
      <img
        alt={ingredient.name}
        src={ingredient.image}
        className="pl-4 pr-4 mb-2"
        ref={imgRef}
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
};

export default BurgerIngredient;
