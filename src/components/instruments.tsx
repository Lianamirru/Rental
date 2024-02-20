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

import { useState, useEffect } from "react";
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

const Instruments = () => {
  const [state, dispatch] = useInstrumentsReducer();
  const {
    instruments,
    selectedCategories,
    // sortColomn,
    searchQuery,
    pageSize,
    currentPage,
  } = state;

  const [instrument, setInstrument] = useState<InstrumentType | null>(null);
  const [likeModal, setLikeModal] = useState(false);

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
      dispatch({
        type: REDUCER_ACTION_TYPE.FETCH_DATA,
        payload: userInstruments,
      });
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  const handleSearch = (searchQuery: string) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH,
      payload: searchQuery,
    });

  const handleSelect = (category) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_CATEGORY,
      payload: category,
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

  const handleSort = (sortColomn: SortColomnType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SORT,
      payload: sortColomn,
    });
  };

  let { pageInstruments, totalCount } = getPagedData(state);
  console.log(selectedCategories);
  return (
    <div>
      <Header />
      <Search onChange={handleSearch} value={searchQuery} />
      <FilterPanel
        handleCategoryChange={handleSelect}
        selectedCategories={selectedCategories}
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
  );
};

const FilterPanel = ({
  handleCategoryChange,
  selectedCategories,
  handleSortChange,
  handlePriceChange,
}) => {
  return (
    <div className="filter-panel">
      <h2>Filter/Sort</h2>
      <div>
        <h3>Categories</h3>
        <Categories
          selectedCategories={selectedCategories}
          onSelect={handleCategoryChange}
        />
      </div>
    </div>
  );
};

const Categories = ({ onSelect, selectedCategories }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data);
    })();
  }, []);

  return (
    <ul className="select-category">
      {categories.map((category) => (
        <div key={category._id}>
          <input
            type="checkbox"
            id={category["category"]}
            checked={selectedCategories.includes(category._id)}
            onChange={() => onSelect(category._id)}
          />
          <label htmlFor={category["category"]}>{category["category"]}</label>
        </div>
      ))}
    </ul>
  );
};

export default Instruments;
