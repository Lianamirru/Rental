import { getPageItems } from "../common/pageItems";
import { InstrumentStateType } from "../../reducer/instrumentsReducer";
import { InstrumentType } from "../../types/instrumentType";

export function getPagedData(state: InstrumentStateType) {
  const {
    instruments,
    currentPage,
    pageSize,
    selectedCategories,
    selectedMakers,
    sortByPrice,
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
  else if (selectedMakers.length >= 1)
    filtered = instruments.filter((i) => selectedMakers.includes(i.maker));
  let sorted;
  if (sortByPrice === "" || sortByPrice === "none") {
    sorted = filtered;
  } else {
    let ascending = sortByPrice === "from low to high" ? true : false;
    sorted = sortByPriceFunc(filtered, ascending);
  }
  const pageInstruments = getPageItems(sorted, currentPage, pageSize);
  return { filtered, pageInstruments, totalCount: filtered.length };
}

function sortByPriceFunc(instruments: InstrumentType[], ascending: boolean) {
  instruments.sort((a, b) => {
    const priceA = a.monthlyRentalPrice;
    const priceB = b.monthlyRentalPrice;
    return ascending ? priceA - priceB : priceB - priceA;
  });

  return instruments;
}
