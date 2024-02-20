// import _ from "lodash";

// type PaginationProps = {
//   countItems: number;
//   pageSize: number;
//   currentPage: number;
//   onChangePage: (page: number) => void;
// };

// const Pagination = ({
//   countItems,
//   pageSize,
//   currentPage,
//   onChangePage,
// }: PaginationProps) => {
//   const pages = Math.ceil(countItems / pageSize);
//   if (pages === 1) return null;
//   const numberOfPages = _.range(1, pages + 1);

//   return (
//     <nav>
//       <ul className="pagination clickable">
//         {numberOfPages.map((page) => (
//           <li
//             key={page}
//             className={page === currentPage ? "page-item active" : "page-item"}
//           >
//             <button onClick={() => onChangePage(page)} className="page-link">
//               {page}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
