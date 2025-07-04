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
  const orderRequest = useSelector((store) => store.order.orderRequest);

  const isLoading = ingredientsRequest || orderRequest;
  const hasError = ingredientsFailed;
  const canRenderMain = !isLoading && !hasError && ingredients.length > 0;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && (
        <div className={styles.state}>
          <RingLoader color="var(--dark-grey)" loading size={100} />
        </div>
      )}
      {hasError && !isLoading && (
        <div className={styles.state}>
          <p className="text text_type_main-default text_color_inactive">
            Произошла ошибка при получении ингредиентов
          </p>
        </div>
      )}
      {canRenderMain && (
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
