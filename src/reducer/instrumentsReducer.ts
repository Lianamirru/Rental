// @ts-nocheck

import { useReducer } from "react";
import { getCurrentUser } from "../services/authService";

const user = getCurrentUser();

const initialState = {
  instruments: [],
  currentPage: 1,
  pageSize: 12,
  category: null,
  // sortColomn: { path: "title", order: "asc" },
  searchMovies: [],
  searchQuery: "",
};

export const REDUCER_ACTION_TYPE = {
  FETCH_DATA: "FETCH_DATA",
  SEARCH: "SEARCH",
  SORT: "SORT",
  SELECT_CATEGORY: "SELECT_CATEGORY",
  PAGE_CHANGE: "PAGE_CHANGE",
  DELETE_MOVIE: "DELETE_MOVIE",
  SET_MOVIES: "SET_MOVIES",
  LIKE: "LIKE",
};

function reducer(state, action) {
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
        sortColomn: action.payload,
      };
    case REDUCER_ACTION_TYPE.SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload,
        currentPage: 1,
        searchQuery: "",
      };
    case REDUCER_ACTION_TYPE.PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case REDUCER_ACTION_TYPE.DELETE_MOVIE:
      const movieId = action.payload;
      const newMovies = state.movies.filter((movie) => movie._id !== movieId);
      return { ...state, movies: newMovies };
    case REDUCER_ACTION_TYPE.SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case REDUCER_ACTION_TYPE.LIKE:
      if (!user) return { ...state };

      let updatedMovies = [...state.movies];
      const index = updatedMovies.indexOf(action.payload);
      const movie = updatedMovies[index];

      let { liked } = movie;
      liked ? movie.likes-- : movie.likes++;
      movie.liked = !liked;
      updatedMovies = updatedMovies.filter((m) => m._id !== movie._id);

      return {
        ...state,
        movies: [...updatedMovies, movie],
      };
    default:
      throw new Error("Check reducer action type");
  }
}

export const useInstrumentsReducer = () => useReducer(reducer, initialState);
