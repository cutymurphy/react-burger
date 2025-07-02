import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {(ingredientsRequest || ingredientsFailed) && (
        <div className={styles.state}>
          {ingredientsRequest ? (
            <RingLoader
              color="var(--dark-grey)"
              loading={ingredientsRequest}
              size={100}
            />
          ) : (
            <p className="text text_type_main-default text_color_inactive">
              Произошла ошибка при получении игредиентов
            </p>
          )}
        </div>
      )}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length > 0 && (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </div>
  );
}

export default App;
