import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import { data } from "../../utils/data";
import styles from "./app.module.css";

function App() {
  const appData = data;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={appData} />
      </main>
    </div>
  );
}

export default App;
