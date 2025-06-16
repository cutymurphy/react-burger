import { useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import IngredientDetails from "../ingredient-details";

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState("bun");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const groupedIngredients = useMemo(
    () => ({
      bun: ingredients.filter((item) => item.type === "bun"),
      sauce: ingredients.filter((item) => item.type === "sauce"),
      main: ingredients.filter((item) => item.type === "main"),
    }),
    [ingredients]
  );

  const refs = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const handleTabClick = (value) => {
    setCurrent(value);
    if (refs[value].current) {
      refs[value].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const onIngredientClose = () => {
    setSelectedIngredient(null);
  };

  return (
    <section className={`${styles.ingredients} mt-10 mb-10 mr-10`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <nav style={{ display: "flex" }} className="mb-10">
        <Tab value="bun" active={current === "bun"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={handleTabClick}>
          Начинки
        </Tab>
      </nav>
      <div className={styles.ingredients__list}>
        {Object.entries(groupedIngredients).map(([type, items]) => (
          <section
            key={type}
            ref={refs[type]}
            className={styles.ingredients__section}
          >
            <p className="text text_type_main-medium mb-6">
              {type === "bun"
                ? "Булки"
                : type === "sauce"
                ? "Соусы"
                : "Начинки"}
            </p>
            <ul className={`${styles.ingredients_grid} pl-4 pr-4 mb-10`}>
              {items.map((item) => (
                <li key={item._id}>
                  <BurgerIngredient
                    ingredient={item}
                    onClick={() => onIngredientClick(item)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {selectedIngredient && (
        <IngredientDetails
          selectedIngredient={selectedIngredient}
          isModalOpen={!!selectedIngredient}
          closeModal={onIngredientClose}
        />
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerIngredients;
