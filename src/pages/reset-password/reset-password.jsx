import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateField } from "../../utils/validation";
import { handleResetPassword } from "../../utils/resetPasswordApi";

const initialInfo = {
  password: "",
  code: "",
};

function ResetPassword() {
  const navigate = useNavigate();

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
      code: validateField("code", data.code),
      password: validateField("password", data.password),
    };
    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await handleResetPassword(data.password, data.code, navigate);
    }
  };

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
        />
        <Input
          placeholder={"Введите код из письма"}
          type={"text"}
          onChange={(e) => onChange("code", e.target.value)}
          value={data.code}
          extraClass={`mb-6 ${styles.reset_password__field}`}
          error={!!errors.code}
          errorText={errors.code}
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
}

export default ResetPassword;
