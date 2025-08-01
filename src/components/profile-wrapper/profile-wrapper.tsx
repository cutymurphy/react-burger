import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import styles from "./profile-wrapper.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../services/actions/user";
import { FC } from "react";
import { Dispatch } from "redux";

const ProfileWrapper: FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const isProfile = useMatch("/profile");

  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile__sections}>
        <nav className={styles.profile__menu}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `text text_type_main-medium ${styles.profile__menu_item} ${
                isActive && styles.profile__menu_item_active
              }`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `text text_type_main-medium ${styles.profile__menu_item} ${
                isActive && styles.profile__menu_item_active
              }`
            }
          >
            История заказов
          </NavLink>
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.profile__menu_item}`}
            onClick={handleLogOut}
          >
            Выход
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.profile__menu_info}`}
          >
            {isProfile
              ? "В этом разделе вы можете изменить свои персональные данные"
              : "В этом разделе вы можете просмотреть свою историю заказов"}
          </p>
        </nav>
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileWrapper;
