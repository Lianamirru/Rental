// @ts-nocheck
import { Link } from "react-router-dom";

import Likes from "./common/likes";
import Table from "./common/table";

import { getCurrentUser } from "./../services/authService";

import { MovieType, SortColomnType, ColomnsType } from "../types/movieType";
import ProtectedRoute from "./common/protectedRoute";
import Modal from "./common/modal/modal";

type MoviesTableProps = {
  pageItems: MovieType[];
  onDelete: (movie: MovieType) => Promise<void>;
  onLike: (movie: MovieType) => void;
  onSort: (sortColomn: SortColomnType) => void;
  sortColomn: SortColomnType;
  onRent: (movie: MovieType) => void;
  likeModal: boolean;
  setLikeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MoviesTable = ({
  pageItems,
  onDelete,
  onLike,
  onSort,
  sortColomn,
  onRent,
  likeModal,
  setLikeModal,
}: MoviesTableProps) => {
  const colomns: ColomnsType<MovieType> = [
    {
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    { label: "Likes", path: "likes" },

    {
      key: "like",
      content: (movie) => (
        <Likes onClick={() => onLike(movie)} liked={!!movie.liked} />
      ),
    },
    {
      key: "rental",
      content: (movie) => (
        <button
          className="btn btn-primary btn-sm"
          id={movie._id?.toString()}
          onClick={() => onRent(movie)}
          value="clicked"
        >
          Rent
        </button>
      ),
    },
  ];

  const deleteColomn = {
    key: "delete",
    content: (movie: MovieType) => (
      <button
        className="btn btn-danger btn-sm"
        id={movie._id?.toString()}
        onClick={() => onDelete(movie)}
        value="clicked"
      >
        Delete
      </button>
    ),
  };

  const user = getCurrentUser();
  if (user && user.isAdmin) colomns.push(deleteColomn);

  return (
    <>
      <Table
        colomns={colomns}
        sortColomn={sortColomn}
        onSort={onSort}
        data={pageItems}
      />
      <Modal active={likeModal} setActive={setLikeModal}>
        <ProtectedRoute>
          <>Should not see this message</>
        </ProtectedRoute>
      </Modal>
    </>
  );
};

export default MoviesTable;
