import { useReducer } from "react";
import { InstrumentType } from "../types/instrumentType";

export type InstrumentStateType = {
  instruments: InstrumentType[];
  pageSize: number;
  currentPage: number;
  selectedCategories: string[];
  selectedMakers: string[];
  sortByPrice: string;
  searchMovies: [];
  searchQuery: string;
  cartItemsIds: string[];
};

const initialState: InstrumentStateType = {
  instruments: [],
  currentPage: 1,
  pageSize: 12,
  selectedCategories: [],
  selectedMakers: [],
  sortByPrice: "",
  searchMovies: [],
  searchQuery: "",
  cartItemsIds: [],
};

export const REDUCER_ACTION_TYPE = {
  FETCH_DATA: "FETCH_DATA",
  SEARCH: "SEARCH",
  SORT: "SORT",
  SELECT_CATEGORY: "SELECT_CATEGORY",
  SELECT_MAKER: "SELECT_MAKER",
  CLEAN_SELECTED_CATEGORIES: "CLEAN_SELECTED_CATEGORIES",
  PAGE_CHANGE: "PAGE_CHANGE",
  DELETE_MOVIE: "DELETE_MOVIE",
  SET_MOVIES: "SET_MOVIES",
  LIKE: "LIKE",
  ADD_TO_CART: "ADD_TO_CART",
};

type ActionType = { type: string; payload: any };

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.FETCH_DATA:
      const instruments = action.payload;
      return {
        ...state,
        instruments,
      };

    case REDUCER_ACTION_TYPE.SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1,
      };
    case REDUCER_ACTION_TYPE.SORT:
      return {
        ...state,
        sortByPrice: action.payload,
      };
    case REDUCER_ACTION_TYPE.SELECT_CATEGORY:
      const category = action.payload;
      let updatedCategories = [];
      if (state.selectedCategories.includes(category)) {
        updatedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        updatedCategories = [...state.selectedCategories, action.payload];
      }
      return {
        ...state,
        selectedCategories: updatedCategories,
        currentPage: 1,
        searchQuery: "",
      };
    case REDUCER_ACTION_TYPE.SELECT_MAKER:
      const maker = action.payload;
      let updatedMakers = [];
      if (state.selectedMakers.includes(maker)) {
        updatedMakers = state.selectedMakers.filter((m) => m !== maker);
      } else {
        updatedMakers = [...state.selectedMakers, action.payload];
      }
      return {
        ...state,
        selectedMakers: updatedMakers,
        currentPage: 1,
        searchQuery: "",
      };
    case REDUCER_ACTION_TYPE.CLEAN_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: [],
        currentPage: 1,
        searchQuery: "",
      };
    case REDUCER_ACTION_TYPE.PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case REDUCER_ACTION_TYPE.SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case REDUCER_ACTION_TYPE.LIKE:
      const updatedInstruments = state.instruments.map((instrument) =>
        instrument._id === action.payload._id
          ? { ...instrument, like: !instrument.like }
          : instrument
      );
      console.log(updatedInstruments);
      return {
        ...state,
        instruments: updatedInstruments,
      };
    case REDUCER_ACTION_TYPE.ADD_TO_CART:
      const updatedCartItems = [...state.cartItemsIds, action.payload];
      return {
        ...state,
        cartItemsIds: updatedCartItems,
      };
    default:
      throw new Error("Check reducer action type");
  }
}

export const useInstrumentsReducer = () => useReducer(reducer, initialState);
