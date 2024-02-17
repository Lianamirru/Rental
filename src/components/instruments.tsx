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

import React, { useState, useEffect } from "react";
import Search from "./common/search";
import { useInstrumentsReducer } from "../reducer/instrumentsReducer";
import { REDUCER_ACTION_TYPE } from "../reducer/instrumentsReducer";
import { getMovies } from "../services/movieService";
import { getPagedData } from "./getPagedData";
import Categories from "./categories";
import Header from "./header";

const Product = ({ product }) => {
  return (
    <div className="instrument" key={product._id}>
      <span>
        {product.maker} {product.model}
      </span>
    </div>
  );
};
const ProductsList = ({ products }) => {
  return (
    <div className="products">
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

const Instruments = () => {
  const [state, dispatch] = useInstrumentsReducer();
  const {
    instruments,
    category,
    // sortColomn,
    searchQuery,
    currentPage,
    pageSize,
  } = state;

  const [instrument, setInstrument] = useState<InstrumentType | null>(null);

  const totalPages = Math.ceil(instruments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = instruments.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      const { data: instruments } = await getMovies();
      dispatch({
        type: REDUCER_ACTION_TYPE.FETCH_DATA,
        payload: instruments,
      });
    };
    fetchData().catch(console.error);
  }, []);

  const handlePageChange = (newPage) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.PAGE_CHANGE,
      payload: newPage,
    });

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

  console.log("d", state.instruments);
  let { pageInstruments, totalCount } = getPagedData(state);

  return (
    <div>
      <Header />
      <Search onChange={handleSearch} value={searchQuery} />
      <div className="filter-button">Filter/Sort</div>
      <Categories onSelect={handleSelect} category={category} />
      {totalCount ? (
        <>
          <ProductsList products={pageInstruments} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No Instruments</p>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Instruments;
