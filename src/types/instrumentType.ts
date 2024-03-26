import { CategoryType } from "./categoryType";

export type InstrumentType = {
  _id: string;
  type: string;
  maker: string;
  model: string;
  year: number;
  numberInStock: number;
  monthlyRentalPrice: number;
  category: CategoryType;
  like: boolean;
  image: { data: ArrayBuffer; contentType: string };
};
