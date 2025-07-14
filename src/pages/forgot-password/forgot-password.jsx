import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { validateField } from "../../utils/validation";
import { handleForgotPassword } from "../../services/actions/user";
import { useDispatch } from "react-redux";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateField("email", email);
    if (error) {
      setEmailError(error);
    } else {
      dispatch(handleForgotPassword(email, navigate));
    }
  };

  if (refreshToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.forgot_password}>
      <form className={styles.forgot_password__form} onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <Input
          placeholder={"Укажите e-mail"}
          type={"text"}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) {
              setEmailError("");
            }
          }}
          value={email}
          extraClass={`mb-6 ${styles.forgot_password__field}`}
          error={!!emailError}
          errorText={emailError}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
        <div className={`mb-4 ${styles.forgot_password__footer}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <p
            className={`text text_type_main-default ${styles.forgot_password__link}`}
            onClick={() => navigate("/login")}
          >
            Войти
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
