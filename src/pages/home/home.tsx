import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { RingLoader } from "react-spinners";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";
import { Dispatch } from "redux";

const Home: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store: any) => store.ingredients
  );
  const orderRequest = useSelector((store: any) => store.order.orderRequest);

  const isLoading = ingredientsRequest || orderRequest;
  const hasError = ingredientsFailed;
  const canRenderMain = !isLoading && !hasError && ingredients.length > 0;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div>
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
};

export default Home;
