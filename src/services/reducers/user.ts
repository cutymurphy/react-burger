import { TProfile } from "../../pages/profile/utils";
import { TUserActions } from "../actions/user";
import {
  LOG_IN,
  LOG_OUT,
  SET_CAN_RESET_PASSWORD,
  SET_TOKEN,
  SET_USER,
  SIGN_UP,
} from "../constants";

type TUserState = {
  user: TProfile | null;
  accessToken: string;
  canResetPassword: boolean;
};

export const initialUser: TUserState = {
  user: null,
  accessToken: "",
  canResetPassword: false,
};

export const userReducer = (
  state = initialUser,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
      };
    }
    case LOG_OUT: {
      return {
        ...initialUser,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_CAN_RESET_PASSWORD: {
      return {
        ...state,
        canResetPassword: true,
      };
    }
    default: {
      return state;
    }
  }
};
