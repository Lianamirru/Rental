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
};
// export type MovieType = {
//   _id: string;
//   title: string;
//   numberInStock: number;
//   dailyRentalRate: number;
//   genre: CategoryType;
//   liked: boolean;
//   likes: number;
// };

export type MovieDataType = {
  _id?: string;
  title: string;
  genreId: string;
  numberInStock: string;
  dailyRentalRate: string;
};

export type ColomnType<T> = {
  label?: string;
  path?: string;
  content?: (item: T) => JSX.Element;
  key?: string;
  length?: boolean;
};

export type ColomnsType<T> = ColomnType<T>[];

export type SortColomnType = { path: string; order: "asc" | "desc" };