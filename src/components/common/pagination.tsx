type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalCount,
  onPageChange,
  pageSize,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (pages.length === 1) return null;
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
export default Pagination;
