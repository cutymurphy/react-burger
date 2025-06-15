import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor";
import { apiIngredients } from "../../utils/api";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

function App() {
  const [state, setState] = useState({
    ingredients: [],
    loading: true,
    hasError: false,
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      fetch(apiIngredients)
        .then((res) => res.json())
        .then((data) =>
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              ingredients: data.data,
              loading: false,
            }));
          }, 1000)
        )
        .catch((_e) =>
          setState((prev) => ({ ...prev, loading: false, hasError: true }))
        );
    };

    getIngredientsData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {(state.loading || state.hasError) && (
        <div className={styles.state}>
          {state.loading ? (
            <RingLoader
              color="var(--dark-grey)"
              loading={state.loading}
              size={100}
            />
          ) : (
            <p className="text text_type_main-default text_color_inactive">
              Произошла ошибка при получении игредиентов
            </p>
          )}
        </div>
      )}
      {!state.loading && !state.hasError && state.ingredients.length > 0 && (
        <main className={styles.main}>
          <BurgerIngredients ingredients={state.ingredients} />
          <BurgerConstructor
            ingredients={state.ingredients}
            mainBunId={state.ingredients[0]._id}
            selectedIngredientsIds={[
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa0942",
              "643d69a5c3f7b9001cfa0942",
              "643d69a5c3f7b9001cfa0943",
              "643d69a5c3f7b9001cfa093f",
            ]}
          />
        </main>
      )}
    </div>
  );
}

export default App;
