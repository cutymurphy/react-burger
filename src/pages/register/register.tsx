import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { FC, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../../services/actions/user";
import { validateField } from "../../utils/validation";
import { initialInfo, TRegister } from "./utils";
import { ERoutes } from "../../utils/routes";
import { useDispatch } from "../../utils/hooks";

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");

  const [data, setData] = useState<TRegister>({ ...initialInfo });
  const [errors, setErrors] = useState<TRegister>({ ...initialInfo });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = <K extends keyof TRegister>(
    field: K,
    value: TRegister[K]
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
    const errors: TRegister = {
      name: validateField("name", data.name),
      email: validateField("email", data.email),
      password: validateField("password", data.password),
    };
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signUp(data.email, data.password, data.name, navigate));
    }
  };

  if (refreshToken) {
    return <Navigate to={ERoutes.main} replace />;
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
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        <Input
          placeholder={"E-mail"}
          type={"text"}
          onChange={(e) => onChange("email", e.target.value)}
          value={data.email}
          extraClass={`mb-6 ${styles.register__field}`}
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
          extraClass={`mb-6 ${styles.register__field}`}
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
          Зарегистрироваться
        </Button>
        <div className={`mb-4 ${styles.register__footer}`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <p
            className={`text text_type_main-default ${styles.register__link}`}
            onClick={() => navigate(ERoutes.login)}
          >
            Войти
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
