import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import { data } from "../../utils/data";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor";

function App() {
  const appData = data;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={appData} />
        <BurgerConstructor
          ingredients={appData}
          mainBunId={appData[0]._id}
          selectedIngredientsIds={[
            "60666c42cc7b410027a1a9b9",
            "60666c42cc7b410027a1a9b4",
            "60666c42cc7b410027a1a9bc",
            "60666c42cc7b410027a1a9bb",
            "60666c42cc7b410027a1a9bb",
            "60666c42cc7b410027a1a9bd",
            "60666c42cc7b410027a1a9bf",
          ]}
        />
      </main>
    </div>
  );
}

export default App;
