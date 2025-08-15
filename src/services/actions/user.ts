import toast from "react-hot-toast";
import { request } from "../../utils/request";
import { requestWithRefresh } from "../../utils/requestWithRefresh";
import { ERoutes } from "../../utils/routes";
import {
  LOG_IN,
  LOG_OUT,
  SET_CAN_RESET_PASSWORD,
  SET_TOKEN,
  SET_USER,
  SIGN_UP,
} from "../constants";
import { TProfile, TSaveProfile } from "../../pages/profile/utils";
import { AppDispatch, AppThunk } from "../types";
import { NavigateFunction } from "react-router-dom";
import {
  TEditUserData,
  TGetUserData,
  TLogInData,
  TSignUpData,
} from "../types/data";

export interface IGetSignUpAction {
  readonly type: typeof SIGN_UP;
  readonly user: TProfile;
  readonly accessToken: string;
}

export interface IGetLogInAction {
  readonly type: typeof LOG_IN;
  readonly user: TProfile;
  readonly accessToken: string;
}

export interface IGetLogOutAction {
  readonly type: typeof LOG_OUT;
}

export interface IGetSetTokenAction {
  readonly type: typeof SET_TOKEN;
  readonly accessToken: string;
}

export interface IGetSetUserAction {
  readonly type: typeof SET_USER;
  readonly user: TProfile;
}

export interface IGetSetCanResetPasswordAction {
  readonly type: typeof SET_CAN_RESET_PASSWORD;
}

export type TUserActions =
  | IGetSignUpAction
  | IGetLogInAction
  | IGetLogOutAction
  | IGetSetTokenAction
  | IGetSetUserAction
  | IGetSetCanResetPasswordAction;

export const handleSignUp = (
  user: TProfile,
  accessToken: string
): IGetSignUpAction => {
  return {
    type: SIGN_UP,
    user,
    accessToken,
  };
};

export const handleLogIn = (
  user: TProfile,
  accessToken: string
): IGetLogInAction => {
  return {
    type: LOG_IN,
    user,
    accessToken,
  };
};

export const handleLogOut = (): IGetLogOutAction => {
  return {
    type: LOG_OUT,
  };
};

export const setToken = (accessToken: string): IGetSetTokenAction => {
  return {
    type: SET_TOKEN,
    accessToken,
  };
};

export const setUser = (user: TProfile): IGetSetUserAction => {
  return {
    type: SET_USER,
    user,
  };
};

export const setCanResetPassword = (): IGetSetCanResetPasswordAction => {
  return {
    type: SET_CAN_RESET_PASSWORD,
  };
};

export const signUp = (
  email: string,
  password: string,
  name: string,
  navigate: NavigateFunction
): AppThunk => {
  return function (dispatch: AppDispatch) {
    request<TSignUpData>("/auth/register", {
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

        dispatch(handleSignUp(data.user, accessToken));

        navigate(ERoutes.main, { replace: true });
        toast.success("Вы успешно зарегистрировались");
      })
      .catch(() => {
        toast.error("Произошла ошибка при регистрации");
      });
  };
};

export const logIn = (
  email: string,
  password: string,
  navigate: NavigateFunction,
  locationState: any
): AppThunk => {
  return function (dispatch: AppDispatch) {
    request<TLogInData>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        const refreshToken = data.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(handleLogIn(data.user, accessToken));

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
};

export const logOut = (navigate: NavigateFunction): AppThunk => {
  return function (dispatch: AppDispatch) {
    const token = localStorage.getItem("refreshToken");
    request("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(() => {
        localStorage.removeItem("refreshToken");
        navigate(ERoutes.login, { replace: true });
        dispatch(handleLogOut());
        toast.success("Вы успешно вышли из аккаунта");
      })
      .catch(() => {
        toast.error("Ошибка при выходе из аккаунта");
      });
  };
};

export const getUser = (accessToken: string): AppThunk<Promise<void>> => {
  return async function (dispatch: AppDispatch) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return await requestWithRefresh<TGetUserData>(
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
        dispatch(setUser(data.user));
      });
    }
  };
};

export const editUser = (
  accessToken: string,
  newUser: TSaveProfile
): AppThunk => {
  return function (dispatch: AppDispatch) {
    requestWithRefresh<TEditUserData>(
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
        dispatch(setUser(data.user));
        toast.success("Информация успешно отредактирована");
      })
      .catch(() => {
        toast.error("Произошла ошибка при редактировании пользователя");
      });
  };
};

export const handleForgotPassword = (
  email: string,
  navigate: NavigateFunction
): AppThunk => {
  return function (dispatch: AppDispatch) {
    request("/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch(setCanResetPassword());
        navigate(ERoutes.resetPassword);
        toast.success("Письмо с кодом отправлено на почту");
      })
      .catch(() => {
        toast.error("Ошибка при отправке письма на почту");
      });
  };
};

export const handleResetPassword = async (
  password: string,
  token: string,
  navigate: NavigateFunction
) => {
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
