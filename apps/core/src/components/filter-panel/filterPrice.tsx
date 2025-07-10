import { useState } from "react";

const FilterPrice = ({ onSort }: { onSort: (oprion: string) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (option: string) => {
    setSelectedOption(option);
    onSort(option);
  };

  const options = ["from high to low", "from low to high", "none"];
  return (
    <div className="dropdown">
      <button onClick={toggleDropDown}>
        <p className="filter-panel-text">FILTER BY PRICE</p>
      </button>
      {isDropdownOpen ? (
        <div className="dropdown-content filter__dropdown-content">
          {options.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                onChange={() => handleSort(option)}
                className="dropdown__checkbox"
                checked={selectedOption === option}
              />
              <label className="dropdown__options" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FilterPrice;
