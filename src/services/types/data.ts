import { TProfile } from "../../pages/profile/utils";
import { TIngredient, TOrder } from "../../utils/types";

export type TGetIngredientsData = {
  success: boolean;
  data: TIngredient[];
};

export type TPostOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TSignUpData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TProfile;
};

export type TLogInData = TSignUpData;

export type TGetUserData = {
  success: boolean;
  user: TProfile;
};

export type TEditUserData = TGetUserData;

export type TGetOrdersData = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
