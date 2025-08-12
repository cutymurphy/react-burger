export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
};

export type TTab = "bun" | "sauce" | "main";

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt?: string | null;
};
