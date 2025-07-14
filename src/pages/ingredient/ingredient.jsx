import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details";
import styles from "./ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from "../../services/actions/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";
import { RingLoader } from "react-spinners";

function Ingredient() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const selectedIngredient = useSelector(
    (store) => store.ingredient.selectedIngredient
  );

  useEffect(() => {
    const ingredient = ingredients.find((item) => item._id === id);
    if (ingredient) {
      dispatch({ type: SELECT_INGREDIENT, ingredient });
    }
  }, [dispatch, id, ingredients]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    return () => {
      dispatch({ type: UNSELECT_INGREDIENT });
    };
  }, [dispatch]);

  return (
    <div>
      {ingredientsRequest && (
        <div className={styles.wrapper}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      )}
      {ingredientsFailed && !ingredientsRequest && (
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Произошла ошибка при получении ингредиента
          </p>
        </div>
      )}
      {!ingredientsFailed && !ingredientsRequest && selectedIngredient && (
        <section className={styles.ingredient}>
          <p className="text text_type_main-large">Детали ингредиента</p>
          <IngredientDetails />
        </section>
      )}
      {!ingredientsFailed && !ingredientsRequest && !selectedIngredient && (
        <div className={styles.wrapper}>
          <p className="text text_type_main-large">Ингредиент не найден</p>
        </div>
      )}
    </div>
  );
}

export default Ingredient;
