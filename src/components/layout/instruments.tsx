import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Search from "../common/search";
import Modal from "../common/modal";
import Pagination from "../common/pagination";

import ProductsList from "../display-instruments/displayInstruments";
import FilterPanel from "../filter-panel/filterPanel";

import {
  REDUCER_ACTION_TYPE,
  useInstrumentsReducer,
} from "../../reducer/instrumentsReducer";
import { useLikedInstruments } from "../../context/LikedInstrumentsContext";

import { getCurrentUser } from "../../services/authService";
import { likeInstrument } from "../../services/likeService";
import { getCategories } from "../../services/categoryService";
import { getCartItems } from "../../services/cartServise";
import { getPagedData } from "../display-instruments/getPagedData";
import { logger } from "../../services/logService";

const Instruments = () => {
  const [state, dispatch] = useInstrumentsReducer();
  const {
    instruments,
    selectedCategories,
    searchQuery,
    pageSize,
    currentPage,
  } = state;

  const { likedInstruments, handleInstrumentLike } = useLikedInstruments();
  const user = getCurrentUser();

  const [likeModal, setLikeModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [cartItemsIds, setItems] = useState<string[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.FETCH_DATA,
      payload: likedInstruments,
    });
    const fetchData = async () => {
      dispatch({
        type: REDUCER_ACTION_TYPE.CLEAN_SELECTED_CATEGORIES,
        payload: "",
      });
      if (categoryName) {
        const { data: categories } = await getCategories();
        let category = categories.filter((c) => c.category === categoryName)[0];
        dispatch({
          type: REDUCER_ACTION_TYPE.SELECT_CATEGORY,
          payload: category._id,
        });
      }
      if (user) {
        const { data } = await getCartItems();
        setItems(data.map((i) => i.instrument._id));
      }
    };
    fetchData().catch(console.error);
  }, [dispatch, categoryName, likedInstruments]);

  const handleSearch = (searchQuery: string) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH,
      payload: searchQuery,
    });

  const handleCategoryChange = (categoryId: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_CATEGORY,
      payload: categoryId,
    });
  };

  const handleMakerChange = (maker: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_MAKER,
      payload: maker,
    });
  };

  const handleLike = async (instrumentId: string) => {
    if (!user) {
      setLikeModal(true);
    } else {
      const originalInstruments = instruments;
      handleInstrumentLike(instrumentId);
      try {
        await likeInstrument(instrumentId);
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

  const handlePageChange = (newPage: number) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.PAGE_CHANGE,
      payload: newPage,
    });

  const handleSort = (option: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SORT,
      payload: option,
    });
  };

  const handleAddToCart = (instrumentId: string) => {
    if (!user) {
      setCartModal(true);
    } else {
      setItems([...cartItemsIds, instrumentId]);
    }
  };

  const handleDeleteFromCart = (instrumentId: string) => {
    const updatedCart = cartItemsIds.filter((i) => i !== instrumentId);
    setItems(updatedCart);
  };

  let { pageInstruments, totalCount } = getPagedData(state);

  return (
    <section id="instruments-section">
      <h2>Instruments to rent</h2>
      <div className="panel">
        <Search onChange={handleSearch} value={searchQuery} />
        <FilterPanel
          handleCategoryChange={handleCategoryChange}
          handleMakerChange={handleMakerChange}
          handleSort={handleSort}
          selectedCategories={selectedCategories}
          instruments={instruments}
        />
      </div>
      {totalCount ? (
        <>
          <ProductsList
            products={pageInstruments}
            onLike={handleLike}
            onAddToCart={handleAddToCart}
            cartItemsIds={cartItemsIds}
            onDeleteFromCart={handleDeleteFromCart}
          />
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
      <Modal active={likeModal} handleClick={() => setLikeModal(!likeModal)}>
        Login to add to favourites
      </Modal>
      <Modal active={cartModal} handleClick={() => setCartModal(!cartModal)}>
        Login to add to a cart
      </Modal>
    </section>
  );
};

export default Instruments;
