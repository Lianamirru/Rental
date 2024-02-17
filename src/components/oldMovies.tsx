// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// import MoviesTable from "./moviesTable";
// import Genre from "./genres";
// import Search from "./common/search";
// import Pagination from "./common/pagination";
// import { getPagedData } from "./getPagedData";

// import { getGenres } from "../services/genreService";
// import { getMovies, deleteMovie } from "../services/movieService";
// import { getCurrentUser } from "../services/authService";
// import { logger } from "../services/logService";

// import { MovieType, SortColomnType } from "../../types/movieType";
// import { GenreType } from "../../types/genreType";

// export type DataType = {
//   movies: MovieType[];
//   genres: GenreType[];
// };

// export type StateType = {
//   pageSize: number;
//   currentPage: number;
//   selectedGenre: GenreType | null;
//   sortColomn: SortColomnType;
//   searchMovies: [];
//   searchQuery: string;
// };

// const Movies = () => {
//   const [data, setData] = useState<DataType>({
//     movies: [],
//     genres: [],
//   });

//   const [state, setState] = useState<StateType>({
//     pageSize: 3,
//     currentPage: 1,
//     selectedGenre: null,
//     sortColomn: { path: "title", order: "asc" },
//     searchMovies: [],
//     searchQuery: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data: movies } = await getMovies();
//       const { data } = await getGenres();
//       const genres = [{ _id: "", name: "All Genres" }, ...data];
//       setData({ movies, genres });
//     };

//     fetchData().catch(console.error);
//   }, []);

//   const handleSearch = (searchQuery: string) => {
//     setState({ ...state, searchQuery, selectedGenre: null, currentPage: 1 });
//   };

//   const handleSort = (sortColomn: SortColomnType) => {
//     setState({ ...state, sortColomn });
//   };

//   const handleSelect = (genre: GenreType) => {
//     setState({
//       ...state,
//       selectedGenre: genre,
//       currentPage: 1,
//       searchQuery: "",
//     });
//   };

//   const handleChangePage = (page: number) => {
//     setState({ ...state, currentPage: page });
//   };

//   const handleLike = (movie: MovieType) => {
//     const movies = [...data.movies];
//     const index = movies.indexOf(movie);
//     movies[index] = { ...movie };
//     movies[index].liked = !movies[index].liked;
//     setData({ ...data, movies });
//   };

//   const handleDelete = async (movie: MovieType) => {
//     const originalMovies = data.movies;

//     setData({
//       ...data,
//       movies: originalMovies.filter(function (m) {
//         return m._id !== movie._id;
//       }),
//     });

//     try {
//       if (movie._id) {
//         await deleteMovie(movie._id);
//       } else {
//         throw new Error("cannot delete movie without id");
//       }
//     } catch (ex: any) {
//       if (ex.response && ex.response.status === 404) {
//         toast.error("movie has already been deleted");
//         setData({ ...data, movies: originalMovies });
//       } else {
//         logger(ex);
//       }
//     }
//   };

//   const { currentPage, pageSize, selectedGenre, sortColomn, searchQuery } =
//     state;
//   const { genres } = data;

//   const { pageMovies, totalCount } = getPagedData(state, data);
//   const user = getCurrentUser();

//   return (
//     <div className="row">
//       <div className="col-3">
//         <Genre
//           onGenreSelect={handleSelect}
//           genres={genres}
//           selectedGenre={selectedGenre}
//         />
//       </div>
//       <div className="col">
//         {user && (
//           <Link
//             to={"/movies/new"}
//             className="btn btn-primary"
//             style={{ marginBottom: 20 }}
//           >
//             New Movie
//           </Link>
//         )}
//         <Search onChange={handleSearch} value={searchQuery} />
//         <p>
//           {totalCount
//             ? `Showing ${totalCount} movies in the database.`
//             : "No movies"}
//         </p>
//         {totalCount ? (
//           <MoviesTable
//             pageItems={pageMovies}
//             onDelete={handleDelete}
//             onLike={handleLike}
//             onSort={handleSort}
//             sortColomn={sortColomn}
//           />
//         ) : null}
//         <Pagination
//           pageSize={pageSize}
//           countItems={totalCount}
//           onChangePage={handleChangePage}
//           currentPage={currentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Movies;
