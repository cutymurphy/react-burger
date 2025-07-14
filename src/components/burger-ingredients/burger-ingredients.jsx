import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";
import { useLocation, useNavigate } from "react-router-dom";

function BurgerIngredients() {
  const scrollContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = useState("bun");

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const bunTop = refs.bun.current.getBoundingClientRect().top;
      const sauceTop = refs.sauce.current.getBoundingClientRect().top;
      const mainTop = refs.main.current.getBoundingClientRect().top;

      const containerTop = container.getBoundingClientRect().top;

      const distances = {
        bun: Math.abs(bunTop - containerTop),
        sauce: Math.abs(sauceTop - containerTop),
        main: Math.abs(mainTop - containerTop),
      };

      const closest = Object.entries(distances).reduce((min, curr) =>
        curr[1] < distances[min[0]] ? curr : min
      )[0];

      setCurrent(closest);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [refs.bun, refs.main, refs.sauce]);

  const onIngredientClick = (ingredient) => {
    dispatch({ type: SELECT_INGREDIENT, ingredient });
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
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
      <div className={styles.ingredients__list} ref={scrollContainerRef}>
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
    </section>
  );
}

export default BurgerIngredients;
