import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import { ERoutes } from "../../utils/routes";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isIngredientOpen = pathname.includes("ingredients");

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__content} pt-4 pb-4`}>
        <div className={styles.header__list}>
          <NavLink
            className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5 mr-2`}
            to={ERoutes.main}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon
                  type={isActive || isIngredientOpen ? "primary" : "secondary"}
                  className="mr-2"
                />
                <p
                  className={`text text_type_main-default ${
                    (isActive || isIngredientOpen) && styles.header__btn_active
                  }`}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink
            className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5`}
            to={ERoutes.feed}
          >
            {({ isActive }) => (
              <>
                <ListIcon
                  type={isActive ? "primary" : "secondary"}
                  className="mr-2"
                />
                <p
                  className={`text text_type_main-default ${
                    isActive && styles.header__btn_active
                  }`}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div
          onClick={() => navigate(ERoutes.main)}
          className={styles.header__logo}
        >
          <Logo />
        </div>
        <div className={styles.header__list}>
          <NavLink
            className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5`}
            to={ERoutes.profile}
          >
            {({ isActive }) => (
              <>
                <ProfileIcon
                  type={isActive ? "primary" : "secondary"}
                  className="mr-2"
                />
                <p
                  className={`text text_type_main-default ${
                    isActive && styles.header__btn_active
                  }`}
                >
                  Личный кабинет
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
