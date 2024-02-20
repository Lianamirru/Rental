// @ts-nocheck

import _ from "lodash";
import { getPageItems } from "./common/pageItems";
import { MoviesStateType } from "../reducer/moviesReducer";

export function getPagedData(state: MoviesStateType) {
  const {
    instruments,
    currentPage,
    pageSize,
    selectedCategories,
    // sortColomn,
    searchQuery,
  } = state;

  let filtered = instruments;
  if (searchQuery)
    filtered = instruments.filter((i) => {
      let fullModelName = i.maker + " " + i.model;
      let searchQueryLower = searchQuery.toLowerCase();
      return (
        fullModelName.toLowerCase().startsWith(searchQueryLower) ||
        i.model.toLowerCase().startsWith(searchQueryLower)
      );
    });
  else if (selectedCategories.length >= 1)
    filtered = instruments.filter((i) =>
      selectedCategories.includes(i.category._id)
    );

  // const sorted = _.orderBy(filtered, [sortColomn.path], [sortColomn.order]);
  const sorted = filtered;
  const pageInstruments = getPageItems(sorted, currentPage, pageSize);
  return { pageInstruments, totalCount: filtered.length };
}
