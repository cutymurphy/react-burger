import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { FC, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { validateField } from "../../utils/validation";
import { handleResetPassword } from "../../services/actions/user";
import { useSelector } from "react-redux";
import { initialInfo, TResetPassword } from "./utils";

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const canResetPassword = useSelector(
    (store: any) => store.user.canResetPassword
  );
  const refreshToken = localStorage.getItem("refreshToken");

  const [data, setData] = useState<TResetPassword>({ ...initialInfo });
  const [errors, setErrors] = useState<TResetPassword>({ ...initialInfo });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = <K extends keyof TResetPassword>(
    field: K,
    value: TResetPassword[K]
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
    const errors: TResetPassword = {
      code: validateField("code", data.code),
      password: validateField("password", data.password),
    };
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      await handleResetPassword(data.password, data.code, navigate);
    }
  };

  if (refreshToken) {
    return <Navigate to="/" replace />;
  }

  if (!canResetPassword) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className={styles.reset_password}>
      <form className={styles.reset_password__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <Input
          placeholder={"Введите новый пароль"}
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange("password", e.target.value)}
          value={data.password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={handleTogglePasswordVisible}
          extraClass={`mb-6 ${styles.reset_password__field}`}
          error={!!errors.password}
          errorText={errors.password}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        <Input
          placeholder={"Введите код из письма"}
          type={"text"}
          onChange={(e) => onChange("code", e.target.value)}
          value={data.code}
          extraClass={`mb-6 ${styles.reset_password__field}`}
          error={!!errors.code}
          errorText={errors.code}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
        <div className={`mb-4 ${styles.reset_password__footer}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <p
            className={`text text_type_main-default ${styles.reset_password__link}`}
            onClick={() => navigate("/login")}
          >
            Войти
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
