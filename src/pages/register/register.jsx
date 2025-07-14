import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../../services/actions/user";
import { useDispatch } from "react-redux";
import { validateField } from "../../utils/validation";

const initialInfo = {
  name: "",
  email: "",
  password: "",
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");

  const [data, setData] = useState({ ...initialInfo });
  const [errors, setErrors] = useState({ ...initialInfo });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (field, value) => {
    setData({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleTogglePasswordVisible = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const errors = {
      name: validateField("name", data.name),
      email: validateField("email", data.email),
      password: validateField("password", data.password),
    };
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signUp(data.email, data.password, data.name, navigate));
    }
  };

  if (refreshToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          placeholder={"Имя"}
          type={"text"}
          onChange={(e) => onChange("name", e.target.value)}
          value={data.name}
          extraClass={`mb-6 ${styles.register__field}`}
          errorText={errors.name}
          error={!!errors.name}
        />
        <Input
          placeholder={"E-mail"}
          type={"text"}
          onChange={(e) => onChange("email", e.target.value)}
          value={data.email}
          extraClass={`mb-6 ${styles.register__field}`}
          errorText={errors.email}
          error={!!errors.email}
        />
        <Input
          placeholder={"Пароль"}
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange("password", e.target.value)}
          value={data.password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={handleTogglePasswordVisible}
          extraClass={`mb-6 ${styles.register__field}`}
          errorText={errors.password}
          error={!!errors.password}
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
