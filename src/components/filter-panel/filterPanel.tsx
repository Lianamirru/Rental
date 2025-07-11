import SelectCategory from "./selectCategory";
import FilterPrice from "./filterPrice";
import Maker from "./maker";

import { InstrumentType } from "../../types/instrumentType";

type FilterPanelProps = {
  handleCategoryChange: (categoryId: string) => void;
  handleMakerChange: (maker: string) => void;
  selectedCategories: string[];
  handleSort: (option: string) => void;
  instruments: InstrumentType[];
};

const FilterPanel = ({
  handleCategoryChange,
  handleMakerChange,
  selectedCategories,
  handleSort,
  instruments,
}: FilterPanelProps) => {
  return (
    <div className="filter-panel">
      <SelectCategory
        selectedCategories={selectedCategories}
        onSelect={handleCategoryChange}
      />
      <Maker instruments={instruments} onMakerChange={handleMakerChange} />
      <FilterPrice onSort={handleSort} />
    </div>
  );
};

export default FilterPanel;
