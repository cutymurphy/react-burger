import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          placeholder={"Имя"}
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          extraClass="mb-6"
        />
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
          extraClass={`mb-6 ${styles.register__password}`}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
        <div className={`mb-4 ${styles.register__footer}`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <p
            className={`text text_type_main-default ${styles.register__link}`}
            onClick={() => navigate("/login")}
          >
            Войти
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
