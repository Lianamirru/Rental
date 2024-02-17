// @ts-nocheck
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import MoviesTable from "./moviesTable";
import Genre from "./genres";
import Search from "./common/search";
import Pagination from "./common/pagination";
import { getPagedData } from "./getPagedData";

import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { getCurrentUser } from "../services/authService";
import { logger } from "../services/logService";

import { MovieType, SortColomnType } from "../types/movieType";
import { GenreType } from "../types/genreType";

import { useMovieReducer } from "../reducer/moviesReducer";
import { REDUCER_ACTION_TYPE } from "../reducer/moviesReducer";
import { getLikedMovies, likeMovie } from "./../services/likeService";

import Modal from "./common/modal/modal";
import RentalForm from "./rentalForm";
import ProtectedRoute from "./common/protectedRoute";
import Header from "./header";
import Instruments from "./instruments";

const Movies = () => {
  const [modalActive, setModalActive] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [state, dispatch] = useMovieReducer();
  const {
    movies,
    genres,
    currentPage,
    pageSize,
    selectedGenre,
    sortColomn,
    searchQuery,
  } = state;

  const user = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: movies }, { data: genres }] = await Promise.all([
        getMovies(),
        getGenres(),
      ]);

      let userMovies;
      const user = getCurrentUser();

      if (!user) userMovies = movies;
      else {
        const { data: likedMoviesIds } = await getLikedMovies();
        userMovies = movies.map((movie) => {
          if (likedMoviesIds.includes(movie._id))
            return { ...movie, liked: true };
          return movie;
        });
      }

      dispatch({
        type: REDUCER_ACTION_TYPE.FETCH_DATA,
        payload: {
          movies: userMovies,
          genres: [{ _id: "", name: "All Genres" }, ...genres],
        },
      });
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  const handleSearch = (searchQuery: string) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH,
      payload: searchQuery,
    });

  const handleSort = (sortColomn: SortColomnType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SORT,
      payload: sortColomn,
    });
  };

  const handleSelect = (genre: GenreType) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SELECT_GENRE,
      payload: genre,
    });
  };

  const handleChangePage = (page: number) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.PAGE_CHANGE,
      payload: page,
    });
  };

  const handleLike = async (movie: MovieType) => {
    if (!user) {
      setLikeModal(true);
    } else {
      const originalMovies = movies;

      dispatch({
        type: REDUCER_ACTION_TYPE.LIKE,
        payload: movie,
      });

      try {
        await likeMovie(movie._id);
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          toast.error("unable to handle like");
          dispatch({ type: "SET_MOVIES", payload: originalMovies });
        } else {
          logger(ex);
        }
      }
    }
  };

  const handleDelete = async (movie: MovieType) => {
    const originalMovies = movies;

    dispatch({
      type: REDUCER_ACTION_TYPE.DELETE_MOVIE,
      payload: movie._id,
    });

    try {
      if (movie._id) {
        await deleteMovie(movie._id);
      } else {
        throw new Error("cannot delete movie without id");
      }
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        toast.error("movie has already been deleted");
        dispatch({ type: "SET_MOVIES", payload: originalMovies });
      } else {
        logger(ex);
      }
    }
  };

  const handleRent = (movie: MovieType) => {
    setMovie(movie);
    setModalActive(true);
  };

  let { pageMovies, totalCount } = getPagedData(state);

  return (
    <>
      <Header />
      <Genre
        onGenreSelect={handleSelect}
        genres={genres}
        selectedGenre={selectedGenre}
      />
      <div>
        {user?.isAdmin && (
          <Link
            to={"/movies/new"}
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}
        <Search onChange={handleSearch} value={searchQuery} />
        <div className="filter-button">Filter/Sort</div>
        <p>{!totalCount ? "No movies" : ""}</p>
        {totalCount ? (
          <Instruments
            pageItems={pageMovies}
            // pageItems={pageMovies}
            // onDelete={handleDelete}
            // onLike={handleLike}
            // likeModal={likeModal}
            // setLikeModal={setLikeModal}
            // // onSort={handleSort}
            // // sortColomn={sortColomn}
            // onRent={handleRent}
          />
        ) : null}
        {totalCount ? (
          <MoviesTable
            pageItems={pageMovies}
            onDelete={handleDelete}
            onLike={handleLike}
            likeModal={likeModal}
            setLikeModal={setLikeModal}
            onSort={handleSort}
            sortColomn={sortColomn}
            onRent={handleRent}
          />
        ) : null}
        <Pagination
          pageSize={pageSize}
          countItems={totalCount}
          onChangePage={handleChangePage}
          currentPage={currentPage}
        />
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <ProtectedRoute>
          <RentalForm movie={movie} />
        </ProtectedRoute>
      </Modal>
    </>
  );
};

export default Movies;
