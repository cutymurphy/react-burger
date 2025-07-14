import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./profile-wrapper.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../services/actions/user";

function ProfileWrapper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.profile__sections}>
        <nav className={styles.profile__menu}>
          <p
            className={`text text_type_main-medium ${
              pathname !== "/profile" && "text_color_inactive"
            } ${styles.profile__menu_item}`}
            onClick={() => navigate("/profile")}
          >
            Профиль
          </p>
          <p
            className={`text text_type_main-medium ${
              pathname !== "/profile/orders" && "text_color_inactive"
            } ${styles.profile__menu_item}`}
            onClick={() => navigate("/profile/orders")}
          >
            История заказов
          </p>
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.profile__menu_item}`}
            onClick={handleLogOut}
          >
            Выход
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.profile__menu_info}`}
          >
            {pathname === "/profile"
              ? "В этом разделе вы можете изменить свои персональные данные"
              : "В этом разделе вы можете просмотреть свою историю заказов"}
          </p>
        </nav>
        <Outlet />
      </div>
    </main>
  );
}

export default ProfileWrapper;
