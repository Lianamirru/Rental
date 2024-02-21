// @ts-nocheck
// import { MovieType } from "../types/movieType";

// type MoviesTableProps = {
//   pageItems: MovieType[];
//   onDelete: (movie: MovieType) => Promise<void>;
//   onLike: (movie: MovieType) => void;
//   //   onSort: () => void;
//   //   sortColomn: void;
//   onRent: (movie: MovieType) => void;
//   likeModal: boolean;
//   setLikeModal: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const Instruments = ({
//   pageItems,
//   onDelete,
//   onLike,
//   //   onSort,
//   //   sortColomn,
//   onRent,
//   likeModal,
//   setLikeModal,
// }: MoviesTableProps) => {
//   return null;

// };

import { useState, useEffect, useRef } from "react";
import Search from "./common/search";
import { useInstrumentsReducer } from "../reducer/instrumentsReducer";
import { REDUCER_ACTION_TYPE } from "../reducer/instrumentsReducer";
import { getInstruments } from "../services/instrumentService";
import { getPagedData } from "./getPagedData";
// import Categories from "./categories";
import Header from "./header";

import { getCurrentUser } from "../services/authService";
import Modal from "./common/modal/modal";
import { getLikedInstruments, likeInstrument } from "../services/likeService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import ProductsList from "./displayInstruments";

import { getCategories } from "../services/categoryService";
import { useLocation } from "react-router-dom";
import { CategoryType } from "../types/categoryType";

const Instruments = () => {
  const [state, dispatch] = useInstrumentsReducer();
  const {
    instruments,
    selectedCategories,
    searchQuery,
    pageSize,
    currentPage,
  } = state;

  const [instrument, setInstrument] = useState<InstrumentType | null>(null);
  const [likeModal, setLikeModal] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");

  const user = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const { data: instruments } = await getInstruments();

      // get favourite instruments to display the right icon
      let userInstruments;
      const user = getCurrentUser();

      if (!user) userInstruments = instruments;
      else {
        const { data: likedInstrumentsIds } = await getLikedInstruments();
        userInstruments = instruments.map((instrument) => {
          if (likedInstrumentsIds.includes(instrument._id))
            return { ...instrument, like: true };
          return instrument;
        });
      }

      dispatch({ type: REDUCER_ACTION_TYPE.CLEAN_SELECTED_CATEGORIES });
      if (categoryName) {
        const { data: categories } = await getCategories();
        let category = categories.filter((c) => c.category === categoryName)[0];
        dispatch({
          type: REDUCER_ACTION_TYPE.SELECT_CATEGORY,
          payload: category._id,
        });
      }

      dispatch({
        type: REDUCER_ACTION_TYPE.FETCH_DATA,
        payload: userInstruments,
      });
    };

    fetchData().catch(console.error);
  }, [dispatch, categoryName]);

  const handleSearch = (searchQuery: string) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH,
      payload: searchQuery,
    });

  const handleCategoryChange = (categoryId) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_CATEGORY,
      payload: categoryId,
    });
  };

  const handleMakerChange = (maker) => {
    console.log(maker);
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_MAKER,
      payload: maker,
    });
  };

  const handleLike = async (instrument) => {
    if (!user) {
      setLikeModal(true);
    } else {
      const originalInstruments = instruments;

      dispatch({
        type: REDUCER_ACTION_TYPE.LIKE,
        payload: instrument,
      });

      try {
        await likeInstrument(instrument._id);
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          toast.error("unable to handle like");
          dispatch({ type: "SET_MOVIES", payload: originalInstruments });
        } else {
          logger(ex);
        }
      }
    }
  };

  const handlePageChange = (newPage) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.PAGE_CHANGE,
      payload: newPage,
    });

  const handleSort = (option: String) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SORT,
      payload: option,
    });
  };

  let { pageInstruments, totalCount } = getPagedData(state);

  return (
    <div>
      <Header />
      <div className="main">
        <Search onChange={handleSearch} value={searchQuery} />
        <FilterPanel
          handleCategoryChange={handleCategoryChange}
          handleMakerChange={handleMakerChange}
          handleSort={handleSort}
          selectedCategories={selectedCategories}
          instruments={instruments}
        />

        {totalCount ? (
          <>
            <ProductsList products={pageInstruments} onLike={handleLike} />
            <Pagination
              totalCount={totalCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <p>No Instruments</p>
        )}
        {likeModal ? (
          <Modal active={true} setActive={setLikeModal}>
            Login to add to favourites
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

const FilterPanel = ({
  handleCategoryChange,
  handleMakerChange,
  selectedCategories,
  handleSort,
  instruments,
}) => {
  return (
    <div className="filter-panel">
      <Categories
        selectedCategories={selectedCategories}
        onSelect={handleCategoryChange}
      />
      <Maker instruments={instruments} onMakerChange={handleMakerChange} />
      <FilterPrice onSort={handleSort} />
    </div>
  );
};

const Maker = ({ instruments, onMakerChange }) => {
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
                // checked={selectedOption === option}
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

const FilterPrice = ({ onSort }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSort = (option) => {
    setSelectedOption(option);
    onSort(option);
  };

  const options = ["from high to low", "from low to high", "none"];
  return (
    <div className="dropdown">
      <div onClick={toggleDropDown}>
        <h3>FILTER BY PRICE</h3>
      </div>
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

const Categories = ({ onSelect, selectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data);
    })();
  }, []);

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
                checked={selectedCategories.includes(category._id)}
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

export default Instruments;
