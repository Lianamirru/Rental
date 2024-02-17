import _ from "lodash";
import { ColomnsType, ColomnType } from "../../types/movieType";

type TableBodyProps<T> = {
  data: T[];
  colomns: ColomnsType<T>;
};

const TableBody = <T,>({ data, colomns }: TableBodyProps<T>) => {
  const renderCell = (item: T, colomn: ColomnType<T>) => {
    if (colomn.content) return colomn.content(item);
    if (colomn.path && colomn.length === true) {
      return _.get(item, colomn.path).length;
    }
    if (colomn.path) return _.get(item, colomn.path);
  };

  return (
    <tbody>
      {data.map((item, i) => (
        <tr key={i}>
          {colomns.map((colomn) => (
            <td key={colomn.path || colomn.key}>{renderCell(item, colomn)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
