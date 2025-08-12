import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredient, TTab } from "../../utils/types";
import { ERoutes } from "../../utils/routes";
import { selectIngredient } from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "../../utils/hooks";

const BurgerIngredients: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients: ReadonlyArray<TIngredient> = useSelector(
    (store) => store.ingredients.ingredients
  );

  const [current, setCurrent] = useState<TTab>("bun");

  const groupedIngredients = useMemo<Record<TTab, TIngredient[]>>(
    () => ({
      bun: ingredients.filter((item) => item.type === "bun"),
      sauce: ingredients.filter((item) => item.type === "sauce"),
      main: ingredients.filter((item) => item.type === "main"),
    }),
    [ingredients]
  );

  const refs: Record<TTab, RefObject<HTMLDivElement | null>> = {
    bun: useRef<HTMLDivElement>(null),
    sauce: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
  };

  const handleTabClick = (value: string) => {
    const tabValue = value as TTab;
    setCurrent(tabValue);
    if (refs[tabValue].current) {
      refs[tabValue].current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onIngredientClick = (ingredient: TIngredient) => {
    dispatch(selectIngredient(ingredient));
    navigate(`${ERoutes.ingredients}/${ingredient._id}`, {
      state: { background: location },
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const bunTop = refs.bun.current?.getBoundingClientRect().top ?? 0;
      const sauceTop = refs.sauce.current?.getBoundingClientRect().top ?? 0;
      const mainTop = refs.main.current?.getBoundingClientRect().top ?? 0;

      const containerTop = container.getBoundingClientRect().top;

      const distances = {
        bun: Math.abs(bunTop - containerTop),
        sauce: Math.abs(sauceTop - containerTop),
        main: Math.abs(mainTop - containerTop),
      };

      const closest = (Object.entries(distances) as [TTab, number][]).reduce(
        (min, curr) => (curr[1] < distances[min[0]] ? curr : min)
      )[0];

      setCurrent(closest);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [refs.bun, refs.main, refs.sauce]);

  return (
    <section className={`${styles.ingredients} mt-10 mb-10 mr-10`}>
      <p className="text text_type_main-large mb-5 ml-2">Соберите бургер</p>
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
            ref={refs[type as TTab]}
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
              {items.map((item: TIngredient) => (
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
};

export default BurgerIngredients;
