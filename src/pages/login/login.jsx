import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisible = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <Input
          placeholder={"E-mail"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          extraClass="mb-6"
        />
        <Input
          placeholder={"Пароль"}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={handleTogglePasswordVisible}
          extraClass={`mb-6 ${styles.login__password}`}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
        <div className={`mb-4 ${styles.login__footer}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <p
            className={`text text_type_main-default ${styles.login__link}`}
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </p>
        </div>
        <div className={styles.login__footer}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <p
            className={`text text_type_main-default ${styles.login__link}`}
            onClick={() => navigate("/forgot-password")}
          >
            Восстановить пароль
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
