// @ts-nocheck
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

const Categories = ({
  onSelect,
  selectedCategory,
  valueProperty = "_id",
  textProperty = "category",
}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories([...data]);
    })();
  }, []);

  const categoryClass = (category) => {
    return category === selectedCategory ? "selected" : "";
  };

  return (
    <ul className="select-category">
      {categories.map((category) => (
        <li
          key={category[valueProperty]}
          onClick={() => onSelect(category)}
          className={categoryClass()}
        >
          {category[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
