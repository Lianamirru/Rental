import { useState } from "react";
import { InstrumentType } from "../../types/instrumentType";

type MakerProps = {
  instruments: InstrumentType[];
  onMakerChange: (maker: string) => void;
};

const Maker = ({ instruments, onMakerChange }: MakerProps) => {
  const makersSet = new Set(instruments.map((i) => i.maker));
  const makers = Array.from(makersSet);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <div onClick={toggleDropDown} className="filter-field">
        <h3>MANUFACTURER</h3>
      </div>
      {isDropdownOpen ? (
        <div className="dropdown-content filter__dropdown-content">
          {makers.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                onChange={() => onMakerChange(option)}
                className="dropdown__checkbox"
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

export default Maker;
