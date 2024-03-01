import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { CategoryType } from "../../types/categoryType";

type CategoriesProps = {
  onSelect: (categoryId: string) => void;
  selectedCategories: string[];
};

const SelectCategory = ({ onSelect, selectedCategories }: CategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data);
    })();
  }, []);

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCheckIfSelected = (categoryId: string) => {
    return selectedCategories.some((category) => category === categoryId);
  };

  return (
    <div className="dropdown">
      <div onClick={toggleDropDown}>
        <h3>CATEGORIES</h3>
      </div>
      {isDropdownOpen ? (
        <div className="dropdown-content filter__dropdown-content">
          {categories.map((category) => (
            <div key={category._id}>
              <input
                type="checkbox"
                id={category["category"]}
                checked={handleCheckIfSelected(category._id)}
                onChange={() => onSelect(category._id)}
                className="dropdown__checkbox"
              />
              <label
                className="dropdown__options"
                htmlFor={category["category"]}
              >
                {category["category"]}
              </label>
            </div>
          ))}
          <div />
        </div>
      ) : null}
    </div>
  );
};

export default SelectCategory;
