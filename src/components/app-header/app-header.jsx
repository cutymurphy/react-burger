import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isMainActive =
    pathname.length === 1 || pathname.includes("ingredients");
  const isProfileActive = pathname.includes("profile");

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__content} pt-4 pb-4`}>
        <ul className={styles.header__nav}>
          <li
            className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5 mr-2`}
            onClick={() => navigate("/")}
          >
            <BurgerIcon
              type={isMainActive ? "primary" : "secondary"}
              className="mr-2"
            />
            <p
              className={`text text_type_main-default ${
                !isMainActive && "text_color_inactive"
              }`}
            >
              Конструктор
            </p>
          </li>
          <li
            className={`${styles.header__btn} ${styles.disabled} pt-4 pr-5 pb-4 pl-5`}
          >
            <ListIcon type="secondary" className="mr-2" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </li>
        </ul>
        <div onClick={() => navigate("/")} className={styles.header__logo}>
          <Logo />
        </div>
        <ul className={styles.header__nav}>
          <li
            className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5`}
            onClick={() => navigate("/profile")}
          >
            <ProfileIcon
              type={isProfileActive ? "primary" : "secondary"}
              className="mr-2"
            />
            <p
              className={`text text_type_main-default ${
                !isProfileActive && "text_color_inactive"
              }`}
            >
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
