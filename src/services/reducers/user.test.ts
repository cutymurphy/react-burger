import { TProfile } from "../../pages/profile/utils";
import {
  LOG_IN,
  LOG_OUT,
  SET_CAN_RESET_PASSWORD,
  SET_TOKEN,
  SET_USER,
  SIGN_UP,
} from "../constants";
import { initialUser, userReducer } from "./user";

describe("user reducer", () => {
  const testUser: TProfile = {
    name: "Darya Sushkova",
    email: "dasha.030105@gmail.com",
    password: "testtest",
  };

  const testAccessToken = "429wejehjqw238X";

  it("should return the initial state", () => {
    expect(userReducer(undefined, { type: "" } as any)).toEqual(initialUser);
  });

  it("should handle LOG_IN", () => {
    expect(
      userReducer(initialUser, {
        type: LOG_IN,
        user: testUser,
        accessToken: testAccessToken,
      })
    ).toEqual({
      ...initialUser,
      user: testUser,
      accessToken: testAccessToken,
    });
  });

  it("should handle SIGN_UP", () => {
    expect(
      userReducer(initialUser, {
        type: SIGN_UP,
        user: testUser,
        accessToken: testAccessToken,
      })
    ).toEqual({
      ...initialUser,
      user: testUser,
      accessToken: testAccessToken,
    });
  });

  it("should handle LOG_OUT", () => {
    expect(
      userReducer(
        {
          user: testUser,
          accessToken: testAccessToken,
          canResetPassword: false,
        },
        { type: LOG_OUT }
      )
    ).toEqual({
      user: null,
      accessToken: "",
      canResetPassword: false,
    });
  });

  it("should handle SET_TOKEN", () => {
    expect(
      userReducer(
        {
          user: testUser,
          accessToken: "",
          canResetPassword: false,
        },
        {
          type: SET_TOKEN,
          accessToken: testAccessToken,
        }
      )
    ).toEqual({
      user: testUser,
      accessToken: testAccessToken,
      canResetPassword: false,
    });
  });

  it("should handle SET_USER", () => {
    expect(
      userReducer(initialUser, {
        type: SET_USER,
        user: testUser,
      })
    ).toEqual({
      ...initialUser,
      user: testUser,
    });
  });

  it("should handle SET_CAN_RESET_PASSWORD", () => {
    expect(
      userReducer(initialUser, {
        type: SET_CAN_RESET_PASSWORD,
      })
    ).toEqual({
      ...initialUser,
      canResetPassword: true,
    });
  });
});
