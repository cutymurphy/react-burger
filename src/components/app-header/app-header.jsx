import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__content} pt-4 pb-4`}>
        <ul className={styles.header__nav}>
          <li className={`${styles.header__btn} pt-4 pr-5 pb-4 pl-5 mr-2`}>
            <BurgerIcon type="primary" className="mr-2" />
            <p className="text text_type_main-default">Конструктор</p>
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
            className={`${styles.header__btn} ${styles.disabled} pt-4 pr-5 pb-4 pl-5`}
          >
            <ProfileIcon type="secondary" className="mr-2" />
            <p className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
