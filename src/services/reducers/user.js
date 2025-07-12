import { LOG_IN, LOG_OUT, SET_USER, SIGN_UP, SET_TOKEN } from "../actions/user";

const initialUser = {
  user: null,
  accessToken: "",
};

export const userReducer = (state = initialUser, action) => {
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
    default: {
      return state;
    }
  }
};
