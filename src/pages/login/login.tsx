import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { FC, FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../services/actions/user";
import { validateField } from "../../utils/validation";
import { Dispatch } from "redux";
import { initialInfo, TLoginForm } from "./types";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { state } = useLocation();
  const refreshToken = localStorage.getItem("refreshToken");

  const [data, setData] = useState<TLoginForm>({ ...initialInfo });
  const [errors, setErrors] = useState<TLoginForm>({ ...initialInfo });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = <K extends keyof TLoginForm>(
    field: K,
    value: TLoginForm[K]
  ) => {
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
      email: validateField("email", data.email),
      password: validateField("password", data.password),
    };
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(logIn(data.email, data.password, navigate, state));
    }
  };

  if (refreshToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <Input
          placeholder={"E-mail"}
          type={"text"}
          onChange={(e) => onChange("email", e.target.value)}
          value={data.email}
          extraClass={`mb-6 ${styles.login__field}`}
          errorText={errors.email}
          error={!!errors.email}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        <Input
          placeholder={"Пароль"}
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange("password", e.target.value)}
          value={data.password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={handleTogglePasswordVisible}
          extraClass={`mb-6 ${styles.login__field}`}
          errorText={errors.password}
          error={!!errors.password}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
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
};

export default Login;
