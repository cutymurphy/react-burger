import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { FC } from "react";

const IngredientDetails: FC = () => {
  const selectedIngredient = useSelector(
    (store: any) => store.ingredient.selectedIngredient
  );

  if (!selectedIngredient) return null;

  return (
    <section className={styles.details}>
      <img
        alt={selectedIngredient.name}
        src={selectedIngredient.image_large}
        className="mb-4"
      />
      <p className="text text_type_main-medium mb-8">
        {selectedIngredient.name}
      </p>
      <dl className={`${styles.details__characteristics} mb-15`}>
        <div className={`${styles.details__characteristic} mr-5`}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.calories}
          </dd>
        </div>
        <div className={`${styles.details__characteristic} mr-5`}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.proteins}
          </dd>
        </div>
        <div className={`${styles.details__characteristic} mr-5`}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.fat}
          </dd>
        </div>
        <div className={styles.details__characteristic}>
          <dt className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </dt>
          <dd className="text text_type_digits-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default IngredientDetails;
