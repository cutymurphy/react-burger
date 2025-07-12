import { request } from "./request";

export const handleForgotPassword = async (email, navigate) => {
  try {
    await request("/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    navigate("/reset-password", { replace: true });
  } catch (err) {
    alert("Ошибка при отправке письма на почту");
  }
};

export const handleResetPassword = async (password, token, navigate) => {
  try {
    await request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });
    navigate("/login", { replace: true });
  } catch (err) {
    alert("Ошибка при восстановлении пароля");
  }
};
