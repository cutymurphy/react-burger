export type TProfile = {
  name: string;
  email: string;
  password: string;
};

export type TProfileErrors = {
  [K in keyof TProfile]?: string;
};

export type TSaveProfile = TProfileErrors;

export const initialInfo: TProfile = {
  name: "",
  email: "",
  password: "",
};

export type TProfileEdit = {
  name: boolean;
  email: boolean;
  password: boolean;
};

export const initialEdit: TProfileEdit = {
  name: false,
  email: false,
  password: false,
};
