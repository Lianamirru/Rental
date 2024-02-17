// @ts-nocheck

import _ from "lodash";
import { getPageItems } from "./common/pageItems";
import { MoviesStateType } from "../reducer/moviesReducer";

export function getPagedData(state: MoviesStateType) {
  const {
    instruments,
    currentPage,
    pageSize,
    category,
    // sortColomn,
    searchQuery,
  } = state;

  console.log(instruments);
  let filtered = instruments;
  if (searchQuery)
    filtered = instruments.filter((i) =>
      i.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else
    filtered =
      category && category._id
        ? instruments.filter((i) => i.category._id === category._id)
        : instruments;
  // const sorted = _.orderBy(filtered, [sortColomn.path], [sortColomn.order]);
  const sorted = filtered;
  const pageInstruments = getPageItems(sorted, currentPage, pageSize);
  return { pageInstruments, totalCount: filtered.length };
}
