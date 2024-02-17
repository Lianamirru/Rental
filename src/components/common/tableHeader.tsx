import { ColomnsType, ColomnType, SortColomnType } from "../../types/movieType";

type TableHeaderProps<T> = {
  sortColomn: SortColomnType;
  onSort: (sortColomn: SortColomnType) => void;
  colomns: ColomnsType<T>;
};

const TableHeader = <T,>({
  colomns,
  sortColomn,
  onSort,
}: TableHeaderProps<T>) => {
  const tableSort = (path: string | undefined) => {
    if (path) {
      if (sortColomn.path === path) {
        sortColomn.order = sortColomn.path === path ? "desc" : "asc";
      } else {
        sortColomn.path = path;
        sortColomn.order = "asc";
      }
      onSort(sortColomn);
    }
  };

  const renderSortIcon = (colomn: ColomnType<T>) => {
    if (sortColomn.path === colomn.path) {
      if (sortColomn.order === "asc")
        return <i className="fa-solid fa-caret-up"></i>;
      else return <i className="fa-solid fa-caret-down"></i>;
    }
    return null;
  };
  return (
    <thead>
      <tr>
        {colomns.map((colomn) => (
          <th
            onClick={() => tableSort(colomn.path)}
            key={colomn.path || colomn.key}
            className="clickable"
          >
            {colomn.label} {renderSortIcon(colomn)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
