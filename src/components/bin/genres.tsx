// import React from "react";
// import { GenreType } from "../types/categoryType";
// // import { useTheme } from "./../context/ThemeContext";

// type GenreProps = {
//   genres: GenreType[];
//   selectedGenre: GenreType | null;
//   onGenreSelect: (genre: GenreType) => void;
// };

// type GenreDefaultProps = {
//   valueProperty?: keyof GenreType;
//   textProperty?: keyof GenreType;
// };

// const Genre = ({
//   genres,
//   selectedGenre,
//   onGenreSelect,
//   valueProperty = "_id",
//   textProperty = "name",
// }: GenreProps & GenreDefaultProps) => {
//   // const { theme } = useTheme();

//   const genreClassName = (genre: GenreType): string | undefined => {
//     // if (theme === "light")
//     if (selectedGenre === genre) {
//       return "select-item active";
//     } else {
//       return "select-item";
//     }
//   };

//   return (
//     <ul className="select-bar">
//       {genres.map((genre, index) => (
//         <React.Fragment key={genre[valueProperty]}>
//           {index !== 0 && <li className="select-split">|</li>}
//           <li
//             className={genreClassName(genre)}
//             onClick={() => onGenreSelect(genre)}
//           >
//             {genre[textProperty]}
//           </li>
//         </React.Fragment>
//       ))}
//     </ul>
//   );
// };

// export default Genre;
