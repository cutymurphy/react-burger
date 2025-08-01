import toast from "react-hot-toast";
import { request } from "../../utils/request";
import { requestWithRefresh } from "../../utils/requestWithRefresh";
import { ERoutes } from "../../utils/routes";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const SET_CAN_RESET_PASSWORD = "SET_CAN_RESET_PASSWORD";

export function signUp(email, password, name, navigate) {
  return function (dispatch) {
    request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        const refreshToken = data.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);

        dispatch({
          type: SIGN_UP,
          user: data.user,
          accessToken,
        });

        navigate(ERoutes.main, { replace: true });
        toast.success("Вы успешно зарегистрировались");
      })
      .catch(() => {
        toast.error("Произошла ошибка при регистрации");
      });
  };
}

export function logIn(email, password, navigate, locationState) {
  return function (dispatch) {
    request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        const refreshToken = data.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);

        dispatch({
          type: LOG_IN,
          user: data.user,
          accessToken,
        });

        const from =
          locationState && locationState.fromPath
            ? locationState.fromPath
            : ERoutes.main;
        navigate(from, { replace: true });
        toast.success("Вы успешно вошли в аккаунт");
      })
      .catch(() => {
        toast.error(
          "Произошла ошибка при входе. Проверьте корректность данных."
        );
      });
  };
}

export function logOut(navigate) {
  return function (dispatch) {
    const token = localStorage.getItem("refreshToken");
    request("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(() => {
        localStorage.removeItem("refreshToken");
        navigate(ERoutes.login, { replace: true });
        dispatch({ type: LOG_OUT });
        toast.success("Вы успешно вышли из аккаунта");
      })
      .catch(() => {
        toast.error("Ошибка при выходе из аккаунта");
      });
  };
}

export function getUser(accessToken) {
  return async function (dispatch) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return await requestWithRefresh(
        "/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        },
        dispatch
      ).then((data) => {
        dispatch({ type: SET_USER, user: data.user });
      });
    }
  };
}

export function editUser(accessToken, newUser) {
  return function (dispatch) {
    requestWithRefresh(
      "/auth/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(newUser),
      },
      dispatch
    )
      .then((data) => {
        dispatch({ type: SET_USER, user: data.user });
        toast.success("Информация успешно отредактирована");
      })
      .catch(() => {
        toast.error("Произошла ошибка при редактировании пользователя");
      });
  };
}

export function handleForgotPassword(email, navigate) {
  return function (dispatch) {
    request("/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch({ type: SET_CAN_RESET_PASSWORD });
        navigate(ERoutes.resetPassword);
        toast.success("Письмо с кодом отправлено на почту");
      })
      .catch(() => {
        toast.error("Ошибка при отправке письма на почту");
      });
  };
}

export const handleResetPassword = async (password, token, navigate) => {
  try {
    await request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    });
    navigate(ERoutes.login, { replace: true });
    toast.success(
      "Пароль успешно восстановлен. Войдите в приложение под новыми данными."
    );
  } catch (err) {
    toast.error("Ошибка при восстановлении пароля");
  }
};
